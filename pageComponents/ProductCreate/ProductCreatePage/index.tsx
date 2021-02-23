import React from "react";
import clsx from "clsx";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { ReduxStateProductCreate } from "reduxStore/product_create-reducer";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from '../commonStyles';
// MUI
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// Components
import ErrorBounds from 'components/ErrorBounds';
import Loading from "components/Loading";
import DisplaySnackBars from "./DisplaySnackBars";
import Switch from '@material-ui/core/Switch';
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
// Subcomponents
import TitleSerialNumber from "../TitleSerialNumber";
import GunAttributes from "../GunAttributes";
import Description from "../Description";
import PricingLicenses from "../PricingLicenses";
import StoreOrLogin from "../StoreOrLogin";

import SelectTags from "../SelectTags";
import SelectFieldPlaceholder from "../SSR/SelectFieldPlaceholder";
// const SelectTags = dynamic(() => import("../SelectTags"), {
//   loading: () => <SelectTagsPlaceholder/>,
//   ssr: false,
// })
// import SelectCategories from "../SelectCategories"
const SelectCategories = dynamic(() => import("../SelectCategories"), {
  loading: () => <SelectFieldPlaceholder title={"Category"}/>,
  ssr: false,
})
// import SelectActionType from "../SelectFieldPlaceholder"
const SelectActionType = dynamic(() => import("../SelectActionType"), {
  loading: () => <SelectFieldPlaceholder title={"Action Type"}/>,
  ssr: false,
})
// import SelectCondition from "../SelectCondition"
const SelectCondition = dynamic(() => import("../SelectCondition"), {
  loading: () => <SelectFieldPlaceholder title={"Condition"}/>,
  ssr: false,
})
// import SelectDealer from "../SelectDealer"
const SelectDealer = dynamic(() => import("../SelectDealer"), {
  loading: () => <SelectFieldPlaceholder title={"Dealer"}/>,
  ssr: false,
})
// same dir components
import ProductCreateButton from "./ProductCreateButton";
import ProductCreateForm from "./ProductCreateForm";
import ProductCreateLayout from "./ProductCreateLayout";
import StoreOrLoginContainer from "./StoreOrLoginContainer";
import SectionBorder from "./SectionBorder";
// Product Preview Page
import Tooltip from '@material-ui/core/Tooltip';

// SSR Subcomponents
import dynamic from 'next/dynamic'
import UploadInputPlaceholder from "../SSR/UploadInputPlaceholder";
import UploadPreviewPlaceholder from "../SSR/UploadPreviewPlaceholder";
const PreviewItemUploader = dynamic(() => import("../PreviewItemUploaderGrid"), {
  loading: () => <UploadPreviewPlaceholder/>,
  ssr: false,
})
// Graphql
import { GET_PRODUCT_CATEGORIES } from "queries/categories-queries";
import { useQuery } from '@apollo/client';
import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_PRODUCT } from "queries/products-mutations";
// import { GET_RECOMMENDED_PRODUCTS } from "queries/products-queries";

// Typings
import {
  ID,
  ProductCreateInput,
  Product,
  Categories,
  UserPrivate,
  ProductVariantInput,
  StorePrivate,
} from "typings/gqlTypes";
import {
  ProductCreateInputFrontEnd,
  ProductCreateEditCommonInput,
} from "typings"
import {
  ReducerName,
  DzuPreviewOrder,
  DzuPreviewItem,
} from "typings/dropzone";
// Validation
import { Formik, FormikErrors } from 'formik';
import { validationSchemas } from "utils/validation";
// router
import { useRouter } from "next/router";
import Portal from "@material-ui/core/Portal"
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { serializeHtml } from 'components/TextEditor/helpersSerializers';
// Video Preview
import { getYouTubeVimeoImagePreview } from "utils/links";





// NOTES:
// <Button type="submit".../> must be inside <form onSubmit={onSubmit} ... />
// <ButtonLoading is a wrapper around <Button type="submit"...>
// <Button disable={}/> will disable the Button from dispatching events to <form>
// Validation is triggered during dispatch to <form>




