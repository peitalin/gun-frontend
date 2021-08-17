import React from "react";
import clsx from "clsx";
// Typings
import { ListingType, UserPrivate } from "typings/gqlTypes";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from './commonStyles';
// Material UI
import Typography from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import Loading from "components/Loading";
import ErrorDisplay from "components/ErrorDisplay";
import ErrorBounds from 'components/ErrorBounds';
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';



const SelectListingType = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    ...fprops
  } = props;


  const setListingTypeHandler = (listing: ListingType) => {
    fprops.setFieldValue("listingType", listing)
  }


  return (
    <div className={classes.positionRelative}
      onMouseEnter={() => {
        props.setActiveStep(8)
      }}
    >
      <Typography color={"primary"} variant="subtitle1">
        Listing Type
      </Typography>
      <div className={clsx(classes.listingTypeContainer)}>
        <FormGroup row
          className={clsx(classes.formGroup, classes.marginTop1)}
        >
          <div className={clsx(
            classes.listingTypeButton,
            fprops.values?.listingType === ListingType.CLASSIFIED
              && classes.listingTypeButtonSelected,
          )}
            onClick={() => setListingTypeHandler(ListingType.CLASSIFIED)}
          >
            Classified Ad
          </div>

          {/* <div className={clsx(
            classes.listingTypeButton,
            fprops.values?.listingType === ListingType.CLASSIFIED_WITH_ESCROW
              && classes.listingTypeButtonSelected,
          )}
            onClick={() => setListingTypeHandler(ListingType.CLASSIFIED_WITH_ESCROW)}
          >
            Classified Ad with Escrow
          </div> */}

          <div className={clsx(
            classes.listingTypeButton,
            classes.listingTypeButtonDisabled,
            // fprops.values?.listingType === ListingType.ESCROW_ONLY
            //   && classes.listingTypeButtonSelected,
          )}
            // onClick={() => setListingTypeHandler(ListingType.ESCROW_ONLY)}
          >
            Escrow Only (disabled for now)
          </div>

          <div className={classes.validationContainer}>
            <ValidationErrorMsg
              touched={fprops.touched.listingType}
              focused={false}
              errorMessage={fprops.errors.listingType}
              disableInitialValidationMessage={true}
            />
          </div>
        </FormGroup>
      </div>
    </div>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
  activeStep: number
  setActiveStep(a: number): void
}
interface FormikFields {
  listingType?: string | ListingType;
}


export default withStyles(styles)( SelectListingType );








