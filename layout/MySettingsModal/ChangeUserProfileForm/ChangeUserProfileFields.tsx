import React from "react";
import { oc as option } from "ts-optchain";
import { useState } from "react";
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
import dynamic from "next/dynamic";
import Loading from 'components/Loading';
const MuiPhoneNumber = dynamic(() => import("material-ui-phone-number"), {
  loading: () => <Loading/>,
  ssr: false,
})
import { formatPhoneNumber } from "layout/Login/utils";





const ChangeUserProfileFields: React.FC<ReactProps & FormikProps<FormikFields>> = (props) => {

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


  const handleSetFirstName = (e: HtmlEvent) => {
    let s = e.target.value;
    fprops.setFieldValue("firstName", s)
  };

  const handleSetLastName = (e: HtmlEvent) => {
    let s = e.target.value;
    fprops.setFieldValue("lastName", s)
  };

  const handleSetEmail = (e: HtmlEvent) => {
    let s = e.target.value;
    fprops.setFieldValue("email", s)
  };

  const handleSetPhoneNumber = (s: string) => {
    let { countryCode, number } = formatPhoneNumber(s)
    fprops.setFieldValue("phoneNumber", number)
    fprops.setFieldValue("countryCode", countryCode)
  };

  return (
    <div className={classes.root}>
      <div className={classes.innerRoot}>
        <div className={clsx(classes.formContainer, "fadeInFast")}>

          <Typography variant="body1" className={classes.fieldHeading}>
            Name
          </Typography>
          <TextInputUnderline
            type="name"
            placeholder={"Name"}
            label="" // remove moving label
            className={classes.textField}
            value={values.firstName}
            onChange={handleSetFirstName}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.firstName}
            touched={touched.firstName}
          />

          <Typography variant="body1" className={classes.fieldHeading}>
            Last Name
          </Typography>
          <TextInputUnderline
            type="surname"
            placeholder={"Last Name"}
            label="" // remove moving label
            className={classes.textField}
            value={values.lastName}
            onChange={handleSetLastName}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.lastName}
            touched={touched.lastName}
          />

          <Typography variant="body1" className={classes.fieldHeading}>
            Email
          </Typography>
          <TextInputUnderline
            type="email"
            placeholder={"email"}
            label="" // remove moving label
            className={classes.textField}
            value={values.email}
            onChange={handleSetEmail}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.email}
            touched={touched.email}
          />

          <Typography variant="body1" className={classes.fieldHeading}>
            Mobile Number
          </Typography>
          <MuiPhoneNumber
            //@ts-ignore
            name={"phone"}
            label="e.g. +61 433 666 777"
            // label={`${values.countryCode} ${values.phoneNumber}`}
            data-cy="user-phone"
            defaultCountry={"au"}
            onlyCountries={["au"]}
            // preferredCountries={["au"]}
            // disableCountryCode={true}
            // https://github.com/alexplumb/material-ui-phone-number
            value={`${values.countryCode} ${values.phoneNumber}`}
            onChange={handleSetPhoneNumber}
          />

        </div>
      </div>
    </div>
  )
}

interface FormikFields {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  countryCode?: string;
}

interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  innerRoot: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
  },
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
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: "0.5rem",
    width: '100%',
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
      duration: 100,
    })
  },
  displayNone: {
    opacity: 0,
    height: 0,
    pointerEvents: 'none',
    transition: theme.transitions.create(['height', 'opacity'], {
      easing: theme.transitions.easing.easeIn,
      duration: 100,
    })
  },
});


export default withStyles(styles)( ChangeUserProfileFields );

