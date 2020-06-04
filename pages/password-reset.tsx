import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonLoading from "components/ButtonLoading";
import TextInput from "components/Fields/TextInput";
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
// Validation
import { Formik } from 'formik';
import { validationSchemas } from "utils/validation";
import { useRouter } from "next/router";
// SSR
import { NextPage, NextPageContext } from 'next';
import ApolloClient from "apollo-client";

import Portal from '@material-ui/core/Portal';
import { CONFIRM_RESET_PASSWORD } from "queries/user-mutations";
import { useMutation } from "@apollo/react-hooks";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";



const PasswordResetPage: NextPage<ReactProps> = (props) => {

  const { classes } = props;
  const [newPassword, setNewPassword] = React.useState("")
  const [newPasswordAgain, setNewPasswordAgain] = React.useState("")

  const router = useRouter();
  const snackbar = useSnackbar();

  const {
    query
  } = props;

  // const reset_id = query.reset_id;
  // const email = query.email;
  // const expires_at = query.expires_at;
  // const url = query.url;
  console.log('router query: ', query)
  // ?reset_id=5473e067-99bb-47a4-897d-f2131d5a5028
  // &email=peita_lin@hotmail.com
  // &expires_at=2019-12-09T04:35:42
  // &url=placeholder

  const [confirmResetPassword, { data, loading, error }] = useMutation(
    CONFIRM_RESET_PASSWORD, {
      variables: {
        resetId: query.reset_id,
        email: query.email,
        expiresAt: query.expires_at,
        newPassword: newPassword,
      },
      onError: (err) => console.log(err),
      onCompleted: (data) => {

        snackbar.enqueueSnackbar(
          "Password reset complete. Please login.",
          { variant: "info" }
        )

        setTimeout(() => {
          router.push("/login")
        }, 400)
      }
    }
  )


  return (
    <Formik
      // 1. feed product data to edit into formik state.
      initialValues={{
        newPassword: "",
        newPasswordAgain: "",
      }}
      validationSchema={validationSchemas.PasswordResetEmail}
      onSubmit={(values, { setSubmitting }) => {
        console.log('formik values: ', values);
        if (newPassword === newPasswordAgain) {
          confirmResetPassword()
        } else {
          console.log("passwords must match!")
        }
      }}
    >
      {(fprops) => {

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
          validateField,
          validateForm,
        } = fprops;

        return (
          <ResetPasswordForm
            classes={classes}
            onSubmit={handleSubmit} // dispatches to <Formik onSubmit={}/>
          >
            <ErrorBounds className={clsx(classes.root, classes.flexRow)}>
              <div className={classes.resetContainer}>

                <div className={classes.title}>
                  <Typography color={"primary"} variant="h3">
                    Set New Password
                  </Typography>
                </div>

                <TextInput
                  name="password"
                  type="password"
                  placeholder="Enter your new password"
                  className={classes.textField}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value)
                    fprops.setFieldValue("newPassword", e.target.value)
                  }}
                  onBlur={handleBlur}
                  inputProps={{ style: { width: '100%' }}}
                  errorMessage={errors.newPassword}
                  touched={touched.newPassword}
                />
                <TextInput
                  name="password-again"
                  type="password"
                  placeholder="Type your new password again"
                  className={classes.textField}
                  value={newPasswordAgain}
                  onChange={(e) => {
                    setNewPasswordAgain(e.target.value)
                    fprops.setFieldValue("newPasswordAgain", e.target.value)
                  }}
                  onBlur={handleBlur}
                  inputProps={{ style: { width: '100%' }}}
                  errorMessage={errors.newPasswordAgain}
                  touched={touched.newPasswordAgain}
                />

                <ButtonLoading
                  type="submit" // this sets off Form submit
                  variant={"contained"}
                  color={"secondary"}
                  loadingIconColor={Colors.lightGrey}
                  replaceTextWhenLoading={true}
                  loading={loading}
                  onClick={() => {
                    console.log('clicked')
                    console.log('formik errors', errors)
                  }}
                  className={props.classes.button}
                >
                  Reset Password
                </ButtonLoading>

                <div className={classes.body1}>
                  <Typography color={"primary"} variant="body1">
                    By clicking "Reset Password",
                    you confirm that you accept the Terms of Service &
                    Privacy Policy.
                  </Typography>
                </div>

              </div>
            </ErrorBounds>

          </ResetPasswordForm>
        )
      }}
    </Formik>
  );
}


const ResetPasswordForm: React.FC<any> = (props) => {
  const { classes, children } = props;
  const { onSubmit } = props; // submits to Formik validation
  // with a callback to Formik.onSubmit prop
  return (
    <div className={classes.root}>
      <div className={classes.maxWidth}>
        <div className={classes.pageMargin}>
          <form onSubmit={onSubmit}>
            {children}
          </form>
        </div>
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  query: any;
}
interface MutationVar {
  email: string;
  expiresAt: Date;
  resetId: string;
  url: string;
  password: string;
}
interface MutationData {
  resetId: string;
  email: string;
  url: string;
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

PasswordResetPage.getInitialProps = async (ctx: Context) => {
  console.log('query initial', ctx.query)
  return {
    query: ctx.query as any,
    classes: undefined,
  };
}


const styles = (theme: Theme) => createStyles({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(66vh)',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resetContainer: {
    maxWidth: 320,
    width: '100%',
  },
  textField: {
    width: "100%",
    marginBottom: '1rem',
    "&:focus-within": {
      color: '#24A4FF',
    },
  },
  button: {
    margin: 0,
    // marginTop: '0.5rem',
    width: '100%',
    height: 40,
  },
  title: {
    margin: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  body1: {
    marginTop: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
});

export default withStyles(styles)( PasswordResetPage );



