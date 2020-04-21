import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { ReduxStateLogin } from 'reduxStore/login-reducer';

import styles from './commonStylesCompact';
import SignUp from './SignUpCompact';
import SignIn from './SignInCompact';
import ResetPassword from './ResetPassword';
import ErrorBounds from "components/ErrorBounds";
import Divider from "components/Divider";



const LoginPageCompact: React.FC<ReactProps> = (props) => {

  const renderLoginTab = () => {

    const { tabIndex, setTabIndex } = props;

    if (tabIndex === 0) {
      return <SignIn
                dispatchLogin={props.dispatchLogin}
                setTabIndex={setTabIndex}
              />
    } else if (tabIndex === 1) {
      return <SignUp
                dispatchCreateUser={props.dispatchCreateUser}
                setTabIndex={setTabIndex}
              />
    } else if (tabIndex === 2) {
      return <ResetPassword
                dispatchResetPassword={props.dispatchResetPassword}
                setTabIndex={setTabIndex}
              />
    } else {
      return <SignIn
                dispatchLogin={props.dispatchLogin}
                setTabIndex={setTabIndex}
              />
    }
  }

  const { classes } = props;

  return (
    <ErrorBounds className={classes.loginRoot}>
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
  title?: string;
  setTabIndex(tabIndex: number): void;
  dispatchLogin?(payload: { email: string, password: string }): void;
  dispatchCreateUser?(payload: ReduxStateLogin): void;
  dispatchResetPassword(payload: { email: string }): void;
}

export default withStyles(styles)( LoginPageCompact );
