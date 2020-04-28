import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Redux
import { connect, useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Graphql Queries
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { GET_USER } from "queries/user-queries";
import { UPDATE_USER, SET_PAYOUT_METHOD } from "queries/user-mutations";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import ErrorBounds from "components/ErrorBounds";
import TextInput from "components/Fields/TextInput";
import ButtonLoading from "components/ButtonLoading";
import SnackBarA from "components/Snackbars/SnackbarA";
import SnackbarsSuccessErrors from "components/Snackbars/SnackbarsSuccessErrors";
// Typings
import { UserPrivate, PayoutType } from "typings/gqlTypes";
import { HtmlEvent } from "typings";
// Validation
import { Formik, FormikProps } from 'formik';
import { validationSchemas } from "utils/validation";





const ChangePayoutMethod = (props: ReactProps & ReduxProps) => {

  const { classes } = props;
  const [showPayoutEmailChanger, setShowPayoutEmailChanger] = React.useState(false);


  // const togglePayoutEmailChanger = () => {
  //   setShowPayoutEmailChanger(show => !show)
  // }

  // const resetPayoutEmailChanger = () => {
  //   setShowPayoutEmailChanger(false)
  // }

  let [displayErr, setDisplayErr] = React.useState(true);
  let [displaySuccess, setDisplaySuccess] = React.useState(true);
  const aClient = useApolloClient();
  const dispatch = useDispatch();


  const [setPayoutMethod, { loading, data, error }] =
  useMutation<MutationData, MutationVars>(
    SET_PAYOUT_METHOD, {

    update: (cache, { data: { setPayoutMethod }}: { data: MutationData }) => {

      setShowPayoutEmailChanger(false)
      dispatch(Actions.reduxLogin.SET_USER({
        ...props.user,
        payoutMethod: setPayoutMethod.user.payoutMethod,
      }))

      cache.writeQuery({
        query: GET_USER,
        data: {
          user: {
            ...props.user,
            ...setPayoutMethod.user
          }
        },
      });
    },
    // variables: {}, // set later using formik values
  })

  return (
    <Formik
      // 1. feed product data to edit into formik state.
      initialValues={{
        newPayoutEmail: "",
      }}
      validationSchema={validationSchemas.ChangePayoutEmail}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // Dispatch Apollo Mutation after validation
        console.log("formik values:", values)
        setPayoutMethod({
          variables: {
            payoutType: PayoutType.PAYPAL,
            payoutEmail: values.newPayoutEmail,
            payoutProcessor: "PAYPAL",
            payoutProcessorId: "NA"
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
          <form className={classes.root}
            onSubmit={handleSubmit}
          >
            <div className={classes.flexRow}>
              <Typography variant="h4">
                Payout Method
              </Typography>
              <a className={classes.link}
                onClick={() => setShowPayoutEmailChanger(show => !show)}
              >
                { !showPayoutEmailChanger
                  ? <Typography
                      className={clsx('fadeIn', classes.showPayoutChanger)}
                      variant="subtitle2"
                    >
                      {"Change payout email"}
                    </Typography>
                  : <Typography
                      className={clsx('fadeIn', classes.showPayoutChanger)}
                      variant="subtitle2"
                    >
                      {"Cancel"}
                    </Typography>
                }
              </a>
            </div>

            <div>
              <Typography variant="body1" className={classes.currentEmail}>
                <span className={classes.boldTitle}>
                  Current Paypal Email:
                </span>
                <span className={classes.paypalEmail}>
                  {option(props).user.payoutMethod.payoutEmail()}
                </span>
              </Typography>
              <div className={clsx(
                classes.formContainer,
                showPayoutEmailChanger
                  ? classes.displaySomePayoutMenu
                  : classes.displayNone,
              )}>
                <Typography variant="body1" className={classes.boldTitle}>
                  Enter your new Paypal email for payouts:
                </Typography>

                <TextInput
                  required
                  placeholder={"Enter a Paypal email"}
                  className={classes.textField}
                  value={values.newPayoutEmail}
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value)
                    fprops.setFieldValue("newPayoutEmail", e.target.value)
                  }}
                  inputProps={{ style: { width: '100%' }}}
                  errorMessage={errors.newPayoutEmail}
                  touched={touched.newPayoutEmail}
                />

                <ButtonLoading
                  type="submit"
                  variant={"outlined"}
                  color={"primary"}
                  onClick={() => {
                    console.log('formik errors:', errors)
                  }}
                  replaceTextWhenLoading={true}
                  loading={loading}
                  disabled={loading}
                  loadingIconColor={Colors.blue}
                  style={{
                    height: '40px',
                    width: '150px',
                  }}
                >
                  Save changes
                </ButtonLoading>

                <SnackBarA
                  open={data !== undefined && displaySuccess}
                  closeSnackbar={() => setDisplaySuccess(false)}
                  message={`Successfully updated your profile.`}
                  variant={"success"}
                  autoHideDuration={3000}
                />
                <SnackBarA
                  open={error !== undefined && displayErr}
                  closeSnackbar={() => setDisplayErr(false)}
                  message={`Oh oh: ${JSON.stringify(error)}`}
                  variant={"error"}
                  autoHideDuration={3000}
                />
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}

interface ReduxProps {
  updateUserProfile(payload: UserPrivate): void;
  user: UserPrivate;
}

interface MutationData {
  setPayoutMethod: { user: UserPrivate };
}
interface MutationVars {
  payoutType: PayoutType;
  payoutEmail: string;
  payoutProcessor: string;
  payoutProcessorId: string;
}


//////////////// REDUX /////////////////////
const mapStateToProps = ( state: GrandReduxState ) => {
  return {
    user: state.reduxLogin.user
  }
}
const mapDispatchToProps = ( dispatch ) => {
  return {
    updateUserProfile: (payload: UserPrivate) => dispatch(
      Actions.reduxLogin.SET_USER(payload)
    ),
  }
}

const ChangePayoutMethodRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)( ChangePayoutMethod )

const styles = (theme: Theme) => createStyles({
  root: {
  },
  flexRow: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  formContainer: {
    padding: "0rem",
  },
  textField: {
    marginBottom: '1.125rem',
    minWidth: 250,
    width: "100%",
  },
  link: {
    color: "#2484FF",
    cursor: 'pointer',
  },
  showPayoutChanger: {
    marginBottom: '0.5rem',
    color: "#2484FF",
  },
  boldTitle: {
    fontWeight: 600,
    marginTop: '1rem',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
  },
  paypalEmail: {
    color: Colors.secondaryBright,
  },
  currentEmail: {
    margin: '0.5rem 0rem',
  },
  displaySomePayoutMenu: {
    height: 130, // card form is 130px high.
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

export default withStyles(styles)( ChangePayoutMethodRedux );

