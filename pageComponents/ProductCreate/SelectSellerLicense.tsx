import React from "react";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
// Typings
import { User_Licenses, UserPrivate } from "typings/gqlTypes";
import { ReducerName } from "typings/dropzone";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from './commonStyles';
// Material UI
import Typography from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
// Select Component
// import DropdownInput from "components/Fields/DropdownInput";
// Util components
import Loading from "components/Loading";
import ErrorDisplay from "components/ErrorDisplay";
import ErrorBounds from 'components/ErrorBounds';
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
// MUI expander
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const SelectSellerLicense = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    user,
    defaultExpanded = false,
    ...fprops
  } = props;

  const [openExpander, setOpenExpander] = React.useState(defaultExpanded);
  const [chosenLicense, setChosenLicense] = React.useState<SelectOptionLicense>(undefined)

  const setSellerLicenseId = (license: SelectOptionLicense) => {
    fprops.setFieldValue("sellerLicenseId", license?.value?.id)
    setChosenLicense(license)
  }

  const licenseOptions = createLicenseOptions(user?.licenses)

  React.useEffect(() => {
    // set defaultLicense as the initial option
    // for ProductEdit
    if (props.sellerLicenseId) {
      let chosenLicense = licenseOptions.find(
        l => props.sellerLicenseId === (l.value as User_Licenses).id
      )
      setSellerLicenseId(chosenLicense)

    } else if (user?.defaultLicenseId) {
      //// for ProductCreate, make the user choose license everytime
      //// so there is less mistakes
      // let defaultLicense = licenseOptions.find(
      //   l => props.user?.defaultLicenseId === (l.value as User_Licenses).id
      // )
      // setSellerLicenseId(defaultLicense)
    }
  }, [props.user?.defaultLicenseId])


  return (
    <ErrorBounds className={classes.positionRelative}>
      <div className={clsx(classes.formContainer)}>
        <Typography color={"primary"} variant="subtitle1">
          License Number
        </Typography>
        <FormGroup row
          className={clsx(classes.formGroup, classes.marginTop05)}
        >

          <Accordion
            defaultExpanded={defaultExpanded}
            classes={{
              root: clsx(
                classes.expansionPanelRoot,
                (fprops.errors?.sellerLicenseId && fprops.touched?.sellerLicenseId) &&
                classes.expansionPanelError,
              ),
              expanded: classes.expansionPanelExpanded,
            }}
            expanded={openExpander}
            onChange={(event, expanded) => {
              setOpenExpander(s => !s)
              if (!fprops.touched.sellerLicenseId) {
                fprops.setFieldTouched("sellerLicenseId", true)
              }
            }}
            elevation={0} // remove box-shadow
            TransitionProps={{
              timeout: {
                appear: 50,
                enter: 50,
                exit: 50,
              }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{
                root: classes.expanderRoot,
                expanded: classes.expanderExpanded,
                content: classes.expanderContent,
                expandIcon: classes.expandIcon,
              }}
            >
              <Typography className={
                  !chosenLicense?.value?.licenseNumber
                    ? classes.selectedCategoryEmpty
                    : openExpander
                      ? classes.selectedCategoryOpen
                      : classes.selectedCategoryClosed
                }
                color={"primary"}
                variant="subtitle1"
              >
                {
                  chosenLicense?.value?.licenseNumber
                    ? chosenLicense.value?.licenseNumber
                    : "Select a License"
                }
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0px',
                width: '100%'
              }}>
                <div className={classes.categoryButtonsContainer}>
                  {
                    (user?.licenses ?? []).map((license, i) => {
                      let categories = license.licenseCategory?.replace("Category", "")
                      return (
                        <Button
                          key={license.id + `${i}`}
                          classes={{
                            root: clsx(
                              classes.buttonRoot,
                              classes.width100,
                              (license.id === fprops.values.sellerLicenseId)
                                ? classes.buttonSelected
                                : null,
                            ),
                            label: clsx(
                              classes.flexCol,
                            )
                          }}
                          variant="outlined"
                          onClick={() => {
                            fprops.setFieldTouched("sellerLicenseId", true)
                            setSellerLicenseId({
                              label: license.licenseNumber,
                              value: license,
                            })
                            setOpenExpander(s => !s)
                          }}
                        >
                          <div className={classes.licenseButtonNumber}>
                            {`License: ${license.licenseNumber}`}
                          </div>
                          <div className={classes.licenseButtonCategory}>
                            {`Category: ${categories}`}
                          </div>
                        </Button>
                      )
                    })
                  }
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

          <div className={classes.validationContainer}>
            <ValidationErrorMsg
              touched={fprops.touched.sellerLicenseId}
              focused={false}
              errorMessage={fprops.errors.sellerLicenseId}
              disableInitialValidationMessage={true}
            />
          </div>
        </FormGroup>
      </div>
    </ErrorBounds>
  )
}



const createLicenseOptions = (licenses: User_Licenses[]): SelectOptionLicense[] => {
  return (licenses ?? []).map(c => {
    return {
      label: `License ${c.licenseNumber}`,
      value: c,
    }
  })
}
interface SelectOptionLicense {
  label: string;
  value: User_Licenses;
}


interface ReactProps extends WithStyles<typeof styles> {
  defaultExpanded?: boolean
  user: UserPrivate
  sellerLicenseId: string
}
interface FormikFields {
  sellerLicenseId: string;
}

export default withStyles(styles)( SelectSellerLicense );








