import React from "react";
import clsx from "clsx";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { ReduxStateProductCreate } from "reduxStore/product_create-reducer";
import { PaginatorVariables } from "reduxStore/paginator-variables-actions";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from '../commonStyles';
// MUI
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
// Components
import ErrorBounds from 'components/ErrorBounds';
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
// Subcomponents
import TitleSerialNumber from "../TitleSerialNumber";
import GunAttributes from "../GunAttributes";
import Description from "../Description";
import PricingLicenses from "../PricingLicenses";
import StoreOrLogin from "../StoreOrLogin";

import SelectFieldPlaceholder from "../SSR/SelectFieldPlaceholder";
// const SelectTags = dynamic(() => import("../SelectTags"), {
//   loading: () => <SelectTagsPlaceholder/>,
//   ssr: false,
// })
const SelectCategories = dynamic(() => import("../SelectCategories"), {
  loading: () => <SelectFieldPlaceholder title={"Category"}/>,
  ssr: false,
})
const SelectSellerLicense = dynamic(() => import("../SelectSellerLicense"), {
  loading: () => <SelectFieldPlaceholder title={"License"}/>,
  ssr: false,
})
const SelectActionType = dynamic(() => import("../SelectActionType"), {
  loading: () => <SelectFieldPlaceholder title={"Action Type"}/>,
  ssr: false,
})
const SelectCondition = dynamic(() => import("../SelectCondition"), {
  loading: () => <SelectFieldPlaceholder title={"Condition"}/>,
  ssr: false,
})
const SelectDealer = dynamic(() => import("../SelectDealer"), {
  loading: () => <SelectFieldPlaceholder title={"Dealer"}/>,
  ssr: false,
})
// same dir components
import ProductCreateButton from "./ProductCreateButton";
import ProductCreateForm from "./ProductCreateForm";
import ProductCreateLayout from "./ProductCreateLayout";
import PreventDragDropContainer from "./PreventDragDropContainer";
import SectionBorder from "./SectionBorder";
// Product Preview Page
import Tooltip from '@material-ui/core/Tooltip';
import ButtonLoading from 'components/ButtonLoading';

// SSR Subcomponents
import dynamic from 'next/dynamic'
import UploadPreviewPlaceholder from "../SSR/UploadPreviewPlaceholder";
const PreviewItemUploader = dynamic(() => import("../PreviewItemUploaderGrid"), {
  loading: () => <UploadPreviewPlaceholder/>,
  ssr: false,
})
// Graphql
import { GET_CATEGORIES } from "queries/categories-queries";
import { useQuery } from '@apollo/client';
import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_PRODUCT } from "queries/products-mutations";

// CACHE UPDATES
// update New Release connection in cache after product creation
import { GET_ALL_NEW_PRODUCTS } from "queries/products-queries";
import { QueryData as QueryDataNewProducts } from "pageComponents/FrontPage/NewProducts";
import { DASHBOARD_PRODUCTS_CONNECTION } from "queries/store-queries";
// Warning: these are determined inside the facet hook, may get out of sync
// if you change the defaults in that hook
import {
  initialDashboardVariables,
  QueryDataDashboardProducts,
} from "pageComponents/SellerDashboard/PublishedProductsList";

