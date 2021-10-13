import React from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";

import Typography from '@material-ui/core/Typography';
// Components
import styles from './commonStylesPageClaim';
import ErrorBounds from "components/ErrorBounds";
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import TextInputFormControlUnderline from "components/Fields/TextInputFormControlUnderline"
// Router
import Or from "layout/Login/Or";
import ButtonLoading from "components/ButtonLoading";
import { useSnackbar } from 'notistack';
// error
import { FormikProps } from 'formik';
import { FormikFieldsLogIn } from "."



const LogInPageClaim = (props: ReactProps) => {

  const {
    classes,
    formikLogIn
  } = props;

  const toSignup = () => {
    props.setTabIndex(1)
  }

  const toForgotPassword = () => {
    props.setTabIndex(2)
  }

  let emailInputId = 'claim-page-redirect-signup-email'

  React.useEffect(() => {
    let d = document.getElementById(emailInputId)
    d?.focus?.()
    // autofocus does not put focus styles in automatically,
    // so hard to see it
  }, [])


  return (
    <ErrorBounds className={classes.outerContainer}>

      <Typography className={classes.title} variant="h3">
        {
          props.title
          ? props.title
          : "Login and Claim Listing"
        }
      </Typography>

      <div className={classes.form}>

        <TextInputFormControlUnderline
          name="sign-up-email"
          type={"email"}
          inputLabel={"Email Address"}
          autoComplete="email"
          value={formikLogIn.values.email}
          onChange={(e) => {
            e.persist(); // for persisting synthetic events
            formikLogIn.setFieldValue("email", e?.target?.value)
            if (!formikLogIn.touched?.email) {
              formikLogIn.setFieldTouched("email")
            }
          }}
          errorMessage={formikLogIn.errors?.email}
          touched={formikLogIn.touched?.email}
          validationErrorMsgStyle={{ marginBottom: '0.25rem' }}
          disableInitialValidationMessage={true}
        />

        <TextInputFormControlUnderline
          name="sign-up-password"
          type="password"
          inputLabel={"Password"}
          autoComplete={"new-password"} // this disables autofill
          value={formikLogIn.values.password}
          onChange={(e) => {
            e.persist(); // for persisting synthetic events
            formikLogIn.setFieldValue("password", e?.target?.value)
            if (!formikLogIn.touched?.password) {
              formikLogIn.setFieldTouched("password")
            }
          }}
          errorMessage={formikLogIn.errors?.password}
          touched={formikLogIn.touched?.password}
          validationErrorMsgStyle={{ marginBottom: '0.25rem' }}
          disableInitialValidationMessage={true}
        />

        <div className={clsx(classes.flexRowEnd, classes.marginTop05)}>
          <ButtonLoading
            type="submit" // this sets off Form submit
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submitButton}
            loadingIconColor={Colors.cream}
            replaceTextWhenLoading={true}
            // onClick={(e) => {
            //   e.preventDefault()
            // }}
            loading={props.loading}
            disabled={props.loading}
          >
            Login and Claim Listing
          </ButtonLoading>
        </div>
      </div>

      {/* <div className={clsx(classes.preHeader, classes.marginTop1)}>
        <Typography variant="body1" className={classes.alreadyHaveAccountText}>
          <a onClick={toForgotPassword} className={classes.link}>
            Forgot Password?
          </a>
        </Typography>
      </div> */}

      <Or style={{
        margin: '0.75rem 0rem 0.5rem 0rem',
      }}/>

      <div className={classes.preHeader}>
        <Typography variant="body1" className={classes.alreadyHaveAccountText}>
          {"Don't have an account? "}
          <a onClick={toSignup} className={classes.link}>
            Create Account and Claim
          </a>
        </Typography>
      </div>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  claimId: string
  setTabIndex(tabIndex: number): void;
  title?: React.ReactNode;
  formikLogIn: FormikProps<FormikFieldsLogIn>
  loading: boolean
}

export default withStyles(styles)(LogInPageClaim);
