import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";
import ErrorBounds from "components/ErrorBounds";
// snackbar
import { useSnackbar } from "notistack";
// Validation
import { Formik, FormikProps } from 'formik';
import { validationSchemas } from "utils/validation";
import ChangePasswordFields from "./ChangePasswordFields";
// Graphql Queries
import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD } from "queries/user-mutations";
import { UserPrivate } from "typings/gqlTypes";




const ChangePasswordForm = (props: ReactProps) => {

  const { classes } = props;
  const snackbar = useSnackbar()

  const [showPasswordChanger, setShowPasswordChanger] = React.useState(false);

  // passwords
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordAgain, setNewPasswordAgain] = React.useState("");

  const [changePassword, { loading, error, data}] =
  useMutation<MutationData, MutationVar>(
    CHANGE_PASSWORD, {
      variables: {
        currentPassword: "",
        newPassword: ""
      },
      onCompleted: () => {
        snackbar.enqueueSnackbar(
          `Successfully updated your password.`,
          { variant: "success" }
        )
        setTimeout(() => {
          togglePasswordChange()
        }, 800)
      },
      onError: (err) => {
        snackbar.enqueueSnackbar(
          "Incorrect password!",
          { variant: "error" }
        )
      },
    },
  );


  const togglePasswordChange = () => {
    setShowPasswordChanger(show => !show)
  }

  const resetPassword = () => {
    setCurrentPassword("");
    setNewPassword("");
    setNewPasswordAgain("");
  };



  return (
    <ErrorBounds className={classes.changePasswordRoot}>
      <div className={classes.flexRow}>
        <Typography variant="h4">
          Password
        </Typography>
        <a className={classes.link}
          onClick={() => {
            togglePasswordChange()
          }}
        >
          {
            !showPasswordChanger
            ? <Typography
                className={clsx("fadeIn", classes.showPasswordChanger)}
                variant="subtitle2"
              >
                {"Change password"}
              </Typography>
            : <Typography
                className={clsx("fadeIn", classes.showPasswordChanger)}
                variant="subtitle2"
              >
                {"Cancel"}
              </Typography>
          }
        </a>
      </div>
      <Formik
        // 1. feed product data to edit into formik state.
        initialValues={{
          currentPassword: "",
          newPassword: "",
          newPasswordAgain: "",
        }}
        validationSchema={validationSchemas.PasswordReset}
        onSubmit={(values, { setSubmitting }) => {
          // console.log('formik values...: ', values);
          // Dispatch Apollo Mutation after validation
          changePassword({
            variables: {
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            }
          });
          setTimeout(() => {
            resetPassword()
          }, 800)
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
              <div className={clsx(
                classes.formContainer,
                showPasswordChanger
                  ? classes.displaySomePasswordForm
                  : classes.displayNone,
              )}>
                <form onSubmit={ handleSubmit }>
                  <ChangePasswordFields
                    currentPassword={currentPassword}
                    newPassword={newPassword}
                    newPasswordAgain={newPasswordAgain}
                    setCurrentPassword={ setCurrentPassword }
                    setNewPassword={ setNewPassword }
                    setNewPasswordAgain={ setNewPasswordAgain }
                    loading={loading}
                    {...fprops}
                  />
                </form>
              </div>
          )
        }}
      </Formik>
    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}

interface MutationData {
  changePassword: { user: UserPrivate };
}
interface MutationVar {
  currentPassword: string;
  newPassword: string;
}


const styles = (theme: Theme) => createStyles({
  changePasswordRoot: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
  },
  flexRow: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formContainer: {
    padding: "0",
    marginTop: '1rem',
    marginBottom: '0.5rem',
  },
  textField: {
    marginBottom: '1rem',
    minWidth: 250,
    width: "100%",
  },
  link: {
    color: "#2484FF",
    cursor: 'pointer',
  },
  showPasswordChanger: {
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

export default withStyles(styles)( ChangePasswordForm );

