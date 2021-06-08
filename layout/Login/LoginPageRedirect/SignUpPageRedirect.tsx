import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";
import { useTheme } from "@material-ui/core";

import Typography from '@material-ui/core/Typography';
import TextInput from 'components/Fields/TextInput';
// Typings
import styles from './commonStylesPageRedirect';
import ErrorBounds from "components/ErrorBounds";
import Or from "layout/Login/Or";
import ButtonLoading from "components/ButtonLoading";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from "@material-ui/icons/Lock";
//
import {
  createLicenseCategorySuggestions,
  createLicenseStateSuggestions,
  SelectOption,
} from "layout/MySettingsModal/UserLicenses/EditUserLicenseForm/licenseUtils";
import DropdownInput from "components/Fields/DropdownInput";
import SelectTagsPlaceholder from 'pageComponents/ProductCreate/SSR/SelectTagsPlaceholder';
const MultiDropdownSelect = dynamic(() => import('components/Fields/MultiDropdownSelect'), {
  loading: () => <SelectTagsPlaceholder />,
  ssr: false
})
import { createOption } from "components/Fields/MultiDropdownSelect";

import dynamic from "next/dynamic";
import Loading from 'components/Loading';
const MuiPhoneNumber = dynamic(() => import("material-ui-phone-number"), {
  loading: () => <Loading/>,
  ssr: false,
})
import { formatPhoneNumber } from "layout/Login/utils";

import HelpIcon from "components/Icons/HelpIcon";
import Tooltip from "@material-ui/core/Tooltip"
import DateFnsUtils from '@date-io/dayjs';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';




const SignUpPageRedirect: React.FC<ReactProps> = (props) => {


  const [state, setState] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    licenseNumber: "",
    licenseExpiry: undefined,
    licenseCategory: [],
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
      licenseCategory: [] as string[],
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
      licenseCategory: state.licenseCategory.join(", "),
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

  const { classes } = props;

  const [selectedDate, setSelectedDate] = React.useState<Date>(null)
  // must be null so initial date is empty

  const handleDateChange = (date) => {
    setSelectedDate(date)
    let expiryDate = new Date(date)
    expiryDate.setHours(0)
    expiryDate.setSeconds(0)
    expiryDate.setMinutes(0)
    setState(s => ({ ...s, licenseExpiry: expiryDate }))
  };

  let licenseStateOptions = createLicenseStateSuggestions()
  let initialStateLicense = licenseStateOptions
    .find(d => d.value === state.licenseState)
  const [licenseState, setLicenseState] = React.useState(initialStateLicense)

  let licenseCategoryOptions = createLicenseCategorySuggestions(state.licenseState)

  const handleSetLicenseCategory = (options: SelectOption[]) => {
    let newCategories = (options ?? []).map(t => t.value)
    // Formik
    setState(s => ({ ...s, licenseCategory: newCategories }))
  }

  // console.log("selectedDate:", selectedDate)
  let passwordPreview = (state.password.length > 0)
    ? [...new Array(state?.password?.length - 1).keys()]
        .map(x => "*")
        .join("") + state.password.slice(-1)
    : ""

  return (
  <ErrorBounds className={classes.outerContainer}>

    <Typography className={classes.title} variant="h3">
      {
        props.title
        ? props.title
        : "Create a Gun Marketplace account"
      }
    </Typography>

    <form className={classes.form}>


      <FormControl margin="dense" fullWidth>
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

      <FormControl margin="dense" fullWidth>
        <InputLabel className={classes.labelBox} htmlFor="password">
          Password
          <LockIcon className={classes.secureCheckoutIcon} />
          { passwordPreview }
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


      <FormControl margin="dense" fullWidth>
        <div className={classes.phoneNumberContainer}>
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
          <Tooltip title={
            `We may use this number to contact you about
            your orders if we cannot reach you via email.`
          }>
            <span>
              <HelpIcon className={classes.helpIcon}/>
            </span>
          </Tooltip>
        </div>
      </FormControl>


      <Typography className={classes.miniTitle} variant={"body1"}>
        License Details
      </Typography>

      <FormControl margin="dense" fullWidth>
        <InputLabel htmlFor="name">First Name</InputLabel>
        <Input
          name="first-name"
          autoComplete="given-name"
          value={state?.firstName}
          onChange={(e) => {
            e.persist(); // for persisting synthetic events
            setState(s => ({ ...s, firstName: e?.target?.value }))
          }}
        />
        <Tooltip title={
          `Your name only be shared with the dealer for transfers.
          Please use the name on your firearm license.
          `
        }>
          <span>
            <HelpIcon className={classes.helpIcon}/>
          </span>
        </Tooltip>
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

      <FormControl margin="dense" fullWidth>
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            autoOk={true}
            disableToolbar
            autoComplete={'new-password'} // disable autoComplete
            InputAdornmentProps={{
              classes: { root: classes.dateLabel }
            }}
            inputProps={{
              className: classes.dateInput
            }}
            variant="inline"
            format="DD/MM/YYYY"
            // margin="normal"
            id="date-picker-inline"
            label="License Expiry"
            value={selectedDate}
            maxDate={new Date("1/1/3000")}
            // defaultValue={null}
            // placeholder={"License expiry"}
            // emptyLabel="License expiry *"
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </FormControl>

      <FormControl margin="dense" fullWidth>
        <DropdownInput
          initialState={initialStateLicense}
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

      <FormControl margin="dense" fullWidth>
        <MultiDropdownSelect
          // disabled={loading}
          // loading={loading}
          initialTags={
            (state.licenseCategory ?? []).map(t => createOption(t))
          }
          options={licenseCategoryOptions}
          setTags={handleSetLicenseCategory}
          disableInitialValidationMessage={true}
          // errorMessage={formik.errors?.licenseCategory?.[0]}
          // touched={formik.touched?.licenseCategory?.[0]}
        />
      </FormControl>


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
    licenseCategory: string,
    licenseState: string,
    phoneNumber?: string,
    countryCode?: string,
  }): void;
  email?: string;
  title?: string;
  requiresFirstName?: boolean;
  requiresLastName?: boolean;
  buttonLoading?: boolean;
}

export default withStyles(styles)(SignUpPageRedirect);
