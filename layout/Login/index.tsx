import React from "react";
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import { oc as option } from "ts-optchain";
// Redux
import { connect, useSelector, useDispatch } from "react-redux"
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { ReduxStateLogin } from 'reduxStore/login-reducer';
import { Actions } from 'reduxStore/actions';
// Graphql
import { CREATE_USER } from "queries/user-mutations";
import { LOGIN, GET_USER, SEND_RESET_PASSWORD_EMAIL } from "queries/user-queries";
import { UserPrivate } from "typings/gqlTypes";
import { SendPasswordResetResponse } from "typings";

import LoginPageModal from "./LoginPageModal";
import LoginPageCompact from "./LoginPageCompact";
import LoginPageRedirect from "./LoginPageRedirect";

import SnackBarA from "components/Snackbars/SnackbarA";
import { useApolloClient } from "@apollo/react-hooks";
import { logout } from "queries/requests";
import {
  runOnLoginExpiration,
  checkThenSetLoggedInStatus
} from "./utils";
import { useRouter } from "next/router";
// make snackbars appear above modal dither
import Portal from '@material-ui/core/Portal';
import {
  validateEmail,
  translateErrorMsg,
  isLoginInputOk,
  isSignUpInputOk
} from "./utils";


/////////////////////////////////////////
//////// Login Modal Component //////////
/////////////////////////////////////////


