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

  const signOut = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  const onSignIn = (googleUser) => {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  if (isAuthenticated) {
    return (
      <>
        <a href="#" onClick={signOut}>Sign out</a>
        <a href="#" onClick={onSignIn}>On Sign In</a>
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
      </>
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