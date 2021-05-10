import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
// Typings
import styles from './commonStyles';
import ErrorBounds from "components/ErrorBounds";
import LockIcon from "@material-ui/icons/Lock";
// Clear
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
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

import dayjs from 'dayjs'
import DateFnsUtils from '@date-io/dayjs';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';




const SignUp: React.FC<ReactProps> = (props) => {

  const [state, setState] = React.useState({
    email: props.initialEmail,
    password: "",
    firstName: "",
    lastName: "",
    licenseNumber: "",
    licenseExpiry: undefined,
    licenseState: undefined,
    phoneNumber: "",
    countryCode: "",
  })

  React.useEffect(() => {
    return () => {
      // if createUser is successful, component unmounts, so reset everything.
      setState({
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
    }
  }, [])


  const handleClick = (event) => {
    event.preventDefault();
    props.dispatchCreateUser({
      email: state.email,
      password: state.password,
      firstName: state?.firstName,
      lastName: state?.lastName,
      licenseNumber: state.licenseNumber,
      licenseExpiry: state.licenseExpiry,
      licenseState: state.licenseState,
      phoneNumber: state.phoneNumber,
      countryCode: state.countryCode,
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

  const [selectedDate, setSelectedDate] = React.useState<Date>(undefined);

  const handleDateChange = (date) => {
    // console.log("incoming date:", date)
    setSelectedDate(date)
    let expiryDate = new Date(date)
    expiryDate.setHours(0)
    expiryDate.setSeconds(0)
    expiryDate.setMinutes(0)
    setState(s => ({ ...s, licenseExpiry: expiryDate }))
  };

  const { classes } = props;


  let licenseStateOptions = createLicenseStateSuggestions()
  // initial stateShape
  let initialStateLicense = undefined
  const [licenseState, setLicenseState] = React.useState(initialStateLicense)


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
            : "Create an Account"
          }
        </Typography>

        <form className={classes.form}>
          <FormControl margin="dense" fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              name="first-name"
              autoComplete="given-name"
              value={state?.firstName}
              onChange={(e) => {
                e.persist(); // for persisting synthetic events
                setState(s => ({ ...s, firstName: e?.target?.value }))
              }}
            />
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <InputLabel htmlFor="last-name">Last Name</InputLabel>
            <Input
              name="last-name"
              autoComplete="family-name"
              value={state?.lastName}
              onChange={(e) => {
                e.persist(); // for persisting synthetic events
                setState(s => ({ ...s, lastName: e?.target?.value }))
              }}
            />
          </FormControl>
          <FormControl margin="dense" required fullWidth>
            <InputLabel htmlFor="sign-up-email">Gun License Number</InputLabel>
            <Input
              name="gun-license-number"
              type={"string"}
              autoComplete="license-number"
              value={state.licenseNumber}
              onChange={(e) => {
                e.persist(); // for persisting synthetic events
                setState(s => ({ ...s, licenseNumber: e?.target?.value }))
              }}
            />
          </FormControl>
          <FormControl margin="dense" required fullWidth>
            <Typography className={classes.miniTitle}>
              License Expiry
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                autoOk={true}
                disableToolbar
                InputAdornmentProps={{
                  classes: { root: classes.dateLabel }
                }}
                variant="inline"
                format="DD/MM/YYYY"
                // margin="normal"
                id="date-picker-inline"
                label="License Expiry"
                value={selectedDate}
                maxDate={new Date("1/1/3000")}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>

          <FormControl margin="dense" required fullWidth>
            <Typography className={classes.miniTitle}>
              License State
            </Typography>
            <DropdownInput
              stateShape={initialStateLicense}
              onChange={({ label, value }: SelectOption) => {
                console.log("label: ", label)
                // set dropdown object
                setLicenseState({ label, value })
                // then set it in state
                setState(s => ({ ...s, licenseState: value }))
              }}
              value={licenseState}
              options={licenseStateOptions}
              placeholder={"Gun License State"}
              label="" // remove moving label
              className={classes.textField}
              inputProps={{ style: { width: '100%' }}}
              // errorMessage={errors.licenseState}
              // touched={touched.licenseState}
            />
          </FormControl>

          <FormControl margin="dense" required fullWidth>
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
          </FormControl>

          <FormControl margin="dense" required fullWidth>
            <InputLabel htmlFor="sign-up-email">Email Address</InputLabel>
            <Input
              name="sign-up-email"
              type={"email"}
              autoComplete="email"
              value={state.email}
              onChange={(e) => {
                e.persist(); // for persisting synthetic events
                setState(s => ({ ...s, email: e?.target?.value }))
              }}
            />
          </FormControl>
          <FormControl margin="dense" required fullWidth>
            <InputLabel htmlFor="password">
              Password
              <LockIcon className={classes.secureCheckoutIcon}/>
            </InputLabel>
            <Input
              name="sign-up-password"
              type="password"
              autoComplete={"new-password"} // this disables autofill
              onChange={(e) => {
                e.persist(); // for persisting synthetic events
                setState(s => ({ ...s, password: e?.target?.value }))
              }}
            />
          </FormControl>
          <ButtonLoading
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={(event) => handleClick(event)}
            loadingIconColor={Colors.blue}
            replaceTextWhenLoading={true}
            loading={props.buttonLoading}
            disabled={props.buttonLoading}
          >
            Create Account
          </ButtonLoading>
        </form>

        <div className={classes.preHeader}>
          <Typography variant="body1">
            {"Already have an account? "}
            <a onClick={toSignup} className={classes.link}>
              Login
            </a>
          </Typography>
        </div>

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
    licenseState: string,
    phoneNumber?: string,
    countryCode?: string,
  }): void;
  email?: string;
  handleToggleModal?(): void;
  title?: string;
  buttonLoading?: boolean;
  initialEmail?: string;
}

export default withStyles(styles)(SignUp);
