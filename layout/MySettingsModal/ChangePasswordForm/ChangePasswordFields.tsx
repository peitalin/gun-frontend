import React from "react";
import { oc as option } from "ts-optchain";
import { useState } from "react";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
/// Debounce
// Styles
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";
import Divider from "components/Divider";
import Button from "@material-ui/core/Button";
import ErrorBounds from "components/ErrorBounds";
// router
import { useRouter } from "next/router";
// Typings
import { HtmlEvent, CreateStoreInput } from "typings";
// Validation
import { FormikProps } from 'formik';






const ChangePasswordFields: React.FC<ReactProps & FormikProps<FormikFields>> = (props) => {

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


  const handleSetCurrentPassword = (e: HtmlEvent) => {
    let pass = e.target.value;
    props.setCurrentPassword(pass);
    fprops.setFieldValue("currentPassword", pass)
  };

  const handleSetNewPassword = (e: HtmlEvent) => {
    let pass = e.target.value;
    props.setNewPassword(pass);
    fprops.setFieldValue("newPassword", pass)
  };

  const handleSetNewPasswordAgain = (e: HtmlEvent) => {
    let pass = e.target.value;
    props.setNewPasswordAgain(pass);
    fprops.setFieldValue("newPasswordAgain", pass)
  };


  React.useEffect(() => {
    if (props.currentPassword) {
      fprops.setFieldValue("currentPassword", props.currentPassword)
    }
    if (props.newPassword) {
      fprops.setFieldValue("newPassword", props.newPassword)
    }
    if (props.newPasswordAgain) {
      fprops.setFieldValue("newPasswordAgain", props.newPasswordAgain)
    }
    return () => {}
  }, [])


  return (
    <div className={classes.root}>
      <div className={classes.innerRoot}>
        <div className={clsx(classes.formContainer, "fadeInFast")}>

          <Typography variant="body1" className={classes.passwordTitle}>
            For security, please enter your current password.
          </Typography>
          <TextInput
            type="password"
            placeholder={"Enter your current password"}
            className={classes.textField}
            value={props.currentPassword}
            onChange={handleSetCurrentPassword}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.currentPassword}
            touched={touched.currentPassword}
          />

          <Typography variant="body1" className={classes.passwordTitle}>
            Enter your new password
          </Typography>
          <TextInput
            type="password"
            placeholder={"New password"}
            className={classes.textField}
            value={props.newPassword}
            onChange={handleSetNewPassword}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.newPassword}
            touched={touched.newPassword}
          />

          <Typography variant="body1" className={classes.passwordTitle}>
            Enter your new password again to confirm
          </Typography>
          <TextInput
            type="password"
            placeholder={"New password again"}
            className={classes.textField}
            value={props.newPasswordAgain}
            onChange={handleSetNewPasswordAgain}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.newPasswordAgain}
            touched={touched.newPasswordAgain}
          />
        </div>
      </div>

      <ErrorBounds className={classes.buttonContainer}>
        <Button
          type="submit" // this sets off Form submit
          variant={"contained"}
          color={"secondary"}
          disabled={Object.keys(errors).length > 0}
        >
          Update Password
        </Button>
      </ErrorBounds>
    </div>
  )
}

interface FormikFields {
  currentPassword: string;
  newPassword: string;
  newPasswordAgain: string;
}

interface ReactProps extends WithStyles<typeof styles> {
  currentPassword: string;
  newPassword: string;
  newPasswordAgain: string;
  setCurrentPassword(a: any): void;
  setNewPassword(a: any): void;
  setNewPasswordAgain(a: any): void;
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


export default withStyles(styles)( ChangePasswordFields );

