import React from 'react';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";
import { useTheme } from "@material-ui/core";

import {
  ClaimItemMutationResponse
} from "typings/gqlTypes";
import Typography from '@material-ui/core/Typography';
// Typings
import styles from './commonStylesPageClaim';
import ErrorBounds from "components/ErrorBounds";
import Or from "layout/Login/Or";
import ButtonLoading from "components/ButtonLoading";
import FormControl from '@material-ui/core/FormControl';
import LockIcon from "@material-ui/icons/Lock";
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import TextInputFormControlUnderline from "components/Fields/TextInputFormControlUnderline"
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
import HelpIcon from "components/Icons/HelpIcon";
import Tooltip from "@material-ui/core/Tooltip"
import DateFnsUtils from '@date-io/dayjs';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { useDispatch } from "react-redux"
import {
  passwordPreview,
  handleGqlError,
} from "layout/Login/utils";
import { useSnackbar } from 'notistack';
import { FormikProps } from 'formik';
import { FormikFieldsSignUp } from "."
// phone
import Loading from 'components/Loading';
const MuiPhoneNumber = dynamic(() => import("material-ui-phone-number"), {
  loading: () => <Loading/>,
  ssr: false,
})
import { formatPhoneNumber } from "layout/Login/utils";



const SignUpPageClaim: React.FC<ReactProps> = (props) => {

  const {
    classes,
    formikSignUp,
  } = props;

  const toSignup = () => {
    props.setTabIndex(0)
  }

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date)
      let expiryDate = new Date(date)
      expiryDate.setHours(0)
      expiryDate.setSeconds(0)
      expiryDate.setMinutes(0)
      formikSignUp.setFieldValue("licenseExpiry", expiryDate)
    } else {
      formikSignUp.setFieldValue("licenseExpiry", null)
    }
  };


  const handleSetPhoneNumber = (s: string) => {
    let { countryCode, number } = formatPhoneNumber(s)
    formikSignUp.setFieldValue("phoneNumber", number)
    formikSignUp.setFieldValue("countryCode", countryCode)
  };


  let licenseStateOptions = createLicenseStateSuggestions()
  let initialStateLicense = licenseStateOptions
    .find(d => d.value === formikSignUp?.values.licenseState)


  // local state for UI
  const [licenseState, setLicenseState] = React.useState(initialStateLicense)
  const [licenseCategory, setLicenseCategory] = React.useState([])
  const [selectedDate, setSelectedDate] = React.useState<Date>(null)
  // must be null so initial date is empty

  React.useEffect(() => {
    formikSignUp.setFieldValue("licenseState", initialStateLicense)
  }, [])

  // create license categories based on state
  let licenseCategoryOptions = createLicenseCategorySuggestions(
    formikSignUp?.values.licenseState
  )

  const handleSetLicenseCategory = (options: SelectOption[]) => {
    let newCategories: string[] = (options ?? []).map(t => t.value)
    // Formik
    setLicenseCategory(newCategories)
    formikSignUp.setFieldValue('licenseCategory', newCategories)
  }



  return (
  <ErrorBounds className={classes.outerContainer}>

    <Typography className={classes.title} variant="h3">
      {
        props.title
        ? props.title
        : "Create a Gun Marketplace account"
      }
    </Typography>

    <div className={classes.form}>

      <TextInputFormControlUnderline
        name="sign-up-email"
        type={"email"}
        inputLabel={"Email Address"}
        autoComplete="email"
        value={formikSignUp.values.email}
        onChange={(e) => {
          e.persist(); // for persisting synthetic events
          formikSignUp.setFieldValue("email", e?.target?.value)
          if (!formikSignUp.touched?.email) {
            formikSignUp.setFieldTouched("email")
          }
        }}
        errorMessage={formikSignUp.errors?.email}
        touched={formikSignUp.touched?.email}
        validationErrorMsgStyle={{ marginBottom: '0.25rem' }}
        disableInitialValidationMessage={true}
      />

      <TextInputFormControlUnderline
        name="sign-up-password"
        type="password"
        inputLabel={"Password"}
        autoComplete={"new-password"} // this disables autofill
        value={formikSignUp.values.password}
        onChange={(e) => {
          e.persist(); // for persisting synthetic events
          formikSignUp.setFieldValue("password", e?.target?.value)
          if (!formikSignUp.touched?.password) {
            formikSignUp.setFieldTouched("password")
          }
        }}
        errorMessage={formikSignUp.errors?.password}
        touched={formikSignUp.touched?.password}
        validationErrorMsgStyle={{ marginBottom: '0.25rem' }}
        disableInitialValidationMessage={true}
      />


      <Typography className={classes.miniTitle} variant={"body1"}>
        License Details
      </Typography>


      <TextInputFormControlUnderline
        name="first-name"
        autoComplete="given-name"
        inputLabel={"First Name"}
        value={formikSignUp.values.firstName}
        onChange={(e) => {
          e.persist(); // for persisting synthetic events
          formikSignUp.setFieldValue("firstName", e?.target?.value)
          if (!formikSignUp.touched?.firstName) {
            formikSignUp.setFieldTouched("firstName")
          }
        }}
        errorMessage={formikSignUp.errors?.firstName}
        touched={formikSignUp.touched?.firstName}
        validationErrorMsgStyle={{ marginBottom: '0.25rem' }}
        disableInitialValidationMessage={true}
      >
        <Tooltip title={
          `Please use the name on your firearm license.
          By law, we have to display license numbers on all listings
          `
        }>
          <span>
            <HelpIcon className={classes.helpIcon}/>
          </span>
        </Tooltip>
      </TextInputFormControlUnderline>


      <TextInputFormControlUnderline
        name="last-name"
        autoComplete="family-name"
        inputLabel={"Last Name"}
        value={formikSignUp.values.lastName}
        onChange={(e) => {
          e.persist(); // for persisting synthetic events
          formikSignUp.setFieldValue("lastName", e?.target?.value)
          if (!formikSignUp.touched?.lastName) {
            formikSignUp.setFieldTouched("lastName")
          }
        }}
        errorMessage={formikSignUp.errors?.lastName}
        touched={formikSignUp.touched?.lastName}
        validationErrorMsgStyle={{ marginBottom: '0.25rem' }}
        disableInitialValidationMessage={true}
      />


      <TextInputFormControlUnderline
        name="gun-license-number"
        type={"string"}
        inputLabel={"Gun License Number"}
        autoComplete="license-number"
        value={formikSignUp.values.licenseNumber}
        onChange={(e) => {
          e.persist(); // for persisting synthetic events
          formikSignUp.setFieldValue("licenseNumber", e?.target?.value)
          if (!formikSignUp.touched?.licenseNumber) {
            formikSignUp.setFieldTouched("licenseNumber")
          }
        }}
        errorMessage={formikSignUp.errors?.licenseNumber}
        touched={formikSignUp.touched?.licenseNumber}
        validationErrorMsgStyle={{ marginBottom: '0.25rem' }}
        disableInitialValidationMessage={true}
      />


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
        {
          formikSignUp.errors?.licenseExpiry &&
          <div className={classes.positionRelative}>
            <ValidationErrorMsg
              touched={formikSignUp?.touched?.licenseExpiry}
              // focused={focused}
              errorMessage={formikSignUp.errors?.licenseExpiry}
              style={{ marginBottom: '0.25rem' }}
              disableInitialValidationMessage={true}
            />
          </div>
        }
      </FormControl>

      <FormControl margin="dense" fullWidth>
        <DropdownInput
          className={classes.dropdownMargin}
          initialState={initialStateLicense}
          onChange={({ label, value }: SelectOption) => {
            console.log("label: ", label)
            // set dropdown object
            setLicenseState({ label, value })
            // then set it in state
            formikSignUp.setFieldValue("licenseState", value)
          }}
          value={licenseState}
          options={licenseStateOptions}
          placeholder={"Gun License State"}
          label="" // remove moving label
          inputProps={{ style: { width: '100%' }}}
          errorMessage={formikSignUp.errors.licenseState}
          touched={formikSignUp.touched.licenseState}
          validationErrorMsgStyle={{ marginBottom: '-1rem' }}
          disableInitialValidationMessage={true}
        />
      </FormControl>

      <FormControl margin="dense" fullWidth>
        <MultiDropdownSelect
          className={classes.dropdownMarginCategory}
          // disabled={loading}
          // loading={loading}
          initialTags={
            // (formikSignUp.values.licenseCategory ?? []).map(t => createOption(t))
            licenseCategory.map(t => createOption(t))
          }
          options={licenseCategoryOptions}
          setTags={handleSetLicenseCategory}
          errorMessage={formikSignUp.errors?.licenseCategory}
          touched={formikSignUp.touched?.licenseCategory}
          validationErrorMsgStyle={{ marginBottom: '-0.9rem' }}
          disableInitialValidationMessage={true}
        />
      </FormControl>

      <FormControl margin="dense" fullWidth>
        <div className={classes.phoneNumberContainer}>
          <MuiPhoneNumber
            //@ts-ignore
            name={"phone"}
            label="Mobile number e.g: +61 333 666 777"
            // label={`${values.countryCode} ${values.phoneNumber}`}
            data-cy="user-phone"
            defaultCountry={"au"}
            onlyCountries={["au"]}
            countryCodeEditable={false}
            // preferredCountries={["au"]}
            // disableCountryCode={true}
            // https://github.com/alexplumb/material-ui-phone-number
            value={`${formikSignUp.values.countryCode} ${formikSignUp.values.phoneNumber}`}
            onChange={handleSetPhoneNumber}
          />
          <Tooltip title={
            `Optional - Make it easier for buyers to contact you.
             We may use this number to contact you about your orders`
          }>
            <span>
              <HelpIcon className={classes.helpIcon}/>
            </span>
          </Tooltip>
        </div>
      </FormControl>

      <ButtonLoading
        type="submit" // dispatch form onSubmit
        variant="contained"
        color="secondary"
        className={classes.submitButton}
        loadingIconColor={Colors.blue}
        replaceTextWhenLoading={true}
        loading={props.loading}
        disabled={props.loading}
        // onClick={(e) => {
        //   e.preventDefault()
        // }}
        fullWidth
      >
        Sign Up and Claim Listing
      </ButtonLoading>
      {/* <Typography variant="caption" className={classes.termsText}>
        By signing up, I agree to the Terms of Service and Privacy Policy.
      </Typography> */}
    </div>

    <Or style={{ margin: '0.5rem 0rem' }}/>

    <div className={classes.preHeader}>
      <Typography variant="body1" className={classes.alreadyHaveAccountText}>
        {"Already have an account? "}
        <a onClick={toSignup} className={classes.link}>
          Login and Claim
        </a>
      </Typography>
    </div>

  </ErrorBounds>
  )
};

interface ReactProps extends WithStyles<typeof styles> {
  claimId: string
  setTabIndex(tabIndex: number): void;
  title?: React.ReactNode;
  formikSignUp: FormikProps<FormikFieldsSignUp>
  loading: boolean
}

export default withStyles(styles)(SignUpPageClaim);
