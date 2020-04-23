import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextInput from 'components/Fields/TextInput';
// Typings
import styles from './commonStylesClaimDownload';
import ErrorBounds from "components/ErrorBounds";
import Or from "components/Or";



const SignUp: React.FC<ReactProps> = (props) => {


  const { classes } = props;

  const [state, setState] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })

  const resetForm = () => {
    // if createUser is successful, component unmounts, so reset everything.
    setState(s => ({
      ...s,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    }));
  }

  const handleClick = (event) => {
    event.preventDefault();
    props.dispatchCreateUser({
      email: state.email,
      password: state.password,
      firstName: state.firstName,
      lastName: state.lastName,
    });
  }

  const toSignup = () => {
    props.setTabIndex(0)
  }

  return (
  <ErrorBounds className={classes.outerContainer}>

    <Typography className={classes.title} variant="h3">
      {
        props.title
        ? props.title
        : "Create a Gun Marketplace account to save your files"
      }
    </Typography>

    <form className={classes.form}>

      <Typography className={classes.subtitle} variant={"body1"}>
        First Name
      </Typography>
      <TextInput
        className={classes.textInput}
        required
        type={"text"}
        placeholder="Name"
        autoComplete="given-name"
        value={state.firstName}
        onChange={(e) => {
          e.persist(); // for persisting synthetic events
          let value = e.target.value
          setState(s => ({ ...s, firstName: value }))
        }}
        inputProps={{ style: { width: '100%' }}}
      />

      <Typography className={classes.subtitle} variant={"body1"}>
        Surname
      </Typography>
      <TextInput
        className={classes.textInput}
        required
        type={"text"}
        placeholder="Surname"
        autoComplete="family-name"
        value={state.lastName}
        onChange={(e) => {
          e.persist(); // for persisting synthetic events
          let value = e.target.value
          setState(s => ({ ...s, lastName: value }))
        }}
        inputProps={{ style: { width: '100%' }}}
      />

      <Typography className={classes.subtitle} variant={"body1"}>
        Email
      </Typography>
      <TextInput
        className={classes.textInput}
        required
        type={"email"}
        placeholder="Email"
        autoComplete="email"
        value={state.email}
        onChange={(e) => {
          e.persist(); // for persisting synthetic events
          let value = e.target.value
          setState(s => ({ ...s, email: value }))
        }}
        inputProps={{ style: { width: '100%' }}}
      />

      <Typography className={classes.subtitle} variant={"body1"}>
        Password
      </Typography>
      <TextInput
        className={classes.textInput}
        required
        type={"password"}
        placeholder="Password"
        value={state.password}
        onChange={(e) => {
          e.persist(); // for persisting synthetic events
          let value = e.target.value // set to value, since setState is async
          setState(s => ({ ...s, password: value }))
        }}
        inputProps={{ style: { width: '100%' }}}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        className={classes.submit}
        onClick={(event) => handleClick(event)}
      >
        Create Account
      </Button>
      {/* <Typography variant="caption" className={classes.termsText}>
        By signing up, I agree to the Terms of Service and Privacy Policy.
      </Typography> */}
    </form>

    <Or style={{ margin: '0.5rem 0rem' }}/>

    <div className={classes.preHeader}>
      <Typography variant="body1" className={classes.alreadyHaveAccountText}>
        {"Already have an account? "}
        <a onClick={toSignup} className={classes.link}>
          Login
        </a>
      </Typography>
    </div>

  </ErrorBounds>
  )
};

interface ReactProps extends WithStyles<typeof styles> {
  setTabIndex(tabIndex: number): void;
  dispatchCreateUser?(payload: any): void;
  email?: string;
  title?: string;
  requiresFirstName?: boolean;
  requiresLastName?: boolean;
}

export default withStyles(styles)(SignUp);
