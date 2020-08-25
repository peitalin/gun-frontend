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
import Button from "@material-ui/core/Button";
import Portal from "@material-ui/core/Portal";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ErrorBounds from 'components/ErrorBounds';
// Components
import Loading from "components/Loading";
import DisplaySnackBars, { SnackState } from "pageComponents/ProductCreate/DisplaySnackBars";
import SnackBarA from "components/Snackbars/SnackbarA";
// Subcomponents
import NameTagline from "../NameTagline";
import Description from "../Description";
import SelectCategories from "../SelectCategories"
import SelectTags from "../SelectTags";
import PricingLicenses from "../PricingLicenses";
import StoreOrLogin from "../StoreOrLogin";
// same dir components
import ProductCreateButton from "./ProductCreateButton";
import SellingTips from "./SellingTips";
import SellingTipsMobile from "./SellingTipsMobile";
import ProductCreateForm from "./ProductCreateForm";

// SSR Subcomponents
import dynamic from 'next/dynamic'
import UploadInputPlaceholder from "../SSR/UploadInputPlaceholder";
import UploadPreviewPlaceholder from "../SSR/UploadPreviewPlaceholder";

const PreviewItemUploaderSSR = dynamic(() => import("../PreviewItemUploaderGrid"), {
  loading: () => <UploadPreviewPlaceholder/>,
  ssr: false,
})

