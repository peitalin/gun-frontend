import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";

import Typography from '@material-ui/core/Typography';
// Typings
import { Cart } from "typings/gqlTypes";
// Components
import styles from './commonStylesCompact';
import ErrorBounds from "components/ErrorBounds";
import TextInput from "components/Fields/TextInput";
// Router
import LockIcon from "@material-ui/icons/Lock";
import ButtonLoading from "components/ButtonLoading";


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
        Login to your Relay Account
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
          <ButtonLoading
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(event) => handleClick(event)}
            loadingIconColor={Colors.blue}
            replaceTextWhenLoading={true}
            loading={props.buttonLoading}
            disabled={props.buttonLoading}
          >
            Login
          </ButtonLoading>
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
  buttonLoading?: boolean;
}

export default withStyles(styles)(SignInCompact);