const ProductCreatePage = (props: ReactProps) => {

  // Props + State
  const { classes, asModal, closeModal } = props;
  const [state, setState] = React.useState<{ loading: boolean }>({
    loading: false,
  });
  const [showBeforeAfterPreviews, setShowBeforeAfterPreviews] = React.useState(false);
  const [loadCarouselPics, setLoadCarouselPics] = React.useState({});
  const [openPreviewPage, setOpenPreviewPage] = React.useState(false);

  // CSS media queries
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  // Redux
  const aClient = useApolloClient();
  const reducerName: ReducerName = ReducerName.reduxProductCreate;
  const actions = Actions[reducerName];
  const dispatch = useDispatch();
  // Snackbar
  const snackbar = useSnackbar();

  const {
    reduxProductCreate,
    dzuPreviewOrder,
    dzuPreviewItems,
    user,
    storeId
  } = useSelector<GrandReduxState, ReduxState>(state => {
    return {
      reduxProductCreate: state[reducerName],
      dzuPreviewOrder: state[reducerName]?.dzuPreviewOrder,
      dzuPreviewItems: state[reducerName]?.dzuPreviewItems,
      user: state?.reduxLogin?.user,
      storeId: state?.reduxLogin?.user?.store?.id,
    }
  });

  const productCreateInput = reduxProductCreate.productCreateInput;
  const currentVariants = reduxProductCreate.productCreateInput.currentVariants;

  // Apollo Mutation
  const [productCreate, { loading, error, data }] =
  useMutation<MutationData, MutationVar>(CREATE_PRODUCT, {
    variables: { productCreateInput: { ...productCreateInput } },
    onError: (err) => console.log(err),
    onCompleted: async(data: MutationData) => {
      // transition to product creation success page
      setTimeout(() => closeModal(), 200)
      // reset redux form
      setTimeout(() => {
        // console.log(values)
        router.push("/admin/products?created=product")
        // scroll to top
        window.scrollTo(0, 0);
        dispatch(actions.RESET_PRODUCT_CREATE())
      }, 200);
    }
  })


  // Apollo Graphql
  const categoryData = useQuery<{ categories: Categories[] }, null>(
    GET_PRODUCT_CATEGORIES
  )

  const categories = (categoryData?.data?.categories ?? []);


  const onSubmitFormik = (values, { setSubmitting, resetForm }) => {
    console.log("dispatching productCreate with values: ", values)
    // let htmlDescription = serializeHtml(values.description)
    // Apollo Mutation
    productCreate({
      variables: {
        productCreateInput: {
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
          dealerId: values.dealerId,
          dealer: values.dealer,
          categoryId: values.categoryId,
          tags: (values.tags as string[]).join(','),
          isPublished: values.isPublished,
          currentVariants: values.currentVariants,
        }
      },
    }).then(res => {

      setTimeout(() => {
        resetForm()
        // wait 500ms for page transition before trying to reset form
      }, 200)
    })
  }

  const disableForm =
      (!user?.id || // no user
      !user?.store?.id || // or no store
      user?.store?.isDeleted)  // or deleted store


  return (
    <Formik
      initialValues={productCreateInput}
      validationSchema={validationSchemas.ProductCreate}
      onSubmit={onSubmitFormik}
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

        let currentVariantsInput = reduxToFormikCurrentVariants(
          productCreateInput,
          dzuPreviewItems,
          dzuPreviewOrder,
        )

        const processProductData = ({ publishNow }: { publishNow: boolean }) => {
          fprops.setFieldValue("isPublished", publishNow);
          // update formik with redux currentVariants
          fprops.setFieldValue("currentVariants", currentVariantsInput);
          setTimeout(() => {
            // need to await formikCurrentVariants update
            if (isFormikDisabled(errors)) {
              snackbar.enqueueSnackbar(
                printValidationErrors(errors),
                { variant: "error", autoHideDuration: 900000 }
              )
            } else {
              setState(s => ({ ...s, loading: true }))
            }
          }, 0)
          // console.log('order: ', dzuPreviewOrder);
          // console.log('fileIds: ', dzuFiles);
          // console.log('dzuPreviewItems: ', reduxProductCreate.dzuPreviewItems);
          // console.log('values: ', values);
          // console.log('values.currentVariants: ', values.currentVariants);
          // console.log('errors', errors);
          //// ProductCreateButton has prop: type="submit"
          //// which will then call form onSubmit={onSubmitFormik}
        }

        // console.log('values: ', values);
        // console.log('values.currentVariants: ', values.currentVariants);

        return (
          <ProductCreateLayout
            productPreviewSticky={productCreateInputToProduct(
              fprops.values,
              categories,
              currentVariantsInput,
              user?.store,
            )}
            loadCarouselPics={loadCarouselPics}
            setLoadCarouselPics={setLoadCarouselPics}
            asModal={asModal}
            closeModal={closeModal}
          >
              <DisplaySnackBars error={error} data={data}/>

              <StoreOrLoginContainer>
                <StoreOrLogin
                  user={user}
                  disableLoginButton={true}
                  buttonText={"Create Store"}
                />
                {/* <div>
                  <a onClick={() => {
                      console.log("fprops.values: ", fprops.values)
                      console.log("fprops.errors: ", fprops.errors)
                    }}
                    className={classes.printFormikValues}
                  >
                    print formik values
                  </a>
                </div> */}
              </StoreOrLoginContainer>

              <ProductCreateForm
                classes={classes}
                asModal={asModal}
                closeModal={closeModal}
                onSubmit={handleSubmit} // dispatches to <Formik onSubmit={}/>
                disableForm={disableForm}
              >

                <SectionBorder>
                  <TitleSerialNumber {...fprops} />
                  <SelectCategories
                    {...fprops}
                  />
                  <SelectActionType
                    {...fprops}
                  />
                </SectionBorder>

                <SectionBorder>
                  <SelectDealer
                    {...fprops}
                  />
                </SectionBorder>

                <SectionBorder style={{ paddingBottom: '1rem' }}>
                  <GunAttributes {...fprops} />
                  <SelectCondition
                    {...fprops}
                  />
                </SectionBorder>

                <SectionBorder>
                  <Description
                    {...fprops}
                  />
                  {/* <SelectTags
                    reducerName={reducerName}
                    {...fprops}
                  /> */}
                </SectionBorder>

                <SectionBorder>
                  <PreviewItemUploader
                    reducerName={reducerName}
                    productInput={productCreateInput}
                    storeId={storeId}
                    dzuPreviewItems={dzuPreviewItems}
                    dzuPreviewOrder={dzuPreviewOrder}
                    {...fprops}
                  />
                </SectionBorder>

                <SectionBorder>
                  <PricingLicenses
                    reducerName={reducerName}
                    currentVariants={productCreateInput.currentVariants}
                    {...fprops}
                  />
                </SectionBorder>

                <ProductCreateButtonWrapper {...props}>
                  {
                    process.browser &&
                    <>
                      <ProductCreateButton
                        // Save Draft Button
                        classes={classes}
                        onClick={() => processProductData({ publishNow: false }) }
                        postInstantly={false}
                        loading={state.loading}
                        errors={errors}
                        disabled={isFormikDisabled(errors) || state.loading}
                      />
                      <div className={classes.flexButtonSpacer}/>
                      <ProductCreateButton
                        // Post Instantly Button
                        classes={classes}
                        onClick={() => processProductData({ publishNow: true }) }
                        postInstantly={true}
                        loading={state.loading}
                        errors={errors}
                        disabled={isFormikDisabled(errors) || state.loading}
                      />
                    </>
                  }
                </ProductCreateButtonWrapper>

              </ProductCreateForm>
          </ProductCreateLayout>
        );
      }}
    </Formik>
  )
}

