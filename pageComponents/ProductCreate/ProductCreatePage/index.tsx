import React from "react";
import clsx from "clsx";
import { Colors, isThemeDark } from "layout/AppTheme";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { ReduxStateProductCreate } from "reduxStore/product_create-reducer";
import { PaginatorVariables } from "reduxStore/paginator-variables-actions";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
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
import MakeModel from "../MakeModel";
import Description from "../Description";
import Pricing from "../Pricing";
import SelectListingType from "../SelectListingType";
import StoreOrLogin from "../StoreOrLogin";

import SelectFieldPlaceholder from "../SSR/SelectFieldPlaceholder";
// const SelectTags = dynamic(() => import("../SelectTags"), {
//   loading: () => <SelectTagsPlaceholder/>,
//   ssr: false,
// })
const SelectCaliber = dynamic(() => import("../SelectCaliber"), {
  loading: () => <SelectFieldPlaceholder title={"Caliber"}/>,
  ssr: false,
})
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
// import ProductCreateButton from "./ProductCreateButton";
const ProductCreateButton = dynamic(() => import("./ProductCreateButton"), {
  loading: () => <ButtonLoading loading={true} style={{ width: 150}}/>,
  ssr: false,
})
import ProductCreateForm from "./ProductCreateForm";
import ProductCreateLayout from "./ProductCreateLayout";
import PreventDragDropContainer from "./PreventDragDropContainer";
import SectionBorder from "./SectionBorder";
import StoreSuspended from "./StoreSuspended";
// Product Preview Page
import Tooltip from '@material-ui/core/Tooltip';
import ButtonLoading from 'components/ButtonLoading';

