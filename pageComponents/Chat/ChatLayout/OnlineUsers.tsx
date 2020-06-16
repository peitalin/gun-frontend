import React from 'react';
import { oc as option } from "ts-optchain";
import { Colors } from "layout/AppTheme";
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";

import { useSubscription } from '@apollo/react-hooks';
import { Users_Online } from "typings/gqlTypes";
// import moment from 'moment';
import dayjs from 'dayjs'
import gql from 'graphql-tag';
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// MUI
import MenuItem from '@material-ui/core/MenuItem';
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


const OnlineUsers: React.FC<ReactProps> = (props) => {

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

  return (
    <div className={
      xsDown
        ? classes.onlineUsersRootMobile
        : classes.onlineUsersRoot
    }>
      <p className={
          xsDown
            ? classes.mobileUserListHeading
            : classes.userListHeading
        }
      >
        {
          error
          ? "Error loading online users"
          : loading
            ? null
            : `Online Users ${option(data).users_online([]).length}`
        }
      </p>
      {
        <ul className={
          xsDown
            ? classes.mobileUserList
            : classes.userList
        }>
          {
            option(data).users_online([]).map((u) => {
              // <Link href="/my-downloads">
              //   <a className={classes.menuLink}>
              //   </a>
              // </Link>
              return (
                <MenuItem key={u.id}
                  className={classes.onlineUserItem}
                  onClick={() => {}}
                >
                  <PermIdentityIcon className={classes.menuIcon}/>
                  <span className={classes.menuText}>
                    {`${u.firstName} ${u.lastName}`}
                  </span>
                </MenuItem>
              )
            })
          }
        </ul>
      }
    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  userId: string;
  userName?: string;
}
interface QueryData {
  users_online: Users_Online[]
}

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
  },
  userListLi: {
    borderBottom: '1px solid #444',
    color: '#fff',
  },
  userListHeading: {
    fontWeight: 600,
    padding: '15px 10px',
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: '#222',
    color: '#fff',
  },
  mobileUserListHeading: {
    fontSize: '14px',
    backgroundColor: '#222',
    color: '#fff',
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
    color: Colors.lightGrey
  },
  menuText: {
    color: Colors.lightGrey
  },
})


export default withStyles(styles)( OnlineUsers );