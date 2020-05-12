import React, { useState } from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// // Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// import { ReduxStateStoreEdit } from "reduxStore/store_edit-reducer";

// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from './styles';
// Graphql
import { useMutation } from "@apollo/react-hooks";
import { EDIT_STORE } from "queries/store-mutations";
import { GET_USER } from "queries/user-queries";
// Typings
import { StorePrivate, UserPrivate, PayoutType } from "typings/gqlTypes";
import { EditStoreInput, HtmlEvent } from "typings"
// Components
import Loading from "components/Loading";
import SnackBarA from "components/Snackbars/SnackbarA";
import EditStoreFields from "./EditStoreFields";
// Material UI
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";
import ButtonLoading from "components/ButtonLoading";
// Validation
import { Formik, FormikProps } from 'formik';
import { validationSchemas } from "utils/validation";
// Icons
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
// Graphql Queries
import { UPDATE_USER, SET_PAYOUT_METHOD } from "queries/user-mutations";
import { useRouter } from "next/router";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';



const EditStoreForm: React.FC<ReactProps> = (props) => {

  const { classes, storePrivate } = props;
  const dispatch = useDispatch();

  const userRedux = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  const [state, setState] = React.useState({
    displayErr: true,
    displaySuccess: true,
  })


  const [storeEdit, { data, loading, error }] =
  useMutation<MutationData, EditStoreInput>(
    EDIT_STORE, {
    onError: (err) => console.log(err),
    update: (cache, { data }: { data: MutationData }) => {
      const { editStoreProfile: { store } } = data;

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
        userId: option(userRedux).id(),
        storeId: option(userRedux).store.id(),
        name: option(storePrivate).name(),
        bio: option(storePrivate).bio(),
        website: option(storePrivate).website(),
        coverId: option(storePrivate).coverId(),
        profileId: option(storePrivate).profileId(),
        payoutEmail: option(userRedux).payoutMethod.payoutEmail(),
      }}
      validationSchema={validationSchemas.EditStore}
      onSubmit={(values, { setSubmitting }) => {
        console.log('formik values...: ', values);
        console.log("my storeID", userRedux.store.id)
        // Dispatch Apollo Mutation after validation
        if (values.payoutEmail) {

          let pm1 = storeEdit({
            variables: {
              userId: values.userId,
              storeId: values.storeId,
              name: values.name,
              bio: values.bio,
              website: values.website,
              coverId: values.coverId,
              profileId: values.profileId,
            }
          }).then(res => {
            console.log('store edit response', res)
          })

          let pm2 = setPayoutMethod({
            variables: {
              payoutType: PayoutType.PAYPAL,
              payoutEmail: values.payoutEmail,
              payoutProcessor: "Paypal",
              payoutProcessorId: "id"
            }
          }).then(res2 => {
            // set payoutMethod after creating a store
            console.log('payoutMethod response', res2)
          })

          // await both promises, then close modal
          Promise.all([pm1, pm2]).then(() => {
            if (props.closeEditStoreModal) {
              props.closeEditStoreModal()
            }
          })
        } else {

          // just edit store, no payoutMethod changes
          storeEdit({
            variables: {
              userId: values.userId,
              storeId: values.storeId,
              name: values.name,
              bio: values.bio,
              website: values.website,
              coverId: values.coverId,
              profileId: values.profileId,
            }
          }).then(res => {
            console.log('store edit response', res)
            if (props.closeEditStoreModal) {
              props.closeEditStoreModal()
            }
          })
        }

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
          <EditStoreFormWrapper
            classes={classes}
            onSubmit={handleSubmit}
            asModal={props.asModal}
            closeEditStoreModal={props.closeEditStoreModal}
            loading={loading}
          >
            <EditStoreFields
              title={props.title}
              storePrivate={storePrivate}
              storeId={storePrivate.id}
              {...fprops}
            />
            <SnackBarA
              open={data !== undefined && state.displaySuccess}
              closeSnackbar={() => setState(s => ({ ...s, displaySuccess: false }))}
              message={`Successfully edited store:
                ${option(data).editStoreProfile.store.name("Your store")}`
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
          </EditStoreFormWrapper>
        )
      }}
    </Formik>
  )
}



const EditStoreFormWrapper: React.FC<FormWrapperProps> = (props) => {

  const {
    classes,
    onSubmit,
    loading = false,
  } = props;
  // const dispatch = useDispatch();
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
              Edit Your Store
            </Typography>
            <br/>
          </div>

          {
            props.closeEditStoreModal &&
            <IconButton
              onClick={() => props.closeEditStoreModal()}
              className={classes.closeButton}
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
                  onClick={() => {
                    //  type="submit" sets off the obSubmit handler above
                    console.log('pressed...')
                  }}
                  className={props.classes.button}
                  replaceTextWhenLoading={true}
                  loading={loading}
                  disabled={loading}
                  loadingIconColor={Colors.blue}
                >
                  Edit Seller Profile
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
  closeEditStoreModal?(): void;
  loading?: boolean;
}

interface MutationData {
  editStoreProfile: { store: StorePrivate }
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
  storePrivate: StorePrivate;
  closeEditStoreModal?(): void;
}


export default withStyles(styles)( EditStoreForm );

