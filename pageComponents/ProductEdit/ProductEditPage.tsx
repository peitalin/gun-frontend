import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { ReduxStateProductEdit } from "reduxStore/product_edit-reducer";
// Typings
import {
  Product,
  ProductEditInput,
  ProductVariantInput,
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
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Switch from '@material-ui/core/Switch';
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
// Errors
import ErrorBounds from 'components/ErrorBounds';
import ErrorDisplay from "components/Error";
import ButtonLoading from "components/ButtonLoading";
// Subcomponents
import Title from "pageComponents/ProductCreate/TitleSerialNumber";
import Description from "pageComponents/ProductCreate/Description";
import IsPublished from "./IsPublished";
import SelectCategories from "pageComponents/ProductCreate/SelectCategories";
import SelectActionType from "pageComponents/ProductCreate/SelectActionType";
import SelectTags from "pageComponents/ProductCreate/SelectTags";
import PricingLicenses from "pageComponents/ProductCreate/PricingLicenses";
import DisplaySnackBars from "pageComponents/ProductCreate/ProductCreatePage/DisplaySnackBars";
// SSR Subcomponents
import dynamic from 'next/dynamic'
import UploadInputPlaceholder from "pageComponents/ProductCreate/SSR/UploadInputPlaceholder";
import UploadPreviewPlaceholder from "pageComponents/ProductCreate/SSR/UploadPreviewPlaceholder";

const PreviewItemUploaderGrid = dynamic(() => import("pageComponents/ProductCreate/PreviewItemUploaderGrid"), {
  loading: () => <UploadPreviewPlaceholder/>,
  ssr: false,
})

// Validation
import { Formik, FormikErrors } from 'formik';
import { validationSchemas } from "utils/validation";
// Graphql
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { EDIT_PRODUCT } from "queries/products-mutations";
import { GET_RECOMMENDED_PRODUCTS, GET_PRODUCT } from "queries/products-queries";
import { GET_STORE_PRIVATE } from "queries/store-queries";
import { productToProductEditInput } from "utils/conversions";
import { useRouter } from "next/router";
import {
  serializeHtml,
} from 'components/TextEditor/helpersSerializers';
import { createOption } from "components/Fields/KeywordDropdownInput";
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
import { seedProductEditDataAction } from "pageComponents/ProductEdit/seedEditData";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  reduxToFormikCurrentVariants
} from "pageComponents/ProductCreate/ProductCreatePage";