// Typings
import {
  ID,
  Product,
  UserPrivate,
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
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { serializeHtml } from 'components/TextEditor/helpers';
// Analytics


// NOTES:
// <Button type="submit".../> must be inside <form onSubmit={onSubmit} ... />
// <ButtonLoading is a wrapper around <Button type="submit"...>
// <Button disable={}/> will disable the Button from dispatchign events to <form>
// Validation is triggered during dispatch to <form>




const ProductCreatePage = (props: ReactProps) => {

  // Props + State
  const { classes, asModal, closeModal } = props;
  const [state, setState] = React.useState<SnackState>({
    showError: false,
    showSuccess: false,
    loading: false,
  });

  // CSS media queries
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  // Redux
  const aClient = useApolloClient();
  const reducerName: ReducerName = ReducerName.reduxProductCreate;
  const actions = Actions[reducerName];
  const dispatch = useDispatch();

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
      dzuPreviewItems: option(state[reducerName]).previewItems(),
      user: state.reduxLogin.user,
      storeId: option(state).reduxLogin.user.store.id(),
    }
  });

  const productCreateInput = reduxProductCreate.productCreateInput;
  const currentVariants = reduxProductCreate.productCreateInput.currentVariants;

  React.useEffect(() => {
    dispatch(actions.UPDATE_STORE_ID(storeId))
  }, [storeId])

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
        // router.push("/seller?created=product")
        router.push("/")
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

  const disableForm =
      (!option(user).id() || // no user
      !option(user).store.id() || // or no store
      option(user).store.isDeleted())  // or deleted store


  return (
    <Formik
      initialValues={productCreateInput}
      validationSchema={validationSchemas.ProductCreate}
      onSubmit={(values, { setSubmitting, resetForm }) => {

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
              isQuantityEnabled: false,
            }
          },
        }).then(res => {

          setTimeout(() => {
            resetForm()
            // wait 500ms for page transition before tryingto reset form
          }, 200)
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
          <>
            {/* SELLING TIPS COLUMN */}
            <div className={clsx(classes.productColumn55, 'fadeInFast')}>
              <ProductCreateForm
                classes={classes}
                asModal={asModal}
                closeModal={closeModal}
                onSubmit={handleSubmit} // dispatches to <Formik onSubmit={}/>
                disableForm={disableForm}
              >

                <StoreOrLogin
                  user={user}
                  resetForm={fprops.resetForm}
                />

                <a onClick={() => {
                  console.log("fprops.values", fprops.values)
                  console.log("fprops.errors", fprops.errors)
                }}>
                  print formik!
                </a>

                <div className={
                  disableForm ? classes.disableForm : null
                }>

                  <NameTagline
                    {...fprops}
                  />

                  <SelectCategories
                    reducerName={reducerName}
                    {...fprops}
                  />

                  {/* <a onClick={() => {
                    console.log("fprops.values.description", fprops.values.description)
                    let htmlDescription = serializeHtml(values.description)
                    console.log('htmlDescription', htmlDescription)
                  }}>
                    print description
                  </a> */}

                  <Description
                    {...fprops}
                  />

                  <SelectTags
                    reducerName={reducerName}
                    {...fprops}
                  />

                  <PreviewItemUploaderSSR
                    reducerName={reducerName}
                    productInput={productCreateInput}
                    storeId={storeId}
                    dzuPreviewItems={dzuPreviewItems}
                    dzuPreviewOrder={dzuPreviewOrder}
                    {...fprops}
                  />

                  <PricingLicenses
                    reducerName={reducerName}
                    currentVariants={currentVariants}
                    {...fprops}
                  />

                  <ProductCreateButtonWrapper {...props}>
                    {/* Save Draft Button */}
                    <ProductCreateButton
                      classes={classes}
                      onClick={() => {

                        fprops.setFieldValue("isPublished", false);
                        // update formik with redux currentVariants
                        fprops.setFieldValue(
                          "currentVariants",
                          reduxToFormikCurrentVariants(
                            productCreateInput,
                            dzuPreviewItems,
                            dzuPreviewOrder,
                          )
                        );
                        setTimeout(() => {
                          // need to await formikCurrencyVariants update
                          if (isFormikDisabled(errors)) {
                            setState(s => ({ ...s, showError: true }))
                          } else {
                            setState(s => ({ ...s, loading: true }))
                          }
                        }, 0)

                      }}
                      postInstantly={false}
                      loading={state.loading}
                      errors={errors}
                      disabled={isFormikDisabled(errors) || state.loading}
                    />

                    {/* Post Instantly */}
                    <div className={classes.flexButtonSpacer}/>
                    <ProductCreateButton
                      classes={classes}
                      onClick={() => {

                        fprops.setFieldValue("isPublished", true);
                        // sync formik with redux currentVariants
                        fprops.setFieldValue(
                          "currentVariants",
                          reduxToFormikCurrentVariants(
                            productCreateInput,
                            dzuPreviewItems,
                            dzuPreviewOrder,
                          )
                        );
                        setTimeout(() => {
                          // need to await formikCurrencyVariants update
                          if (isFormikDisabled(errors)) {
                            setState(s => ({ ...s, showError: true }))
                          } else {
                            setState(s => ({ ...s, loading: true }))
                          }
                        }, 0)

                        console.log('order: ', dzuPreviewOrder);
                        console.log('previewItems: ', reduxProductCreate.previewItems);
                        console.log('values.currentVariants: ', values.currentVariants);
                        console.log('errors', errors);

                      }}
                      postInstantly={true}
                      loading={state.loading}
                      errors={errors}
                      disabled={isFormikDisabled(errors) || state.loading}
                    />
                    <Loading fixed loading={state.loading}/>
                  </ProductCreateButtonWrapper>

                {/* <a onClick={() => fprops.resetForm()}>
                  reset form
                </a> */}

                </div>

                <DisplaySnackBars
                  state={state}
                  setState={setState}
                  error={error}
                  data={data}
                />
              </ProductCreateForm>
            </div>

            {/* SELLING TIPS COLUMN */}
            {
              !smDown &&
              <div className={clsx(
                classes.productColumn35,
                'fadeIn',
              )}>
                <SellingTips/>
              </div>
            }

            <SnackBarA
              open={state.showError && isFormikDisabled(errors)}
              closeSnackbar={() => setState(s => ({ ...s, showError: false }))}
              message={printValidationErrors(errors)}
              variant={"error"}
              autoHideDuration={900000}
            />
          </>
        );
      }}
    </Formik>
  )
}



const isFormikDisabled = (
  errors: FormikErrors<ProductCreateInputFrontEnd>,
) => {
  let formikErrors = Object.keys(errors)
  return formikErrors.length > 0
}

const printValidationErrors = (
  errors: FormikErrors<ProductCreateInputFrontEnd>
): string[] => {
  // watch out for nested objects which may not be strings
  // if using Object.values()
  const errorMsg = Object.keys(errors)
  return ["Please fill out: ", ...errorMsg]
}

export const reduxToFormikCurrentVariants = (
  productCreateInput: ProductCreateEditCommonInput,
  dzuPreviewItems: DzuPreviewItem[],
  dzuPreviewOrder: DzuPreviewOrder[],
) => {

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
      <Typography color={"primary"} variant="caption" className={classes.policy}>
        By posting, you confirm that this listing complies with Gun Marketplace's
        terms of service and applicable laws.
      </Typography>
      <Divider/>
      <ErrorBounds className={classes.flexButtons}>
        {props.children}
      </ErrorBounds>
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
  createProduct: { product: Product }
}
interface MutationVar {
  productCreateInput: ProductCreateInputFrontEnd
}

export default withStyles(styles)( ProductCreatePage );
