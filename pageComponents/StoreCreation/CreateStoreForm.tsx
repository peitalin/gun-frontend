import React from "react";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from './styles';
import { Colors } from "layout/AppTheme";
// Graphql
import { useMutation, ApolloError } from "@apollo/client";
import { CREATE_STORE } from "queries/store-mutations";
import { GET_USER } from "queries/user-queries";
// Typings
import { StorePrivate, UserPrivate } from "typings/gqlTypes";
import { CreateStoreInput, HtmlEvent } from "typings"
// Components
import Loading from "components/Loading";
import CreateStoreFields from "./CreateStoreFields";
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
// Material UI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";
import Button from "@material-ui/core/Button";
import ButtonLoading from "components/ButtonLoading";
// Validation
import { Formik, FormikProps } from 'formik';
import { validationSchemas } from "utils/validation";
// Icons
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import Login from "layout/Login";
// Graphql Queries
import { UPDATE_USER, SET_PAYOUT_METHOD } from "queries/user-mutations";
import { useRouter } from "next/router";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// store deleted
import { isStoreDeleted, storeDoesNotExist } from "utils/store";




const CreateStoreForm: React.FC<ReactProps> = (props) => {

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

  const [
    storeCreate,
    { data, loading, error }
  ] = useMutation<MutationData, CreateStoreInput>(
    CREATE_STORE, {
    update: (cache, { data }: { data: MutationData }) => {
    },
    onCompleted: async (dataCreateStore: MutationData) => {
      const { createStore: { store } } = dataCreateStore;
      // console.log("createStore.store", store)
      dispatch(Actions.reduxLogin.SET_USER_STORE(store))
    },
    onError: (error) => {
      snackbar.enqueueSnackbar(formatError(error), { variant: "error" })
    },
  })

  const [setPayoutMethod, mutationResponse] =
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
      dispatch(Actions.reduxLogin.SET_USER({
        ...userRedux,
        ...user
      }))
    },
    onError: (error) => {
      snackbar.enqueueSnackbar(formatError(error), { variant: "error" })
    },
  })


  React.useEffect(() => {
    if (!storeDoesNotExist(userRedux?.store)) {
      setTimeout(() => {
        router.replace("/admin/products")
      }, 0)
    }
  }, [userRedux])


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
  if (!storeDoesNotExist(userRedux?.store)) {
    // if store does not exist, or is deleted
    return (
      <div className={classes.loginContainer}>
        <Typography variant="h4" className={classes.storeExists}>
          Your payout account was created.
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            router.push("/admin")
          }}
        >
          View Seller Dashboard
        </Button>
      </div>
    )
  }
  return (
    <Formik
      // 1. feed product data to edit into formik state.
      initialValues={{
        userId: userRedux.id,
        name: "",
        bio: "",
        website: "",
        coverId: "",
        profileId: "",
        // payout methods
        bsb: "",
        accountNumber: "",
        accountName: "",
      }}
      validationSchema={validationSchemas.CreateStore}
      onSubmit={(values, { setSubmitting }) => {
        console.log('formik values...: ', values);
        // Dispatch Apollo Mutation after validation
        storeCreate({
          variables: {
            userId: userRedux?.id,
            name: values.name,
            bio: values.bio,
            website: values.website,
            coverId: values.coverId,
            profileId: values.profileId,
          }
        }).then(({ data: { createStore: { store }}}) => {
          console.log('storeCreated: ', store)
          dispatch(Actions.reduxLogin.SET_USER_STORE(store))
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
            dispatch(Actions.reduxLogin.SET_USER(setPayoutMethod.user))
            if (props.closeModal) {
              props.closeModal()
            }
          })
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
          <CreateStoreFormWrapper
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
            { loading && <Loading fixed loading={loading} delay={"200ms"}/>}
          </CreateStoreFormWrapper>
        )
      }}
    </Formik>
  )
}



const CreateStoreFormWrapper: React.FC<FormWrapperProps> = (props) => {

  const { classes, loading, onSubmit } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className={clsx(classes.formRoot)}>
      <div className={classes.maxWidth720}>
        <div className={
          smUp ? classes.paperMarginMd : classes.paperMargin
        }>
          <div className={classes.flexColMargin}>
            <Typography color={"primary"} variant="h3">
              Create a Payout Account
            </Typography>
            <br/>
          </div>

          {
            props.asModal &&
            <IconButton
              className={classes.closeButton}
              onClick={() =>
                dispatch(Actions.reduxModals.TOGGLE_STORE_CREATE_MODAL(false))
              }
            >
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
  )
}

interface FormWrapperProps extends WithStyles<typeof styles> {
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  asModal?: boolean;
  title?: string;
  loading?: boolean;
}

interface ReduxState {
  userRedux: UserPrivate;
}
interface MutationData {
  createStore: { store: StorePrivate };
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

interface ReactProps extends WithStyles<typeof styles> {
  data?: any;
  asModal?: boolean;
  title?: string;
  closeModal?(): void;
}


export default withStyles(styles)( CreateStoreForm );

