import React from "react";
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BorderRadius2x } from "layout/AppTheme";
// Redux
import { connect, useSelector, useDispatch } from "react-redux"
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { ReduxStateLogin } from 'reduxStore/login-reducer';
import { Actions } from 'reduxStore/actions';
// Graphql
import { SIGN_UP_USING_EMAIL } from "queries/user-mutations";
import { LOG_IN_USING_EMAIL, GET_USER } from "queries/user-queries";
import { SEND_RESET_PASSWORD_EMAIL } from "queries/emails-mutations";
import { UserPrivate } from "typings/gqlTypes";
import { SendPasswordResetResponse } from "typings";
import {
  LoginMutationResponse,
  SignUpMutationResponse,
} from "typings/gqlTypes";

import LoginModal from "./LoginModal";
import LoginPageRedirect from "./LoginPageRedirect";

import { useApolloClient, useMutation, ApolloError } from "@apollo/client";
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
  isSignUpInputOk,
  isResetPasswordInputOk,
} from "./utils";
import { reduxBatchUpdate } from "layout/GetUser";
import { useSnackbar, ProviderContext } from "notistack";
import { ApolloRefetch, refetchUser } from "layout/GetUser";
import login from "pages/login";

import { useFormik } from 'formik';
import { validationSchemas } from "utils/validation";

/////////////////////////////////////////
//////// Login Modal Component //////////
/////////////////////////////////////////


