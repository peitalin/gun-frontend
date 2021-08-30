import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
// Graphql Queries
import { useMutation, useApolloClient, ApolloError } from "@apollo/client";
import { GET_USER } from "queries/user-queries";
import { UPDATE_USER, SET_PAYOUT_METHOD } from "queries/user-mutations";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import ErrorBounds from "components/ErrorBounds";
import TextInput from "components/Fields/TextInput";
import ButtonLoading from "components/ButtonLoading";
import { useSnackbar } from "notistack";
// Typings
import { UserPrivate } from "typings/gqlTypes";
// Validation
import { Formik, FormikProps } from 'formik';
import { validationSchemas } from "utils/validation";





const ChangePayoutMethod = (props: ReactProps) => {

  const { classes } = props;
  const [showPayoutBankChanger, setShowPayoutBankChanger] = React.useState(false);

  const dispatch = useDispatch();
  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )
  const snackbar = useSnackbar();


  const [
    setPayoutMethod,
    { loading, data, error }
  ] = useMutation<MutationData, MutationVars>(
    SET_PAYOUT_METHOD, {
    update: (cache, { data: { setPayoutMethod }}: { data: MutationData }) => {

      setShowPayoutBankChanger(false)
      dispatch(Actions.reduxLogin.SET_USER({
        ...user,
        payoutMethod: setPayoutMethod.user.payoutMethod,
      }))

      cache.writeQuery({
        query: GET_USER,
        data: {
          user: {
            ...user,
            ...setPayoutMethod.user
          }
        },
      });
    },
    onCompleted: () => {
      snackbar.enqueueSnackbar(
        `Successfully updated your profile.`,
        { variant: "success" }
      )
    },
    onError: (err) => {
      snackbar.enqueueSnackbar(
        formatError(error),
        { variant: "error" }
      )
    },
    // variables: {}, // set later using formik values
  })

  const formatError = (error: ApolloError) => {
    let errMsg = error?.graphQLErrors?.[0]?.message ?? JSON.stringify(error)
    return errMsg
  }

  return (
    <Formik
      // 1. feed product data to edit into formik state.
      initialValues={{
        bsb: user?.payoutMethod?.bsb,
        accountNumber: user?.payoutMethod?.accountNumber,
        accountName: user?.payoutMethod?.accountName,
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

        let bsb1 = user?.payoutMethod?.bsb.slice(0,3)
        let bsb2 = user?.payoutMethod?.bsb.slice(3)

        let accountNumber1 = user?.payoutMethod?.accountNumber.slice(0,2)
        let accountNumber2 = user?.payoutMethod?.accountNumber.slice(2,5)
        let accountNumber3 = user?.payoutMethod?.accountNumber.slice(5)

        let accountName = user?.payoutMethod?.accountName
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
                      Change bank account
                    </Typography>
                  : <Typography
                      className={clsx('fadeIn', classes.showPayoutChanger)}
                      variant="subtitle2"
                    >
                      Cancel
                    </Typography>
                }
              </a>
            </div>

            <div className={classes.currentBankDetails}>

              <Typography variant="body1" className={classes.subtitle}>
                Bank account receiving payment:
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
                  Edit Bank Account for payouts:
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
                    width: 150,
                  }}
                >
                  Save changes
                </ButtonLoading>
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


const styles = (theme: Theme) => createStyles({
  root: {
  },
  flexRow: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: "#2484FF",
  },
  boldTitle: {
    fontWeight: 600,
    width: '100%',
    paddingLeft: '0.5rem',
    marginTop: '1rem',
    marginRight: '0.5rem',
    marginBottom: '0.5rem',
  },
  bankDetailsHeading: {
    color: isThemeDark(theme)
      ? Colors.uniswapLightestGrey
      : Colors.slateGreyBlack,
    minWidth: 100,
  },
  bankDetailsInfoText: {
    color: isThemeDark(theme)
      ? Colors.purple
      : Colors.ultramarineBlue,
  },
  currentBankDetails: {
    marginTop: '2rem',
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
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'flex-end',
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

export default withStyles(styles)( ChangePayoutMethod );

