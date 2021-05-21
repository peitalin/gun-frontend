import React from "react";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector, batch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { ReduxStateProductEdit } from "reduxStore/product_edit-reducer";
import {
  productToProductEditInput,
  previewsToDzuPreviews,
} from "utils/conversions";

// Typings
import {
  Product,
  ProductEditInput,
  ProductVariantInput,
  UserPrivate,
  ID,
} from "typings/gqlTypes";
import { Colors } from "layout/AppTheme";

import {
  ReducerName,
  DzuFilePreview,
  DzuPreviewOrder,
  DzuPreviewItem
} from "typings/dropzone";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./commonStyles";
// MUI
import Button from "@material-ui/core/Button";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
// Errors
import ErrorBounds from 'components/ErrorBounds';
import ButtonLoading from "components/ButtonLoading";
// Subcomponents
import ProductEditFormLayout from "./ProductEditFormLayout";
import Title from "pageComponents/ProductCreate/TitleSerialNumber";
import BackTo from "components/BackTo";
import Typography from "@material-ui/core/Typography";
// Subcomponents
import TitleSerialNumber from "pageComponents/ProductCreate/TitleSerialNumber";
import GunAttributes from "pageComponents/ProductCreate/GunAttributes";
import Description from "pageComponents/ProductCreate/Description";
import PricingLicenses from "pageComponents/ProductCreate/PricingLicenses";
import PreventDragDropContainer from "pageComponents/ProductCreate/ProductCreatePage/PreventDragDropContainer";

import SelectFieldPlaceholder from "pageComponents/ProductCreate/SSR/SelectFieldPlaceholder";
// const SelectTags = dynamic(() => import("pageComponents/ProductCreate/SelectTags"), {
//   loading: () => <SelectTagsPlaceholder/>,
//   ssr: false,
// })
// import SelectCategories from "pageComponents/ProductCreate/SelectCategories"
const SelectCategories = dynamic(() => import("pageComponents/ProductCreate/SelectCategories"), {
  loading: () => <SelectFieldPlaceholder title={"Category"}/>,
  ssr: false,
})
const SelectSellerLicense = dynamic(() => import("pageComponents/ProductCreate/SelectSellerLicense"), {
  loading: () => <SelectFieldPlaceholder title={"License"}/>,
  ssr: false,
})
// import SelectActionType from "pageComponents/ProductCreate/SelectFieldPlaceholder"
const SelectActionType = dynamic(() => import("pageComponents/ProductCreate/SelectActionType"), {
  loading: () => <SelectFieldPlaceholder title={"Action Type"}/>,
  ssr: false,
})
// import SelectCondition from "pageComponents/ProductCreate/SelectCondition"
const SelectCondition = dynamic(() => import("pageComponents/ProductCreate/SelectCondition"), {
  loading: () => <SelectFieldPlaceholder title={"Condition"}/>,
  ssr: false,
})
// import SelectDealer from "pageComponents/ProductCreate/SelectDealer"
const SelectDealer = dynamic(() => import("pageComponents/ProductCreate/SelectDealer"), {
  loading: () => <SelectFieldPlaceholder title={"Dealer"}/>,
  ssr: false,
})
// same dir components
import SectionBorder from "pageComponents/ProductCreate/ProductCreatePage/SectionBorder";
// Product Preview Page
import Tooltip from '@material-ui/core/Tooltip';

// SSR Subcomponents
import dynamic from 'next/dynamic'
import UploadInputPlaceholder from "pageComponents/ProductCreate/SSR/UploadInputPlaceholder";
import UploadPreviewPlaceholder from "pageComponents/ProductCreate/SSR/UploadPreviewPlaceholder";
const PreviewItemUploaderGrid = dynamic(() => import("pageComponents/ProductCreate/PreviewItemUploaderGrid"), {
  loading: () => <UploadPreviewPlaceholder/>,
  ssr: false,
})

// Validation
import { FormikErrors, useFormik } from 'formik';
import { validationSchemas } from "utils/validation";
// Graphql
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { EDIT_PRODUCT } from "queries/products-mutations";
import { useRouter } from "next/router";
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  reduxToFormikCurrentVariants
} from "pageComponents/ProductCreate/ProductCreatePage";
import { cacheUpdateEditProduct } from "./cacheUpdateEditProduct";




