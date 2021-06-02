import React from "react";
// Redux
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
import RefLink, { refLinks } from "../RefLink";
// Validation
import { FormikProps } from 'formik';
// Components
import PriceFields from "./PriceFields";



const Pricing = (props: ReactProps & FormikProps<FormikFields>) => {

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


interface ReactProps extends WithStyles<typeof styles> {
  reducerName: ReducerName;
  currentVariants: ProductVariantInput[];
  // stepper
  activeStep?: number
  setActiveStep?(a?: any): void
}
interface FormikFields {
  currentVariants: {
    variantName: string;
    variantDescription: string;
    price: number;
    priceWas?: number;
  }[];
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



export default withStyles(styles)( Pricing );




