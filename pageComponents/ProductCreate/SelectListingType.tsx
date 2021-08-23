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
import Button from "@material-ui/core/Button";
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

      <div className={clsx(classes.listingTypeContainer, classes.marginTop2)}>
        {
          fprops.values?.listingType === ListingType.CLASSIFIED
          ? <div className={classes.textListing}>
              {/* Fee is $10 per listing */}
              Free until I finish building a checkout.
              <br/>
              Price will be $10 after that.
            </div>
          : <div className={classes.textListing}>
              Escrow listings have no fees up-front.
              A 3.5% fee applies after the gun is bought
              and disposed to the dealer.
            </div>
        }
      </div>


      <div className={clsx(classes.listingTypeContainer)}>


        <FormGroup row
          className={clsx(classes.formGroup, classes.marginTop1)}
        >
          <Button className={clsx(
            classes.listingTypeButton,
            fprops.values?.listingType === ListingType.CLASSIFIED
              && classes.listingTypeButtonSelected,
          )}
            onClick={() => setListingTypeHandler(ListingType.CLASSIFIED)}
          >
            Classified Ad
          </Button>

          {/* <div className={clsx(
            classes.listingTypeButton,
            fprops.values?.listingType === ListingType.CLASSIFIED_WITH_ESCROW
              && classes.listingTypeButtonSelected,
          )}
            onClick={() => setListingTypeHandler(ListingType.CLASSIFIED_WITH_ESCROW)}
          >
            Classified Ad with Escrow
          </div> */}

          <div className={classes.listingSpacing}/>

          <Button className={clsx(
            classes.listingTypeButton,
            // classes.listingTypeButtonDisabled,
            fprops.values?.listingType === ListingType.ESCROW_ONLY
              && classes.listingTypeButtonSelected,
          )}
            onClick={() => setListingTypeHandler(ListingType.ESCROW_ONLY)}
          >
            Escrow Listing
            <br/>
            (Beta Testing)
          </Button>

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








