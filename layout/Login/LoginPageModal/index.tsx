import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { ReduxStateLogin } from 'reduxStore/login-reducer';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import { Cart } from "typings/gqlTypes";
import styles from './commonStyles';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ResetPassword from './ResetPassword';
import CheckEmail from './CheckEmail';
import ErrorBounds from "components/ErrorBounds";
import Hidden from "@material-ui/core/Hidden";



const LoginPageModal: React.FC<ReactProps> = (props) => {

  const renderLoginTab = () => {

    const { tabIndex, setTabIndex } = props;

    if (tabIndex === 0) {
      return <SignIn
                dispatchLogin={props.dispatchLogin}
                setTabIndex={setTabIndex}
                handleToggleModal={props.handleToggleModal}
              />
    } else if (tabIndex === 1) {
      return <SignUp
                dispatchCreateUser={props.dispatchCreateUser}
                setTabIndex={setTabIndex}
                handleToggleModal={props.handleToggleModal}
              />
    } else if (tabIndex === 2) {
      return <ResetPassword
                dispatchResetPassword={props.dispatchResetPassword}
                setTabIndex={setTabIndex}
                handleToggleModal={props.handleToggleModal}
              />
    } else if (tabIndex === 3) {
      return <CheckEmail
                setTabIndex={setTabIndex}
                handleToggleModal={props.handleToggleModal}
              />
    } else {
      return <SignIn
                dispatchLogin={props.dispatchLogin}
                setTabIndex={setTabIndex}
                handleToggleModal={props.handleToggleModal}
              />
    }
  }

  const { classes } = props;

  return (
    <ErrorBounds className={classes.loginRoot}>
      {/* note: needs the newline here to work
        // @ts-ignore */}
      <Hidden smDown implementation="css"
        className={classes.cssMediaQuery}
      >
        <Dialog
          open={props.openModal}
          onClose={props.handleToggleModal}
          fullScreen={false} // full height
          fullWidth={false}
          maxWidth="xs"
          classes={{
            paperFullWidth: classes.dialogPaperFull,
            paper: classes.dialogPaper,
          }}
        >
          <div className={classes.outerContainer}>
            <div className={classes.loginButton}>
              { renderLoginTab() }
            </div>
          </div>
        </Dialog>
        <Button
          variant="text"
          color="secondary"
          className={classes.loginButton}
          onClick={props.handleToggleModal}
          {...props.buttonProps}
        >
          { props.title ? props.title : "Login" }
        </Button>
      </Hidden>

      {/* note: needs the newline here to work
        // @ts-ignore */}
      <Hidden mdUp implementation="css"
        className={classes.cssMediaQuery}
      >
        <Dialog
          open={props.openModal}
          onClose={props.handleToggleModal}
          fullScreen={false} // full height
          fullWidth={false}
          maxWidth="xs"
          classes={{
            paperFullWidth: classes.dialogPaperFull,
            paper: classes.dialogPaper,
          }}
        >
          <div className={classes.outerContainer}>
            <div className={classes.loginButton}>
              { renderLoginTab() }
            </div>
          </div>
        </Dialog>
        <Button
          variant="text"
          color="secondary"
          className={classes.loginButton}
          onClick={props.handleToggleModal}
          {...props.buttonProps}
        >
          { props.title ? props.title : "Login" }
        </Button>
      </Hidden>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  tabIndex: number;
  loggedIn: boolean;
  openModal: boolean;
  buttonProps?: any;
  handleToggleModal(): void;
  setTabIndex(tabIndex: number): void;
  dispatchLogin(payload: { email: string, password: string }): void;
  dispatchCreateUser(payload: ReduxStateLogin): void;
  dispatchResetPassword(payload: { email: string }): void;
}

export default withStyles(styles)( LoginPageModal );
