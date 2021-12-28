import React from 'react';
// Styles
import {
  Colors,
  isThemeDark,
  Gradients,
  BorderRadius,
  BorderRadius2x,
  BorderRadius4x,
  BoxShadows,
} from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme, alpha } from "@material-ui/core/styles";
// graphql
import { useMutation, useQuery } from '@apollo/client';
// typings
import {
  BlankMutationResponse,
  UserPrivate,
  UserMutationResponse,
} from "typings/gqlTypes";
// components
import ButtonLoading from "components/ButtonLoading";
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from "@material-ui/icons/Clear";
import Typography from "@material-ui/core/Typography";
import TextInputUnderline from "components/Fields/TextInputUnderline";
// redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Snackbar
import { useSnackbar } from "notistack";
import {
  ADD_USER_LICENSE,
} from "queries/user-mutations";
// Typings
import { HtmlEvent } from "typings";
// router
import { useRouter } from "next/router";
// Validation
import { validationSchemas } from "utils/validation";
import { useFormik } from 'formik';
import dynamic from "next/dynamic";
import {
  createLicenseCategorySuggestions,
  createLicenseStateSuggestions,
  SelectOption,
} from "layout/MySettingsModal/UserLicenses/EditUserLicenseForm/licenseUtils";
import DropdownInput from "components/Fields/DropdownInput";
import SelectTagsPlaceholder from 'pageComponents/ProductCreate/SSR/SelectTagsPlaceholder';
import MultiDropdownSelect from "components/Fields/MultiDropdownSelect";
// const MultiDropdownSelect = dynamic(() => import('components/Fields/MultiDropdownSelect'), {
//   loading: () => <SelectTagsPlaceholder />,
//   ssr: false
// })
import IconButtonCancel from 'components/IconButtonCancel';
import { createOption } from "components/Fields/MultiDropdownSelect";

import dayjs from 'dayjs'
import DateFnsUtils from '@date-io/dayjs';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';





