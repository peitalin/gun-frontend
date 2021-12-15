import React from "react";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import { styles } from './styles';
import { Colors } from "layout/AppTheme";
// Graphql
import { useMutation, ApolloError } from "@apollo/client";
// Typings
import { StorePrivate, UserPrivate } from "typings/gqlTypes";
// Components
import Loading from "components/Loading";
import CreateStoreFields from "./CreateStorePayoutFields";
// Snackbar
import { useSnackbar } from "notistack";
// Material UI
import Typography from "@mui/material/Typography";
import ButtonLoading from "components/ButtonLoading";
// Validation
import { Formik, FormikProps } from 'formik';
import { validationSchemas } from "utils/validation";
// Icons
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Login from "layout/Login";
// Graphql Queries
import { SET_PAYOUT_METHOD } from "queries/user-mutations";
import { useRouter } from "next/router";
// media query
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// store deleted




const CreateStorePayoutForm: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const dispatch = useDispatch();
  const router = useRouter();
  const snackbar = useSnackbar();

  const formatError = (error: ApolloError) => {
    return error?.graphQLErrors?.[0]?.message ?? JSON.stringify(error)
  }

  const {
    userRedux,
  } = useSelector<GrandReduxState, ReduxState>(s => {
    return {
      userRedux: s.reduxLogin.user,
    }
  })

  // const [
  //   storeCreate,
  //   { data, loading, error }
  // ] = useMutation<MutationData, CreateStoreInput>(
  //   CREATE_STORE, {
  //   update: (cache, { data }: { data: MutationData }) => {
  //   },
  //   onCompleted: async (dataCreateStore: MutationData) => {
  //     const { createStore: { store } } = dataCreateStore;
  //     // console.log("createStore.store", store)
  //     dispatch(Actions.reduxLogin.SET_USER_STORE(store))
  //   },
  //   onError: (error) => {
  //     snackbar.enqueueSnackbar(formatError(error), { variant: "error" })
  //   },
  // })

  const [setPayoutMethod, { data, loading }] =
  useMutation<MutationData2, MutationVars2>(
    SET_PAYOUT_METHOD, {
    variables: {
      payoutType: "BANK",
      bsb: "",
      accountNumber: "",
      accountName: ""
    },
    update: (cache, { data: { setPayoutMethod: { user } } }) => {
    },
    onCompleted: ({ setPayoutMethod: { user }}) => {
      // props.resetPayoutMethodEmail();
      // WARN: SET_USER may be batched with the SET_USER redux call above
      snackbar.enqueueSnackbar(
        `Created your payout account`,
        { variant: "success" }
      )
      dispatch(Actions.reduxModals.TOGGLE_STORE_PAYOUT_CREATE_MODAL(false))
      dispatch(Actions.reduxLogin.SET_USER({
        ...userRedux,
        ...user
      }))
    },
    onError: (error) => {
      snackbar.enqueueSnackbar(formatError(error), { variant: "error" })
    },
  })



  if (!userRedux?.id) {
    return (
      <div className={classes.loginContainer}>
        <Login
          redirectOnComplete={"none"}
          asFormLayout={true}
        />
      </div>
    )
  }

  return (
    <Formik
      // 1. feed product data to edit into formik state.
      initialValues={{
        // payout methods
        bsb: "",
        accountNumber: "",
        accountName: "",
      }}
      validationSchema={validationSchemas.CreateStorePayout}
      onSubmit={(values, { setSubmitting }) => {
        console.log('formik values...: ', values);
        // set payoutMethod after creating a store
        setPayoutMethod({
          variables: {
            payoutType: "BANK",
            bsb: values.bsb,
            accountNumber: values.accountNumber,
            accountName: values.accountName,
          }
        }).then(async({ data: { setPayoutMethod }}) => {
          console.log('payoutMethod response', setPayoutMethod)
          dispatch(Actions.reduxModals.TOGGLE_STORE_PAYOUT_CREATE_MODAL(false))
          dispatch(Actions.reduxLogin.SET_USER(setPayoutMethod.user))
          if (setPayoutMethod?.user) {
            if (typeof props.setListingTypeCallback === 'function') {
              props.setListingTypeCallback()
            }
          }
          if (props.closeModal) {
            props.closeModal()
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
          <CreateStorePayoutFormWrapper
            classes={classes}
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(e)
              e.stopPropagation()
              // NOTE: Formik onSubmit will propagate to other forms on the page
              // for modals, this means clicking "create store" on this modal
              // will attempt a form submission on the "create product" page
              // below, triggering the "touched" fields unwittingly.
              // e.stropPropagation prevents that
            }}
            asModal={props.asModal}
            loading={loading}
          >
            <CreateStoreFields
              title={props.title}
              {...fprops}
            />
            {
              loading &&
              <Loading fixed loading={loading} delay={"200ms"}/>
            }
          </CreateStorePayoutFormWrapper>
        )
      }}
    </Formik>
  )
}



const CreateStorePayoutFormWrapper: React.FC<FormWrapperProps> = (props) => {

  const { classes, loading, onSubmit } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={clsx(classes.formRoot)}>
      <div className={classes.maxWidth720}>
        <div className={
          mdUp ? classes.paperMarginMd : classes.paperMargin
        }>
          <div className={classes.flexColMargin}>
            <Typography color={"primary"} variant="h3">
              Add a Bank Account
            </Typography>
            <br/>
          </div>

          {
            props.asModal &&
            <IconButton
              className={classes.closeButton}
              onClick={() =>
                dispatch(Actions.reduxModals.TOGGLE_STORE_PAYOUT_CREATE_MODAL(false))
              }
              size="large">
              <ClearIcon/>
            </IconButton>
          }

          <form onSubmit={onSubmit}>

            { props.children }

            <div className={classes.flexButtons}>
              <div className={classes.flexButtonItem}>
                <ButtonLoading
                  type="submit" // this sets off Form submit
                  variant={"contained"}
                  color={"secondary"}
                  className={props.classes.button}
                  style={{
                    width: '200px',
                    height: 40,
                  }}
                  loadingIconColor={Colors.lightGrey}
                  replaceTextWhenLoading={true}
                  loading={loading}
                  disabled={!process.browser || loading}
                  onClick={() => {
                    //  type="submit" sets off the obSubmit handler above
                  }}
                >
                  Create Payout Account
                </ButtonLoading>
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

interface FormWrapperProps extends WithStyles<typeof styles> {
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  asModal?: boolean;
  title?: string;
  loading?: boolean;
}

interface ReactProps extends WithStyles<typeof styles> {
  data?: any;
  asModal?: boolean;
  title?: string;
  closeModal?(): void;
  setListingTypeCallback?(): void
}

interface ReduxState {
  userRedux: UserPrivate;
}
interface MutationData2 {
  setPayoutMethod: { user: UserPrivate };
}
interface MutationVars2 {
  payoutType: string;
  bsb: string;
  accountNumber: string;
  accountName: string;
}


export default withStyles(styles)( CreateStorePayoutForm );

