import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors } from "layout/AppTheme";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
import {
  productToProductEditInput,
  previewsToDzuPreviews,
} from "utils/conversions";

// Typings
import {
  ProductEditInput,
  ProductPreviewItemInput,
  ListingType,
  ProductType,
  External_Products,
  NewsItem,
  ClaimItemMutationResponse,
} from "typings/gqlTypes";

import {
  ReducerName,
  DzuFilePreview,
  DzuPreviewOrder,
  DzuPreviewItem
} from "typings/dropzone";
// Subcomponents
import ProductClaimFormLayout from "./ProductClaimFormLayout";
import PreventDragDropContainer from "pageComponents/ProductCreate/ProductCreatePage/PreventDragDropContainer";

import dynamic from 'next/dynamic'
const SelectDealer = dynamic(() => import("pageComponents/ProductCreate/SelectDealer"), {
  loading: () => <SelectFieldPlaceholder title={"Dealer"}/>,
  ssr: false,
})
import SelectFieldPlaceholder from "pageComponents/ProductCreate/SSR/SelectFieldPlaceholder";
import SectionBorder from "pageComponents/ProductCreate/ProductCreatePage/SectionBorder";
// SSR Subcomponents
import LoginPageClaimProduct from "./LoginPageClaimProduct"
import ImageSwapComponent from "./ImageSwapComponent";

// Validation
import { FormikErrors, useFormik } from 'formik';
import { validationSchemas } from "utils/validation";
// Graphql
import { useQuery, useMutation } from "@apollo/client";
import {
  SWAP_IMAGES_FOR_EXTERNAL_PRODUCT,
} from "queries/news-items-claims-mutations";
import { useRouter } from "next/router";
// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  SIGN_UP_AND_CLAIM_ITEM,
  LOG_IN_AND_CLAIM_ITEM,
} from "queries/news-items-claims-mutations";

import { reduxBatchUpdate } from "layout/GetUser";
import {
  passwordPreview,
  handleGqlError,
} from "layout/Login/utils";
import {
  printValidationErrorsClaims
} from "./utils"
import {
  reduxPreviewsToProductPreviewItemInput,
} from "pageComponents/ProductCreate/ProductCreatePage/utils";




const ProductClaimPage = (props: ReactProps) => {

  const {
    classes,
  } = props;

  const router = useRouter();
  const snackbar = useSnackbar();
  // Redux
  const reducerName: ReducerName = ReducerName.reduxImageSwap;
  const actions = Actions[reducerName];
  const dispatch = useDispatch();


  const {
    dzuPreviewOrder,
    dzuPreviewItems,
  } = useSelector<GrandReduxState, ReduxState>(state => {
    return {
      dzuPreviewOrder: state[reducerName]?.dzuPreviewOrder,
      dzuPreviewItems: state[reducerName]?.dzuPreviewItems,
    }
  });


  let [logInAndClaimItem, { loading: loading1 }] = useMutation<MData1, MVar1>(
    LOG_IN_AND_CLAIM_ITEM, {
    variables: {
      claimId: props.claimId,
      email: undefined,
      password: undefined,
      dealerId: undefined,
      newPreviewItems: undefined,
    },
    onCompleted: (data) => {
      let user = data?.logInAndClaimItem?.user;
      console.log("returned user: ", user)
      if (user) {
        // Update redux user and collections
        dispatch(reduxBatchUpdate.userAndCollections({ user: user }))
      }
      if (data?.logInAndClaimItem) {
        setTimeout(() => {
          // alert('/admin/products')
          router.push("/admin/products")
        }, 500)
        formik.resetForm()
      }
    },
    onError: (error) => {
      handleGqlError(error, snackbar)
    },
    // errorPolicy: "all", // propagate errors from backend to Snackbar
  })

  let [signUpAndClaimItem, { loading: loading2 }] = useMutation<MData2, MVar2>(
    SIGN_UP_AND_CLAIM_ITEM, {
    variables: {
      claimId: props.claimId,
      email: undefined,
      password: undefined,
      dealerId: undefined,
      newPreviewItems: undefined,
      // phone args
      phoneNumber: undefined,
      countryCode: undefined,
      // license args
      firstName: undefined,
      lastName: undefined,
      licenseNumber: undefined,
      licenseExpiry: undefined,
      licenseCategory: undefined,
      licenseState: undefined,
    },
    onCompleted: (data) => {
      let user = data?.signUpAndClaimItem?.user;
      console.log("returned user: ", user)
      if (user) {
        // Update redux user and collections
        dispatch(reduxBatchUpdate.userAndCollections({ user: user }))
      }
      if (data?.signUpAndClaimItem) {
        setTimeout(() => {
          // alert('/admin/products')
          router.replace("/admin/products")
        }, 500)
        formik.resetForm()
      }
    },
    onError: (error) => {
      handleGqlError(error, snackbar)
    },
    // errorPolicy: "all", // propagate errors from backend to Snackbar
  })

   ///////////////////////////
  ///////// FORMIK //////////
  ///////////////////////////

  let validationSchema = props.tabIndex === 0
    ? validationSchemas.LogInAndClaim
    : validationSchemas.SignUpAndClaimItem


  const formik = useFormik<FormikFields>({
    initialValues: {
      claimId: props.claimId,
      email: undefined,
      password: undefined,
      dealerId: undefined,
      previewItems: [],
      // phone args
      phoneNumber: undefined,
      countryCode: undefined,
      // license args
      firstName: undefined,
      lastName: undefined,
      licenseNumber: undefined,
      licenseExpiry: undefined,
      licenseCategory: undefined,
      licenseState: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      // Dispatch Apollo Mutation after validation
      if (props.tabIndex === 0) {
        console.log("dispatching LogInAndClaim with values: ", values)
        logInAndClaimItem({
          variables: {
            claimId: values.claimId,
            dealerId: values.dealerId,
            newPreviewItems: values.previewItems,
            email: values.email,
            password: values.password,
          }
        })
      } else {
        console.log("dispatching SignUpAndClaim with values: ", values)
        signUpAndClaimItem({
          variables: {
            claimId: values.claimId,
            email: values.email,
            password: values.password,
            dealerId: values.dealerId,
            newPreviewItems: values.previewItems,
            // phone args
            phoneNumber: values.phoneNumber,
            countryCode: values.countryCode,
            // license args
            firstName: values.firstName,
            lastName: values.lastName,
            licenseNumber: values.licenseNumber,
            licenseExpiry: values.licenseExpiry,
            licenseCategory: values.licenseCategory.join(','),
            licenseState: values.licenseState,
          }
        })
      }
    }
  })

  let loading = loading1 || loading2


  // Any time we dynamically change the validation schema revalidate form
  React.useEffect(() => {
    formik.validateForm();
  }, [validationSchema]);

  // // Any time we dynamically change the validation schema revalidate the
  React.useEffect(() => {
    printValidationErrorsClaims(formik.errors)
  }, [formik.errors]);


  React.useEffect(() => {
    // console.log("updating formik.previewItems. isInternal images only")
    formik.setFieldValue(
      "previewItems",
      reduxPreviewsToProductPreviewItemInput({
        dzuPreviewItems,
        dzuPreviewOrder,
      }).filter(p => p.isInternal)
    );
  }, [dzuPreviewItems, dzuPreviewOrder])


  // console.log("formik.values", formik.values)
  // console.log("formik.errors", formik.errors)
  // console.log("formik.touched", formik.touched)
  // console.log("dzuPreviewItems ", dzuPreviewItems)


  return (
    <PreventDragDropContainer>
      <ProductClaimFormLayout
        onSubmit={formik.handleSubmit} // dispatches to <Formik onSubmit={}/>
      >
        <ImageSwapComponent
          claimId={props.claimId}
          externalProduct={props.externalProduct}
        />

        <SectionBorder thickPadding={true}>
          <SelectDealer
            instructions={
              <div className={classes.instructions}>
                Select a dealer. This determines the listing state.<br/>
                If your dealer is missing, please skip this step and contact us
                to add the missing dealer. You will be able to add it later.
              </div>
            }
            {...formik}
          />
        </SectionBorder>

        <div className={classes.flexCol2}>
          <LoginPageClaimProduct
            claimId={props.claimId}
            tabIndex={props.tabIndex}
            setTabIndex={props.setTabIndex}
            titleLogin={
              <div className={classes.loginTitle}>
                2. Log in and claim listing
              </div>
            }
            titleSignup={
              <div className={classes.loginTitle}>
                2. Create an account and Claim Listing
              </div>
            }
            formik={formik}
            loading={loading}
          />
        </div>


      </ProductClaimFormLayout>
    </PreventDragDropContainer>
  )
}


