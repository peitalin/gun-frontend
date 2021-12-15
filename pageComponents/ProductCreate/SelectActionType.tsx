import React from "react";
import clsx from "clsx";
// Redux
import { ActionTypes, ActionType } from "typings";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { styles } from './commonStyles';
// Material UI
import Typography from "@mui/material/Typography";
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
// Select Component
import { sortActionTypeByName } from "./categoryHooks";
// Util components
import ErrorBounds from 'components/ErrorBounds';
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
// MUI expander
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const SelectActionType = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    defaultExpanded = false,
    ...fprops
  } = props;

  const [openExpander, setOpenExpander] = React.useState(defaultExpanded);

  const setActionType = (newCat: SelectOption) => {
    fprops.setFieldValue("actionType", newCat.value)
  }

  const actionTypeChoices = ActionTypes
      .sort(sortActionTypeByName)

  const chosenActionType = actionTypeChoices.find(a => a === fprops.values.actionType)

  return (
    <ErrorBounds className={classes.positionRelative}>
      <div className={clsx(classes.formContainer)}>
        <Typography color={"primary"} variant="subtitle1">
          Action Type
        </Typography>
        <FormGroup row
          className={clsx(classes.formGroup, classes.marginTop05)}
        >

          <Accordion
            defaultExpanded={defaultExpanded}
            classes={{
              root: clsx(
                classes.expansionPanelRoot,
                (fprops.errors?.actionType && fprops.touched?.actionType) &&
                classes.expansionPanelError,
              ),
              expanded: classes.expansionPanelExpanded,
            }}
            expanded={openExpander}
            onChange={(event, expanded) => {
              setOpenExpander(s => !s)
              if (!fprops.touched.actionType) {
                fprops.setFieldTouched("actionType", true)
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
                  !chosenActionType
                    ? classes.selectedCategoryEmpty
                    : openExpander
                      ? classes.selectedCategoryOpen
                      : classes.selectedCategoryClosed
                }
                color={"primary"}
                variant="subtitle1"
              >
                {
                  chosenActionType
                    ? chosenActionType
                    : "Select Action Type"
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
                <div className={classes.accordionButtonsBox}>
                  {
                    actionTypeChoices.map((aType, i) => {
                      return (
                        <Button
                          key={aType + `${i}`}
                          classes={{
                            root: clsx(
                              classes.buttonRoot,
                              (aType === fprops.values.actionType)
                                ? classes.buttonSelected
                                : null,
                            )
                          }}
                          variant="outlined"
                          onClick={() => {
                            fprops.setFieldTouched("actionType", true)
                            setActionType({
                              label: aType,
                              value: aType,
                            })
                            setOpenExpander(s => !s)
                          }}
                        >
                          {aType}
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
              touched={fprops.touched.actionType}
              focused={false}
              errorMessage={fprops.errors.actionType}
              disableInitialValidationMessage={true}
            />
          </div>
        </FormGroup>
      </div>
    </ErrorBounds>
  )
}


export interface SelectOption {
  label: string;
  value: string | any;
}
interface ReactProps extends WithStyles<typeof styles> {
  defaultExpanded?: boolean
}
interface FormikFields {
  actionType?: string;
}

export default withStyles(styles)( SelectActionType );








