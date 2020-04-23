import React from "react";
// Styles
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";
// Typings
import { ProductVariantInput } from "typings/gqlTypes";
// Components
import PriceFields from "./PriceFields";
// Validation
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
import { ReducerName } from "typings/dropzone";
import { Colors } from "layout/AppTheme";



const License = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    variant,
    position,
    removeVariant,
    reducerName,
    ...fprops
  } = props;

  // Formik props
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
  } = fprops;


  return (
    <div className={classes.root}>
      <div className={classes.fieldsContainer}>
        <div className={classes.flexRow}>
          {
            (props.position !== 0) &&
            <Typography
              className={classes.label}
              color={"primary"}
              variant="subtitle2"
            >
              {variant.variantName}
            </Typography>
          }
          <PriceFields
            position={props.position}
            reducerName={reducerName}
            {...fprops}
          />
        </div>
      </div>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  variant: ProductVariantInput;
  position: number;
  reducerName: ReducerName;
  removeVariant(): void;
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
    padding: '0rem',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
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
  textField: {
    width: "100%",
    marginBottom: '1rem',
    "&:focus-within": {
      color: '#24A4FF',
    },
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  label: {
    width: '100%',
    marginBottom: '0.25rem',
  },
  optionName: {
    flexBasis: '33%',
    margin: '0px',
    marginRight: '1rem'
  },
  optionValues: {
    flexBasis: '66%',
    marginRight: '1rem'
  },
  deleteButton: {
    height: '100%',
  },
});

export default withStyles(styles)( License );