const AddGunLicenseForm: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const snackbar = useSnackbar();
  const dispatch = useDispatch()

  interface FormikValues {
    firstName: string
    lastName: string
    licenseNumber: string
    licenseExpiry: Date
    licenseCategory: string[]
    licenseState: string
  }

  const formik = useFormik<FormikValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      licenseNumber: "",
      licenseExpiry: undefined,
      licenseCategory: [],
      licenseState: "",
    },
    validationSchema: validationSchemas.AddOrEditUserLicense,
    onSubmit: async (values) => {
      // createChat()
      snackbar.enqueueSnackbar(
        `Saving license`,
        { variant: "info" }
      )
      console.log("formik onSubmit, values: ", values)
      await addUserLicense({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          licenseNumber: values.licenseNumber,
          licenseExpiry: values.licenseExpiry,
          licenseCategory: values.licenseCategory.join(', '),
          licenseState: values.licenseState,
        }
      })
    },
  });


  const [addUserLicense, addUserLicenseResponse] = useMutation<MData, MVar>(
    ADD_USER_LICENSE, {
      variables: {
        firstName: "",
        lastName: "",
        licenseNumber: "",
        licenseExpiry: undefined,
        licenseCategory: undefined,
        licenseState: undefined,
      },
      update: (cache, { data: { addUserLicense }}) => {
        console.log("addUserLicense", addUserLicense)
        let newUser = addUserLicense?.user;
        dispatch(Actions.reduxLogin.SET_USER(newUser))
      },
      onCompleted: () => {
        snackbar.enqueueSnackbar(
          `License saved successfully.`,
          { variant: "success" }
        )
        props.closeModal()
      },
      onError: (e) => {
        snackbar.enqueueSnackbar(
          `${e}`,
          { variant: "error" }
        )
      },
  })


  let licenseCategoryOptions = createLicenseCategorySuggestions(formik.values.licenseState)
  let initialCategoryLicense = licenseCategoryOptions
    .find(d => d.value === formik?.values?.licenseCategory)

  let licenseStateOptions = createLicenseStateSuggestions()
  let initialStateLicense = licenseStateOptions
    .find(d => d.value === formik?.values?.licenseState)

  const [selectedDate, setSelectedDate] = React.useState<Date>(null)
  // must be unll so initialDate in date picker is empty
  const [licenseCategory, setLicenseCategory] = React.useState(initialCategoryLicense)
  const [licenseState, setLicenseState] = React.useState(initialStateLicense)

  const handleSetFirstName = (e: HtmlEvent) => {
    let s = e.target.value;
    console.log('s:',s)
    formik.setFieldValue("firstName", s)
    // formik.setFieldTouched('firstName')
  };

  const handleSetLastName = (e: HtmlEvent) => {
    let s = e.target.value;
    formik.setFieldValue("lastName", s)
  };

  const handleSetLicenseNumber = (e: HtmlEvent) => {
    let s = e.target.value;
    formik.setFieldValue("licenseNumber", s)
  };

  const handleSetLicenseCategory = (options: SelectOption[]) => {
    let newCategories = (options ?? []).map(t => t.value)
    formik.setFieldValue("licenseCategory", newCategories)
  }

  const handleDateChange = (date) => {
    // console.log("incoming date:", date)
    setSelectedDate(date)
    let expiryDate = new Date(date)
    // setState(s => ({ ...s, licenseExpiry: expiryDate }))
    formik.setFieldValue("licenseExpiry", expiryDate)
  };

  console.log("errors: ", formik.errors)

  if (formik) {
    return (
      <form
        onSubmit={formik.handleSubmit}
        className={classes.addUserLicenseFormRoot}
      >
        <IconButtonCancel
          className={classes.closeIcon}
          onClick={() => props.closeModal()}
        />

        <div className={classes.flexCol}>
          <Typography variant="h4" className={classes.title}>
            Add New License
          </Typography>
        </div>

        <div className={classes.flexCol}>

          <Typography variant="body1" className={classes.fieldHeading}>
            First Name
          </Typography>
          <TextInputUnderline
            type="name"
            placeholder={"First Name"}
            label="" // remove moving label
            className={classes.textField}
            classes={{
              inputUnderline: classes.textInputUnderline,
            }}
            value={formik.values.firstName}
            onChange={handleSetFirstName}
            // onChange={formik.handleChange}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={formik.errors.firstName}
            touched={formik.touched.firstName}
            validationErrorMsgStyle={{
              marginBottom: '0.25rem',
            }}
          />

          <Typography variant="body1" className={classes.fieldHeading}>
            Last Name
          </Typography>
          <TextInputUnderline
            type="name"
            placeholder={"Last Name"}
            label="" // remove moving label
            className={classes.textField}
            classes={{
              inputUnderline: classes.textInputUnderline,
            }}
            value={formik.values.lastName}
            onChange={handleSetLastName}
            // onChange={formik.handleChange}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={formik.errors.lastName}
            touched={formik.touched.lastName}
            validationErrorMsgStyle={{
              marginBottom: '0.25rem',
            }}
          />

          <Typography variant="body1" className={classes.fieldHeading}>
            License Number
          </Typography>
          <TextInputUnderline
            type="name"
            placeholder={"License Number"}
            label="" // remove moving label
            className={classes.textField}
            classes={{
              inputUnderline: classes.textInputUnderline,
            }}
            value={formik.values.licenseNumber}
            onChange={handleSetLicenseNumber}
            // onChange={formik.handleChange}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={formik.errors.licenseNumber}
            touched={formik.touched.licenseNumber}
            validationErrorMsgStyle={{
              marginBottom: '0.25rem',
            }}
          />

          <Typography variant="body1" className={classes.fieldHeading}>
            License Expiry
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <KeyboardDatePicker
              autoOk={true}
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
              placeholder={"DD/MM/YYYY"}
              maxDate={new Date("1/1/3000")}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>

          <Typography variant="body1" className={classes.fieldHeading}>
            License State
          </Typography>
          <DropdownInput
            initialState={initialStateLicense}
            onChange={({ label, value }: SelectOption) => {
              setLicenseState({ label, value })
              formik.setFieldValue("licenseState", value)
            }}
            value={licenseState}
            // disableAutocomplete={true}
            // menuPortalTarget={document?.body} // solves z-index problems
            options={licenseStateOptions}
            placeholder={"License State"}
            label="" // remove moving label
            className={classes.textField}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={formik.errors.licenseState}
            touched={formik.touched.licenseState}
          />

          <Typography variant="body1" className={classes.fieldHeading}>
            License Category
          </Typography>
          <div className={classes.dropdownSelect}>
            <MultiDropdownSelect
              // disabled={loading}
              // loading={loading}
              initialTags={
                ((formik?.values?.licenseCategory as string[]) ?? [])
                  .map(t => createOption(t))
              }
              options={licenseCategoryOptions}
              setTags={handleSetLicenseCategory}
              disableInitialValidationMessage={true}
              errorMessage={formik.errors?.licenseCategory?.[0]}
              touched={formik.touched?.licenseCategory?.[0]}
            />
          </div>
        </div>

        <ButtonLoading
          type="submit" // submits formik
          className={classes.addLicenseButton}
          style={{ }}
          variant={"contained"}
          loadingIconColor={Colors.cream}
          replaceTextWhenLoading={true}
          loading={addUserLicenseResponse?.loading}
          disabled={!process.browser || props.disabled}
          onClick={() => { }}
        >
          { 'Save this license' }
        </ButtonLoading>

      </form>
    )
  }
}




