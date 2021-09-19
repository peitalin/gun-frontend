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

import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";

import Dialog from "@material-ui/core/Dialog";
// Components
import CreateStoreForm from "pageComponents/StorePayoutCreation/CreateStorePayoutForm";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { payoutDoesNotExist } from "utils/store";




const SelectListingType = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    user,
    ...fprops
  } = props;


  const setListingTypeHandler = (listing: ListingType) => {
    fprops.setFieldValue("listingType", listing)
  }

  const dispatch = useDispatch()
  const storePayoutCreateModalOpen = useSelector<GrandReduxState, boolean>(
    r => r.reduxModals.storePayoutCreateModalOpen
  )

  // CSS media queries
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  // console.log("payoutMETHOD: ", user?.payoutMethod)

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
              Classified Ads are free until I finish building a checkout.
              Prices will be around $5 after that.
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
            classes={{
              label: classes.listingTypeButtonLabel,
            }}
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
            classes={{
              label: classes.listingTypeButtonLabel,
            }}
            onClick={() => {

              if (payoutDoesNotExist(user)) {
                dispatch(Actions.reduxModals.TOGGLE_STORE_PAYOUT_CREATE_MODAL(true))
              } else {
                dispatch(Actions.reduxModals.TOGGLE_STORE_PAYOUT_CREATE_MODAL(false))
                setListingTypeHandler(ListingType.ESCROW_ONLY)
              }

            }}
          >
            <span className={classes.listingLabelTop}>
              Escrow Listing
            </span>
            <span className={classes.listingLabelBottom}>
              (Beta Testing)
            </span>
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

      <Dialog
        open={storePayoutCreateModalOpen}
        fullScreen={mdDown}
        fullWidth={mdDown}
        onClose={() => {
          dispatch(Actions.reduxModals.TOGGLE_STORE_PAYOUT_CREATE_MODAL(false))
        }}
        BackdropProps={{
          classes: {
            root: classes.modalBackdrop,
          }
        }}
        PaperProps={{
          classes: {
            root: classes.modalPaperScrollPaper
          }
        }}
        scroll={'body'}
      >
        <CreateStoreForm asModal={true}
          setListingTypeCallback={() => {
            setListingTypeHandler(ListingType.ESCROW_ONLY)
          }}
          // closeModal={ }
        />
      </Dialog>

    </div>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
  activeStep: number
  setActiveStep(a: number): void
  user: UserPrivate
}
interface FormikFields {
  listingType?: string | ListingType;
}


export default withStyles(styles)( SelectListingType );








