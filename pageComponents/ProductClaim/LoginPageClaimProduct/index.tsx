import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import clsx from "clsx";

import styles from './commonStylesPageClaim';
import SignUpPageClaim from './SignUpPageClaim';
import LogInPageClaim from './LogInPageClaim';
import ResetPasswordClaimPage from './ResetPasswordClaimPage';
import ErrorBounds from "components/ErrorBounds";
import { useRouter } from "next/router"
import { FormikProps } from 'formik';



const LoginPageRedirect = (props: ReactProps) => {

  const {
    classes,
    tabIndex,
    setTabIndex,
    formik,
  } = props;

  const renderLoginTab = () => {

    if (tabIndex === 0) {
      return <LogInPageClaim
                claimId={props.claimId}
                setTabIndex={setTabIndex}
                title={props.titleLogin}
                formikLogIn={formik}
                loading={props.loading}
              />
    } else if (tabIndex === 1) {
      return <SignUpPageClaim
                claimId={props.claimId}
                setTabIndex={setTabIndex}
                title={props.titleSignup}
                formikSignUp={formik as FormikProps<FormikFieldsSignUp>}
                loading={props.loading}
              />
    } else if (tabIndex === 2) {
      return <ResetPasswordClaimPage
                setTabIndex={setTabIndex}
                formikResetPassword={formik}
              />
    } else {
      return <LogInPageClaim
                claimId={props.claimId}
                setTabIndex={setTabIndex}
                title={props.titleLogin}
                formikLogIn={formik}
                loading={props.loading}
              />
    }
  }


  return (
    <ErrorBounds className={clsx(classes.loginRoot, props.className)}>
      <div className={classes.outerContainer}>
        <div className={classes.loginButton}>
          { renderLoginTab() }
        </div>
      </div>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  claimId: string;
  tabIndex: number;
  setTabIndex(tabIndex: number): void;
  titleLogin?: React.ReactNode;
  titleSignup?: React.ReactNode;
  className?: any;
  formik: FormikProps<FormikFieldsLogIn|FormikFieldsSignUp>
  loading: boolean
}
export interface FormikFieldsLogIn {
  claimId: string,
  dealerId?: string,
  email: string,
  password: string,
}
export interface FormikFieldsResetPassword {
  email: string,
}
export interface FormikFieldsSignUp {
  claimId: string,
  dealerId?: string,
  email: string,
  password: string,
  // phone args
  phoneNumber?: string
  countryCode?: string
  // license args
  firstName: string,
  lastName: string,
  licenseNumber: string,
  licenseExpiry: Date,
  licenseCategory: string,
  licenseState: string,
}

export default withStyles(styles)( LoginPageRedirect );