interface ReactProps extends WithStyles<typeof styles> {
  disabled?: boolean;
  closeModal(): void
}

interface MData {
  addUserLicense: UserMutationResponse
}
interface MVar {
  firstName: string
  lastName: string
  licenseNumber: string
  licenseExpiry: Date
  licenseCategory?: string
  licenseState?: string
}




const styles = (theme: Theme) => createStyles({
  addUserLicenseFormRoot: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '2rem',
    minWidth: 330,
    borderRadius: BorderRadius4x,
    background: isThemeDark(theme)
      ? Gradients.gradientUniswapDark.background
      : Gradients.gradientGrey.background,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapDarkNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '0.5rem',
    width: '100%',
  },
  title: {
    marginTop: "2rem",
    fontSize: "1.25rem",
    marginBottom: '0rem',
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  subtitle: {
    fontSize: "1rem",
    marginTop: '1rem',
    fontWeight: 600,
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyLightBlack,
  },
  addLicenseButton: {
    width: 160,
    height: 40,
    marginTop: "1rem",
    marginBottom: "1rem",
    borderRadius: BorderRadius4x,
    backgroundColor: Colors.ultramarineBlue,
    // backgroundColor: isThemeDark(theme)
    //   ? Colors.purple
    //   : Colors.ultramarineBlue,
    color: Colors.cream,
    "&:hover": {
      backgroundColor: alpha(Colors.ultramarineBlueDark, 0.9),
    }
  },
  bidInputWrapper: {
    margin: '1rem',
  },
  inputField: {
    flexGrow: 1,
    minWidth: 100,
  },
  savedSearchContainerDesktop: {
    position: "relative",
    display: 'flex',
    flexDirection: 'row',
    borderRadius: BorderRadius2x,
    padding: '0.5rem 1rem',
    marginTop: '0.5rem',
  },
  savedSearchContainerMobile: {
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    borderRadius: BorderRadius2x,
    padding: '0.5rem 1rem',
    marginTop: '0.5rem',
  },
  savedSearchBorder: {
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapMediumGrey}`
      : `1px solid ${Colors.slateGreyDarkest}`,
  },
  savedSearchBorderHighlight: {
    border: isThemeDark(theme)
      ? `1px solid ${Colors.purple}`
      : `1px solid ${Colors.ultramarineBlue}`,
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadowWhite.boxShadow
      : BoxShadows.shadow4.boxShadow,
  },
  savedSearchItemDesktop: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minWidth: 100,
    marginRight: '0.5rem',
  },
  savedSearchItemMobile: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    minWidth: 80,
    marginRight: '0.5rem',
    justifyContent: "space-between",
  },
  savedSearchItem5: {
    position: 'absolute',
    top: 'calc(50% - 16px)', // iconButton height is 32px, divide by 2
    right: '-1rem',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  boldText: {
    fontWeight: 600,
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
  },
  italicText: {
    fontStyle: 'italic',
    textAlign: "center",
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
  },
  closeIcon: {
    position: "absolute",
    right: '1rem',
    top: '1rem',
  },
  closeIconButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: '0rem',
    top: '0rem',
  },
  fieldHeading: {
    fontWeight: 600,
    lineHeight: '1.5rem',
    marginTop: '1rem',
    marginBottom: '0.1rem',
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
  textField: {
    width: "100%",
    "&:focus-within": {
      color: '#24A4FF',
    },
  },
  textInputUnderline: {
    // '& > [class*="Mui-error"]': {
    //   "&:after": {
    //     borderBottomColor: Colors.blue,
    //   }
    // }
  },
  dropdownSelect: {
    position: "relative",
  },
});


export default withStyles(styles)( AddGunLicenseForm );
