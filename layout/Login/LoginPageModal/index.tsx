import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { ReduxStateLogin } from 'reduxStore/login-reducer';
import clsx from "clsx";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import { Cart } from "typings/gqlTypes";
import styles from './commonStyles';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ResetPassword from './ResetPassword';
import CheckEmail from './CheckEmail';
import ErrorBounds from "components/ErrorBounds";
import Hidden from "components/HiddenFix"
import Badge from '@material-ui/core/Badge';
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


const LoginPageModal: React.FC<ReactProps> = (props) => {

  const {
    tabIndex,
    setTabIndex,
    classes,
    className,
    buttonText = 'Login',
  } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const renderLoginTab = () => {

    if (tabIndex === 0) {
      return <SignIn
                dispatchLogin={props.dispatchLogin}
                setTabIndex={setTabIndex}
                handleToggleModal={props.handleToggleModal}
                title={props.titleLogin}
                buttonLoading={props.buttonLoading}
              />
    } else if (tabIndex === 1) {
      return <SignUp
                dispatchCreateUser={props.dispatchCreateUser}
                setTabIndex={setTabIndex}
                handleToggleModal={props.handleToggleModal}
                title={props.titleSignup}
                buttonLoading={props.buttonLoading}
              />
    } else if (tabIndex === 2) {
      return <ResetPassword
                dispatchResetPassword={props.dispatchResetPassword}
                setTabIndex={setTabIndex}
                handleToggleModal={props.handleToggleModal}
                buttonLoading={props.buttonLoading}
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
                title={props.titleLogin}
                buttonLoading={props.buttonLoading}
              />
    }
  }

  return (
    <ErrorBounds className={clsx(classes.loginRoot, props.className)}>
      <div className={classes.cssMediaQuery}>
        <Dialog
          open={props.openModal}
          onClose={props.handleToggleModal}
          // DESKTOP SCREEN SIZE ONLY
          fullScreen={
            smDown ? true : false
          } // full height
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
          {
            props.numUnclaimedOrders
            ? <Badge
                badgeContent={props.numUnclaimedOrders}
                color="secondary"
              >
                { buttonText }
              </Badge>
            : <span>
                { buttonText }
              </span>
          }
        </Button>
      </div>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  buttonText?: string;
  tabIndex: number;
  loggedIn: boolean;
  openModal: boolean;
  buttonProps?: any;
  titleLogin?: string;
  titleSignup?: string;
  numUnclaimedOrders?: number;
  className?: any;
  buttonLoading?: boolean;
  handleToggleModal(): void;
  setTabIndex(tabIndex: number): void;
  dispatchLogin(payload: { email: string, password: string }): void;
  dispatchCreateUser(payload: {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  }): void;
  dispatchResetPassword(payload: { email: string }): void;
}

export default withStyles(styles)( LoginPageModal );