const productCreateInputToProduct = (
  p: ProductCreateInput,
  categories: Categories[],
  currentVariants: ProductVariantInput[],
  store: StorePrivate,
): Product => {

  let featuredVariant = currentVariants.find(v => v.isDefault)

  // let googleBucketUrl = NODE_ENV === "production"
  //   ? 'https://storage.googleapis.com/production-gunmarketplace-images/'
  //   : 'https://storage.googleapis.com/develop-gunmarketplace-images/'

  let googleBucketUrl = 'https://storage.googleapis.com/develop-gunmarketplace-images/'

  let previewFeaturedVariant = {
    ...featuredVariant,
    variantId: "variant_temp_1",
    previewItems: (featuredVariant?.previewItems ?? []).map(p => {
      let imageId = p?.imageId;
      if (imageId) {
        return {
          ...p,
          image: {
            original: {
              url: `${googleBucketUrl}${imageId}`
            }
          },
        }
      } else if (p.youTubeEmbedLink) {
        return {
          ...p,
          youTubeEmbedLink: p.youTubeEmbedLink
        }
      } else {
        return { ...p }
      }
    }),
    priceDetails: {
      actualPrice: featuredVariant.price,
      basePrice: featuredVariant.priceWas,
    },
  }

  // console.log("previewFeaturedVariant", previewFeaturedVariant)

  let product = {
    ...p,
    id: "product_preview",
    createdAt: new Date(),
    category: categories.find(c => c.id === p.categoryId),
    // description: p?.description
    //   ? serializeHtml(p.description)
    //   : p.description,
    description: p.description,
    storeId: null, // <LinkLoading disable={!product.storeId}>
    store: store,
    snapshotId: "prod_snapshot_preview",
    snapshotCreatedAt: new Date(),
    currentSnapshot: {
      ...p,
    },
    isExcludedFromAutomaticLists: false,
    isExcludedFromSearch: false,
    isPublished: true, // to display ProductPreviewPage
    isDeleted: false,
    isSuspended: false,
    featuredVariant: previewFeaturedVariant,
  } as any
  // console.log("productCreateInputtoProduct:::", product)
  return product
}


