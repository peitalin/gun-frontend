import React from 'react';
import { withStyles, WithStyles, fade } from '@material-ui/core/styles';
import { Colors } from 'layout/AppTheme';
import clsx from "clsx";

import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';

import styles from './commonStyles';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ResetPassword from './ResetPassword';
import CheckEmail from './CheckEmail';
import ErrorBounds from "components/ErrorBounds";
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from "@material-ui/core/Typography";
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
    buttonType = 'default',
  } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [prefillEmail, setPrefillEmail] = React.useState(undefined);


  const renderLoginTab = () => {

    if (tabIndex === 0) {
      return <SignIn
                dispatchLogin={props.dispatchLogin}
                setTabIndex={setTabIndex}
                handleToggleModal={props.handleToggleModal}
                title={props.titleLogin}
                buttonLoading={props.buttonLoading}
                initialEmail={prefillEmail}
              />
    } else if (tabIndex === 1) {
      return <SignUp
                dispatchCreateUser={props.dispatchCreateUser}
                setTabIndex={setTabIndex}
                handleToggleModal={props.handleToggleModal}
                title={props.titleSignup}
                buttonLoading={props.buttonLoading}
                initialEmail={prefillEmail}
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
              initialEmail={prefillEmail}
            />
    }
  }


  const renderButton = () => {
    if (!buttonType || buttonType === 'default') {
      return (
        <Button
          variant="text"
          color="secondary"
          className={clsx(
            classes.loginButton,
            classes.maxWidthEmailPrefillButton,
            props.className,
          )}
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
      )
    }
    if (buttonType === "menuItem") {
      return (
        <MenuItem
          className={clsx(
            classes.mobileMenuFlexitem,
            classes.mobileMenuItemRoot,
            props.className,
          )}
          onClick={() => {
            props.handleToggleModal()
          }}
        >
          {
            props.numUnclaimedOrders
            ? <Badge
                badgeContent={props.numUnclaimedOrders}
                color="secondary"
              >
                <Typography className={props.menuItemTextClassName}>
                  { buttonText }
                </Typography>
              </Badge>
            : <Typography className={props.menuItemTextClassName}>
                { buttonText }
              </Typography>
          }
        </MenuItem>
      )
    }
    if (buttonType === "textField") {
      return (
        <div className={classes.emailPrefillFlexCol}>
          <TextField
            variant="outlined"
            value={prefillEmail}
            onChange={(e) => setPrefillEmail(e.target.value)}
            placeholder={"Enter your email address"}
            classes={{
              root: classes.textInputRoot,
            }}
            inputProps={{
              className: classes.textInputInput,
              focused: classes.textFocused,
            }}
          />
          <Button
            variant="text"
            color="secondary"
            onClick={props.handleToggleModal}
            className={clsx(
              classes.loginButton,
              classes.maxWidthEmailPrefillButton,
              props.className,
            )}
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
      )
    }

  }

  return (
    <ErrorBounds className={clsx(classes.loginRoot)}>
      <div className={classes.cssMediaQuery}>
        <Dialog
          open={props.openModal}
          onClose={props.handleToggleModal}
          // DESKTOP SCREEN SIZE ONLY
          fullScreen={
            smDown ? true : false
          } // full height
          fullWidth={false}
          scroll={"body"}
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

        { renderButton() }

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
  buttonType?: "menuItem" | "textField" | "default";
  menuItemTextClassName?: any;
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
