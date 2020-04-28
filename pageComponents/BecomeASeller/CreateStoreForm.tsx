import React from "react";
import { oc as option } from "ts-optchain";
import { useState } from "react";
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
import { useMutation } from "@apollo/react-hooks";
import { CREATE_STORE } from "queries/store-mutations";
import { GET_USER } from "queries/user-queries";
// Typings
import { StorePrivate, UserPrivate, PayoutType } from "typings/gqlTypes";
import { CreateStoreInput, HtmlEvent } from "typings"
// Components
import Loading from "components/Loading";
import SnackBarA from "components/Snackbars/SnackbarA";
import CreateStoreFields from "./CreateStoreFields";
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
import { isStoreDeleted, storeCreateRedirectCondition } from "utils/store";
// uuidv4
import { v4 as uuidv4 } from "uuid"


const CreateStoreForm: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const dispatch = useDispatch();
  const router = useRouter();

  const [state, setState] = React.useState({
    displayErr: true,
    displaySuccess: true,
  })

  const userRedux = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  const [storeCreate, { data, loading, error }] =
  useMutation<MutationData, CreateStoreInput>(
    CREATE_STORE, {
    onError: (e) => console.log(e),
    update: (cache, { data }: { data: MutationData }) => {
      const { createStore: { store } } = data;

      try {
        dispatch(Actions.reduxLogin.SET_USER({ ...userRedux, store }))
        cache.writeQuery({
          query: GET_USER,
          data: {
            user: {
              ...userRedux,
              store: store
            }
          }
        });
      } catch (error) {
        console.log("Query `GET_USER` doesn't exist in cache, no update needed");
      }
    },
  })

  const [setPayoutMethod, mutationResponse] =
  useMutation<MutationData2, MutationVars2>(
    SET_PAYOUT_METHOD, {
    update: (cache, { data: { setPayoutMethod: { user } } }) => {

      // props.resetPayoutMethodEmail();
      // update redux user, this is the one that triggers UI update
      dispatch(Actions.reduxLogin.SET_USER({
        ...userRedux,
        ...user
      }))

      try {
        // update cache as well for GET_USER query
        cache.writeQuery({
          query: GET_USER,
          data: {
            user: { ...userRedux, ...user }
          },
        });
      } catch (error) {
        console.log(error)
      }
    },
    variables: {
      payoutType: PayoutType.PAYPAL,
      payoutEmail: "",
      payoutProcessor: "Paypal",
      payoutProcessorId: "id"
    }
  })

  return (
    <Formik
      // 1. feed product data to edit into formik state.
      initialValues={{
        userId: userRedux.id,
        storeId: `store_${uuidv4()}`, // generate new storeId
        name: "",
        bio: "",
        website: "",
        coverId: "",
        profileId: "",
        payoutEmail: "",
      }}
      validationSchema={validationSchemas.CreateStore}
      onSubmit={(values, { setSubmitting }) => {
        console.log('formik values...: ', values);
        // Dispatch Apollo Mutation after validation
        storeCreate({
          variables: {
            storeId: values.storeId,
            userId: values.userId,
            name: values.name,
            bio: values.bio,
            website: values.website,
            coverId: values.coverId,
            profileId: values.profileId,
          }
        }).then(res => {
          // set payoutMethod after creating a store
          setPayoutMethod({
            variables: {
              payoutType: PayoutType.PAYPAL,
              payoutEmail: values.payoutEmail,
              payoutProcessor: "Paypal",
              payoutProcessorId: "id"
            }
          }).then(res2 => {
            console.log('payoutMethod response', res2)
            // router.push("/seller?created=store")
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


        if (!storeCreateRedirectCondition(option(userRedux).store())) {
          // if store does not exist, or is deleted
          return (
            <div className={classes.loginContainer}>
              <Typography variant="h4" className={classes.storeExists}>
                Your store was created.
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  router.push("/seller")
                }}
              >
                View Seller Dashboard
              </Button>
            </div>
          )
        }

        if (!option(userRedux).id()) {
          return (
            <div className={classes.loginContainer}>
              <Login redirectOnComplete={"none"}/>
            </div>
          )
        }

        return (
          <CreateStoreFormWrapper
            classes={classes}
            onSubmit={handleSubmit}
            asModal={props.asModal}
            loading={loading}
          >
            <CreateStoreFields
              title={props.title}
              {...fprops}
            />
            <SnackBarA
              open={data !== undefined && state.displaySuccess}
              closeSnackbar={() => setState(s => ({ ...s, displaySuccess: false }))}
              message={`Successfully created store:
                ${option(data).createStore.store.name("Your store")}`
              }
              variant={"success"}
              autoHideDuration={3000}
            />
            <SnackBarA
              open={error !== undefined && state.displayErr}
              closeSnackbar={() => setState(s => ({ ...s, displayErr: false }))}
              message={`Oh oh: ${JSON.stringify(error)}`}
              variant={"error"}
              autoHideDuration={3000}
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
              Create Store
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
                    width: '180px',
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
                  Create Store
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

interface MutationData {
  createStore: { store: StorePrivate };
}
interface MutationData2 {
  setPayoutMethod: { user: UserPrivate };
}
interface MutationVars2 {
  payoutType: PayoutType;
  payoutEmail: string;
  payoutProcessor: string;
  payoutProcessorId: string;
}

interface ReactProps extends WithStyles<typeof styles> {
  data?: any;
  asModal?: boolean;
  title?: string;
}


export default withStyles(styles)( CreateStoreForm );

