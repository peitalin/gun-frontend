import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Components
import Loading from "components/Loading";
import ErrorDisplay, { GraphQLErrors } from "components/Error";
import ErrorBounds from "components/ErrorBounds";
import SnackBarA from "components/Snackbars/SnackbarA";
import SnackbarsSuccessErrors from "components/Snackbars/SnackbarsSuccessErrors"
import ButtonLoading from "components/ButtonLoading";
// Typings
import { HtmlEvent } from "typings";
// Validation
import { Formik, FormikProps } from 'formik';
import { validationSchemas } from "utils/validation";
import ChangeUserEmailFields from "./ChangeUserEmailFields";
// Graphql Queries
import { useMutation } from "@apollo/react-hooks";
import { GET_USER } from "queries/user-queries";
import { UPDATE_USER } from "queries/user-mutations";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { UserPrivate } from "typings/gqlTypes";
import { EditUserProfileInput } from "typings";




const ChangeUserEmailForm = (props: ReactProps) => {

  const { classes } = props;
  const dispatch = useDispatch();

  const reduxUser = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );

  const [editUserProfile, { loading, data, error }] =
  useMutation<MutationData, EditUserProfileInput>(
    UPDATE_USER, {
    variables: {
      firstName: reduxUser.firstName,
      lastName: reduxUser.lastName,
      email: reduxUser.email,
    },
    onError: (err) => console.log(err),
    update: (cache, { data: { editUserProfile: { user } } }) => {
      try {
        cache.writeQuery({
          query: GET_USER,
          data: {
            user: { ...reduxUser, ...user }
          },
        });
        // update reduxLogin user
        dispatch(Actions.reduxLogin.SET_USER({
          ...reduxUser,
          ...user
        }))
      } catch (error) {
        console.log(error)
      }
    },
    onCompleted: () => {
      // setTimeout(() => {
      //   // togglePasswordChange()
      // }, 800)
    }
  })


  return (
    <Formik
      // 1. feed product data to edit into formik state.
      initialValues={{
        firstName: reduxUser.firstName,
        lastName: reduxUser.lastName,
        email: reduxUser.email,
      }}
      validationSchema={validationSchemas.EditUserEmail}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // Dispatch Apollo Mutation after validation
        editUserProfile({
          variables: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
          }
        }).then(r => {
          resetForm()
        })
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
          )}>
            <form onSubmit={ handleSubmit }>

              <ChangeUserEmailFields
                {...fprops}
              />

              <ErrorBounds className={classes.buttonContainer}>
                <ButtonLoading
                  type="submit" // this sets off Form submit
                  className={classes.saveButton}
                  variant={"contained"}
                  color={"secondary"}
                  replaceTextWhenLoading={true}
                  loading={loading}
                  loadingIconColor={Colors.cream}
                  disabled={Object.keys(errors).length > 0 || loading}
                >
                  Save Your Changes
                </ButtonLoading>
              </ErrorBounds>

              <SnackbarsSuccessErrors
                data={data}
                error={error}
                successMessage={"Successfully updated your profile"}
                errorMessage={"Error updating your profile email"}
                autoHideDuration={3000}
              />
            </form>
          </div>
        )
      }}
    </Formik>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  goBack?(): void;
}

interface MutationData {
  editUserProfile: { user: UserPrivate };
}


const styles = (theme: Theme) => createStyles({
  root: {
  },
  flexRow: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  formContainer: {
    padding: "0",
    marginTop: '0.5rem',
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
    marginBottom: '0.5rem',
    color: "#2484FF",
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: '0.5rem',
  },
  saveButton: {
    width: 200,
    height: 40,
  },
});

export default withStyles(styles)( ChangeUserEmailForm );