const isFormikDisabled = (
  errors: FormikErrors<ProductCreateInput>,
) => {
  let formikErrors = Object.keys(errors)
  return formikErrors.length > 0
}

const printValidationErrors = (
  errors: FormikErrors<ProductCreateInput>
): string[] => {
  // watch out for nested objects which may not be strings
  // if using Object.values()
  const errorMsg = Object.keys(errors)
  return ["Please fill out: ", ...errorMsg]
}

export const reduxToFormikCurrentVariants = (
  productCreateInput: ProductCreateInputFrontEnd,
  dzuPreviewItems: DzuPreviewItem[],
  dzuPreviewOrder: DzuPreviewOrder[],
): ProductVariantInput[] => {

  // pulls preview items from redux into each current variant in formik
  // we store just a single copy of preview items in redux, then duplicate
  // across all currentVariants in Formik before sending to backend.
  return (productCreateInput?.currentVariants ?? []).map(v => {

    // pull preview items from redux into each current variant in formik
    let previewItems = dzuPreviewOrder.map(
      order => dzuPreviewItems.find(p => p.id === order.id)
    )
    .filter(pv => !!pv?.fileId || !!pv?.youTubeVimeoEmbedLink)
    .map(pv => {
      return {
        imageId: pv.fileId,
        youTubeEmbedLink: pv.youTubeVimeoEmbedLink,
      }
    })

    return {
      ...v,
      previewItems: previewItems,
    }
  })
}



const ProductCreateButtonWrapper: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  return (
    <div className={classes.policyBox}>
      <ErrorBounds className={classes.flexButtons}>
        {props.children}
      </ErrorBounds>
      <Typography color={"primary"} variant="caption" className={classes.policy}>
        By posting, you confirm that this listing complies with GM's
        terms of service and applicable laws.
      </Typography>
      <Divider/>
    </div>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  asModal?: boolean;
  closeModal(): void;
}

interface ReduxState {
  reduxProductCreate: ReduxStateProductCreate;
  dzuPreviewOrder: DzuPreviewOrder[];
  dzuPreviewItems: DzuPreviewItem[];
  storeId: ID;
  user: UserPrivate;
}

export interface MutationData {
  createProduct?: { product: Product };
  editProduct?: { product: Product };
}
interface MutationVar {
  productCreateInput: ProductCreateInputFrontEnd
}

export default withStyles(styles)(React.memo(
  (props: ReactProps) => <ProductCreatePage {...props}/>,
));

