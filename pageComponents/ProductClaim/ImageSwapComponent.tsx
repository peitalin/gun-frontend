import React from "react";
import clsx from "clsx";
// Redux
import { useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
// Typings
import {
  Product,
  ProductPreviewItemInput,
  ListingType,
  ProductType,
  External_Products,
  NewsItem,
} from "typings/gqlTypes";
import { Colors } from "layout/AppTheme";

import {
  ReducerName,
  DzuPreviewOrder,
  DzuPreviewItem
} from "typings/dropzone";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// Errors
import ErrorBounds from 'components/ErrorBounds';
import ButtonLoading from "components/ButtonLoading";
// Subcomponents
import ProductClaimFormLayout from "./ProductClaimFormLayout";
import PreventDragDropContainer from "pageComponents/ProductCreate/ProductCreatePage/PreventDragDropContainer";
// same dir components
import SectionBorder from "pageComponents/ProductCreate/ProductCreatePage/SectionBorder";
// SSR Subcomponents
import dynamic from 'next/dynamic'
import UploadPreviewPlaceholder from "pageComponents/ProductCreate/SSR/UploadPreviewPlaceholder";
const PreviewItemUploaderGrid = dynamic(() => import("pageComponents/ProductCreate/PreviewItemUploaderGrid"), {
  loading: () => <UploadPreviewPlaceholder/>,
  ssr: false,
})

// Validation
import { useFormik, FormikValues } from 'formik';
import { validationSchemas } from "utils/validation";
// Graphql
import { useMutation } from "@apollo/client";
import {
  SWAP_IMAGES_FOR_EXTERNAL_PRODUCT,
} from "queries/news-items-claims-mutations";
import { useRouter } from "next/router";
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  reduxPreviewsToProductPreviewItemInput,
} from "pageComponents/ProductCreate/ProductCreatePage/utils";
import { debounce, useDebounce } from "utils/debounce"


// This component has its own separate ImageSwap/upload logic
// so that it can handle uploading images as the anonymous user
// with the claimId begin adding photos one by one
// These uers may drop out before creating and account and claiming their product
// so we want to reduce the steps needed to begin getting images


