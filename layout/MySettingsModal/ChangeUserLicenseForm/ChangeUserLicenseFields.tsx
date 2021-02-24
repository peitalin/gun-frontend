import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Styles
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";
import TextInputUnderline from "components/Fields/TextInputUnderline";
// Typings
import { HtmlEvent, CreateStoreInput } from "typings";
// Validation
import { FormikProps } from 'formik';
// Dates
import Button from '@material-ui/core/Button';
import Loading from 'components/Loading';
import "./react-datepicker.css";
import dynamic from "next/dynamic";
const DatePicker = dynamic(() => import("react-datepicker"), {
  loading: () => <Loading/>,
  ssr: false,
})
import { formatDate, showDate } from "utils/dates";

import {
  createLicenseCategorySuggestions,
  createLicenseStateSuggestions,
  SelectOption,
} from "layout/MySettingsModal/ChangeUserLicenseForm/licenseUtils";
import DropdownInput from "components/Fields/DropdownInput";
import SelectTagsPlaceholder from 'pageComponents/ProductCreate/SSR/SelectTagsPlaceholder';
const MultiDropdownSelect = dynamic(() => import('components/Fields/MultiDropdownSelect'), {
  loading: () => <SelectTagsPlaceholder/>,
  ssr: false
})
import { createOption } from "components/Fields/MultiDropdownSelect";




const ChangeUserLicenseFields: React.FC<ReactProps & FormikProps<FormikFields>> = (props) => {

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

  // console.log("licenseExpiry: ", values.licenseExpiry)

  let licenseCategoryOptions = createLicenseCategorySuggestions()
  // initial stateShape
  let initialCategoryLicense = licenseCategoryOptions
    .find(d => d.value === fprops.values.licenseCategory)
  const [licenseCategory, setLicenseCategory] = React.useState(initialCategoryLicense)


  let licenseStateOptions = createLicenseStateSuggestions()
  // initial stateShape
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
      {
        values.licenseExpiry !== undefined &&
        <DatePicker
          // selected={values.licenseExpiry}
          // selected={
          //   values.licenseExpiry || new Date()
          // }
          selected={new Date(values.licenseExpiry)}
          onChange={expiryDate => {
            // fprops.setFieldValue("licenseExpiry", date)
            handleSetLicenseExpiry(expiryDate)
          }}
          showTimeSelect={false}
          timeFormat="HH:mm"
          timeIntervals={10}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          customInput={
            <Button className={classes.datePickButton}
              variant="outlined"
              color="primary"
            >
              { showDate(values.licenseExpiry) }
            </Button>
          }
          popperPlacement="top"
        />
      }

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
        stateShape={initialStateLicense}
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
});


export default withStyles(styles)( ChangeUserLicenseFields );

