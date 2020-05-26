import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { ReduxStateLogin } from 'reduxStore/login-reducer';
import clsx from "clsx";

import styles from './commonStylesClaimDownload';
import SignUp from './SignUpClaimDownload';
import SignIn from './SignInClaimDownload';
import ResetPassword from './ResetPassword';
import ErrorBounds from "components/ErrorBounds";



const LoginPageRedirect: React.FC<ReactProps> = (props) => {

  const renderLoginTab = () => {

    const { tabIndex, setTabIndex } = props;

    if (tabIndex === 0) {
      return <SignIn
                dispatchLogin={props.dispatchLogin}
                setTabIndex={setTabIndex}
                title={props.titleLogin}
                buttonLoading={props.buttonLoading}
              />
    } else if (tabIndex === 1) {
      return <SignUp
                dispatchCreateUser={props.dispatchCreateUser}
                setTabIndex={setTabIndex}
                title={props.titleSignup}
                buttonLoading={props.buttonLoading}
              />
    } else if (tabIndex === 2) {
      return <ResetPassword
                dispatchResetPassword={props.dispatchResetPassword}
                setTabIndex={setTabIndex}
                buttonLoading={props.buttonLoading}
              />
    } else {
      return <SignIn
                dispatchLogin={props.dispatchLogin}
                setTabIndex={setTabIndex}
                title={props.titleLogin}
                buttonLoading={props.buttonLoading}
              />
    }
  }

  const { classes } = props;

  return (
    <ErrorBounds className={clsx(classes.loginRoot, props.className)}>
      <div className={classes.outerContainer}>
        <div className={classes.loginButton}>
          { renderLoginTab() }
        </div>
      </div>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  tabIndex: number;
  loggedIn: boolean;
  titleLogin?: string;
  titleSignup?: string;
  className?: any;
  buttonLoading?: boolean;
  setTabIndex(tabIndex: number): void;
  dispatchLogin?(payload: { email: string, password: string }): void;
  dispatchCreateUser(payload: {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  }): void;
  dispatchResetPassword(payload: { email: string }): void;
}

export default withStyles(styles)( LoginPageRedirect );