const Login: React.FC<ReactProps> = (props) => {

  const [state, setState] = React.useState({
    openModal: false,
    loading: false,
    showError: false,
    dataExists: false,
    error: { message: "" },
    status: "",
    tabIndex: props.initialTabIndex || 0,
  })
  const setTabIndex = (value: number) => setState(s => ({ ...s, tabIndex: value }));

  ///////////// Redux hooks

  const apolloClient = useApolloClient();
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    reduxLogin,
  }= useSelector<GrandReduxState, any>(state => {
    return {
      reduxLogin: state.reduxLogin,
    }
  })

  const handleToggleModal = () => {
    if (state.openModal) {
      setState(s => ({ ...s, tabIndex: props.initialTabIndex || 0 }))
    }
    setState(s => ({ ...s, openModal: !state.openModal }))
  }

  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  //// GraphQL Handlers
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////

  const handleGraphQLResponse = ({ data, loading, errors }: Aprops) => {
    if (errors !== undefined) {
      handleGqlError(errors)
    }
    if (!data) {
      console.log("No data")
    }

    if (data && data.logInUsingEmail || data && data.signUpUsingEmail) {
      // optional chaining
      let user = option(data.logInUsingEmail).user()
              || option(data.signUpUsingEmail).user();

      // if login/signup succeeded, and there is a redirect...
      handleRedirect()
      handleCallback()
      handleUpdateLoginState(user, loading, errors)
    }
  }

  const handleCallback = () => {
    if (props.callbackOnComplete) {
      props.callbackOnComplete()
    }
  }

  const handleRedirect = () => {
    if (
      props.redirectOnComplete &&
      !(props.redirectOnComplete === 'none' || props.redirectOnComplete === '')
    ) {
      router.push(props.redirectOnComplete);
    }
  }

  const handleGqlError = (errors) => {
    setState(s => ({
      ...s,
      showError: true,
      loading: false,
      error: errors[0].message.includes('duplicate')
        ? { message: "Email has already been taken" }
        : errors[0], // Apollo error/errors API mismatch
    }));
  }

  const handleUpdateLoginState = (user: UserPrivate, loading: boolean, errors: any) => {
    // Update login UI state
    dispatch(Actions.reduxLogin.UPDATE_LOGIN_STATE({
      user: user,
      loading,
      loggedIn: true,
      error: errors,
    }))
    // Popup Snackbar
    setState(s => ({ ...s, dataExists: true, loading: false }));
    // Close modal after a delay
    setTimeout(() => {
      setState(s => ({ ...s, openModal: false, tabIndex: 0 }))
    }, 900);
  }


  /////////////////////////////////////////////////
  //// 1. Login Call
  //// 2. Signup Call
  //// 3. Password reset Call
  /////////////////////////////////////////////////


  /////////////////////////////////////////////////
  //// 1. Login Call
  /////////////////////////////////////////////////
  const dispatchLogin = async({ email, password }) => {

    if (!isLoginInputOk(setState)({ email, password })) {
      return null
    } else {
      setState(s => ({ ...s, loading: true }));
    }

    let { data, loading, errors }: Aprops = await apolloClient.query({
      query: LOGIN,
      variables: {
        email: email.trim(),
        password: password,
      },
      fetchPolicy: "no-cache", // always do a network request, no caches
      errorPolicy: "all", // propagate errors from backend to Snackbar
    });

    handleGraphQLResponse({ data, loading, errors });
  }

  /////////////////////////////////////////////////
  //// 2. Signup Call
  /////////////////////////////////////////////////
  const dispatchCreateUser = async({ email, password, firstName, lastName }) => {

    if (!isSignUpInputOk(setState)({ email, password, firstName, lastName })) {
      return null
    }
    setState(s => ({ ...s, loading: true }));

    let { data, errors } = await apolloClient.mutate({
      mutation: CREATE_USER,
      variables: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      },
      update: (cache, { data: { createUser } }) => {
        cache.writeQuery({
          query: LOGIN,
          data: { user: createUser },
        });
      },
      errorPolicy: "all", // propagate errors from backend to Snackbar
    });
    let loading = true
    handleGraphQLResponse({ data, loading, errors });
  }

  /////////////////////////////////////////////////
  //// 3. Password reset Call
  /////////////////////////////////////////////////
  const dispatchResetPassword = async({ email }: { email: string }) => {
    if (!email) {
      setState(s => ({ ...s, status: "Email is missing!" }))
      return null
    } else {
      setState(s => ({ ...s, loading: true }));
    }

    let { data, loading, errors }: Aprops = await apolloClient.query({
      query: SEND_RESET_PASSWORD_EMAIL,
      variables: {
        email: email.trim(),
      },
      fetchPolicy: "no-cache", // always do a network request, no caches
      errorPolicy: "all", // propagate errors from backend to Snackbar
    });

    if (!loading) {
      setState(s => ({ ...s, loading: loading }));
    }

    if (errors !== undefined) {
      handleGqlError(errors)
    }

    if (option(data).sendResetPasswordEmail()) {
      console.log(data.sendResetPasswordEmail)
      setState(s => ({
        ...s,
        status: `Password reset email sent to ${email}`
      }))
      // Close modal after a delay
      setTimeout(() => {
        setState(s => ({
          ...s,
          loading: false,
          // openModal: false,
          tabIndex: 3 // check email page
        }))
      }, 900);
    }
  }

  /////////////////////////////////////////////////
  //// Props
  /////////////////////////////////////////////////

  const {
    classes,
    buttonText = "Login",
    titleLogin = "Login",
    titleSignup = "Create an account",
  } = props;

  /////////////////////////////////////////////////
  //// Effects
  /////////////////////////////////////////////////

  React.useEffect(() => {
    // componentDidMount
    checkThenSetLoggedInStatus(() => {
      dispatch(Actions.reduxLogin.UPDATE_LOGIN_STATE({ loggedIn: true }))
    });
    runOnLoginExpiration(() => {
      dispatch(Actions.reduxLogin.UPDATE_LOGIN_STATE({ loggedIn: false }))
      logout(apolloClient, dispatch)('/')
    })
  }, [])

  return (
    <>
      {
        props.compact
        ? <LoginPageCompact
            loggedIn={reduxLogin.loggedIn}
            tabIndex={state.tabIndex}
            setTabIndex={setTabIndex}
            title={titleLogin}
            dispatchLogin={dispatchLogin}
            dispatchCreateUser={dispatchCreateUser}
            dispatchResetPassword={dispatchResetPassword}
          />
        : props.checkoutClaimPage
          ? <LoginPageRedirect
              loggedIn={reduxLogin.loggedIn}
              tabIndex={state.tabIndex}
              setTabIndex={setTabIndex}
              titleLogin={titleLogin}
              titleSignup={titleSignup}
              dispatchLogin={dispatchLogin}
              dispatchCreateUser={dispatchCreateUser}
              dispatchResetPassword={dispatchResetPassword}
            />
          : <LoginPageModal
              buttonText={buttonText}
              loggedIn={reduxLogin.loggedIn}
              tabIndex={state.tabIndex}
              setTabIndex={setTabIndex}
              titleLogin={titleLogin}
              titleSignup={titleSignup}
              dispatchLogin={dispatchLogin}
              dispatchCreateUser={dispatchCreateUser}
              openModal={state.openModal}
              dispatchResetPassword={dispatchResetPassword}
              handleToggleModal={handleToggleModal}
              buttonProps={props.buttonProps}
            />
      }

      <div className={classes.modal}>
        <Portal>
          <SnackBarA
            open={state.loading}
            closeSnackbar={() => setState(s => ({ ...s, loading: false }))}
            message={"Checking user login..."}
            variant={"info"}
          />
          <SnackBarA
            open={state.showError}
            closeSnackbar={() => {
              setState(s => ({ ...s, showError: false }));
              // wait for Snackbar to move off-screen, before resetting error
              setTimeout(() => setState(s => ({ ...s, error: undefined })), 300);
            }}
            message={
              state.error
              ? translateErrorMsg(state.error.message)
              : "An unexpected login error occurred."
            }
            variant={"error"}
          />
          <SnackBarA
            open={reduxLogin.loggedIn && state.dataExists}
            closeSnackbar={() => setState(s => ({ ...s, dataExists: false }))}
            message={"Successful login!"}
            variant={"success"}
          />
          <SnackBarA
            open={state.status.length > 0}
            closeSnackbar={() => setState(s => ({ ...s, status: "" }))}
            message={state.status}
            variant={"info"}
          />
        </Portal>
      </div>
    </>
  );
};



