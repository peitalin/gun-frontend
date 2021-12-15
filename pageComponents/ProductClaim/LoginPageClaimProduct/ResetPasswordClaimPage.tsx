import React from 'react';
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import { Colors } from "layout/AppTheme";
import { SendResetPasswordResponse } from "typings/gqlTypes"

import TextInput from "components/Fields/TextInput";
import Typography from '@mui/material/Typography';
// Components
import styles from './commonStylesPageClaim';
import ErrorBounds from "components/ErrorBounds";
// Clear
import ButtonLoading from "components/ButtonLoading";
import { SEND_RESET_PASSWORD_EMAIL } from "queries/emails-mutations";
import { useMutation } from "@apollo/client"
import { useSnackbar } from 'notistack';
import {
  handleGqlError,
} from "layout/Login/utils";
// error
import { FormikProps } from 'formik';
import { FormikFieldsResetPassword } from "."



const ResetPasswordClaimPage = (props: ReactProps) => {

  const {
    classes,
    formikResetPassword,
  } = props;

  const snackbar = useSnackbar()

  let [
    sendResetPasswordEmail,
    { loading }
  ] = useMutation<MData3, MVar3>(
    SEND_RESET_PASSWORD_EMAIL, {
    variables: {
      email: formikResetPassword.values?.email,
    },
    onCompleted: (data) => {
      console.log('data,', data)
      let emailSentTo = data?.sendResetPasswordEmail?.emailSentTo
      if (emailSentTo) {
        snackbar.enqueueSnackbar(`Sent to: ${emailSentTo}`, {
          variant: "success",
          autoHideDuration: 5000,
        })

        setTimeout(() => {
          props.setTabIndex(3) // check email page
        }, 900);
      }
    },
    onError: (error) => {
      handleGqlError(error, snackbar)
    },
    fetchPolicy: "no-cache", // always do a network request, no caches
    // errorPolicy: "all", // propagate errors from backend to Snackbar
  });


  const toLogin = () => {
    props.setTabIndex(0)
  }

  return (
    <ErrorBounds className={classes.outerContainer}>
      <div className={classes.paper}>

        <Typography className={classes.title} variant="h5">
          Reset Password
        </Typography>

        <Typography variant="body1" className={classes.passwordResetSubtitle}>
          Enter the email address associated with your account
          and we will send you a link to reset your password.
        </Typography>

        <form className={classes.form}>
          <TextInput
            className={classes.textInput}
            id="reset-password-email"
            name="reset-password-email"
            required
            type={"email"}
            placeholder="Email Address"
            value={formikResetPassword.values?.email}
            onChange={(e) => {
              formikResetPassword.setFieldValue("email", e.target.value)
            }}
            inputProps={{ style: { width: '100%' }}}
          />
          <ButtonLoading
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.submitButton}
            onClick={(e) => {
              sendResetPasswordEmail({
                variables: {
                  email: formikResetPassword.values?.email
                }
              })

            }}
            fullWidth
            loadingIconColor={Colors.blue}
            replaceTextWhenLoading={true}
            loading={loading}
            disabled={loading}
          >
            Send Reset Link
          </ButtonLoading>
        </form>

        <br/>
        <div className={classes.preHeader}>
          <Typography variant="body1">
            <a onClick={toLogin} className={classes.link}>
              Back to Login
            </a>
          </Typography>
        </div>

      </div>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  setTabIndex(tabIndex: number): void;
  formikResetPassword: FormikProps<FormikFieldsResetPassword>
}

interface MVar3 {
}
interface MData3 {
  sendResetPasswordEmail: SendResetPasswordResponse;
}

export default withStyles(styles)( ResetPasswordClaimPage );
