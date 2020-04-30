import * as React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { oc as option } from "ts-optchain";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// Typings
// Components
import styles from './commonStyles';
import ErrorBounds from "components/ErrorBounds";
import Or from "components/Or";
// Router
import LockIcon from "@material-ui/icons/Lock";
// Clear
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";

import GoogleLogin from 'react-google-login';
import {
  useGoogleLogin,
  useGoogleLogout,
} from 'react-google-login'
import GoogleLoginButton from "components/Icons/GoogleLoginButton";



const SignIn = (props: ReactProps) => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const { classes } = props;

  const handleClick = (event) => {
    event.preventDefault();
    props.dispatchLogin({
      email: email,
      password: password,
    });
  }

  const toSignup = () => {
    props.setTabIndex(1)
  }

  const toForgotPassword = () => {
    props.setTabIndex(2)
  }


  const GoogleSignOut = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  const onSignInGoogle = (googleUser) => {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  const responseGoogle = (response) => {
    console.log(response);
  }


  // React.useEffect(() => {
  //   if (process.browser) {
  //     if (window && window.gapi) {
  //       window.gapi.signin2.render('g-signin2', {
  //         'scope': 'https://www.googleapis.com/auth/plus.login',
  //         'width': 200,
  //         'height': 50,
  //         'longtitle': true,
  //         'theme': 'dark',
  //         'onsuccess': onSignIn2
  //       });
  //     }
  //   }
  // }, [])

  return (
    <ErrorBounds className={classes.outerContainer}>
      <div className={classes.paper}>

        <IconButton
          className={classes.clearButton}
          onClick={props.handleToggleModal}
          size="medium"
        >
          <ClearIcon/>
        </IconButton>

        <Typography className={classes.title} variant="h3">
          {
            props.title
            ? props.title
            : "Login"
          }
        </Typography>

        {/* <a href="#" onClick={onSignIn2}>On Sign In</a> */}

        <GoogleLogin
          clientId="628767016907-66h6rtfiae0jt8uojc87hf6ns1npj3uj.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={onSignInGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          // cannot style css, must override render
          render={renderProps => (
            <GoogleLoginButton
              title={"Login with Google"}
              style={{ width: 200 }}
            />
          )}
        />
        <a href="#" onClick={GoogleSignOut}>Google Sign out</a>


        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="sign-in-email">Email Address</InputLabel>
            <Input
              autoFocus
              name="sign-in-email"
              autoComplete="email"
              onChange={(e) => {
                if (option(e).target.value()) {
                  setEmail(e.target.value)
                }
              }}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">
              Password
              <LockIcon className={classes.secureCheckoutIcon}/>
            </InputLabel>

            <Input
              name="sign-in-password"
              autoComplete="password"
              type="password"
              onChange={(e) => {
                if (option(e).target.value()) {
                  setPassword(e.target.value)
                }
              }}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(event) => handleClick(event)}
          >
            Login
          </Button>
        </form>

        <div className={classes.preHeader}>
          <Typography variant="body1">
            <a onClick={toForgotPassword} className={classes.link}>
              Forgot Password?
            </a>
          </Typography>
        </div>

        <Or/>

        <Typography variant="body1">
          {"Don't have an account? "}
          <a onClick={toSignup} className={classes.link}>
            Sign up
          </a>
        </Typography>

      </div>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  setTabIndex(tabIndex: number): void;
  dispatchLogin?(payload: { email: string, password: string }): void;
  handleToggleModal?(): void;
  title?: string;
}

export default withStyles(styles)(SignIn);