const ImageSwapComponent = (props: ReactProps) => {

  // Props & State
  const {
    classes,
    claimId,
  } = props;

  // Redux
  const reducerName: ReducerName = ReducerName.reduxImageSwap
  const snackbar = useSnackbar()

  const [loading, setLoading] = React.useState(false)
  const [
    existingPreviews,
    setExistingPreviews,
  ] = React.useState<ProductPreviewItemInput[]>([])

  const {
    dzuPreviewOrder,
    dzuPreviewItems,
  } = useSelector<GrandReduxState, ReduxState>(state => {
    return {
      dzuPreviewOrder: state[reducerName]?.dzuPreviewOrder,
      dzuPreviewItems: state[reducerName]?.dzuPreviewItems,
    }
  });


  const [
    swapImagesForExternalProduct,
    { data, loading: apolloLoading }
  ] = useMutation<MutationData, MutationVar>(
    SWAP_IMAGES_FOR_EXTERNAL_PRODUCT, {
    variables: {
      claimId: claimId,
      newPreviewItems: [],
    },
    onError: (err) => {
      let errMsg = err?.graphQLErrors?.[0]?.message
      if (errMsg) {
        snackbar.enqueueSnackbar(
          `${errMsg}`,
          { variant: "error", autoHideDuration: 6000 }
        )
        // formik.resetForm()
      }
    },
    onCompleted: async(data: MutationData) => {

      let make = data?.swapImagesForExternalProduct?.externalProduct?.currentExternalProductSnapshot?.make
      let model = data?.swapImagesForExternalProduct?.externalProduct?.currentExternalProductSnapshot?.model
      snackbar.enqueueSnackbar(
        `Updated images for: ${make} ${model}`,
        { variant: "success", autoHideDuration: 3000 }
      )
      setLoading(false)

      // no need to reset form, keep previewItems
      // only need to reset if seller is claiming multiple items from multiple links
    },
  })



  const formik = useFormik<FormikFields>({
    initialValues: {
      claimId: claimId,
      previewItems: [] as ProductPreviewItemInput[],
    },
    validationSchema: validationSchemas.SwapImagesForExternalProduct,
    onSubmit: (values, { setSubmitting, resetForm }) => {

      let newPreviewItems = values.previewItems
      console.log("=>>> dispatching imageSwap with newPreviewItems: ", newPreviewItems)
      snackbar.enqueueSnackbar(
        `Uploading ${newPreviewItems?.length} images`,
        { variant: "info", autoHideDuration: 3000 }
      )
      // Dispatch Apollo Mutation after validation
      return swapImagesForExternalProduct({
        variables: {
          claimId: claimId,
          newPreviewItems: newPreviewItems,
        },
      }).finally(() => {
        setLoading(false)
      })
    }
  })


  const validateThenSubmitForm = async () => {
    let errors = await formik.validateForm()
    if (errors.previewItems) {
      console.log("errorrororor: ", errors)
    } else {
      await formik.submitForm()
    }
  }


  const submitForm = async() => {

    let id1 = JSON.stringify(formik.values.previewItems)
    let id2 = JSON.stringify(existingPreviews)
    let hasChanged = id1 !== id2

    if (hasChanged) {
      validateThenSubmitForm()
      setExistingPreviews(formik.values.previewItems)
    }
  }


  useDebounce(() => {
    // console.log("updating formik.previewItems. isInternal images only")
    let previewItemInputs = reduxPreviewsToProductPreviewItemInput({
        dzuPreviewItems,
        dzuPreviewOrder,
      }).filter(p => p.isInternal)

    formik.setFieldValue("previewItems", previewItemInputs)
    // keep track of whether we need to dispatch updates to the backend
    // if list of previewItemIds have changed order/size
  }, [dzuPreviewItems, dzuPreviewOrder], 250)


  useDebounce(() => {
    submitForm()
  }, [formik.values?.previewItems], 1000)


  // console.log("formik.values.previewItems", formik.values.previewItems)
  // console.log("formik.errors", formik.errors)

  return (
    <PreventDragDropContainer>
      <ProductClaimFormLayout
        onSubmit={formik.handleSubmit} // dispatches to <Formik onSubmit={}/>
      >


        <div className={classes.title}>
          1. Add an Image to your Listing
        </div>

        <SectionBorder thickPadding={true}>
          <PreviewItemUploaderGrid
            reducerName={reducerName}
            ownerId={props.externalProduct.id}
            productId={props.externalProduct.id}
            dzuPreviewItems={dzuPreviewItems}
            dzuPreviewOrder={dzuPreviewOrder}
            claimId={claimId}
            {...formik}
          />
        </SectionBorder>


        {/* <ErrorBounds className={classes.flexButtons}>
          <div className={classes.flexButtonItem}>
            <ButtonLoading
              type="submit" // this sets off Form submit
              className={props.classes.confirmButton}
              variant={"outlined"}
              color={"secondary"}
              style={{
                width: '150px',
                height: 40,
              }}
              loadingIconColor={Colors.ultramarineBlue}
              replaceTextWhenLoading={true}
              loading={loading || apolloLoading}
              disabled={!process.browser || apolloLoading}
              onClick={() => {
                // need to await formikCurrentVariants update
                console.log('errors: ', formik.errors);
                console.log('values: ', formik.values);
                if (formik.errors.previewItems) {
                  snackbar.enqueueSnackbar(
                    formik.errors?.previewItems,
                    { variant: "error", autoHideDuration: 5000 }
                  )
                  setLoading(false)
                } else {
                  setLoading(true)
                }
              }}
            >
              Save Images
            </ButtonLoading>
          </div>
        </ErrorBounds> */}

      </ProductClaimFormLayout>
    </PreventDragDropContainer>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  externalProduct: External_Products;
  claimId: string
}

interface ReduxState {
  dzuPreviewOrder: DzuPreviewOrder[];
  dzuPreviewItems: DzuPreviewItem[];
}

interface FormikFields {
  claimId: string
  previewItems: ProductPreviewItemInput[]
}

export interface MutationData {
  swapImagesForExternalProduct: NewsItem
}
interface MutationVar {
  claimId: string
  newPreviewItems: ProductPreviewItemInput[]
}

export const styles = (theme: Theme) => createStyles({
  title: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: Colors.magenta,
  },
  confirmButton: {
    margin: 0,
    color: Colors.ultramarineBlue,
  },
  // Buttons
  flexButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    width: '100%',
    marginTop: "2rem",
  },
  flexButtonItem: {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexGrow: 1,
    flexBasis: '30%',
    maxWidth: '150px',
  },
})


export default withStyles(styles)( ImageSwapComponent );

