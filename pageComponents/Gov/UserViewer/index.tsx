import React from "react";
import clsx from "clsx";
// Redux
import { useSelector } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// Typings
import {
  UserPrivate,
} from "typings/gqlTypes";
// Material UI
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TextInput from "components/Fields/TextInput";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// Components
import UserSearch from "./UserSearch";
import UserProfileForm from "./UserProfileForm";
import DealerProfileCard from "./DealerProfileCard";
import DisplayRecentUserIds from "./DisplayRecentUserIds";

// Graphql
import { useQuery, useApolloClient } from "@apollo/client";
import {
  GET_RECENT_USERS,
  USER_BY_EMAIL_OR_ID_ADMIN_ONLY,
  ADMIN_APPROVE_USER_LICENSE,
} from "queries/user-admin-queries-mutations";
// Snackbar
import { useSnackbar } from "notistack";
// router
import { useRouter } from "next/router";



const UserViewer: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const aClient = useApolloClient();
  const snackbar = useSnackbar();
  const router = useRouter();

 // state
  const [errorMsg, setErrorMsg] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);
  const [userId, setUserId] = React.useState(undefined);
  const [user, setUser] = React.useState<UserPrivate>(
    router?.query?.userId as any
  );
  const [recentUsers, setRecentUsers] = React.useState<UserPrivate[]>([]);

  console.log("query: ", router?.query)

  const searchUser = async(userIdOrEmail: string) => {
    try {
      const { loading, errors, data } = await aClient.query<QueryData, QueryVar>({
        query: USER_BY_EMAIL_OR_ID_ADMIN_ONLY,
        variables: {
          userIdOrEmail: userIdOrEmail
        },
        fetchPolicy: "no-cache", // always do a network request, no caches
      })
      if (data.userByEmailOrIdAdminOnly) {

        setUser(data.userByEmailOrIdAdminOnly)

        let urlPath = router.asPath.split('?')[0]
        router.push(
          `${router.pathname}?userId=${userId}`,
          `${urlPath}?userId=${userId}`,
          { shallow: true }
        )
      }
    } catch(e) {
      snackbar.enqueueSnackbar(`userId does not exist`, { variant: "error" })
    }
  }

  const getRecentUsers = async(limit: number, offset = 0) => {
    try {
      const { loading, errors, data } = await aClient.query<QueryData2, QueryVar2>({
        query: GET_RECENT_USERS,
        variables: {
          limit: limit,
          offset: offset,
        },
      })
      if (data.getRecentUsers) {
        console.log("recent users: ", data.getRecentUsers);
        setRecentUsers(data.getRecentUsers)
      }
    } catch(e) {
      snackbar.enqueueSnackbar(`recent users do not exist`, { variant: "error" })
    }
  }


  React.useEffect(() => {
    getRecentUsers(6, 0)
    if (!!router?.query?.userId) {
      let userId: string = router?.query?.userId as any
      setUserId(userId)
      searchUser(userId)
    }
  }, [])

  if (user) {
    console.log("incoming user: ", user)
    console.log("user :", user)
  }

  const admin = useSelector<GrandReduxState, UserPrivate>(
    state => state?.reduxLogin?.user
  );

  if (!user?.id) {
    return (
      <div className={classes.sectionPaper}>
        <UserSearch
          userId={userId}
          setUserId={setUserId}
          searchUser={searchUser}
          errorMsg={errorMsg}
          loading={loading}
        >
          <DisplayRecentUserIds
            recentUsers={recentUsers}
            setUserId={setUserId}
          />
        </UserSearch>
      </div>
    )
  }

  return (
    <>
      <div className={classes.sectionPaper}>
        <UserSearch
          userId={userId}
          setUserId={setUserId}
          searchUser={searchUser}
          errorMsg={errorMsg}
          loading={loading}
        >
          <DisplayRecentUserIds
            recentUsers={recentUsers}
            setUserId={setUserId}
          />
        </UserSearch>
      </div>

      <div className={classes.sectionPaper}>
        <UserProfileForm
          user={user}
          setUser={setUser}
          searchUser={searchUser}
        />
      </div>

      <div className={classes.sectionPaper}>
        <DealerProfileCard
          user={user}
          searchUser={searchUser}
        />
      </div>

    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  onSubmit(args: any): void;
  onClickDebugPrint(): void;
}

interface QueryData {
  userByEmailOrIdAdminOnly: UserPrivate;
}
interface QueryVar {
  userIdOrEmail: string;
}
interface QueryData2 {
  getRecentUsers: UserPrivate[];
}
interface QueryVar2 {
  limit: number;
  offset: number;
}


const styles = (theme: Theme) => createStyles({
  searchRoot: {
  },
  sectionPaper: {
    padding: '3rem',
    marginBottom: '2rem',
    borderRadius: BorderRadius,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDark}`,
    backgroundColor: theme.palette.mode === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.cream}`,
  },
  section: {
    margin: '2rem',
  },
  form: {
    width: '100%',
  },
});


export default withStyles(styles)( UserViewer );



