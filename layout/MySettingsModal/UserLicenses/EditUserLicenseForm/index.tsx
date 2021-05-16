import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Components
import ErrorBounds from "components/ErrorBounds";
import ButtonLoading from "components/ButtonLoading";
// Typings
import { HtmlEvent } from "typings";
// Validation
import { Formik, FormikProps } from 'formik';
import { validationSchemas } from "utils/validation";
import EditUserLicenseFields from "./EditUserLicenseFields";
// Graphql Queries
import { useMutation, ApolloError } from "@apollo/client";
import { EDIT_USER_LICENSE } from "queries/user-mutations";
// snackbar
import { useSnackbar } from "notistack";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { UserPrivate } from "typings/gqlTypes";




const ChangeUserLicenseForm = (props: ReactProps) => {


  const { classes } = props;
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const [showLicenseChanger, setShowLicenseChanger] = React.useState(false);

  const toggleLicenseChange = () => {
    setShowLicenseChanger(show => !show)
  }

  const reduxUser = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );

  interface EditUserLicenseArgsInput {
    licenseNumber: string
    licenseExpiry: Date
    licenseCategory: string
    licenseState: string
  }

  const [editUserLicense, { loading, data, error }] =
  useMutation<MutationData, EditUserLicenseArgsInput>(
    EDIT_USER_LICENSE, {
    variables: {
      licenseNumber: undefined,
      licenseExpiry: undefined,
      licenseCategory: undefined,
      licenseState: undefined,
    },
    update: (cache, { data }) => {
      let user = data.editUserLicense?.user;
      dispatch(Actions.reduxLogin.SET_USER({ ...reduxUser, ...user }))
    },
    onCompleted: (data) => {
      snackbar.enqueueSnackbar(
        "Successfully updated your gun license",
        { variant: "success" }
      )
    },
    onError: (err) => {
      snackbar.enqueueSnackbar(
        `Error updating your gun license ${formatError(err)}`,
        { variant: "error" }
      )
    },
  })

  const formatError = (error: ApolloError) => {
    let errMsg = error?.graphQLErrors?.[0]?.message ?? JSON.stringify(error)
    return errMsg
  }

  return (
    <ErrorBounds className={classes.changeUserLicenseRoot}>
      <div className={classes.flexRow}>
        <Typography variant="h4">
          Gun License Details
        </Typography>
        <a className={classes.link}
          onClick={() => toggleLicenseChange()}
        >
          {
            !showLicenseChanger
            ? <Typography
                className={clsx("fadeIn", classes.showLicenseChanger)}
                variant="subtitle2"
              >
                {"Change gun license"}
              </Typography>
            : <Typography
                className={clsx("fadeIn", classes.showLicenseChanger)}
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
          licenseNumber: reduxUser?.defaultLicense?.licenseNumber,
          licenseExpiry: reduxUser?.defaultLicense?.licenseExpiry,
          licenseCategory: reduxUser?.defaultLicense?.licenseCategory
            ? reduxUser?.defaultLicense?.licenseCategory?.split(',')
            : [],
          licenseState: reduxUser?.defaultLicense?.licenseState,
        }}
        validationSchema={validationSchemas.AddOrEditUserLicense}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          // Dispatch Apollo Mutation after validation
          console.log("values::::::", values)
          editUserLicense({
            variables: {
              licenseNumber: values.licenseNumber,
              licenseExpiry: values.licenseExpiry,
              licenseCategory: values.licenseCategory.join(','),
              licenseState: values.licenseState,
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
              showLicenseChanger
                ? classes.displayLicenseForm
                : classes.displayNone,
            )}>
              <form onSubmit={ handleSubmit }>
                <div className={classes.formContainerInner}>

                  <EditUserLicenseFields
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
                      Save Changes
                    </ButtonLoading>
                  </ErrorBounds>

                </div>
              </form>
            </div>
          )
        }}
      </Formik>
    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  goBack?(): void;
}

interface MutationData {
  editUserLicense: { user: UserPrivate };
}


const styles = (theme: Theme) => createStyles({
  changeUserLicenseRoot: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
  },
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
  flexRow: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formContainer: {
    padding: "0",
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  formContainerInner: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: "0.5rem",
    width: '100%',
  },
  textField: {
    marginBottom: '1rem',
    minWidth: 250,
    width: "100%",
  },
  buttonContainer: {
    marginTop: '1.5rem',
  },
  saveButton: {
    width: 200,
    height: 40,
  },
  link: {
    color: "#2484FF",
    cursor: 'pointer',
  },
  showLicenseChanger: {
    color: "#2484FF",
  },
  displayLicenseForm: {
    height: 420, // license change form is 360 high.
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

export default withStyles(styles)( ChangeUserLicenseForm );

