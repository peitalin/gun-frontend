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
import { useMutation, useApolloClient } from "@apollo/client";
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
import { UserPrivate } from "typings/gqlTypes";
import { HtmlEvent } from "typings";
// Validation
import { Formik, FormikProps } from 'formik';
import { validationSchemas } from "utils/validation";





const ChangePayoutMethod = (props: ReactProps & ReduxProps) => {

  const { classes } = props;
  const [showPayoutBankChanger, setShowPayoutBankChanger] = React.useState(false);

  let [displayErr, setDisplayErr] = React.useState(true);
  let [displaySuccess, setDisplaySuccess] = React.useState(true);
  const aClient = useApolloClient();
  const dispatch = useDispatch();


  const [setPayoutMethod, { loading, data, error }] =
  useMutation<MutationData, MutationVars>(
    SET_PAYOUT_METHOD, {

    update: (cache, { data: { setPayoutMethod }}: { data: MutationData }) => {

      setShowPayoutBankChanger(false)
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
        bsb: props.user?.payoutMethod?.bsb,
        accountNumber: props.user?.payoutMethod?.accountNumber,
        accountName: props.user?.payoutMethod?.accountName,
      }}
      validationSchema={validationSchemas.ChangePayoutMethod}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // Dispatch Apollo Mutation after validation
        console.log("formik values:", values)
        setPayoutMethod({
          variables: {
            payoutType: "BANK",
            bsb: values.bsb,
            accountNumber: values.accountNumber,
            accountName: values.accountName,
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

        let bsb1 = props.user?.payoutMethod?.bsb.slice(0,3)
        let bsb2 = props.user?.payoutMethod?.bsb.slice(3)

        let accountNumber1 = props.user?.payoutMethod?.accountNumber.slice(0,2)
        let accountNumber2 = props.user?.payoutMethod?.accountNumber.slice(2,5)
        let accountNumber3 = props.user?.payoutMethod?.accountNumber.slice(5)

        let accountName = props.user?.payoutMethod?.accountName
        console.log("errors:", fprops.errors)

        return (
          <form className={classes.root}
            onSubmit={handleSubmit}
          >
            <div className={classes.flexRow}>
              <Typography variant="h4">
                Payout Method
              </Typography>
              <a className={classes.link}
                onClick={() => setShowPayoutBankChanger(show => !show)}
              >
                { !showPayoutBankChanger
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

            <div className={classes.currentBankDetails}>

              <Typography variant="body1" className={classes.title}>
                Current Bank details:
              </Typography >

              <div className={classes.bankDetailsContainer}>
                <div className={classes.bankDetailsCol1}>
                  <Typography variant="body1" className={classes.subtitle}>
                    <span className={classes.bankDetailsHeading}>
                      BSB Number:
                    </span>
                  </Typography>
                  <Typography variant="body1" className={classes.subtitle}>
                    <span className={classes.bankDetailsHeading}>
                      Account Number:
                    </span>
                  </Typography>
                  <Typography variant="body1" className={classes.subtitle}>
                    <span className={classes.bankDetailsHeading}>
                      Account Name:
                    </span>
                  </Typography>
                </div>
                <div className={classes.bankDetailsCol2}>
                  <Typography variant="body1" className={classes.subtitle}>
                    <span className={classes.bankDetailsInfoText}>
                      {`${bsb1}-${bsb2}`}
                    </span>
                  </Typography>
                  <Typography variant="body1" className={classes.subtitle}>
                    <span className={classes.bankDetailsInfoText}>
                      {`${accountNumber1}-${accountNumber2}-${accountNumber3}`}
                    </span>
                  </Typography>
                  <Typography variant="body1" className={classes.subtitle}>
                    <span className={classes.bankDetailsInfoText}>
                      {accountName}
                    </span>
                  </Typography>
                </div>
              </div>


              <div className={clsx(
                classes.formContainer,
                showPayoutBankChanger
                  ? classes.displaySomePayoutMenu
                  : classes.displayNone,
              )}>
                <Typography variant="body1" className={classes.boldTitle}>
                  Enter a new Bank BSB number for payouts:
                </Typography>

                <TextInput
                  required
                  placeholder={"Enter a Bank BSB number"}
                  className={classes.textField}
                  value={values.bsb}
                  onChange={(e) => {
                    console.log("bsb: ", e.target.value)
                    let value = e.target.value
                    if (value.length <= 6) {
                      fprops.setFieldValue("bsb", e.target.value)
                    }
                  }}
                  inputProps={{ style: { width: '100%' }}}
                  errorMessage={errors.bsb}
                  touched={touched.bsb}
                />

                <TextInput
                  required
                  placeholder={"Enter a Bank Account number"}
                  className={classes.textField}
                  value={values.accountNumber}
                  onChange={(e) => {
                    console.log("accountNumber: ", e.target.value)
                    let value = e.target.value
                    if (value.length <= 10) {
                      fprops.setFieldValue("accountNumber", e.target.value)
                    }
                  }}
                  inputProps={{ style: { width: '100%' }}}
                  errorMessage={errors.accountNumber}
                  touched={touched.accountNumber}
                />

                <TextInput
                  required
                  placeholder={"Enter a Account name"}
                  className={classes.textField}
                  value={values.accountName}
                  onChange={(e) => {
                    console.log("accountName: ", e.target.value)
                    fprops.setFieldValue("accountName", e.target.value)
                  }}
                  inputProps={{ style: { width: '100%' }}}
                  errorMessage={errors.accountName}
                  touched={touched.accountName}
                />

                <ButtonLoading
                  type="submit"
                  className={classes.saveButton}
                  variant={"contained"}
                  color={"secondary"}
                  onClick={() => {
                    console.log('formik errors:', errors)
                  }}
                  replaceTextWhenLoading={true}
                  loading={loading}
                  disabled={loading}
                  loadingIconColor={Colors.blue}
                  style={{
                    height: '40px',
                    width: '100%',
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
  payoutType: string;
  bsb: string;
  accountNumber: string;
  accountName: string;
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
  bankDetailsCol1: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'space-between',
    width: 150,
  },
  bankDetailsCol2: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'space-between',
  },
  bankDetailsContainer: {
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
  bankDetailsHeading: {
    color: Colors.uniswapLightestGrey,
    minWidth: 100,
  },
  bankDetailsInfoText: {
    color: Colors.uniswapLighterGrey,
  },
  currentBankDetails: {
    marginTop: '1rem',
  },
  subtitle: {
    margin: '0.5rem 0rem',
  },
  title: {
    margin: '2rem 0rem',
  },
  displaySomePayoutMenu: {
    height: 280, // card form is 280px high.
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
  saveButton: {
    height: 40,
  },
});

export default withStyles(styles)( ChangePayoutMethodRedux );

