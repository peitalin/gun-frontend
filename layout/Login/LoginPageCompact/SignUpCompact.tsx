import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";

import Typography from '@material-ui/core/Typography';
import TextInput from 'components/Fields/TextInput';
// Typings
import styles from './commonStylesCompact';
import ErrorBounds from "components/ErrorBounds";
import ButtonLoading from "components/ButtonLoading";
import { formatGunLicenseExpiry } from "../utils";



const SignUp: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const [state, setState] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    licenseNumber: "",
    licenseExpiry: undefined,
  })

  const resetForm = () => {
    // if createUser is successful, component unmounts, so reset everything.
    setState(s => ({
      ...s,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      licenseNumber: "",
      licenseExpiry: undefined,
    }));
  }

  const handleClick = (event) => {
    event.preventDefault();
    props.dispatchCreateUser({
      email: state.email,
      password: state.password,
      firstName: state.firstName,
      lastName: state.lastName,
      licenseNumber: state.licenseNumber,
      licenseExpiry: state.licenseExpiry,
    });
  }

  const toSignup = () => {
    props.setTabIndex(0)
  }

  return (
  <ErrorBounds className={classes.outerContainer}>

    <Typography className={classes.title} variant="h5">
      Create an account to save your downloads
    </Typography>

    <div className={classes.form}>

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
        Gun License Number
      </Typography>
      <TextInput
        className={classes.textInput}
        required
        placeholder="Gun License Number"
        type={"string"}
        autoComplete="license-number"
        value={state.licenseNumber}
        onChange={(e) => {
          e.persist(); // for persisting synthetic events
          let value = e.target.value
          setState(s => ({ ...s, licenseNumber: value }))
        }}
        inputProps={{ style: { width: '100%' }}}
      />
      <Typography className={classes.subtitle} variant={"body1"}>
        Gun License Expiry
      </Typography>
      <TextInput
        className={classes.textInput}
        required
        placeholder="Expiry: DD/MM/YYYY"
        type={"string"}
        autoComplete="license-expiry"
        value={state.licenseExpiry}
        onChange={(e) => {
          e.persist(); // for persisting synthetic events
          let value = e.target.value
          let expiry = formatGunLicenseExpiry(e.target.value)
          setState(s => ({ ...s, licenseExpiry: expiry }))
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
        fullWidth
      >
        Create Account
      </ButtonLoading>
    </div>

    <div className={classes.preHeader}>
      <Typography variant="body1">
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
  dispatchCreateUser(payload: {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
    licenseNumber: string,
    licenseExpiry: Date,
  }): void;
  email?: string;
  requiresFirstName?: boolean;
  requiresLastName?: boolean;
  buttonLoading?: boolean;
}

export default withStyles(styles)(SignUp);