// Typings
import {
  ID,
  ProductCreateInput,
  Product,
  Categories,
  UserPrivate,
  ProductVariantInput,
  StorePrivate,
  ProductsEdge,
  ProductsConnection,
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
import { FormikErrors, useFormik } from 'formik';
import { validationSchemas } from "utils/validation";
// router
import { useRouter } from "next/router";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";


import ProductCreateStepper from "./ProductCreateStepper";



// NOTES:
// <Button type="submit".../> must be inside <form onSubmit={onSubmit} ... />
// <ButtonLoading is a wrapper around <Button type="submit"...>
// <Button disable={}/> will disable the Button from dispatching events to <form>
// Validation is triggered during dispatch to <form>




const ProductCreatePage = (props: ReactProps) => {

  // Props + State
  const { classes } = props;
  const [state, setState] = React.useState<{ loading: boolean }>({
    loading: false,
  });

  // CSS media queries
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  // Redux
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
    storeId,
    newProductsVariables,
  } = useSelector<GrandReduxState, ReduxState>(state => {
    return {
      reduxProductCreate: state[reducerName],
      dzuPreviewOrder: state[reducerName]?.dzuPreviewOrder,
      dzuPreviewItems: state[reducerName]?.dzuPreviewItems,
      user: state?.reduxLogin?.user,
      storeId: state?.reduxLogin?.user?.store?.id,
      newProductsVariables: state.reduxPaginatorVariables.newProductsVariables
    }
  });

  const productCreateInput = reduxProductCreate.productCreateInput;

  // Apollo Mutation
  const [
    productCreate,
    { loading, error, data }
  ] = useMutation<MutationData, MutationVar>(CREATE_PRODUCT, {
    variables: {
      productCreateInput: { ...productCreateInput }
    },
    onError: (err) => {
      let errMsg = error?.graphQLErrors?.[0]?.message ?? JSON.stringify(error)
      if (errMsg) {
        snackbar.enqueueSnackbar(
          `${errMsg}`,
          { variant: "error", autoHideDuration: 6000 }
        )
      }
    },
    onCompleted: async(data: MutationData) => {
      // transition to product creation success page
      let createProductTitle = data?.createProduct?.product?.currentSnapshot?.title;
      snackbar.enqueueSnackbar(
        `Successfully created listing: ${createProductTitle}`,
        { variant: "success", autoHideDuration: 3000 }
      )
      // reset redux form
      setTimeout(() => {
        let pid = data?.createProduct?.product?.id
        console.log("createdProduct response: ", data?.createProduct)
        router.push(`/admin/products?created=${pid}`)
        // scroll to top
        window.scrollTo(0, 0);
        dispatch(actions.RESET_PRODUCT_CREATE())
      }, 200);
    },
    update: (cache, { data: { createProduct }}) => {
      // update NEWEST PRODUCTS connection
      let newProduct = createProduct?.product;
      console.log("new product: ", newProduct)

      const cacheData = cache.readQuery<QueryDataNewProducts, any>({
        query: GET_ALL_NEW_PRODUCTS,
        variables: newProductsVariables,
      });
      console.log("cacheData: ", cacheData)
      console.log("newProductsVariables: ", newProductsVariables)

      /// Update front page new releases products
      if (cacheData?.productsAllConnection?.edges) {
        cache.writeQuery({
          query: GET_ALL_NEW_PRODUCTS,
          variables: newProductsVariables,
          data: {
            productsAllConnection: {
              ...cacheData?.productsAllConnection,
              edges: [
                { node: newProduct, __typename: "ProductsEdge" } as ProductsEdge,
                ...(cacheData?.productsAllConnection?.edges ?? []),
              ],
              totalCount: (cacheData?.productsAllConnection?.edges?.length ?? 0) + 1,
            } as ProductsConnection
          },
        });
      }
      console.log("cache after: ", cache)

      /// Update dashboard products
      const cacheData2 = cache.readQuery<QueryDataDashboardProducts, any>({
        query: DASHBOARD_PRODUCTS_CONNECTION,
        variables: initialDashboardVariables,
      });
      if (cacheData2?.dashboardProductsConnection?.edges) {
        cache.writeQuery({
          query: DASHBOARD_PRODUCTS_CONNECTION,
          variables: initialDashboardVariables,
          data: {
            dashboardProductsConnection: {
              ...cacheData2.dashboardProductsConnection,
              edges: [
                { node: newProduct, __typename: "ProductsEdge" } as ProductsEdge,
                ...(cacheData2?.dashboardProductsConnection?.edges ?? []),
              ],
              totalCount: (cacheData2?.dashboardProductsConnection?.edges?.length ?? 0) + 1,
            } as ProductsConnection
          },
        });
      }
    },
  })



  const formik = useFormik({
    initialValues: {
      ...productCreateInput
    },
    validationSchema: validationSchemas.ProductCreate,
    onSubmit: (values, { setSubmitting, resetForm }) => {
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
            magazineCapacity: values.magazineCapacity,
            barrelLength: values.barrelLength,
            dealerId: values.dealerId,
            categoryId: values.categoryId,
            isPublished: values.isPublished,
            currentVariants: values.currentVariants,
            sellerLicenseId: values.sellerLicenseId,
          }
        },
      }).then(res => {
        setTimeout(() => {
          resetForm()
          // wait 500ms for page transition before trying to reset form
        }, 200)
      })
    }
  });

  // Apollo Graphql
  const categoryData = useQuery<{ categories: Categories[] }, null>(
    GET_CATEGORIES
  )

  const categories = (categoryData?.data?.categories ?? []);

  const disableForm =
      (!user?.id || // no user
      !user?.store?.id || // or no store
      user?.store?.isDeleted)  // or deleted store

  const currentVariantsInput = reduxToFormikCurrentVariants(
    productCreateInput,
    dzuPreviewItems,
    dzuPreviewOrder,
  )

  const processProductData = ({ publishNow }: { publishNow: boolean }) => {
    snackbar.enqueueSnackbar(
      `Creating escrow for order...`,
      { variant: "info" }
    )
    formik.setFieldValue("isPublished", publishNow);
    // update formik with redux currentVariants
    formik.setFieldValue("currentVariants", currentVariantsInput);
    setTimeout(() => {
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
    }, 0)
  }

  // console.log('values: ', values);
  // console.log('values.currentVariants: ', values.currentVariants);
  const [activeStep, setActiveStep] = React.useState(0);

  const errors = formik.errors
  const touched = formik.touched
  // console.log('activeStep: ', activeStep);
  // console.log('touched: ', touched);

  return (
    <ProductCreateLayout
      productPreviewSticky={productCreateInputToProduct(
        formik.values,
        categories,
        currentVariantsInput,
        user?.store,
      )}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
    >

      <PreventDragDropContainer>
        <StoreOrLogin
          user={user}
          disableLoginButton={true}
          buttonText={"Create Store"}
        />
      </PreventDragDropContainer>


      <ProductCreateForm
        onSubmit={formik.handleSubmit} // dispatches to <Formik onSubmit={}/>
        disableForm={disableForm}
      >

        <SectionBorder thickPadding={false}>
          <ProductCreateStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            stepIndexes={[0, 1, 2]}
            stepAfterLastStep={3}
            setFieldTouched={formik.setFieldTouched}
            touched={formik.touched}
            errorIndex={
              // match index with components
              (index: number) => {
                switch(index) {
                  case 0: {
                    return [
                      errors?.categoryId && touched.categoryId,
                      errors?.sellerLicenseId && touched.sellerLicenseId,
                    ].some(s => s)
                  }
                  case 1: {
                    return [
                      errors?.title && touched.title,
                      errors?.serialNumber && touched.serialNumber,
                      errors?.actionType && touched.actionType,
                    ].some(s => s)
                  }
                  case 2: {
                    return [
                      errors?.dealerId && touched.dealerId,
                    ].some(s => s)
                  }
                  default: {
                    return false
                  }
                }
              }
            }
          >
            {
              (activeStep === 0) &&
              <>
                <Typography className={classes.stepperSectionTitle}>
                  For each ad campaign that you create, you can control how much
                  you're willing to spend on clicks and conversions, which networks
                  and geographical locations you want your ads to show on, and more.
                </Typography>
                <SelectCategories
                  {...formik}
                />
                <SelectSellerLicense
                  user={user}
                  sellerLicenseId={undefined} // only for product edit
                  {...formik}
                />
              </>
            }
            {
              (activeStep === 1) &&
              <>
                <Typography className={classes.stepperSectionTitle}>
                  An ad group contains one or more ads which target a shared
                  set of keywords.
                </Typography>
                <TitleSerialNumber {...formik} />
                <SelectActionType
                  {...formik}
                />
              </>
            }
            {
              (activeStep === 2) &&
              <>
                <Typography className={classes.stepperSectionTitle}>
                  Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.
                </Typography>
                <SelectDealer {...formik} />
              </>
            }
          </ProductCreateStepper>
        </SectionBorder>

        <SectionBorder thickPadding={false}>
          <ProductCreateStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            stepIndexes={[3, 4, 5]}
            stepAfterLastStep={5}
            setFieldTouched={formik.setFieldTouched}
            touched={formik.touched}
            errorIndex={
              // match index with components
              (index: number) => {
                switch(index) {
                  case 3: {
                    return [
                      errors?.make && touched.make,
                      errors?.model && touched.model,
                      errors?.caliber && touched.caliber,
                      errors?.magazineCapacity && touched.magazineCapacity,
                      errors?.barrelLength && touched.barrelLength,
                    ].some(s => s)
                  }
                  case 4: {
                    return [
                      errors?.condition && touched.condition,
                    ].some(s => s)
                  }
                  case 5: {
                    return [
                      errors?.description && touched.description,
                    ].some(s => s)
                  }
                  default: {
                    return false
                  }
                }
              }
            }
          >
            {
              (activeStep === 3) &&
              <>
                <Typography className={classes.stepperSectionTitle}>
                  Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.
                </Typography>
                <GunAttributes {...formik} />
              </>
            }
            {
              (activeStep === 4) &&
              <>
                <Typography className={classes.stepperSectionTitle}>
                  Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.
                </Typography>
                <SelectCondition {...formik} />
              </>
            }
            {
              (activeStep === 5) &&
              <>
                <Typography className={classes.stepperSectionTitle}>
                  Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.
                </Typography>
                <Description {...formik} />
              </>
            }
          </ProductCreateStepper>
        </SectionBorder>


        <SectionBorder thickPadding={true}>
          <PreviewItemUploader
            reducerName={reducerName}
            productInput={productCreateInput}
            storeId={storeId}
            dzuPreviewItems={dzuPreviewItems}
            dzuPreviewOrder={dzuPreviewOrder}
            {...formik}
          />
        </SectionBorder>

        <SectionBorder thickPadding={true}>
          <PricingLicenses
            reducerName={reducerName}
            currentVariants={productCreateInput.currentVariants}
            {...formik}
          />
        </SectionBorder>

        <ProductCreateButtonWrapper {...props}>
          {
            process.browser &&
            <>
              <ProductCreateButton
                // Save Draft Button
                onClick={() => processProductData({ publishNow: false }) }
                postInstantly={false}
                loading={state.loading}
                errors={formik.errors}
                disabled={state.loading}
                // disabled={isFormikDisabled(formik.errors) || state.loading}
              />
              <div className={classes.flexButtonSpacer}/>
              <ProductCreateButton
                // Post Instantly Button
                onClick={() => processProductData({ publishNow: true }) }
                postInstantly={true}
                loading={state.loading}
                errors={formik.errors}
                disabled={state.loading}
                // disabled={isFormikDisabled(formik.errors) || state.loading}
              />
            </>
          }
        </ProductCreateButtonWrapper>

      </ProductCreateForm>
    </ProductCreateLayout>
  );
}






const productCreateInputToProduct = (
  p: ProductCreateInput,
  categories: Categories[],
  currentVariants: ProductVariantInput[],
  store: StorePrivate,
): Product => {

  let featuredVariant = currentVariants.find(v => v.isDefault)

  let googleBucketUrl = process.env.NODE_ENV === "production"
    ? 'https://storage.googleapis.com/production-gunmarketplace-images/'
    : 'https://storage.googleapis.com/develop-gunmarketplace-images/'


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
): string => {

  // watch out for nested objects which may not be strings
  // if using Object.values()
  let priceError = errors?.currentVariants?.[0]
  let priceWasError = errors?.currentVariants?.[0]
  let previewItemsError = errors?.currentVariants?.[0]

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
        By posting, you confirm that this listing complies with Gun Marketplace's
        terms of service and applicable laws.
      </Typography>
      <Divider/>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
}


interface ReduxState {
  reduxProductCreate: ReduxStateProductCreate;
  dzuPreviewOrder: DzuPreviewOrder[];
  dzuPreviewItems: DzuPreviewItem[];
  storeId: ID;
  user: UserPrivate;
  newProductsVariables: PaginatorVariables;
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