const ProductEditPage = (props: ReactProps) => {

  // Props & State
  const {
    classes,
    asModal,
    closeModal,
  } = props;
  const router = useRouter();

  // Redux
  const reducerName: ReducerName = ReducerName.reduxProductEdit;
  const actions = Actions[reducerName];
  const dispatch = useDispatch();
  const snackbar = useSnackbar();

  const [state, setState] = React.useState<{ loading: boolean }>({
    loading: false,
  });

  const {
    reduxProductEdit, // Seeded product edit data from redux
    dzuPreviewOrder,
    dzuPreviewItems,
    user,
  } = useSelector<GrandReduxState, ReduxState>(state => {
    return {
      reduxProductEdit: state[reducerName],
      dzuPreviewOrder: state[reducerName]?.dzuPreviewOrder,
      dzuPreviewItems: state[reducerName]?.dzuPreviewItems,
      user: state.reduxLogin.user,
    }
  });


  const [
    productEdit,
    { data, loading: apolloLoading }
  ] = useMutation<MutationData, MutationVar>(
    EDIT_PRODUCT, {
    variables: {
      productEditInput: undefined
    },
    onError: (err) => {
      let errMsg = err?.graphQLErrors?.[0]?.message ?? JSON.stringify(err)
      if (errMsg) {
        snackbar.enqueueSnackbar(
          `${errMsg}`,
          { variant: "error", autoHideDuration: 6000 }
        )
        formik.resetForm()
      }
    },
    onCompleted: async(data: MutationData) => {

      dispatch(Actions.reduxModals.TOGGLE_PRODUCT_EDIT_MODAL(false))

      let editProductTitle = data?.editProduct?.product?.currentSnapshot?.title;
      snackbar.enqueueSnackbar(
        `Successfully edited listing: ${editProductTitle}`,
        { variant: "success", autoHideDuration: 3000 }
      )
      // router.back()
      router.push("/admin/products")
      setState(s => ({ ...s, loading: false }))

      setTimeout(() => {
        // reset redux form
        dispatch(actions.RESET_PRODUCT_EDIT())
      }, 200)
    },
    update: (cache, { data: { editProduct }}) => {
      cacheUpdateEditProduct({
        cache: cache,
        editProduct: editProduct,
      })
    }
  })

  const productEditInput = productToProductEditInput(props.product)

  const formik = useFormik({
    initialValues: {
      ...productEditInput
    },
    validationSchema: validationSchemas.ProductEdit,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      console.log("dispatching productEdit with values: ", values)
      // // Dispatch Apollo Mutation after validation
      productEdit({
        variables: {
          productEditInput: {
            title: values.title,
            description: values.description,
            condition: values.condition,
            make: values.make,
            model: values.model,
            ammoType: values.ammoType,
            actionType: values.actionType,
            caliber: values.caliber,
            serialNumber: values.serialNumber,
            location: values.location,
            categoryId: values.categoryId,
            currentVariants: values.currentVariants,
            isPublished: values.isPublished,
            allowBids: values.allowBids,
            productId: values.productId,
            dealerId: values.dealerId,
            magazineCapacity: values.magazineCapacity,
            barrelLength: values.barrelLength,
            sellerLicenseId: values.sellerLicenseId,
          }
        },
      }).finally(() => {
        setState(s => ({ ...s, loading: false }))
      })
    }
  })


  React.useEffect(() => {
    if (productEditInput?.productId) {

      console.log("seeding product edit data")
      const actions = Actions.reduxProductEdit;

      let dzuPreviewItemInputs = previewsToDzuPreviews(
        props.product?.featuredVariant?.previewItems ?? []
      );

      batch(() => {
        dispatch(actions.UPDATE_PRODUCT_EDIT(productEditInput))
        dispatch(actions.SET_PREVIEW_ITEMS(dzuPreviewItemInputs))
      })
    }
  }, [props.product])


  React.useEffect(() => {
    console.log("updating formik.currentVariants")
    formik.setFieldValue(
      "currentVariants",
      reduxToFormikCurrentVariants(
        productEditInput,
        dzuPreviewItems,
        dzuPreviewOrder,
      )
    );
  }, [dzuPreviewItems])
  // console.log("formik.values", formik.values)
  // console.log("formik.errors", formik.errors)

  return (
    <PreventDragDropContainer>
      <ProductEditFormLayout
        classes={classes}
        asModal={asModal}
        closeModal={closeModal}
        onSubmit={formik.handleSubmit} // dispatches to <Formik onSubmit={}/>
      >
        <Typography className={classes.title} variant="h2">
          Edit Product
        </Typography>
        <BackTo
          textLink={true}
          title={"Back to Products"}
        />
        <SectionBorder thickPadding={true}>
          <TitleSerialNumber {...formik} />
          <SelectCategories
            {...formik}
          />
          <SelectSellerLicense
            user={user}
            sellerLicenseId={props.product?.sellerLicenseId} // only for product edit
            {...formik}
          />
          <SelectActionType
            {...formik}
          />
        </SectionBorder>

        <SectionBorder thickPadding={true}>
          <SelectDealer
            {...formik}
          />
        </SectionBorder>

        <SectionBorder thickPadding={true}>
          <GunAttributes {...formik} />
          <SelectCondition
            {...formik}
          />
        </SectionBorder>

        <SectionBorder thickPadding={true}>
          <Description
            {...formik}
          />
        </SectionBorder>

        <SectionBorder thickPadding={true}>
          <PreviewItemUploaderGrid
            reducerName={reducerName}
            productInput={productEditInput}
            storeId={props.product.store.id}
            productId={props.product.id}
            dzuPreviewItems={dzuPreviewItems}
            dzuPreviewOrder={dzuPreviewOrder}
            {...formik}
          />
        </SectionBorder>

        <SectionBorder thickPadding={true}>
          <PricingLicenses
            reducerName={reducerName}
            currentVariants={formik.values.currentVariants}
            {...formik}
          />
        </SectionBorder>

        <ErrorBounds className={classes.flexButtons}>
          <div className={classes.flexButtonItem}>
            <Button
              style={{ width: 150 }}
              variant={"outlined"}
              color={"primary"}
              onClick={() => router.back()}
              className={props.classes.backButton}
            >
              Back to Listings
            </Button>
          </div>

          <div className={classes.flexButtonSpacer}/>
          <div className={classes.flexButtonSpacer}/>
          <div className={classes.flexButtonItem}>
            <ButtonLoading
              type="submit" // this sets off Form submit
              className={props.classes.editButton}
              variant={"outlined"}
              color={"secondary"}
              style={{
                width: '150px',
                height: 40,
              }}
              loadingIconColor={Colors.ultramarineBlue}
              replaceTextWhenLoading={true}
              loading={state.loading || apolloLoading}
              disabled={!process.browser || apolloLoading}
              // disable during apolloDispatch, not when state.loading = true
              // state.loading comes first, don't disable the form accidentally
              onClick={() => {
                // need to await formikCurrentVariants update
                if (isFormikDisabled(formik.errors)) {
                  snackbar.enqueueSnackbar(
                    printValidationErrors(formik.errors),
                    { variant: "error", autoHideDuration: 5000 }
                  )
                  setState(s => ({ ...s, loading: false }))
                } else {
                  setState(s => ({ ...s, loading: true }))
                }
                console.log('errors: ', formik.errors);
                console.log('values: ', formik.values);
              }}
            >
              Save Changes
            </ButtonLoading>
          </div>
        </ErrorBounds>
      </ProductEditFormLayout>
    </PreventDragDropContainer>
  )
}


