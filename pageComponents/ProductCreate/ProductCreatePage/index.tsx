import React from "react";
import { oc as option } from "ts-optchain";
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
import Title from "../Title";
import MakeAndModel from "../MakeAndModel";
import GunAttributes from "../GunAttributes";
import Description from "../Description";
import SelectCategories from "../SelectCategories"
import PricingLicenses from "../PricingLicenses";
import StoreOrLogin from "../StoreOrLogin";
// same dir components
import ProductCreateButton from "./ProductCreateButton";
import ProductCreateForm from "./ProductCreateForm";
import StoreOrLoginContainer from "./StoreOrLoginContainer";
import SectionBorder from "./SectionBorder";
// Product Preview Page
import Dialog from '@material-ui/core/Dialog';
import ProductId from "pageComponents/P/ProductId";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";

// SSR Subcomponents
import dynamic from 'next/dynamic'
import UploadInputPlaceholder from "../SSR/UploadInputPlaceholder";
import UploadPreviewPlaceholder from "../SSR/UploadPreviewPlaceholder";
import SelectTags from "../SelectTags";
// import SelectTagsPlaceholder from "../SSR/SelectTagsPlaceholder";
// const SelectTags = dynamic(() => import("../SelectTags"), {
//   loading: () => <SelectTagsPlaceholder/>,
//   ssr: false,
// })
const PreviewItemUploader = dynamic(() => import("../PreviewItemUploaderGrid"), {
  loading: () => <UploadPreviewPlaceholder/>,
  ssr: false,
})

