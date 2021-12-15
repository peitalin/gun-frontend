import React from "react";
import clsx from "clsx";
import { Colors, isThemeDark } from "layout/AppTheme";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// Material UI
import Typography from "@mui/material/Typography";
import TextInputUnderline from "components/Fields/TextInputUnderline";
// Typings
import { HtmlEvent, CreateStoreInput } from "typings";
// Validation
import { FormikProps } from 'formik';
// Dates
import Button from '@mui/material/Button';
import Loading from 'components/Loading';
import dynamic from "next/dynamic";


import {
  createLicenseCategorySuggestions,
  createLicenseStateSuggestions,
  SelectOption,
} from "layout/MySettingsModal/UserLicenses/EditUserLicenseForm/licenseUtils";
import DropdownInput from "components/Fields/DropdownInput";
import SelectTagsPlaceholder from 'pageComponents/ProductCreate/SSR/SelectTagsPlaceholder';
const MultiDropdownSelect = dynamic(() => import('components/Fields/MultiDropdownSelect'), {
  loading: () => <SelectTagsPlaceholder/>,
  ssr: false
})
import { createOption } from "components/Fields/MultiDropdownSelect";

import dayjs from 'dayjs'
import DateFnsUtils from '@date-io/dayjs';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';





const EditUserLicenseFields: React.FC<ReactProps & FormikProps<FormikFields>> = (props) => {

  const {
    classes,
    ...fprops
  } = props;
  // Formik props
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = fprops;


  const handleSetLicenseNumber = (e: HtmlEvent) => {
    let s = e.target.value;
    fprops.setFieldValue("licenseNumber", s)
  };

  const handleSetLicenseExpiry = (d: Date) => {
    fprops.setFieldValue("licenseExpiry", d)
  };

  const handleSetLicenseCategory = (options: SelectOption[]) => {
    let newCategories = (options ?? []).map(t => t.value)
    // Formik
    fprops.setFieldValue("licenseCategory", newCategories)
    fprops.setFieldTouched("licenseCategory", true)
    props.validateForm()
  }

  const [selectedDate, setSelectedDate] = React.useState<Date>(
    new Date()
  );

  const handleDateChange = (date) => {
    // console.log("incoming date:", date)
    setSelectedDate(date)
    let expiryDate = new Date(date)
    // setState(s => ({ ...s, licenseExpiry: expiryDate }))
    fprops.setFieldValue("licenseExpiry", expiryDate)
  };

  // console.log("licenseExpiry: ", values.licenseExpiry)

  let licenseCategoryOptions = createLicenseCategorySuggestions(fprops.values.licenseState)
  // initial initialState
  let initialCategoryLicense = licenseCategoryOptions
    .find(d => d.value === fprops.values.licenseCategory)
  const [licenseCategory, setLicenseCategory] = React.useState(initialCategoryLicense)


  let licenseStateOptions = createLicenseStateSuggestions()
  // initial initialState
  let initialStateLicense = licenseStateOptions
    .find(d => d.value === fprops.values.licenseState)
  const [licenseState, setLicenseState] = React.useState(initialStateLicense)

  // console.log("licenseCategoryOptions: ", licenseCategoryOptions);
  console.log("fprops.values.licenseCategory: ", fprops.values.licenseCategory);
  // console.log("licenseState: ", licenseState);
  // console.log("fprops.values.licenseState: ", fprops.values.licenseState);

  return (
    <>
      <Typography variant="body1" className={classes.fieldHeading}>
        License Number
      </Typography>
      <TextInputUnderline
        type="name"
        placeholder={"License Number"}
        label="" // remove moving label
        className={classes.textField}
        value={values.licenseNumber}
        onChange={handleSetLicenseNumber}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={errors.licenseNumber}
        touched={touched.licenseNumber}
      />

      <Typography variant="body1" className={classes.fieldHeading}>
        License Expiry
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar={true}
          InputAdornmentProps={{
            classes: { root: classes.dateLabel }
          }}
          variant="inline"
          format="DD/MM/YYYY"
          // margin="normal"
          id="date-picker-inline"
          // label="License Expiry"
          value={selectedDate}
          onChange={handleDateChange}
          maxDate={new Date("1/1/3000")}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>

      <Typography variant="body1" className={classes.fieldHeading}>
        License Category
      </Typography>
      <MultiDropdownSelect
        // disabled={loading}
        // loading={loading}
        initialTags={
          ((fprops.values?.licenseCategory as string[]) ?? [])
            .map(t => createOption(t))
        }
        options={licenseCategoryOptions}
        setTags={handleSetLicenseCategory}
        disableInitialValidationMessage={true}
        limit={{
          count: (fprops?.values?.licenseCategory ?? []).length,
          max: 10,
        }}
        errorMessage={errors?.licenseCategory?.[0]}
        touched={touched?.licenseCategory?.[0]}
      />

      <Typography variant="body1" className={classes.fieldHeading}>
        License State
      </Typography>
      <DropdownInput
        initialState={initialStateLicense}
        onChange={({ label, value }: SelectOption) => {
          setLicenseState({ label, value })
          fprops.setFieldValue("licenseState", value)
        }}
        value={licenseState}
        options={licenseStateOptions}
        placeholder={"License State"}
        label="" // remove moving label
        className={classes.textField}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={errors.licenseState}
        touched={touched.licenseState}
      />

    </>
  )
}


interface FormikFields {
  licenseNumber: string
  licenseExpiry: Date
  licenseCategory: string[]
  licenseState: string
}

interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  button: {
    padding: '0.5rem 1rem',
    height: 40,
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textField: {
    width: "100%",
    "&:focus-within": {
      color: '#24A4FF',
    },
  },
  greyText: {
    color: Colors.mediumGrey,
  },
  redText: {
    color: Colors.lightRed,
  },
  showPasswordChanger: {
    color: "#2484FF",
  },
  fieldHeading: {
    fontWeight: 600,
    lineHeight: '1.5rem',
    marginTop: '1rem',
    marginBottom: '0.1rem',
  },
  displaySomePasswordForm: {
    height: 330, // password change form is 330 high.
    // must define set height for height animation
    opacity: 1,
    transition: theme.transitions.create(['height', 'opacity'], {
      easing: theme.transitions.easing.easeIn,
      duration: 200,
    })
  },
  displayNone: {
    opacity: 0,
    height: 0,
    pointerEvents: 'none',
    transition: theme.transitions.create(['height', 'opacity'], {
      easing: theme.transitions.easing.easeIn,
      duration: 200,
    })
  },
  datePickButton: {
    // width: "150px",
    width: "100%",
  },
  saveButton: {
    width: 200,
    height: 40,
  },
  dateLabel: {
    "& button > span > svg": {
      fill: isThemeDark(theme)
        ? Colors.uniswapLightGrey
        : Colors.slateGreyBlack,
      "&:hover": {
        fill: isThemeDark(theme)
          ? Colors.ultramarineBlue
          : Colors.ultramarineBlue,
      }
    }
  },
});


export default withStyles(styles)( EditUserLicenseFields );