const ProductEditPage = (props: ReactProps) => {

  // Props & State
  const { classes, asModal, closeModal, product } = props;
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
  } = useSelector<GrandReduxState, ReduxState>(state => {
    return {
      reduxProductEdit: state[reducerName],
      dzuPreviewOrder: option(state[reducerName]).dzuPreviewOrder(),
      dzuPreviewItems: option(state[reducerName]).dzuPreviewItems(),
    }
  });

  const productEditInput = reduxProductEdit.productEditInput;
  // see if any previewItems are a before'after slider image
  const [showBeforeAfterPreviews, setShowBeforeAfterPreviews] = React.useState(true);


  // Effects
  React.useEffect(() => {
    dispatch(actions.UPDATE_PRODUCT_ID(productEditInput.productId))
  }, [productEditInput.productId])

  // Apollo
  const aClient = useApolloClient();

  const [productEdit, {data, loading: apolloLoading, error}] =
  useMutation<MutationData, MutationVar>(EDIT_PRODUCT, {
    variables: {
      productEditInput: productEditInput as any
    },
    onError: (err) => console.log(err),
    onCompleted: async(data: MutationData) => {

      dispatch(Actions.reduxModals.TOGGLE_PRODUCT_EDIT_MODAL(false))
      // router.back()
      router.push("/admin/products")
      setState(s => ({ ...s, loading: false }))

      setTimeout(() => {
        // reset redux form
        dispatch(actions.RESET_PRODUCT_EDIT())
      }, 200)

      try {

        ///// Refetch product data
        // 1. refresh /gallery
        aClient.query({
          query: GET_RECOMMENDED_PRODUCTS,
          variables: { count: 18 }
        });
        // 2. refreshes /product/:productId
        aClient.query({
          query: GET_PRODUCT,
          variables: { productId: productEditInput.productId }
        });
        // 3. refreshs /admin productsForSale Connections
        aClient.query({
          query: GET_STORE_PRIVATE,
        });

      } catch (e) {
        console.log(e)
      }
    },
  })


  return (
  <div
    className={"prevent-accidental-drag-drop"}
    onDragOver={(e) => {
      console.log("ahh! you tried to drop on the wrong neighbourhood")
      e.preventDefault()
    }}
    onDrop={(e) => {
      console.log("ahh! you tried to drop on the wrong neighbourhood")
      e.preventDefault()
    }}
  >
    <Formik
      // 1. feed product data to edit into formik state.
      initialValues={{
        ...productToProductEditInput(product)
      }}
      validationSchema={validationSchemas.ProductEdit}
      onSubmit={(values, { setSubmitting }) => {
        console.log('formik values: ', values);
        // // Dispatch Apollo Mutation after validation
        let htmlDescription = serializeHtml(values.description)
        productEdit({
          variables: {
            productEditInput: {
              title: values.title,
              description: htmlDescription,
              categoryId: values.categoryId,
              tags: values.tags,
              currentVariants: values.currentVariants,
              isPublished: values.isPublished,
              productId: values.productId,
            } as any
          },
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

        // console.log("fprops", fprops.values.description)
        // console.info("fprops.values: ", fprops.values)

        return (
          <ProductEditForm
            classes={classes}
            asModal={asModal}
            closeModal={closeModal}
            onSubmit={handleSubmit} // dispatches to <Formik onSubmit={}/>
          >
            <Title {...fprops}/>

            <Description
              {...fprops}
            />

            <SelectCategories
              {...fprops}
            />

            <SelectActionType
              {...fprops}
            />

            <PreviewItemUploaderGrid
              reducerName={reducerName}
              productInput={productEditInput}
              storeId={product.store.id}
              productId={product.id}
              dzuPreviewItems={dzuPreviewItems}
              dzuPreviewOrder={dzuPreviewOrder}
              {...fprops}
            />

            <PricingLicenses
              reducerName={reducerName}
              currentVariants={values.currentVariants}
              {...fprops}
            />

            <ErrorBounds className={classes.flexButtons}>
              <div className={classes.flexButtonItem}>
                <Button
                  style={{ width: 150 }}
                  variant={"outlined"}
                  color={"primary"}
                  onClick={() => router.back()}
                  className={props.classes.button}
                >
                  Back to Listings
                </Button>
              </div>
              <div className={classes.flexButtonSpacer}/>
              <div className={classes.flexButtonItem}>
                <ButtonLoading
                  type="submit" // this sets off Form submit
                  className={props.classes.button}
                  variant={"outlined"}
                  color={"secondary"}
                  style={{
                    width: '150px',
                    height: 40,
                  }}
                  loadingIconColor={Colors.secondary}
                  replaceTextWhenLoading={true}
                  loading={state.loading || apolloLoading}
                  disabled={!process.browser || apolloLoading}
                  // disable during apolloDispatch, not when state.loading = true
                  // state.loading comes first, don't disable the form accidentally
                  onClick={() => {

                    setState(s => ({ ...s, loading: true }))
                    fprops.setFieldValue("productId", productEditInput.productId);
                    fprops.setFieldValue(
                      "currentVariants",
                      reduxToFormikCurrentVariants(
                        productEditInput,
                        dzuPreviewItems,
                        dzuPreviewOrder,
                      )
                    );

                    setTimeout(() => {
                      // need to await formikCurrencyVariants update
                      if (Object.keys(errors).length > 0) {
                        setState(s => ({ ...s, loading: false }))
                        snackbar.enqueueSnackbar(
                          `Uh... ${JSON.stringify(errors)}`,
                          { variant: "error" }
                        )
                      }
                    }, 0)

                    console.log('errors: ', errors);
                    console.log('values: ', values);
                  }}
                >
                  Save Changes
                </ButtonLoading>
              </div>
              <DisplaySnackBars
                error={error}
                data={data}
              />
            </ErrorBounds>
          </ProductEditForm>
        )
      }}
    </Formik>
  </div>
  )
}

const ProductEditForm: React.FC<ProductEditFormProps> = (props) => {
  const { classes, asModal, closeModal, children } = props;
  const { onSubmit } = props; // submits to Formik validation
  // with a callback to Formik.onSubmit prop
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={smDown ? classes.rootSm : classes.root}>
      <div className={classes.maxWidth500}>
        <div className={asModal ? classes.modalMargin : classes.pageMargin}>
          {
            asModal &&
            <div className={classes.flexEnd}>
              <IconButton onClick={closeModal}>
                <ClearIcon/>
              </IconButton>
            </div>
          }
        </div>
        <form onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  )
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
}


interface ProductEditFormProps extends WithStyles<typeof styles> {
  asModal?: boolean;
  closeModal(): void;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
}

export interface MutationData {
  editProduct: { product: Product }
}
interface MutationVar {
  productEditInput: ProductEditInput
}


export default withStyles(styles)( ProductEditPage );

