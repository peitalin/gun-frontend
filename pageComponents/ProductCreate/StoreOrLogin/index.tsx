import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import {
  createStyles, Theme, fade,
  withStyles, WithStyles
} from "@material-ui/core/styles";
import { fontFam, Colors } from "layout/AppTheme";
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
// router
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
// store deleted
import { isStoreDeleted, storeDoesNotExist } from "utils/store";
// Redux
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";



const StoreOrLogin = (props: StoreOrLoginProps) => {

  const { classes, user } = props;
  const router = useRouter();
  const apolloClient = useApolloClient();

  const [showLogin, setShowLogin] = React.useState({
    login: false,
    signup: false,
  });

  const storeExists = !storeDoesNotExist(option(user).store())
  const dispatch = useDispatch();


  if (storeExists) {
    return <SellerProfile userStore={user.store}/>
  } else {
    // user profile exists, but no valid store
    if (option(user).id()) {
      return (
        <div className={clsx(classes.errorMessage, classes.storeLogin2)}>
          <Typography variant="h4" className={classes.loginTitle}>
            Create Gun Marketplace Seller Profile to upload a product
          </Typography>
          <div className={classes.createStoreButtonContainer}>
            <AddSellerProfileModalButton
              title={"Create Seller Profile"}
            />
          </div>
          <div className={classes.divider2}>
            <Divider />
          </div>
        </div>
      )
    } else {
      // no user profile yet
      return (
        <div className={clsx(classes.flexCol, classes.createAccountLoginBox)}>
          {
            !props.disableSubtitle &&
            <Typography variant="h4" className={classes.loginTitle}>
              Sign into your Gun Marketplace account to upload a product
            </Typography>
          }
          {
            !showLogin.login &&
            !showLogin.signup &&
            <div className={clsx(classes.errorMessage, classes.storeLogin)}>
              <div className={classes.maxWidth150}>
                <Login
                  buttonText={"Create Free Account"}
                  titleLogin={"Login"}
                  titleSignup={"Create Account"}
                  initialTabIndex={1}
                  // compact
                  buttonProps={{
                    classes: { root: classes.buttonCreateAccount }
                  }}
                  callbackOnComplete={() => {
                    dispatch(Actions.reduxModals.TOGGLE_STORE_CREATE_MODAL(true))
                  }}
                />
              </div>
              <div className={classes.maxWidth150}>
                <Login
                  buttonText={"Log In"}
                  titleLogin={"Log In"}
                  titleSignup={"Create Account"}
                  initialTabIndex={0}
                  // compact
                  buttonProps={{
                    classes: { root: classes.buttonLogin }
                  }}
                  callbackOnComplete={() => {
                    // only dispatches if user.store does not exist.
                    // is user.store exists, this component unmounts
                    // and reduxAction to open model is never dispatched
                    dispatch(Actions.reduxModals.TOGGLE_STORE_CREATE_MODAL(true))
                  }}
                />
              </div>
            </div>
          }
          <div className={classes.divider}>
            <Divider />
          </div>
        </div>
      )
    }
  }
}

interface StoreOrLoginProps extends WithStyles<typeof styles> {
  user: UserPrivate;
  disableSubtitle?: boolean;
  resetForm?(): void;
}


export const styles = (theme: Theme) => createStyles({
  title: {
    lineHeight: '1.5rem',
    marginBottom: '0.5rem',
    zIndex: 2,
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  flexRowCenter: {
    display: 'flex',
    justifyContent: 'center',
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  // Buttons
  buttonCreateAccount: {
    marginRight: '0.5rem',
    backgroundColor: Colors.red,
    border: `1px solid ${Colors.red}`,
    color: Colors.cream,
    minWidth: '160px',
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
    marginBottom: '2rem',
    // alignItems: 'center',
  },
  loginButtonSpacer: {
    width: '2rem',
  },
  loginButton: {
    width: '100%',
  },
  loginTitle: {
    marginTop: '1rem',
    marginBottom: '0.5rem',
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
  maxWidth150: {
    maxWidth: 'calc(50% - 1rem)',
    width: '100%',
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