const Login: React.FC<ReactProps> = (props) => {

  const [state, setState] = React.useState({
    openModal: false,
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

  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //   },
  //   validationSchema: validationSchemas.SignupEmail,
  //   onSubmit: async (values) => {
  //     // await signupToWaitlist({
  //     //   variables: {
  //     //     email: values?.email,
  //     //   }
  //     // })
  //     formik.resetForm();
  //   },
  // });

  const snackbar = useSnackbar();

  let [logInUsingEmail, logInUsingEmailResponse] = useMutation<MData1, MVar1>(
    LOG_IN_USING_EMAIL, {
    variables: {
      email: undefined,
      password: undefined
    },
    onCompleted: (data) => {
      let user = data?.logInUsingEmail?.user
      if (user) {
        // Update redux user and cart state and refetch
        dispatch(reduxBatchUpdate.userStore({ user: user }))
        handleUpdateLoginState(user)
        // if login/signup succeeded, and there is a redirect...
        handleRedirect({ delay: props.redirectDelay ?? 0 })
        handleCallback()
      }
    },
    onError: (error) => {
      handleGqlError(error)
    },
    fetchPolicy: "no-cache", // always do a network request, no caches
    // errorPolicy: "all", // propagate errors from backend to Snackbar
  });


  let [signUpUsingEmail, signUpUsingEmailResponse] = useMutation<MData2, MVar2>(
    SIGN_UP_USING_EMAIL, {
    variables: {
      email: undefined,
      password: undefined,
      firstName: undefined,
      lastName: undefined,
      licenseNumber: undefined,
      licenseExpiry: undefined,
      licenseCategory: undefined,
      licenseState: undefined,
      phoneNumber: undefined,
      countryCode: undefined,
    },
    onCompleted: (data) => {
      let user = data?.signUpUsingEmail?.user;
      if (user) {
        // Update redux user and cart state and refetch
        dispatch(reduxBatchUpdate.userStore({ user: user }))
        handleUpdateLoginState(user)
        // if login/signup succeeded, and there is a redirect...
        handleRedirect({ delay: props.redirectDelay ?? 0 })
        handleCallback()
      }
    },
    update: (cache, { data: { signUpUsingEmail } }) => { },
    onError: (error) => {
      handleGqlError(error)
    },
    // errorPolicy: "all", // propagate errors from backend to Snackbar
  })

  let [
    sendResetPasswordEmail,
    sendResetPasswordEmailResponse
  ] = useMutation<MData3, MVar3>(
    SEND_RESET_PASSWORD_EMAIL, {
    variables: {
      email: undefined,
    },
    onCompleted: (data) => {
      console.log('data,', data)
      let emailSentTo = data?.sendResetPasswordEmail?.emailSentTo
      if (emailSentTo) {
        snackbar.enqueueSnackbar(`Sent to: ${emailSentTo}`, {
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
    },
    onError: (error) => {
      handleGqlError(error)
    },
    fetchPolicy: "no-cache", // always do a network request, no caches
    // errorPolicy: "all", // propagate errors from backend to Snackbar
  });


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

  const handleCallback = () => {
    if (props.callbackOnComplete) {
      props.callbackOnComplete()
    }
  }

  const handleRedirect = ({ delay }) => {
    if (
      props.redirectOnComplete &&
      !(props.redirectOnComplete === 'none')
    ) {
      console.log("redirecting...")
      setTimeout(() => {
        router.replace(props.redirectOnComplete);
      }, delay)
    }
  }

  const handleGqlError = (error: ApolloError) => {
    // console.log("logIn error:", JSON.stringify(error))
    if (error?.networkError) {
      snackbar.enqueueSnackbar(
        `Server is down. StatusCode: ${(error?.networkError as any)?.statusCode}`,
        { variant: "error" }
      )
      return
    }
    if (error?.graphQLErrors) {
      snackbar.enqueueSnackbar(
        translateErrorMsg(error?.graphQLErrors?.[0]?.message),
        { variant: "error" }
      )
    } else {
      snackbar.enqueueSnackbar(
        error?.message,
        { variant: "error" }
      )
    }
  }

  const handleUpdateLoginState = (user: UserPrivate) => {
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
      snackbar.enqueueSnackbar("Logging you in...", {
        variant: "info",
        autoHideDuration: 2000,
      })
    }

    logInUsingEmail({
      variables: {
        email: email.trim(),
        password: password,
      }
    })
  }

  /////////////////////////////////////////////////
  //// 2. Signup Call
  /////////////////////////////////////////////////
  const dispatchCreateUser = async({
    email,
    password,
    licenseNumber,
    licenseExpiry,
    licenseCategory,
    licenseState,
    phoneNumber,
    countryCode,
    firstName,
    lastName
  }) => {


    if (!isSignUpInputOk(snackbar)({
      email,
      password,
      licenseNumber,
      licenseExpiry,
      licenseCategory,
      licenseState,
      phoneNumber,
      countryCode,
      firstName,
      lastName
    })) {
      return null
    } else {
      snackbar.enqueueSnackbar("Creating an account...", {
        variant: "info",
        autoHideDuration: 2000,
      })
    }

    let licenseExpiry2 = new Date(licenseExpiry)

    signUpUsingEmail({
      variables: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        licenseNumber: licenseNumber,
        licenseExpiry: licenseExpiry2,
        licenseCategory: licenseCategory,
        licenseState: licenseState,
        phoneNumber: phoneNumber,
        countryCode: countryCode,
      }
    })
  }

  /////////////////////////////////////////////////
  //// 3. Password reset Call
  /////////////////////////////////////////////////
  const dispatchResetPassword = async({ email }: { email: string }) => {
    if (!isResetPasswordInputOk(snackbar)({ email })) {
      // snackbar.enqueueSnackbar("Creating an account...", {
      //   variant: "info",
      //   autoHideDuration: 2000,
      // })
      return null
    }
    sendResetPasswordEmail({
      variables: {
        email: email,
      }
    })
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

  // React.useEffect(() => {
  //   if (logInUsingEmailResponse?.error) {
  //     handleGqlError(logInUsingEmailResponse?.error)
  //   }
  // }, [logInUsingEmailResponse])

  // React.useEffect(() => {
  //   if (signUpUsingEmailResponse?.error) {
  //     handleGqlError(signUpUsingEmailResponse?.error)
  //   }
  // }, [signUpUsingEmailResponse])

  // React.useEffect(() => {
  //   if (sendResetPasswordEmailResponse?.error) {
  //     handleGqlError(sendResetPasswordEmailResponse?.error)
  //   }
  // }, [sendResetPasswordEmailResponse])

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


  let buttonLoading = logInUsingEmailResponse.loading
    || signUpUsingEmailResponse.loading
    || sendResetPasswordEmailResponse.loading

  return (
    <>
      {
        props.asFormLayout
          ? <LoginPageRedirect
              className={props.className}
              buttonLoading={buttonLoading}
              loggedIn={reduxLogin.loggedIn}
              tabIndex={state.tabIndex}
              setTabIndex={setTabIndex}
              // title props
              titleLogin={titleLogin}
              titleSignup={titleSignup}
              // dispatch props
              dispatchLogin={dispatchLogin}
              dispatchCreateUser={dispatchCreateUser}
              dispatchResetPassword={dispatchResetPassword}
            />
          : <LoginModal
              className={props.className}
              buttonLoading={buttonLoading}
              loggedIn={reduxLogin.loggedIn}
              tabIndex={state.tabIndex}
              setTabIndex={setTabIndex}
              // title props
              titleLogin={titleLogin}
              titleSignup={titleSignup}
              // dispatch props
              dispatchLogin={dispatchLogin}
              dispatchCreateUser={dispatchCreateUser}
              dispatchResetPassword={dispatchResetPassword}
              // Modal specific props
              buttonText={buttonText}
              openModal={state.openModal}
              handleToggleModal={handleToggleModal}
              buttonProps={props.buttonProps}
              numUnclaimedOrders={props.numUnclaimedOrders}
              buttonType={props.buttonType}
              menuItemTextClassName={props.menuItemTextClassName}
            />
      }
    </>
  );
};



interface ReactProps extends WithStyles<typeof styles> {
  compact?: boolean;
  redirectOnComplete?: string;
  redirectDelay?: number
  asFormLayout?: boolean;
  buttonProps?: any;
  buttonText?: React.ReactNode;
  titleLogin?: string;
  titleSignup?: string;
  initialTabIndex?: number;
  numUnclaimedOrders?: number;
  className?: any;
  callbackOnComplete?(): any;
  // menu Item version
  buttonType?: "menuItem" | "textField" | "default";
  menuItemTextClassName?: any;
}
interface MVar1 {
  email: string,
  password: string
}
interface MVar2 {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  licenseNumber: string,
  licenseExpiry: Date,
  licenseCategory: string,
  licenseState: string,
  phoneNumber: string,
  countryCode: string,
}
interface MVar3 {
  email: string,
}
interface MData1 {
  logInUsingEmail: LoginMutationResponse;
}
interface MData2 {
  signUpUsingEmail: SignUpMutationResponse;
}
interface MData3 {
  sendResetPasswordEmail: SendPasswordResetResponse;
}


const styles = (theme: Theme) => createStyles({
  dialogPaperFull: {
    width: "calc(100% - 0.5rem)",
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
});

export default withStyles(styles)( Login );
