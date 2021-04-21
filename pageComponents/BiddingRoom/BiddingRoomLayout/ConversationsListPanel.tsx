import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius2x, BorderRadius } from "layout/AppTheme";

import { Conversation, ChatRoomStatus } from "typings/gqlTypes";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// MUI
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
// import { FETCH_ONLINE_USERS_SUBSCRIPTION } from "queries/chat-subscriptions";





const ConversationsListPanel: React.FC<ReactProps> = (props) => {

  const {
    classes,
    userId,
  } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));


  const archivedConvos = (props.conversations ?? [])
    .filter(c =>
      c.chatRoom.status === ChatRoomStatus.ARCHIVED ||
      c.chatRoom.status === ChatRoomStatus.COMPLETED
    )

  const activeConvos = (props.conversations ?? [])
    .filter(c => c.chatRoom.status === ChatRoomStatus.ACTIVE)

  // const completedConvos = (props.conversations ?? [])
  //   .filter(c => c.chatRoom.status === ChatRoomStatus.COMPLETED)


  return (
    <div className={classes.onlineUsersRoot}>
      <Typography className={clsx(
        classes.borderRadiusTop,
        smDown
          ? classes.mobileUserListHeading
          : classes.userListHeading
      )}>
        Current Offers
      </Typography>
      <ul className={
        smDown
          ? classes.mobileUserList
          : classes.userList
      }>
        {
          (activeConvos ?? []).map(c => {

            const chatRoom = c?.chatRoom
            const chatRoomId = c?.chatRoom?.id
            const product = c?.chatRoom?.product
            const { user: otherUser } = (c?.chatRoom?.participants ?? []).find(u => u.userId !== userId)

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
                  {
                    otherUser?.license?.licenseNumber
                    ? `User License: ${otherUser?.license?.licenseNumber} - ${product.currentSnapshot.title}`
                    : `Private User: ${otherUser?.id} - ${product.currentSnapshot.title}`
                  }
                </span>
                {/* <span className={classes.menuText}>
                  {`${chatRoom.name} - ${product.currentSnapshot.title}`}
                </span> */}
              </MenuItem>
            )
          })
        }
      </ul>

      <Typography className={clsx(
        smDown
          ? classes.mobileUserListHeading
          : classes.userListHeading
      )}>
        Archived Offers
      </Typography>
      <ul className={
        smDown
          ? classes.mobileUserList
          : classes.userList
      }>
        {/* <Typography className={classes.subheading1}>
        </Typography> */}
        {
          (archivedConvos ?? []).map(c => {

            const chatRoom = c?.chatRoom
            const chatRoomId = c?.chatRoom?.id
            const product = c?.chatRoom?.product
            const { user: otherUser } = (c?.chatRoom?.participants ?? []).find(u => u.userId !== userId)

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
                  {
                    otherUser?.license?.licenseNumber
                    ? `User License: ${otherUser?.license?.licenseNumber} - ${product.currentSnapshot.title}`
                    : `Private User: ${otherUser?.id} - ${product.currentSnapshot.title}`
                  }
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
  chatDivId: string;
  conversations: Conversation[]
  setCurrentConversationId(c: string): void;
}
// interface QueryData {
//   users_online: Users_Online[]
// }


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
    color: theme.colors.uniswapLighterGrey,
  },
  subheading1: {
    margin: '1rem',
    fontSize: '1rem',
    textAlign: "center",
    color: theme.colors.uniswapLighterGrey,
  },
  userListHeading: {
    fontWeight: 600,
    padding: '15px 10px',
    marginTop: 0,
    marginBottom: 0,
    color: theme.colors.uniswapLightestGrey,
    textAlign: "center",
    background: theme.palette.type === 'dark'
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    // border: theme.palette.type === 'dark'
    //   ? `unset`
    //   : `1px solid ${Colors.slateGreyDarker}`,
  },
  borderRadiusTop: {
    borderRadius: `${BorderRadius2x}px ${BorderRadius2x}px 0px 0px`,
  },
  mobileUserListHeading: {
    fontSize: '14px',
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.black,
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
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapMediumNavy
      : Colors.slateGrey,
    paddingInlineStart: '0px',
    marginBottom: 0,
  },
  onlineUserItem: {
    listStyle: "none",
  },
  menuLink: {
  },
  menuIcon: {
    color: theme.colors.uniswapLighterGrey,
  },
  menuIconHighlighted: {
    color: Colors.blue,
  },
  menuText: {
    color: theme.colors.uniswapLighterGrey,
    fontSize: '0.9rem',
    margin: '0.25rem',
  },
})


export default withStyles(styles)( ConversationsListPanel );