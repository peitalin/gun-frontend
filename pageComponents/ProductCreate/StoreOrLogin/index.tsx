import React from "react";
import clsx from "clsx";
// Styles
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import { fontFam, Colors, Gradients } from "layout/AppTheme";
// MUI
import Typography from "@mui/material/Typography";
import Login from "layout/Login";
import SellerProfile from "./SellerProfile";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Typings
import {
  UserPrivate,
} from "typings/gqlTypes";
// store deleted
import { payoutDoesNotExist, storeDoesNotExist } from "utils/store";
// Redux
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// media query
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import StoreOrLoginContainer from "./StoreOrLoginContainer";





const StoreOrLogin = (props: StoreOrLoginProps) => {

  const {
    classes,
    user,
    biggerButtons = false,
  } = props;

  const [showLogin, setShowLogin] = React.useState({
    login: false,
    signup: false,
  });

  const storeIsValid = !storeDoesNotExist(user?.store)
  const dispatch = useDispatch();
  const theme = useTheme();


  if (storeIsValid) {
    return (
      <StoreOrLoginContainer>
        <SellerProfile user={user} />
      </StoreOrLoginContainer>
    )
  } else {
    // NOTE: store is created when a user signs up
    // no user profile yet
    return (
      <StoreOrLoginContainer>
        <div className={clsx(classes.flexRow, classes.createAccountLoginBox)}>
          {
            !props.disableSubtitle &&
            <Typography variant="h4" className={classes.loginTitle}>
              Don't have an account yet?
            </Typography>
          }
          {
            !showLogin.login &&
            !showLogin.signup &&
            <div className={clsx(classes.storeLogin)}
              style={props.style}
            >
              <div className={classes.maxWidthButton}>
                <Login
                  buttonText={
                    props.buttonText
                      ? props.buttonText
                      : "Create your account for free"
                  }
                  titleLogin={"Login"}
                  titleSignup={"Create Account"}
                  initialTabIndex={1}
                  buttonType={props.buttonType}
                  buttonProps={{
                    classes: {
                      root: clsx(
                        classes.buttonCreateAccount,
                        classes.buttonCreateAccountMaxWidth,
                      ),
                      label: biggerButtons ? classes.biggerButtons : null
                      // label: classes.biggerButtons
                    },
                  }}
                  // callbackOnComplete={() => {
                  //   dispatch(Actions.reduxModals.TOGGLE_STORE_PAYOUT_CREATE_MODAL(true))
                  // }}
                  // redirectOnComplete={"/create-store"}
                />
              </div>
              {
                !props.disableLoginButton &&
                <div className={classes.maxWidthButton}>
                  <Login
                    buttonText={"Log In"}
                    titleLogin={"Log In"}
                    titleSignup={"Create Account"}
                    initialTabIndex={0}
                    buttonProps={{
                      classes: { root: classes.buttonLogin }
                    }}
                    buttonType={props.buttonType}
                    callbackOnComplete={() => {
                      // only dispatches if user.store does not exist.
                      // is user.store exists, this component unmounts
                      // and reduxAction to open model is never dispatched
                      dispatch(Actions.reduxModals.TOGGLE_STORE_PAYOUT_CREATE_MODAL(true))
                    }}
                  />
                </div>
              }
            </div>
          }
        </div>
      </StoreOrLoginContainer>
    )
  }
}

interface StoreOrLoginProps extends WithStyles<typeof styles> {
  user: UserPrivate;
  disableSubtitle?: boolean;
  disableLoginButton?: boolean;
  showProductCreateButtonIfLoggedIn?: boolean;
  biggerButtons?: boolean;
  buttonType?: "menuItem" | "textField" | "default";
  buttonText?: string;
  style?: any;
}


export const styles = (theme: Theme) => createStyles({
  title: {
    lineHeight: '1.5rem',
    marginBottom: '0.5rem',
    zIndex: 2,
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  storeLogin: {
    position: "relative",
    margin: '1rem 0rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 2,
  },
  // Buttons
  buttonCreateAccount: {
    // marginRight: '0.5rem',
    backgroundColor: Colors.ultramarineBlue,
    border: `1px solid ${Colors.ultramarineBlue}`,
    color: Colors.cream,
    width: '100%',
    "&:hover": {
      backgroundColor: alpha(Colors.ultramarineBlueDark, 1),
      border: `1px solid ${Colors.ultramarineBlueDark}`,
      transition: theme.transitions.create(['color', 'border'], {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      })
    }
  },
  buttonCreateAccountMaxWidth: {
    maxWidth: 350,
  },
  biggerButtons: {
    fontSize: '1rem',
  },
  buttonLogin: {
    backgroundColor: Colors.cream,
    border: `1px solid ${Colors.charcoal}`,
    color: Colors.charcoal,
    minWidth: '150px',
    width: '100%',
    "&:hover": {
      color: Colors.secondaryBright,
      border: `1px solid ${Colors.secondaryBright}`,
      backgroundColor: Colors.cream,
      transition: theme.transitions.create(['color', 'border', 'backgroundColor'], {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      })
    }
  },
  createAccountLoginBox: {
    // marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: "wrap",
    width: '100%',
  },
  loginTitle: {
    marginTop: '1rem',
    marginBottom: '1rem',
    marginRight: '1rem',
    zIndex: 2,
    textAlign: 'center',
  },
  maxWidthButton: {
    width: '100%',
    margin: '0rem 0.5rem',
  },
})



export default withStyles(styles)( StoreOrLogin );