// Product Preview Card
import PreviewCardResponsive from "pageComponents/FrontPage/PreviewCardResponsiveCarousel";
// Graphql
import { GET_PRODUCT_CATEGORIES } from "queries/categories-queries";
import { useQuery } from '@apollo/client';
import { useScrollYPosition } from "utils/hooks";
// ENV variables
// import getConfig from 'next/config'
// const {
//   publicRuntimeConfig: {
//     GUN_ENV,
//     NODE_ENV
//   }
// } = getConfig()

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
  DzuFilePreview
} from "typings/dropzone";
// Graphql
import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_PRODUCT } from "queries/products-mutations";
import { GET_RECOMMENDED_PRODUCTS } from "queries/products-queries";
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
// Analytics
import { useAnalytics, analyticsEvent } from "utils/analytics";
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
      dzuPreviewOrder: option(state[reducerName]).dzuPreviewOrder(),
      dzuPreviewItems: option(state[reducerName]).dzuPreviewItems(),
      user: option(state).reduxLogin.user(),
      storeId: option(state).reduxLogin.user.store.id(),
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
      try {
        await aClient.query({
          query: GET_RECOMMENDED_PRODUCTS,
          variables: { count: 18 }
        });
      } catch (e) {
        console.log(e)
      }
    }
  })


  // Apollo Graphql
  const categoryData = useQuery<{ categories: Categories[] }, null>(
    GET_PRODUCT_CATEGORIES
  )

  const categories = option(categoryData).data.categories([]);


  const onSubmitFormik = (values, { setSubmitting, resetForm }) => {
    console.log("dispatching productCreate with values: ", values)
    // serialize Slate rich-text object as html
    let htmlDescription = serializeHtml(values.description)
    // Apollo Mutation
    productCreate({
      variables: {
        productCreateInput: {
          title: values.title,
          description: htmlDescription,
          condition: values.condition,
          make: values.make,
          model: values.model,
          ammoType: values.ammoType,
          actionType: values.actionType,
          boreDiameter: values.boreDiameter,
          serialNumber: values.serialNumber,
          location: values.location,
          dealer: values.dealer,
          categoryId: values.categoryId,
          tags: (values.tags as string[]).join(','),
          isPublished: values.isPublished,
          currentVariants: values.currentVariants,
        }
      },
    }).then(res => {

      analyticsEvent("Product.Created", { isPublished: values.isPublished })

      setTimeout(() => {
        resetForm()
        // wait 500ms for page transition before trying to reset form
      }, 200)
    })
  }

  const disableForm =
      (!option(user).id() || // no user
      !option(user).store.id() || // or no store
      option(user).store.isDeleted())  // or deleted store


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
          <>
            <div className={classes.productColumn60}>

              <StoreOrLoginContainer>
                <StoreOrLogin
                  user={user}
                  disableLoginButton={true}
                  buttonText={"Create Store"}
                />
              </StoreOrLoginContainer>

              <ProductCreateForm
                classes={classes}
                asModal={asModal}
                closeModal={closeModal}
                onSubmit={handleSubmit} // dispatches to <Formik onSubmit={}/>
                disableForm={disableForm}
              >

                <SectionBorder>
                  <Title {...fprops} />
                  <SelectCategories
                    reducerName={reducerName}
                    {...fprops}
                  />
                </SectionBorder>

                <SectionBorder style={{ paddingBottom: '0.5rem' }}>
                  <MakeAndModel {...fprops} />
                </SectionBorder>

                <SectionBorder style={{ paddingBottom: '0.5rem' }}>
                  <GunAttributes {...fprops} />
                </SectionBorder>

                <SectionBorder>
                  <Description
                    {...fprops}
                  />
                  <SelectTags
                    reducerName={reducerName}
                    {...fprops}
                  />
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
                </ProductCreateButtonWrapper>

                {/* <Portal>
                  <div style={{ position: 'fixed', top: 12, left: 12}}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        console.info(
                          "productCreateInput.currentVariants[0].previewItems: ",
                          productCreateInput.currentVariants[0].previewItems
                        )
                        fprops.setFieldValue(
                          "currentVariants",
                          reduxToFormikCurrentVariants(
                            productCreateInput,
                            dzuPreviewItems,
                            dzuPreviewOrder,
                            dzuFiles,
                          )
                        );
                        console.info(
                          "fprops.values.currentVariants[0].previewItems",
                          fprops.values.currentVariants[0].previewItems
                        )
                      }}
                    >
                      Print state
                    </Button>
                    <a onClick={() => {
                      console.log("fprops.values.description", fprops.values.description)
                      let htmlDescription = serializeHtml(values.description)
                      console.log('htmlDescription', htmlDescription)
                    }}>
                      print description
                    </a>
                    <a onClick={() => fprops.resetForm()}>reset form</a>
                  </div>
                </Portal> */}

              </ProductCreateForm>
              <DisplaySnackBars error={error} data={data}/>
            </div>

            <div className={clsx(classes.productColumn40, 'fadeIn')}>
              {
                !mdDown &&
                <Tooltip title="Preview the Product Page" placement="top-start">
                  <div className={clsx(
                    classes.stickyProductPreviewContainer,
                    'fadeIn',
                  )}>
                    <PreviewCardResponsive
                      product={productCreateInputToProduct(
                        fprops.values,
                        categories,
                        currentVariantsInput,
                        user?.store,
                      )}
                      // cardsPerRowLayout={4}
                      // boxShadow={true}
                      // refetch={wishlistConnectionResponse.refetch}
                      loadCarouselPics={loadCarouselPics}
                      setLoadCarouselPics={setLoadCarouselPics}
                      productIndex={0}
                      // previewImageEmptyMessage={"Preview Listing"}
                      // onClick={() => setOpenPreviewPage(true)}
                    />
                  </div>
                </Tooltip>
              }
            </div>

            {/* <Dialog
              open={openPreviewPage}
              onClose={() => setOpenPreviewPage(false)}
              // fullScreen={smDown}
              // fullWidth={smDown}
              // fullScreen={true}
              fullWidth={true}
              // maxWidth="md"
              BackdropProps={{
                classes: { root: classes.modalBackdrop, }
              }}
              PaperProps={{
                classes: {
                  root: smDown
                    ? classes.fullMaxHeight
                    : classes.modalPaperScrollPaper
                }
              }}
              scroll={"body"}
            >
              <IconButton
                onClick={() => setOpenPreviewPage(false)}
                className={classes.previewIconButton}
                classes={{ root: classes.iconButton }}
                size="small"
              >
                <ClearIcon classes={{ root: classes.svgIcon }}/>
              </IconButton>

              <ProductId
                initialProduct={
                  productCreateInputToProduct(
                    fprops.values,
                    categories,
                    currentVariantsInput,
                    user?.store,
                  )
                }
                // disablePayments={true}
              />
            </Dialog> */}

          </>
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

  let googleBucketUrl = "https://image-content.gunmarketplace.com/"
    // EFC_ENV === "production"
    // ? "https://image-content.relaydownloads.com/"
    // : (EFC_ENV === undefined && NODE_ENV === undefined)
    //   ? "https://local-image-content.fileworks.net/"
    //   : "https://image-content.fileworks.net/"


  let previewFeaturedVariant = {
    ...featuredVariant,
    variantId: "variant_temp_1",
    previewItems: option(featuredVariant).previewItems([]).map(p => {
      let imageId = option(p).imageId();
      if (imageId) {
        return {
          ...p,
          image: {
            original: {
              url: `${googleBucketUrl}${imageId}`
            }
          },
        } as any
      } else if (p.youTubeEmbedLink) {
        return {
          ...p,
          youTubeEmbedLink: p.youTubeEmbedLink
        } as any
      } else {
        return { ...p } as any
      }
    }),
    priceDetails: {
      actualPrice: featuredVariant.price,
      basePrice: featuredVariant.priceWas,
    },
  }

  console.log("previewFeaturedVariant", previewFeaturedVariant)

  let product = {
    ...p,
    id: "product_preview",
    createdAt: new Date(),
    category: categories.find(c => c.id === p.categoryId),
    description: p?.description
      ? serializeHtml(p.description)
      : p.description,
    storeId: null, // <LinkLoading disable={!product.storeId}>
    store: store,
    snapshotId: "prod_snapshot_preview",
    snapshotCreatedAt: new Date(),
    isExcludedFromAutomaticLists: false,
    isExcludedFromSearch: false,
    isPublished: true, // to display ProductPreviewPage
    isDeleted: false,
    isSuspended: false,
    chosenVariant: previewFeaturedVariant,
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
  return option(productCreateInput).currentVariants([]).map(v => {

    // pull preview items from redux into each current variant in formik
    let previewItems = dzuPreviewOrder.map(
      order => dzuPreviewItems.find(p => p.id === order.id)
    )
    .filter(pv => !!option(pv).fileId() || !!option(pv).youTubeVimeoEmbedLink())
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

