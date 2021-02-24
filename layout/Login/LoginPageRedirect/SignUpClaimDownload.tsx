import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";

import Typography from '@material-ui/core/Typography';
import TextInput from 'components/Fields/TextInput';
// Typings
import styles from './commonStylesClaimDownload';
import ErrorBounds from "components/ErrorBounds";
import Or from "components/Or";
import ButtonLoading from "components/ButtonLoading";
import { formatGunLicenseExpiry } from "../utils";
//
import {
  createLicenseCategorySuggestions,
  createLicenseStateSuggestions,
  SelectOption,
} from "layout/MySettingsModal/ChangeUserLicenseForm/licenseUtils";
import DropdownInput from "components/Fields/DropdownInput";

import dynamic from "next/dynamic";
import Loading from 'components/Loading';
const MuiPhoneNumber = dynamic(() => import("material-ui-phone-number"), {
  loading: () => <Loading/>,
  ssr: false,
})
import { formatPhoneNumber } from "layout/Login/utils";



const SignUp: React.FC<ReactProps> = (props) => {


  const [state, setState] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    licenseNumber: "",
    licenseExpiry: undefined,
    licenseState: undefined,
    phoneNumber: "",
    countryCode: "",
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
      licenseState: undefined,
      phoneNumber: "",
      countryCode: "",
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


  const handleSetPhoneNumber = (s: string) => {
    let { countryCode, number } = formatPhoneNumber(s)
    setState(s => ({
      ...s,
      phoneNumber: number,
      countryCode: countryCode
    }))
  };

  const { classes } = props;

  const [isBackspace, setIsBackspace] = React.useState(false)

  let licenseStateOptions = createLicenseStateSuggestions()
  // initial stateShape
  let initialStateLicense = licenseStateOptions
    .find(d => d.value === state.licenseState)
  const [licenseState, setLicenseState] = React.useState(initialStateLicense)

  return (
  <ErrorBounds className={classes.outerContainer}>

    <Typography className={classes.title} variant="h3">
      {
        props.title
        ? props.title
        : "Create a GM account to save your files"
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
        onKeyDown={(e) => {
          e.persist()
          if (e.keyCode === 8) {
              // if key is backspace
            // console.log("onKeyDown backspace: ", e.keyCode)
            setIsBackspace(true)
          } else {
            setIsBackspace(false)
          }
        }}
        onChange={(e) => {
          e.persist(); // for persisting synthetic events
          let value = e.target.value
          let expiry = formatGunLicenseExpiry(e.target.value)
          setState(s => ({ ...s, licenseExpiry: expiry }))
        }}
        inputProps={{ style: { width: '100%' }}}
      />

      <Typography variant="body1" className={classes.fieldHeading}>
        License State
      </Typography>
      <DropdownInput
        className={classes.textInput}
        stateShape={initialStateLicense}
        onChange={({ label, value }: SelectOption) => {
          // set dropdown object
          setLicenseState({ label, value })
          // then set it in state
          setState(s => ({ ...s, licenseState: value }))
        }}
        value={licenseState}
        options={licenseStateOptions}
        placeholder={"Gun License State"}
        label="" // remove moving label
        inputProps={{ style: { width: '100%' }}}
      />

      <div className={classes.phoneNumberContainer}>
        <Typography variant="body1" className={classes.fieldHeading}>
          Phone Number
        </Typography>
        <MuiPhoneNumber
          //@ts-ignore
          name={"phone"}
          label="Mobile number e.g: +61 433 666 777"
          // label={`${values.countryCode} ${values.phoneNumber}`}
          data-cy="user-phone"
          defaultCountry={"au"}
          onlyCountries={["au"]}
          // preferredCountries={["au"]}
          // disableCountryCode={true}
          // https://github.com/alexplumb/material-ui-phone-number
          value={`${state.countryCode} ${state.phoneNumber}`}
          onChange={handleSetPhoneNumber}
        />
      </div>

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
  dispatchCreateUser(payload: {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
    licenseNumber: string,
    licenseExpiry: Date,
  }): void;
  email?: string;
  title?: string;
  requiresFirstName?: boolean;
  requiresLastName?: boolean;
  buttonLoading?: boolean;
}

export default withStyles(styles)(SignUp);
