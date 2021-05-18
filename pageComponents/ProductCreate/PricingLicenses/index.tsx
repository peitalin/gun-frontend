import React from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
import { AddVariantInput, EditVariantInput } from "reduxStore/product_create-actions";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Components
import ErrorBounds from 'components/ErrorBounds';
// Typings
import { ProductVariantInput } from "typings/gqlTypes";
import { ReducerName } from "typings/dropzone";
// Material UI
import Typography from "@material-ui/core/Typography";
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import RefLink, { refLinks } from "../RefLink";
// Validation
import { FormikProps } from 'formik';
// Components
import PriceFields from "./PriceFields";



const PricingLicenses = (props: ReactProps & FormikProps<FormikFields>) => {

  // props and state
  const { classes, reducerName, currentVariants, ...fprops } = props;
  // const dispatch = useDispatch();
  // const actions = createActions(reducerName);

  React.useEffect(() => {
    fprops.setFieldValue("currentVariants", [
      ...currentVariants
    ])
  }, [currentVariants.length])


  return (
    <ErrorBounds className={clsx(classes.root, classes.positionRelative)}>

      <RefLink refId={refLinks.price}/>

      <div className={classes.flexRow}>
        <Typography
          className={classes.title}
          variant="subtitle1"
        >
          Price
        </Typography>
      </div>
      {
        currentVariants.map((variant, i) => {
          return (
            <div key={i} className={classes.rootLicense}>
              <div className={classes.fieldsContainer}>
                <div className={classes.flexRowLicense}>
                  <PriceFields
                    position={i}
                    reducerName={reducerName}
                    activeStep={props.activeStep}
                    setActiveStep={props.setActiveStep}
                    {...fprops}
                  />
                </div>
              </div>
            </div>
          )
        })
      }

    </ErrorBounds>
  )
}


const initialVariant: AddVariantInput = {
  variantName: "Extended License",
  variantDescription: "Extended License For Commercial Purposes",
  price: 100,
  priceWas: undefined,
  isDefault: false,
}

interface ReactProps extends WithStyles<typeof styles> {
  reducerName: ReducerName;
  currentVariants: ProductVariantInput[];
  // stepper
  activeStep?: number
  setActiveStep?(a?: any): void
}
interface variantNameArgs {
  variantName: string;
  position: number;
}
interface variantDescArgs {
  variantDescription: string;
  position: number;
}
interface FormikFields {
  currentVariants: {
    variantName: string;
    variantDescription: string;
    price: number;
    priceWas?: number;
  }[];
}



const createActions = (reducerName: ReducerName) => {
  complainIfMissingReduxActions(reducerName)
  return {
    updateVariantName: (payload: variantNameArgs) => {
      return Actions[reducerName].UPDATE_VARIANT_NAME(payload)
    },
    updateVariantDescription: (payload: variantDescArgs) => {
      return Actions[reducerName].UPDATE_VARIANT_DESCRIPTION(payload)
    },
    addVariant: (payload: EditVariantInput[] | AddVariantInput[]) => {
      if (reducerName === ReducerName.reduxProductCreate) {
        return Actions[ReducerName.reduxProductCreate]
          .ADD_VARIANTS(payload as AddVariantInput[])
      } else {
        return Actions[ReducerName.reduxProductEdit]
          .ADD_VARIANTS(payload as EditVariantInput[])
      }
    },
    removeVariant: (payload: number) => {
      return Actions[reducerName].REMOVE_VARIANT(payload)
    },
    setDefaultVariant: (position: number) => {
      return Actions[reducerName].SET_IS_DEFAULT(position)
    },
  }
}


const complainIfMissingReduxActions = (reducerName: string) => {
  if (!Actions[reducerName]) {
    console.warn("Actions[reducerName] does not exist for reducer: ", reducerName)
  } else {
    // console.log("reducerName", reducerName)
  }
}


export const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    fontWeight: 500,
  },
  positionRelative: {
    position: 'relative',
  },
  rootLicense: {
    padding: '0rem',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
  },
  fieldsContainer: {
    width: '100%',
  },
  flexRowLicense: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
})



export default withStyles(styles)( PricingLicenses );




