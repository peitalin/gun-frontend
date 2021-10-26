import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";
// Components
import ErrorBounds from "components/ErrorBounds";
import ButtonLoading from "components/ButtonLoading";
// Validation
import { Formik, FormikProps } from 'formik';
import { validationSchemas } from "utils/validation";
import ChangeUserProfileFields from "./ChangeUserProfileFields";
// Graphql Queries
import { useMutation, ApolloError } from "@apollo/client";
import { GET_USER } from "queries/user-queries";
import { UPDATE_USER } from "queries/user-mutations";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { UserPrivate, MutationEditUserProfileArgs } from "typings/gqlTypes";
// snackbar
import { useSnackbar } from "notistack";




const ChangeUserProfileForm = (props: ReactProps) => {

  const { classes } = props;
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const theme = useTheme()

  const reduxUser = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );

  const [editUserProfile, { loading, data, error }] =
  useMutation<MutationData, MutationEditUserProfileArgs>(
    UPDATE_USER, {
    variables: {
      email: reduxUser?.email,
      editUserPhoneNumberInput: {
        phoneNumber: reduxUser?.phoneNumber?.number,
        areaCode: reduxUser?.phoneNumber?.areaCode,
        countryCode: reduxUser?.phoneNumber?.countryCode,
      },
    },
    update: (cache, { data: { editUserProfile: { user } } }) => {
      dispatch(Actions.reduxLogin.SET_USER({ ...reduxUser, ...user }))
    },
    onCompleted: (data) => {
      snackbar.enqueueSnackbar(
        "Successfully updated your profile",
        { variant: "success" }
      )
    },
    onError: (err) => {
      snackbar.enqueueSnackbar(
        `Error updating your profile email ${formatError(err)}`,
        { variant: "error" }
      )
    },
  })

  const formatError = (error: ApolloError) => {
    let errMsg = error?.graphQLErrors?.[0]?.message ?? JSON.stringify(error)
    return errMsg
  }

  return (
    <Formik
      // 1. feed product data to edit into formik state.
      initialValues={{
        email: reduxUser?.email,
        phoneNumber: reduxUser?.phoneNumber?.number,
        countryCode: reduxUser?.phoneNumber?.countryCode,
        areaCode: reduxUser?.phoneNumber?.areaCode,
      }}
      validationSchema={validationSchemas.EditUserProfile}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // Dispatch Apollo Mutation after validation
        console.log('values::::::', values)
        editUserProfile({
          variables: {
            email: values.email,
            editUserPhoneNumberInput: {
              phoneNumber: values.phoneNumber,
              countryCode: values.countryCode,
              areaCode: values.areaCode,
            },
          }
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

              <ChangeUserProfileFields
                {...fprops}
              />

              <ErrorBounds className={classes.buttonContainer}>
                <ButtonLoading
                  type="submit" // this sets off Form submit
                  style={{
                    width: 150,
                  }}
                  variant={"contained"}
                  color={"secondary"}
                  replaceTextWhenLoading={true}
                  loading={loading}
                  loadingIconColor={Colors.cream}
                  disabled={Object.keys(errors).length > 0 || loading}
                >
                  Save Changes
                </ButtonLoading>
              </ErrorBounds>

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
    alignItems: 'center',
  },
  formContainer: {
    padding: "0",
    marginBottom: '1rem',
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

export default withStyles(styles)( ChangeUserProfileForm );

