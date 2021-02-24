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
  OrderStatus,
  UserMutationResponse,
} from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextInput from "components/Fields/TextInput";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// Utils Components
import Loading from "components/Loading";
import UserCard from "./UserCard";
// Components
import UserViewerSection from "./UserViewerSection";
import UserSearch from "./UserSearch";
import ApproveUserForm from "./ApproveUserForm";
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
 // state
  const [errorMsg, setErrorMsg] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);

  const [userId, setUserId] = React.useState(undefined);
  const [user, setUser] = React.useState<UserPrivate>(undefined);
  const [recentUsers, setRecentUsers] = React.useState<UserPrivate[]>([]);

  const snackbar = useSnackbar();
  const router = useRouter();

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


  const toggleApproveUserLicense = async({ userId, verified }: {
    userId: string,
    verified: boolean,
  }) => {

    console.log("approving/unapproving userId:", userId);

    const { errors, data } = await aClient.mutate<MutData3, MutVar3>({
      mutation: ADMIN_APPROVE_USER_LICENSE,
      variables: {
        userId: userId,
        verified: verified,
      }
    });

    console.log("user approve/unapprove response:", data);
    alert(JSON.stringify({ VERIFIED: data?.adminApproveUserLicense }));
    // data.refundOrder.order
    if (errors) {
      snackbar.enqueueSnackbar(
        `User license (un)approval failed with msg: ${errors}`,
        { variant: "error" }
      )
    }
    return data;
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
      <>
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
      </>
    )
  }

  return (
    <>
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
      <Formik
        initialValues={{
          userId: user?.id,
          verified: !user?.license?.verified,
        }}
        validationSchema={validationSchemas.ApproveUnapproveUserLicense}
        onSubmit={(values, { setSubmitting }) => {
          console.log("not implemented")
          console.log('formik values: ', values);
          toggleApproveUserLicense({
            userId: user?.id,
            verified: !user?.license?.verified,
          }).then(res => {
            console.log(res)
            setLoading(false)
            searchUser(values.userId)
          }).catch(e => {
            console.log(e)
            setLoading(false)
            setErrorMsg(JSON.stringify(e))
          })
        }}
      >
        {(fprops) => {

          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            validateField,
            validateForm,
          } = fprops;

          console.log('values', values)

          return (
            <ApproveUserForm
              onSubmit={handleSubmit}
              licenseVerified={user?.license?.verified}
              onClickDebugPrint={() => {
                console.log("fprops.errors:", fprops.errors)
                setLoading(false)
              }}
              {...fprops}
            >
              <div className={classes.backButton}>
                <IconButton onClick={() => setUser(undefined)}>
                  <KeyboardArrowLeft/>
                </IconButton>
                <Typography className={classes.goBackText} variant="subtitle2">
                  Go Back
                </Typography>
              </div>
              <UserViewerSection title={"User Summary"}>
                <UserCard
                  user={user}
                  {...fprops}
                />
              </UserViewerSection>
              <Loading fixed loading={loading}/>
            </ApproveUserForm>
          )
        }}
      </Formik>
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
interface MutData3 {
  adminApproveUserLicense: UserMutationResponse;
}
interface MutVar3 {
  userId: string;
  verified: boolean;
}



const styles = (theme: Theme) => createStyles({
  root: {
    padding: '3rem',
    borderRadius: BorderRadius,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.darkWhite,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    border: theme.palette.type === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDarker}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchRoot: {
    marginBottom: '2rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  section: {
    margin: '2rem',
  },
  section1: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  textField: {
    marginBottom: '0.5rem',
  },
  titleSpacer: {
    marginBottom: '0.5rem',
    marginTop: '0.5rem',
  },
  goBackText: {
    marginLeft: '0.5rem',
  },
  form: {
    width: '100%',
  },
  actualPrice: {
    color: Colors.secondary,
  },
  backButton: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
  },
  recentOrders: {
    marginTop: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'start',
  },
});


export default withStyles(styles)( UserViewer );