const isFormikDisabled = (
  errors: FormikErrors<ProductEditInput>,
) => {
  let formikErrors = Object.keys(errors)
  return formikErrors.length > 0
}


interface ReactProps extends WithStyles<typeof styles> {
  externalProduct: External_Products;
  claimId: string
  tabIndex: number
  setTabIndex(t: number): void
}

interface ReduxState {
  dzuPreviewOrder: DzuPreviewOrder[];
  dzuPreviewItems: DzuPreviewItem[];
}

interface MVar1 {
  claimId: string
  email: string,
  password: string,
  newPreviewItems: ProductPreviewItemInput[]
  dealerId?: string,
}
interface MData1 {
  logInAndClaimItem: ClaimItemMutationResponse;
}
interface MVar2 {
  claimId: string,
  email: string,
  password: string,
  newPreviewItems: ProductPreviewItemInput[]
  dealerId?: string,
  // phone args
  phoneNumber?: string
  countryCode?: string
  // license args
  firstName: string,
  lastName: string,
  licenseNumber: string,
  licenseExpiry: Date,
  licenseCategory: string,
  licenseState: string,
}
interface MData2 {
  signUpAndClaimItem: ClaimItemMutationResponse;
}
interface FormikFields {
  claimId: string,
  email: string,
  password: string,
  previewItems: ProductPreviewItemInput[]
  dealerId?: string,
  // phone args
  phoneNumber?: string
  countryCode?: string
  // license args
  firstName: string,
  lastName: string,
  licenseNumber: string,
  licenseExpiry: Date,
  licenseCategory: string[],
  licenseState: string,
}


export const styles = (theme: Theme) => createStyles({
  confirmButton: {
    margin: 0,
    color: Colors.ultramarineBlue,
  },
  // Buttons
  flexButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  loginTitle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: '1.25rem',
    fontWeight: 600,
    color: Colors.magenta,
  },
  flexCol2: {
    padding: '0rem 3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    marginBottom: "0.5rem",
    marginTop: "0.5rem",
    color: Colors.uniswapLighterGrey,
    fontSize: '0.825rem',
    fontWeight: 400,
    lineHeight: '0.9rem',
  },
})

export default withStyles(styles)( ProductClaimPage );

