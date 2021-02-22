import React from "react";
// Styles
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
// Material UI
import Typography from "@material-ui/core/Typography";
// Typings
import { ProductVariantInput } from "typings/gqlTypes";
// Validation
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
import { ReducerName } from "typings/dropzone";
import { Colors } from "layout/AppTheme";
import TextInput from "components/Fields/TextInput";



const AvailabilityForm = (props: ReactProps & FormikProps<FormikFields>) => {

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
          <Typography
            className={classes.label}
            color={"primary"}
            variant="subtitle2"
          >
            Available
          </Typography>
          <TextInput
            name={`currentVariants[${position}].quantity`}
            type="tel"
            placeholder="$0.00"
            className={classes.textField}
            value={""}
            onChange={(e) => {
              // e.persist()
              // onChange(e)
            }}
            onBlur={handleBlur}
            inputProps={{ style: { width: '100%' }}}
            // errorMessage={
            //   option(errors).currentVariants[position].priceWas()
            //   ? errors.currentVariants[position].priceWas
            //   : null
            // }
            // touched={option(touched).currentVariants[position].priceWas()}
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
    priceWas: number;
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
});

export default withStyles(styles)( AvailabilityForm );