interface ReactProps extends WithStyles<typeof styles> {
  buttonVariant?: string;
  compact?: boolean;
  redirectOnComplete?: string;
  checkoutClaimPage?: boolean;
  buttonProps?: any;
  buttonText?: string;
  titleLogin?: string;
  titleSignup?: string;
  initialTabIndex?: number;
  numUnclaimedOrders?: number;
  callbackOnComplete?(): any;
}
interface Aprops {
  data?: {
    logInUsingEmail?: { user: UserPrivate };
    signUpUsingEmail?: { user: UserPrivate };
    sendResetPasswordEmail?: SendPasswordResetResponse;
  };
  loading?: boolean;
  errors?: any;
}


const styles = (theme: Theme) => createStyles({
  dialogPaperFull: {
    width: "calc(100% - 0.5rem)",
  },
  dialogPaper: {
    margin: '1rem',
  },
  modal: {
    position: "fixed",
    zIndex: 5000,
    bottom: "20px",
    right: "20px",
  },
  outerContainer: {
    maxWidth: '400px',
    padding: '2%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  preHeader: {
    marginTop: "1rem",
    marginBottom: '1rem',
  },
  link: {
    color: "#2484FF",
    cursor: 'pointer',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  avatarSignin: {
    margin: theme.spacing(1),
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
  avatarSignup: {
    margin: theme.spacing(1),
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
  checkBox: {
    fontSize: "0.8rem",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    marginTop: theme.spacing(1),
  },
  secureCheckout: {
    color: "#bbbbbb",
  },
  secureCheckoutIcon: {
    color: "#bbbbbb",
    height: '0.8rem',
    width: '0.8rem',
    marginRight: "0.1rem",
  },
});

export default withStyles(styles)( Login );
