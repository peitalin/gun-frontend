import React from "react";
import clsx from "clsx";
// Redux
import { useSelector } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// Typings
import {
  UserPrivate,
  Product,
  ProductMutationResponse,
  StoreMutationResponse,
} from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// Utils Components
import Loading from "components/Loading";
import ProductDetails from "./ProductDetails";
import SellerDetails from "./SellerDetails";
// Components
import SuspendProductFormWrapper from "./SuspendProductFormWrapper";
import SuspendStoreFormWrapper from "./SuspendStoreFormWrapper";
import ViewParagraph from "../ViewerParagraph";

// Graphql
import { useMutation, useApolloClient } from "@apollo/client";
import {
  SUSPEND_UNSUSPEND_PRODUCT,
  SUSPEND_UNSUSPEND_STORE,
} from "queries/admin-products-mutations";
// Validation
import { Formik } from 'formik';
import { validationSchemas } from "utils/validation";
// Snackbar
import { useSnackbar } from "notistack";



const UserProfileForm: React.FC<ReactProps> = (props) => {

  const {
    classes,
    product,
  } = props;

  const aClient = useApolloClient();
  const snackbar = useSnackbar();

 // state
  const [loading, setLoading] = React.useState(false);

  const [
    susUnsusProduct,
    susUnsusProductResponse
  ] = useMutation<MData, MVar>(
    SUSPEND_UNSUSPEND_PRODUCT, {
    variables: {
      productId: product?.id,
      isSuspended: false,
    },
    onCompleted: (data) => {
      props.searchProduct(product?.id)
    },
  });

  const [
    susUnsusStore,
    susUnsusStoreResponse,
  ] = useMutation<MData2, MVar2>(
    SUSPEND_UNSUSPEND_STORE, {
    variables: {
      storeId: product?.store?.id, // initial variables
      isSuspended: false,
    },
    onCompleted: (data) => {
      props.searchProduct(product?.id)
    },
  });

  const toggleSuspendProduct = async(
    { productId, isSuspended }: { productId: string, isSuspended: boolean }
  ) => {
    console.log("suspending/unsuspending productId", productId);
    setLoading(true)
    await susUnsusProduct({
      variables: {
        productId: product?.id,
        isSuspended: isSuspended
      }
    })
    setLoading(false)
    let { data, error } = susUnsusProductResponse

    alert(JSON.stringify({ VERIFIED: data?.suspendUnsuspendProduct }));
    if (error) {
      snackbar.enqueueSnackbar(
        `Product (un)suspension failed with msg: ${error}`,
        { variant: "error" }
      )
    }
    return data;
  }


  const toggleSuspendStore = async(
    { storeId, isSuspended }: { storeId: string, isSuspended: boolean }
  ) => {
    console.log("suspending/unsuspending storeId", storeId);
    setLoading(true)
    await susUnsusStore({
      variables: {
        storeId: product?.store?.id, // initial variables
        isSuspended: isSuspended
      }
    })
    setLoading(false)
    let { data, error } = susUnsusStoreResponse

    alert(JSON.stringify({ VERIFIED: data?.suspendUnsuspendStore }));
    if (error) {
      snackbar.enqueueSnackbar(
        `Store (un)suspension failed with msg: ${error}`,
        { variant: "error" }
      )
    }
    return data;
  }



  return (
    <>
      <Formik
        initialValues={{
          productId: product?.id,
          isSuspended: false,
        }}
        validationSchema={validationSchemas.SuspendUnsuspendProduct}
        onSubmit={(values, { setSubmitting }) => {
          console.log('formik values: ', values);
          toggleSuspendProduct({
            productId: product?.id,
            isSuspended: !product.isSuspended,
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
            <SuspendProductFormWrapper
              handleSubmit={handleSubmit}
              isSuspended={product?.isSuspended}
              onClickDebugPrint={() => {
                console.log("fprops.errors:", fprops.errors)
                setLoading(false)
              }}
              {...fprops}
            >
              <div className={classes.backButton}>
                <IconButton onClick={() => props.setProduct(undefined)}>
                  <KeyboardArrowLeft/>
                </IconButton>
                <Typography className={classes.goBackText} variant="subtitle2">
                  Go Back
                </Typography>
              </div>
              <ViewParagraph title={"Product Summary"}>
                <ProductDetails
                  product={product}
                  {...fprops}
                />
              </ViewParagraph>
              <Loading fixed loading={loading}/>
            </SuspendProductFormWrapper>
          )
        }}
      </Formik>

      <Formik
        initialValues={{
          storeId: product?.store?.id,
          isSuspended: false,
        }}
        validationSchema={validationSchemas.SuspendUnsuspendStore}
        onSubmit={(values, { setSubmitting }) => {
          console.log('suspendUnsuspendStore formik values: ', values);
          toggleSuspendStore({
            storeId: product?.store?.id,
            isSuspended: !product.store?.isSuspended,
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
            <SuspendStoreFormWrapper
              handleSubmit={handleSubmit}
              isSuspended={product?.store?.isSuspended}
              onClickDebugPrint={() => {
                console.log("fprops.errors:", fprops.errors)
                setLoading(false)
              }}
              {...fprops}
            >
              <ViewParagraph title={"Seller Summary"}>
                <SellerDetails
                  product={product}
                  {...fprops}
                />
              </ViewParagraph>
              <Loading fixed loading={loading}/>
            </SuspendStoreFormWrapper>
          )
        }}
      </Formik>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  setProduct(a: any): void;
  searchProduct(productId: string): void;
}

interface MData {
  suspendUnsuspendProduct: ProductMutationResponse
}
interface MVar {
  productId: string
  isSuspended: boolean
}

interface MData2 {
  suspendUnsuspendStore: StoreMutationResponse
}
interface MVar2 {
  storeId: string
  isSuspended: boolean
}



const styles = (theme: Theme) => createStyles({
  goBackText: {
    marginLeft: '0.5rem',
  },
  backButton: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
  },
});


export default withStyles(styles)( UserProfileForm );