// SSR Subcomponents
import dynamic from 'next/dynamic'
import UploadPreviewPlaceholder from "../SSR/UploadPreviewPlaceholder";
const PreviewItemUploaderGrid = dynamic(() => import("../PreviewItemUploaderGrid"), {
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
import { buttonWidthClassified } from "./constants"

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
  ClassifiedAdPaymentInput,
  ListingType,
  Role,
  ProductType,
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
// helpers
import {
  productCreateInputToProduct,
  printValidationErrors,
  isFormikDisabled,
  reduxToFormikCurrentVariants,
} from "./utils";
// router
import { useRouter } from "next/router";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Stepper for multiple fields
import ProductCreateStepper from "./ProductCreateStepper";
import VisaPurchaseClassifiedAd from "./VisaPurchaseClassifiedAd";

// NOTES:
// <Button type="submit".../> must be inside <form onSubmit={onSubmit} ... />
// <ButtonLoading is a wrapper around <Button type="submit"...>
// <Button disable={}/> will disable the Button from dispatching events to <form>
// Validation is triggered during dispatch to <form>




const ProductCreatePage = (props: ReactProps) => {

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
      productCreateInput: { ...productCreateInput },
      classifiedAdPaymentInput: null,
    },
    onError: (err) => {
      let errMsg = error?.graphQLErrors?.[0]?.message ?? JSON.stringify(error)
      if (errMsg) {
        snackbar.enqueueSnackbar(
          `${errMsg}`,
          { variant: "error", autoHideDuration: 6000 }
        )
      }
      if (err) {
        snackbar.enqueueSnackbar(
          `${JSON.stringify(err)}`,
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
      if (cacheData?.productsNewReleasesConnection?.edges) {
        cache.writeQuery({
          query: GET_ALL_NEW_PRODUCTS,
          variables: newProductsVariables,
          data: {
            productsNewReleasesConnection: {
              ...cacheData?.productsNewReleasesConnection,
              edges: [
                { node: newProduct, __typename: "ProductsEdge" } as ProductsEdge,
                ...(cacheData?.productsNewReleasesConnection?.edges ?? []),
              ],
              totalCount: (cacheData?.productsNewReleasesConnection?.edges?.length ?? 0) + 1,
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
            allowBids: values.allowBids,
            currentVariants: values.currentVariants,
            sellerLicenseId: values.sellerLicenseId,
            listingType: values.listingType,
            productType: values.productType ?? ProductType.FIREARM,
          },
          classifiedAdPaymentInput: null,
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

  const disableForm = (
    !user?.id || // no user
    !user?.store?.id || // or no store
    user?.store?.isDeleted || // or deleted store
    user?.store?.isSuspended || // or suspended
    user?.isSuspended
  )

  const currentVariantsInput = reduxToFormikCurrentVariants({
    productCreateInput,
    dzuPreviewItems,
    dzuPreviewOrder,
  })


  const processProductDataAndValidate = ({ publishNow }: { publishNow: boolean }) => {
    formik.setFieldValue("isPublished", publishNow);
    // update formik with redux currentVariants
    formik.setFieldValue("currentVariants", currentVariantsInput);
    setTimeout(() => {
      // need to await formikCurrentVariants update
      if (isFormikDisabled(formik.errors)) {
        snackbar.enqueueSnackbar(
          printValidationErrors(formik.errors, 3),
          { variant: "error", autoHideDuration: 5000 }
        )
        setState(s => ({ ...s, loading: false }))
      } else {
        snackbar.enqueueSnackbar(
          `Creating product listing...`,
          { variant: "info" }
        )
        setState(s => ({ ...s, loading: true }))
      }
    }, 0)
  }

  // console.log('values: ', values);
  // console.log('values.currentVariants: ', values.currentVariants);
  const [activeStep, setActiveStep] = React.useState(0);

  const errors = formik.errors
  const touched = formik.touched
  // console.log('activeStep: ', activeStep)
  // console.log('touched: ', touched)
  // console.log('formik.errors', formik.errors)
  // console.log('formik.values.listingTYpe', formik.values.listingType)

  if (user?.store?.isSuspended || user?.isSuspended) {
    return <StoreSuspended/>
  }

  /////// Hooks ////////

  React.useEffect(() => {
    // update formik variants whenever redux variants change
    formik.setFieldValue(
      "currentVariants",
      reduxToFormikCurrentVariants({
        productCreateInput: productCreateInput as ProductCreateInputFrontEnd,
        dzuPreviewItems: dzuPreviewItems,
        dzuPreviewOrder: dzuPreviewOrder,
      })
    );
    formik.validateForm()
  }, [dzuPreviewItems, dzuPreviewOrder])


  return (
    <ProductCreateLayout
      productPreviewSticky={productCreateInputToProduct(
        formik.values,
        categories,
        currentVariantsInput,
        user?.store,
      )}
      listingType={formik.values?.listingType}
      activeStep={activeStep}
      setActiveStep={setActiveStep}
    >

      <PreventDragDropContainer>
        <StoreOrLogin
          user={user}
          disableLoginButton={true}
          buttonText={"Create Account"}
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
                      errors?.dealerId && touched.dealerId,
                    ].some(s => s)
                  }
                  case 2: {
                    return [
                      errors?.serialNumber && touched.serialNumber,
                      errors?.make && touched.make,
                      errors?.model && touched.model,
                      errors?.condition && touched.condition,
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
                <div className={classes.stepperSectionText}>
                  Choose a category and firearm license for this product listing.
                  Please check that the license category matches the type of firearm you are selling.
                </div>
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
                <div className={classes.stepperSectionText}>
                  Select from the list of licensed private firearm brokers to
                  nominate as your transferring dealer.
                </div>
                <SelectDealer {...formik} />
              </>
            }
            {
              (activeStep === 2) &&
              <>
                <Typography className={classes.stepperSectionText}>
                </Typography>
                <TitleSerialNumber {...formik} />
                <MakeModel {...formik} />
                <SelectCondition {...formik} />
              </>
            }
          </ProductCreateStepper>
        </SectionBorder>

        <SectionBorder thickPadding={false}>
          <ProductCreateStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            stepIndexes={[3, 4]}
            stepAfterLastStep={5}
            setFieldTouched={formik.setFieldTouched}
            touched={formik.touched}
            errorIndex={
              // match index with components
              (index: number) => {
                switch(index) {
                  case 3: {
                    return [
                      errors?.actionType && touched.actionType,
                      errors?.caliber && touched.caliber,
                      errors?.magazineCapacity && touched.magazineCapacity,
                      errors?.barrelLength && touched.barrelLength,
                    ].some(s => s)
                  }
                  case 4: {
                    return [
                      errors?.title && touched.title,
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
                <Typography className={classes.stepperSectionText}>
                  Choose an action type, caliber, magazine capacity and barrel length
                  of your firearm
                </Typography>
                <SelectActionType
                  {...formik}
                />
                <SelectCaliber
                  {...formik}
                />
                <GunAttributes {...formik} />
              </>
            }
            {
              (activeStep === 4) &&
              <>
                <Typography className={classes.stepperSectionText}>
                  Tell us more about the product listing, the history,
                  any notable features, any included or excluded items.
                  <br/>
                  (e.g. scopes, sights, bags, & magazines)
                </Typography>
                <Description {...formik} />
              </>
            }
          </ProductCreateStepper>
        </SectionBorder>


        <SectionBorder thickPadding={true}>
          <PreviewItemUploaderGrid
            reducerName={reducerName}
            ownerId={storeId}
            dzuPreviewItems={dzuPreviewItems}
            dzuPreviewOrder={dzuPreviewOrder}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            {...formik}
          />
        </SectionBorder>

        <SectionBorder thickPadding={true}>
          <Pricing
            reducerName={reducerName}
            currentVariants={productCreateInput.currentVariants}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            {...formik}
          />
        </SectionBorder>

        <SectionBorder thickPadding={true}>
          <SelectListingType
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            user={user}
            {...formik}
          />
          <ProductCreateButtonWrapper {...props}>
            {/* <ProductCreateButton
              // Save Draft Button
              onClick={() => processProductDataAndValidate({ publishNow: false }) }
              postInstantly={false}
              title={"Save Draft"}
              loading={state.loading}
              errors={formik.errors}
              disabled={state.loading || disableForm}
              // disabled={isFormikDisabled(formik.errors) || state.loading}
            />
            <div className={classes.flexButtonSpacer}/> */}

            {
              formik.values?.listingType === ListingType.CLASSIFIED &&
              user?.userRole === Role.PLATFORM_ADMIN &&
              <VisaPurchaseClassifiedAd
                display={true}
                priceInCents={100}
                validateForm={async() => {
                  // 1. set variants/previewImages correctly in formik
                  // 2. validate formik form inputs
                  processProductDataAndValidate({ publishNow: true })
                  // 3. then proceed with purchasing and creating a product listing
                }}
                title={`Post Ad for $1`}
                purchaseClassifiedAdAndCreateProductListing={
                  async (classifiedAdPaymentInput: ClassifiedAdPaymentInput) => {

                    let values = formik.values

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
                          allowBids: values.allowBids,
                          currentVariants: values.currentVariants,
                          sellerLicenseId: values.sellerLicenseId,
                          listingType: values.listingType,
                          productType: values.productType,
                        },
                        classifiedAdPaymentInput: classifiedAdPaymentInput,
                      }
                    })

                  }
                }
                handlePostPurchase={() => {
                }}
              />
            }

            {
              formik.values?.listingType === ListingType.CLASSIFIED &&
              <ProductCreateButton
                // Post Instantly Button
                onClick={() => {
                  processProductDataAndValidate({ publishNow: true })
                }}
                title={"Post Ad for Free"}
                postInstantly={true}
                loading={state.loading}
                errors={formik.errors}
                disabled={state.loading || disableForm}
                // disabled={isFormikDisabled(formik.errors) || state.loading}
              />
            }

            {
              formik.values?.listingType === ListingType.ESCROW_ONLY &&
              <ProductCreateButton
                // Post Instantly Button
                onClick={() => {
                  processProductDataAndValidate({ publishNow: true })
                }}
                title={"Publish Escrow Listing"}
                postInstantly={true}
                loading={state.loading}
                errors={formik.errors}
                disabled={state.loading || disableForm}
                // disabled={isFormikDisabled(formik.errors) || state.loading}
              />
            }

          </ProductCreateButtonWrapper>
        </SectionBorder>

      </ProductCreateForm>
    </ProductCreateLayout>
  );
}



const ProductCreateButtonWrapper: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  return (
    <div className={classes.policyBox}>
      <ErrorBounds className={classes.flexButtons}>
        {props.children}
      </ErrorBounds>
      <Typography color={"primary"} variant="caption" className={classes.policy}>
        By posting, you confirm that this listing complies with
        all applicable laws and Gun Marketplace's terms of service
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
  classifiedAdPaymentInput: ClassifiedAdPaymentInput
}



export const styles = (theme: Theme) => createStyles({
  maxWidth: {
    maxWidth: 540,
    width: '100%',
  },
  title: {
    lineHeight: '1.5rem',
    marginBottom: '0.5rem',
  },
  // Buttons
  flexButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: '100%',
    maxWidth: buttonWidthClassified,
  },
  flexButtonSpacer: {
    marginBottom: '1rem',
    justifyContent: 'center',
    flexGrow: 1,
    flexBasis: '5%',
  },
  policyBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%',
  },
  policy: {
    width: 'calc(100% - 2rem)',
    maxWidth: buttonWidthClassified,
    fontWeight: 400,
    marginBottom: '1rem',
    color: Colors.grey,
    lineHeight: '1rem',
    textAlign: 'center',
  },
  stepperSectionText: {
    marginBottom: '1rem',
    color: isThemeDark(theme)
    ? Colors.uniswapMediumGrey
    : Colors.slateGreyLightBlack,
  },
})


export default withStyles(styles)(React.memo(
  (props: ReactProps) => <ProductCreatePage {...props}/>,
));

