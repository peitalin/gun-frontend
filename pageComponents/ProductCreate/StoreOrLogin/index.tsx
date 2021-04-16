import React from "react";
import clsx from "clsx";
// Styles
import {
  createStyles, Theme, fade,
  withStyles, WithStyles
} from "@material-ui/core/styles";
import { fontFam, Colors, Gradients } from "layout/AppTheme";
// MUI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Login from "layout/Login";
import SellerProfile from "./SellerProfile";
import Divider from "components/Divider";
import AddSellerProfileModalButton from "pageComponents/StoreCreation/AddSellerProfileModalButton";
// Redux
import { useDispatch, useSelector } from "react-redux";
// Typings
import {
  UserPrivate,
} from "typings/gqlTypes";
// store deleted
import { isStoreDeleted, storeDoesNotExist } from "utils/store";
// Redux
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import Link from "next/link";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";







const StoreOrLogin = (props: StoreOrLoginProps) => {

  const {
    classes,
    user,
    showProductCreateButtonIfLoggedIn = false,
    biggerButtons = false,
  } = props;

  const [showLogin, setShowLogin] = React.useState({
    login: false,
    signup: false,
  });

  const storeExists = !storeDoesNotExist(user?.store)
  const dispatch = useDispatch();

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.down("sm"));

  if (storeExists) {
    if (showProductCreateButtonIfLoggedIn) {
      return (
        <Link href={"/sell"}><a>
          <Button
            className={classes.productCreateLinkButton}
            classes={{
              label: classes.productCreateLinkButtonText
            }}
            variant="text"
            color="primary"
          >
            Upload a Product
          </Button>
        </a></Link>
      )
    } else {
      return (
        <SellerProfile user={user} />
      )
    }
  } else {
    // user profile exists, but no valid store
    if (user?.id) {
      return (
        <div className={clsx(classes.storeLogin2)}
          style={props.style}
        >
          {
            !props.disableSubtitle &&
            <Typography variant="h4" className={classes.loginTitle}>
              Don't have a store yet?
            </Typography>
          }
          <div className={classes.createStoreButtonContainer}>
            <AddSellerProfileModalButton
              title={"Create Seller Profile"}
              // biggerButtons={biggerButtons}
            />
          </div>
        </div>
      )
    } else {
      // no user profile yet
      return (
        <div className={clsx(classes.flexRow, classes.createAccountLoginBox)}>
          {
            !props.disableSubtitle &&
            <Typography variant="h4" className={classes.loginTitle}>
              Don't have a store yet?
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
                  //   dispatch(Actions.reduxModals.TOGGLE_STORE_CREATE_MODAL(true))
                  // }}
                  redirectOnComplete={"/create-store"}
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
                      dispatch(Actions.reduxModals.TOGGLE_STORE_CREATE_MODAL(true))
                    }}
                  />
                </div>
              }
            </div>
          }
        </div>
      )
    }
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
  errorMessage: {
    position: 'absolute',
    bottom: 0,
    right: '0.25rem',
    fontSize: '0.8rem',
    color: `${fade(theme.palette.error.light, 0.6)}`,
    fontFamily: fontFam,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
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
  storeLogin2: {
    position: "relative",
    marginTop: '1rem',
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  // Buttons
  buttonCreateAccount: {
    // marginRight: '0.5rem',
    backgroundColor: Colors.red,
    border: `1px solid ${Colors.red}`,
    color: Colors.cream,
    width: '100%',
    "&:hover": {
      backgroundColor: fade(Colors.lightRed, 1),
      border: `1px solid ${Colors.lightRed}`,
      transition: theme.transitions.create(['color', 'border'], {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      })
    }
  },
  buttonCreateAccountMaxWidth: {
    maxWidth: 350,
  },
  buttonCreateAccountMaxWidthMd: {
    maxWidth: 260,
  },
  productCreateLinkButton: {
    backgroundColor: Colors.red,
    border: `1px solid ${Colors.red}`,
    color: Colors.cream,
    width: 240,
    "&:hover": {
      backgroundColor: fade(Colors.lightRed, 1),
      border: `1px solid ${Colors.lightRed}`,
      transition: theme.transitions.create(['color', 'border'], {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      })
    }
  },
  productCreateLinkButtonText: {
    fontSize: '1.125rem',
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
  loginButtonSpacer: {
    width: '2rem',
  },
  loginButton: {
    width: '100%',
  },
  loginTitle: {
    marginTop: '1rem',
    marginBottom: '1rem',
    marginRight: '1rem',
    zIndex: 2,
    textAlign: 'center',
  },
  loggedInUserText: {
    flexBasis: '60%',
  },
  loggedInUserContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logout: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
    fontWeight: 600,
    flexBasis: '20%',
  },
  link: {
    color: Colors.blue,
    cursor: 'pointer',
    "&:hover": {
      color: Colors.lightBlue,
    },
  },
  maxWidthButton: {
    width: '100%',
    margin: '0rem 0.5rem',
  },
  divider: {
    width: '100%',
    marginTop: '1rem',
  },
  divider2: {
    width: '100%',
    marginTop: '2rem',
  },
  createStoreButtonContainer: {
    marginTop: '0.5rem',
  },
})



export default withStyles(styles)( StoreOrLogin );
