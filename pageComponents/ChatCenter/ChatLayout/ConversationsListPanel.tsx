import React from 'react';
import { oc as option } from "ts-optchain";
import { Colors } from "layout/AppTheme";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useSubscription } from '@apollo/client';
import { Users_Online, Chat_Users } from "typings/gqlTypes";
// import moment from 'moment';
import dayjs from 'dayjs'
import gql from 'graphql-tag';
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// MUI
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';



const FETCH_ONLINE_USERS_SUBSCRIPTION = gql`
  subscription {
    users_online (
      order_by: {lastSeen:asc}
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;


const ConversationsListPanel: React.FC<ReactProps> = (props) => {

  const [state, setState] = React.useState({
    time: new Date(),
    refetch: null,
  })

  const {
    classes,
    userId,
    userName,
  } = props;

  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const { data, loading, error } = useSubscription<QueryData>(
    FETCH_ONLINE_USERS_SUBSCRIPTION, {
      variables: {}
    }
  );

  const renderOnlineUsers = () => {
    return (
      <p className={ classes.userListHeading }>
        {
          error
          ? "Error loading online users"
          : loading
            ? null
            : `Online Users ${option(data).users_online([]).length}`
        }
      </p>
    )
  }

  const archivedConvos = option(props).conversations([])
    .filter(c => c.chatRoom.status === "ARCHIVED")

  const activeConvos = option(props).conversations([])
    .filter(c => c.chatRoom.status === "ACTIVE")

  const completedConvos = option(props).conversations([])
    .filter(c => c.chatRoom.status === "COMPLETED")


  return (
    <div className={classes.onlineUsersRoot}>
      <p className={
          xsDown
            ? classes.mobileUserListHeading
            : classes.userListHeading
        }
      >
        { "Current Offers" }
      </p>
      <ul className={
        xsDown
          ? classes.mobileUserList
          : classes.userList
      }>
        <Typography>
          Current Offers
        </Typography>
        <Divider/>
        {
          (activeConvos.length > 0) &&
          activeConvos.map(c => {

            const chatRoom = option(c).chatRoom()
            const chatRoomId = option(c).chatRoom.id()
            const product = option(c).chatRoom.product()
            const owner = option(c).chatRoom.owner()

            return (
              <MenuItem key={chatRoomId}
                className={classes.onlineUserItem}
                onClick={() => {
                  // set chatRoomId to this conversation
                  // switch chats over in Conversation component
                  // console.log("setting currentConversation: ", c.chat.id)
                  props.setCurrentConversationId(c.chatRoom.id)
                }}
              >
                <PermIdentityIcon className={
                  (chatRoomId === props.chatDivId)
                    ? classes.menuIconHighlighted
                    : classes.menuIcon
                }/>
                <span className={classes.menuText}>
                  {`${owner.firstName} - ${product.currentSnapshot.title}`}
                </span>
                {/* <span className={classes.menuText}>
                  {`${chatRoom.name} - ${product.currentSnapshot.title}`}
                </span> */}
              </MenuItem>
            )
          })
        }
        </ul>

      <ul className={
        xsDown
          ? classes.mobileUserList
          : classes.userList
      }>
        <Typography>
          Archived Offers
        </Typography>
        <Divider/>
        {
          (archivedConvos.length > 0) &&
          archivedConvos.map(c => {

            const chatRoom = option(c).chatRoom()
            const chatRoomId = option(c).chatRoom.id()
            const product = option(c).chatRoom.product()
            const owner = option(c).chatRoom.owner()

            return (
              <MenuItem key={chatRoomId}
                className={classes.onlineUserItem}
                onClick={() => {
                  // set chatRoomId to this conversation
                  // switch chats over in Conversation component
                  // console.log("setting currentConversation: ", c.chatRoom.id)
                  props.setCurrentConversationId(c.chatRoom.id)
                }}
              >
                <PermIdentityIcon className={
                  (chatRoomId === props.chatDivId)
                    ? classes.menuIconHighlighted
                    : classes.menuIcon
                }/>
                <span className={classes.menuText}>
                  {`${owner.firstName} - ${product.currentSnapshot.title}`}
                </span>
                {/* <span className={classes.menuText}>
                  {`${chat.name} - ${product.currentSnapshot.title}`}
                </span> */}
              </MenuItem>
            )
          })
        }
      </ul>
    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  userId: string;
  userName?: string;
  chatDivId: string;
  conversations?: Chat_Users[]
  setCurrentConversationId(c: string): void;
}
interface QueryData {
  users_online: Users_Online[]
}

let headingColor = Colors.charcoal;
let listItemColor = Colors.charcoal;

const styles = (theme: Theme) => createStyles({
  onlineUsersRoot: {
  },
  onlineUsersRootMobile: {
  },
  wd75: {
    width: '75%',
  },
  userList: {
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    minHeight: '8rem',
  },
  userListLi: {
    borderBottom: '1px solid #444',
    color: headingColor,
  },
  userListHeading: {
    fontWeight: 600,
    padding: '15px 10px',
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: Colors.blue,
    color: headingColor,
    borderBottom: `4px solid ${Colors.white}`,
  },
  mobileUserListHeading: {
    fontSize: '14px',
    backgroundColor: '#222',
    color: headingColor,
    fontWeight: 600,
    marginBottom: 0,
    padding: '5px',
  },
  mobileUserListHeadingI: {
    marginLeft: '10px',
  },
  mobileview: {
    position: "absolute",
    right: "0px",
    bottom: "152px",
    width: "50%",
  },
  mobileUserList: {
    backgroundColor: '#4f5050',
    paddingInlineStart: '0px',
    marginBottom: 0,
  },
  onlineUserItem: {
    listStyle: "none",
  },
  menuLink: {
  },
  menuIcon: {
    color: listItemColor,
  },
  menuIconHighlighted: {
    color: Colors.blue,
  },
  menuText: {
    color: listItemColor,
    fontSize: '0.9rem',
    margin: '0.25rem',
  },
})


export default withStyles(styles)( ConversationsListPanel );