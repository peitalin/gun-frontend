import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// Components
import styles from './commonStylesCompact';
import ErrorBounds from "components/ErrorBounds";
import TextInput from "components/Fields/TextInput";
// Router
import LockIcon from "@material-ui/icons/Lock";


const SignInCompact = (props: ReactProps) => {

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

      <Typography className={classes.title} variant="h5">
        Login to your Gun Marketplace Account
      </Typography>

      <div className={classes.form}>

        <Typography className={classes.subtitle} variant={"body1"}>
          Email
        </Typography>
        <TextInput
          className={classes.textInput}
          required
          type={"email"}
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
          <Typography variant="body1">
            <a onClick={toForgotPassword} className={classes.link}>
              Forgot Password?
            </a>
          </Typography>
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
      </div>


      <div className={classes.preHeader}>
        <Typography variant="body1">
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
}

export default withStyles(styles)(SignInCompact);
