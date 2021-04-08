import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Redux
import { useSelector } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// Typings
import {
  UserPrivate,
  ID,
  Order,
  UserMutationResponse,
} from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextInput from "components/Fields/TextInput";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
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
import {
  CANCEL_ORDER_AND_PAYMENT,
} from "queries/refunds-mutations";
// Validation
import { Formik } from 'formik';
import { validationSchemas } from "utils/validation";
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
    state => option(state).reduxLogin.user()
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
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDark}`,
    backgroundColor: theme.palette.type === 'dark'
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



