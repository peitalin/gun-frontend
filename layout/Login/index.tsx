import React from "react";
import Button from '@material-ui/core/Button';
import { Colors } from "layout/AppTheme";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useAuth0 } from "layout/Auth0";



const Login: React.FC<ReactProps> = (props) => {

  const {
    classes
  } = props;

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (isAuthenticated) {
    return (
      <Button
        variant="text"
        color="secondary"
        className={classes.loginButton}
        onClick={() => {
          logout()
          props.callbackOnComplete()
        }}
        {...props.buttonProps}
      >
        { props.logoutTitle ? props.logoutTitle : "Logout" }
      </Button>
    )
  } else {
    return (
      <Button
        variant="text"
        color="secondary"
        className={classes.loginButton}
        onClick={() => {
          loginWithRedirect({})
          props.callbackOnComplete()
        }}
        {...props.buttonProps}
      >
        { props.loginTitle ? props.loginTitle : "Login" }
      </Button>
    )
  }
}


interface ReactProps extends WithStyles<typeof styles> {
  loginTitle?: string;
  logoutTitle?: string;
  buttonProps?: any;
  callbackOnComplete?(): void;
}


const styles = (theme: Theme) => createStyles({
  loginButton: {
  },
});


export default withStyles(styles)( Login );