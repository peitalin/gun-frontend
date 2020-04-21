import React from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// Typings
// Components
import styles from './commonStylesClaimDownload';
import ErrorBounds from "components/ErrorBounds";
import TextInput from "components/Fields/TextInput";
// Router
import LockIcon from "@material-ui/icons/Lock";
import Or from "components/Or";



const SignInClaimDownload = (props: ReactProps) => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [surname, setSurname] = React.useState("");

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

  return (
    <ErrorBounds className={classes.outerContainer}>

      <Typography className={classes.title} variant="h3">
        {
          props.title
          ? props.title
          : "Login to save the files to your account"
        }
      </Typography>

      <form className={classes.form}>

        <Typography className={classes.subtitle} variant={"body1"}>
          Email
        </Typography>
        <TextInput
          className={classes.textInput}
          required
          type={"email"}
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputProps={{ style: { width: '100%' }}}
        />

        <Typography className={classes.subtitle} variant={"body1"}>
          Password
        </Typography>
        <TextInput
          className={classes.textInput}
          required
          type={"password"}
          autoComplete="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          inputProps={{ style: { width: '100%' }}}
        />

        <div className={classes.flexRowEnd}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(event) => handleClick(event)}
          >
            Login
          </Button>
        </div>
      </form>

      <div className={clsx(classes.preHeader, classes.marginTop1)}>
        <Typography variant="body1" className={classes.alreadyHaveAccountText}>
          <a onClick={toForgotPassword} className={classes.link}>
            Forgot Password?
          </a>
        </Typography>
      </div>

      <Or style={{ margin: '0.5rem 0rem' }}/>

      <div className={classes.preHeader}>
        <Typography variant="body1" className={classes.alreadyHaveAccountText}>
          {"Don't have an account? "}
          <a onClick={toSignup} className={classes.link}>
            Create Free Account
          </a>
        </Typography>
      </div>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  setTabIndex(tabIndex: number): void;
  dispatchLogin?(payload: any): void;
  title?: string;
}

export default withStyles(styles)(SignInClaimDownload);