const isFormikDisabled = (
  errors: FormikErrors<ProductEditInput>,
) => {
  let formikErrors = Object.keys(errors)
  return formikErrors.length > 0
}

const printValidationErrors = (
  errors: FormikErrors<ProductEditInput>
): string => {
  // watch out for nested objects which may not be strings
  // if using Object.values()
  console.log("errors:", errors)
  // let priceError = errors?.currentVariants?.[0]?.price;
  // let priceWasError = errors?.currentVariants?.[0]?.priceWas;
  // let previewItemsError = errors?.currentVariants?.[0]?.previewItems;

  let priceError = errors?.currentVariants?.[0];
  let priceWasError = errors?.currentVariants?.[0];
  let previewItemsError = errors?.currentVariants?.[0];

  let { currentVariants, ...filterErrors }: any = errors

  if (priceError) {
    filterErrors = { ...filterErrors, price: priceError }
  }
  if (priceWasError) {
    filterErrors = { ...filterErrors, priceWas: priceWasError }
  }
  if (previewItemsError) {
    filterErrors = { ...filterErrors, previewItems: previewItemsError }
  }

  const errorMsg = Object.keys(filterErrors).join(", ")
  return `Please check: ${errorMsg}`
}

interface ReactProps extends WithStyles<typeof styles> {
  asModal?: boolean;
  closeModal(): void;
  product: Product;
}

interface ReduxState {
  reduxProductEdit: ReduxStateProductEdit;
  dzuPreviewOrder: DzuPreviewOrder[];
  dzuPreviewItems: DzuPreviewItem[];
  user: UserPrivate
}

export interface MutationData {
  editProduct: { product: Product }
}
interface MutationVar {
  productEditInput: ProductEditInput
}


export default withStyles(styles)( ProductEditPage );

