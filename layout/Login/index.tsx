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
import { UserPrivate, CartItem, Cart } from "typings/gqlTypes";
import { SendPasswordResetResponse } from "typings";

import LoginPageModal from "./LoginPageModal";
import LoginPageCompact from "./LoginPageCompact";
import LoginPageRedirect from "./LoginPageRedirect";

import { useApolloClient } from "@apollo/client";
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
import { reduxBatchUpdate } from "layout/GetUser";
import { useSnackbar, ProviderContext } from "notistack";
import { ApolloRefetch, refetchUser } from "layout/GetUser";

/////////////////////////////////////////
//////// Login Modal Component //////////
/////////////////////////////////////////


const Login: React.FC<ReactProps> = (props) => {

  const [state, setState] = React.useState({
    openModal: false,
    buttonLoading: false,
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

  const snackbar = useSnackbar();


  const handleToggleModal = () => {
    if (state.openModal) {
      // reset tabIndex
      setState(s => ({ ...s, tabIndex: props.initialTabIndex || 0 }))
    }
    setState(s => ({ ...s, openModal: !state.openModal }))
  }

  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  //// GraphQL Handlers
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////

  const handleGraphQLResponse = ({ data, loading, errors, refetch }: Aprops) => {
    if (errors !== undefined) {
      handleGqlError(errors)
    }
    if (!data) {
      console.log("No data")
    }
    setState(s => ({ ...s, buttonLoading: false }))

    if (data && data.logInUsingEmail || data && data.signUpUsingEmail) {
      // optional chaining
      let user = option(data.logInUsingEmail).user()
              || option(data.signUpUsingEmail).user();

      // if login/signup succeeded, and there is a redirect...
      handleRedirect()
      handleCallback()
      // Update redux user and cart state and refetch
      // console.log("saving user and userRefetch to redux: ", refetch)
      dispatch(reduxBatchUpdate.userCart({ user: user }, refetch))
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
      !(props.redirectOnComplete === 'none')
    ) {
      console.log("redirecting...")
      router.push(props.redirectOnComplete);
    }
  }

  const handleGqlError = (errors) => {
    snackbar.enqueueSnackbar(
      translateErrorMsg(JSON.stringify(errors[0].message)),
      { variant: "error" }
    )
  }

  const handleUpdateLoginState = (user: UserPrivate, loading: boolean, errors: any) => {
    // Update login UI state
    dispatch(Actions.reduxLogin.UPDATE_LOGIN_STATE({
      user: user,
      loggedIn: true,
    }))
    // Popup Snackbar
    snackbar.enqueueSnackbar(`Welcome ${user.firstName}`, {
      variant: "success",
      autoHideDuration: 2000,
    })
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

    if (!isLoginInputOk(snackbar)({ email, password })) {
      return null
    } else {
      setState(s => ({ ...s, buttonLoading: true }))
      snackbar.enqueueSnackbar("Logging you in...", {
        variant: "info",
        autoHideDuration: 2000,
      })
    }

    let { data, loading, errors, refetch }: Aprops = await apolloClient.query({
      query: LOGIN,
      variables: {
        email: email.trim(),
        password: password,
      },
      fetchPolicy: "no-cache", // always do a network request, no caches
      errorPolicy: "all", // propagate errors from backend to Snackbar
    });

    handleGraphQLResponse({ data, loading, errors, refetch });
  }

  /////////////////////////////////////////////////
  //// 2. Signup Call
  /////////////////////////////////////////////////
  const dispatchCreateUser = async({ email, password, firstName, lastName }) => {

    if (!isSignUpInputOk(snackbar)({ email, password, firstName, lastName })) {
      return null
    } else {
      setState(s => ({ ...s, buttonLoading: true }))
      snackbar.enqueueSnackbar("Creating an account...", {
        variant: "info",
        autoHideDuration: 2000,
      })
    }

    let { data, errors } = await apolloClient.mutate({
      mutation: CREATE_USER,
      variables: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      },
      update: (cache, { data: { createUser } }) => {
      },
      errorPolicy: "all", // propagate errors from backend to Snackbar
    });

    const refetch = refetchUser(apolloClient);

    handleGraphQLResponse({
      data,
      loading: state.buttonLoading,
      errors,
      refetch: refetch,
    });
  }

  /////////////////////////////////////////////////
  //// 3. Password reset Call
  /////////////////////////////////////////////////
  const dispatchResetPassword = async({ email }: { email: string }) => {
    if (!email) {
      snackbar.enqueueSnackbar("Email is missing!", { variant: "error" })
      return null
    } else {
      setState(s => ({ ...s, buttonLoading: true }))
    }

    let { data, loading, errors }: Aprops = await apolloClient.query({
      query: SEND_RESET_PASSWORD_EMAIL,
      variables: {
        email: email.trim(),
      },
      fetchPolicy: "no-cache", // always do a network request, no caches
      errorPolicy: "all", // propagate errors from backend to Snackbar
    });

    if (errors !== undefined) {
      console.log("errors: ", errors)
      handleGqlError(errors)
    }

    if (option(data).sendResetPasswordEmail()) {
      console.log(data.sendResetPasswordEmail)
      snackbar.enqueueSnackbar(`Sent to: ${email}`, {
        variant: "success",
        autoHideDuration: 5000,
      })

      setTimeout(() => {
        setState(s => ({
          ...s,
          tabIndex: 3 // check email page
        }))
      }, 900);
    }

    setState(s => ({ ...s, buttonLoading: false }))
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

  /// Not currently used, user-service does not have an expiry on
  /// efc-auth session-cookie. But if it did, this hook will auto-logout
  /// on expiry
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
            className={props.className}
            buttonLoading={state.buttonLoading}
            loggedIn={reduxLogin.loggedIn}
            tabIndex={state.tabIndex}
            setTabIndex={setTabIndex}
            title={titleLogin}
            dispatchLogin={dispatchLogin}
            dispatchCreateUser={dispatchCreateUser}
            dispatchResetPassword={dispatchResetPassword}
          />
        : props.asFormLayout
          ? <LoginPageRedirect
              className={props.className}
              buttonLoading={state.buttonLoading}
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
              className={props.className}
              buttonLoading={state.buttonLoading}
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
              numUnclaimedOrders={props.numUnclaimedOrders}
            />
      }
    </>
  );
};



interface ReactProps extends WithStyles<typeof styles> {
  buttonVariant?: string;
  compact?: boolean;
  redirectOnComplete?: string;
  asFormLayout?: boolean;
  buttonProps?: any;
  buttonText?: string;
  titleLogin?: string;
  titleSignup?: string;
  initialTabIndex?: number;
  numUnclaimedOrders?: number;
  className?: any;
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
  refetch?: ApolloRefetch;
}
interface QueryData {
  user: UserPrivate; errors?: any;
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
