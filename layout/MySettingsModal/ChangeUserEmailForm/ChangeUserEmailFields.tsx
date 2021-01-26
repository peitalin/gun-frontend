import React from "react";
import { oc as option } from "ts-optchain";
import { useState } from "react";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Styles
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";
// Typings
import { HtmlEvent, CreateStoreInput } from "typings";
// Validation
import { FormikProps } from 'formik';
import MuiPhoneNumber from "material-ui-phone-number";






const ChangeUserEmailFields: React.FC<ReactProps & FormikProps<FormikFields>> = (props) => {

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

  const handleSetPhoneNumber = (e: HtmlEvent) => {
    console.log("e::::", e)
    fprops.setFieldValue("phoneNumber", e)
  };


  return (
    <div className={classes.root}>
      <div className={classes.innerRoot}>
        <div className={clsx(classes.formContainer, "fadeInFast")}>

          <Typography variant="body1" className={classes.passwordTitle}>
            Name
          </Typography>
          <TextInput
            type="name"
            placeholder={"Name"}
            className={classes.textField}
            value={values.firstName}
            onChange={handleSetFirstName}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.firstName}
            touched={touched.firstName}
          />

          <Typography variant="body1" className={classes.passwordTitle}>
            Lastname
          </Typography>
          <TextInput
            type="surname"
            placeholder={"Last Name"}
            className={classes.textField}
            value={values.lastName}
            onChange={handleSetLastName}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.lastName}
            touched={touched.lastName}
          />

          <Typography variant="body1" className={classes.passwordTitle}>
            Email
          </Typography>
          <TextInput
            type="email"
            placeholder={"email"}
            className={classes.textField}
            value={values.email}
            onChange={handleSetEmail}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.email}
            touched={touched.email}
          />

          <Typography variant="body1" className={classes.passwordTitle}>
            Mobile Number
          </Typography>
          <MuiPhoneNumber
            name="phone"
            label="e.g. +61 433 666 777"
            data-cy="user-phone"
            defaultCountry={"au"}
            onlyCountries={["au"]}
            // preferredCountries={["au"]}
            // disableCountryCode={true}
            // https://github.com/alexplumb/material-ui-phone-number
            value={values.phoneNumber}
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
    marginBottom: '0.5rem',
    color: "#2484FF",
  },
  passwordTitle: {
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


export default withStyles(styles)( ChangeUserEmailFields );

