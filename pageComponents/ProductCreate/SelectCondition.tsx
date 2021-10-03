import React from "react";
import clsx from "clsx";
// Typings
import { Conditions, Condition, getConditionDescription } from "typings";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { styles } from './commonStyles';
// Material UI
import Typography from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorBounds from 'components/ErrorBounds';
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
// MUI expander
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { SelectOption } from "typings";



const SelectCondition = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    defaultExpanded = false,
    ...fprops
  } = props;

  const [openExpander, setOpenExpander] = React.useState(defaultExpanded);

  const setCondition = (newCat: SelectOption) => {
    fprops.setFieldValue("condition", newCat.value)
  }

  const conditionChoices = Conditions

  const chosenCondition = conditionChoices.find(a => a === fprops.values.condition)

  return (
    <ErrorBounds className={classes.positionRelative}>
      <div className={clsx(classes.formContainer)}>
        <Typography color={"primary"} variant="subtitle1">
          Condition
        </Typography>
        <FormGroup row
          className={clsx(classes.formGroup, classes.marginTop05)}
        >

          <Accordion
            defaultExpanded={defaultExpanded}
            classes={{
              root: clsx(
                classes.expansionPanelRoot,
                (fprops.errors?.condition && fprops.touched?.condition) &&
                classes.expansionPanelError,
              ),
              expanded: classes.expansionPanelExpanded,
            }}
            expanded={openExpander}
            onChange={(event, expanded) => {
              setOpenExpander(s => !s)
              if (!fprops.touched.condition) {
                fprops.setFieldTouched("condition", true)
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
                  !chosenCondition
                    ? classes.selectedCategoryEmpty
                    : openExpander
                      ? classes.selectedCategoryOpen
                      : classes.selectedCategoryClosed
                }
                color={"primary"}
                variant="subtitle1"
              >
                {
                  chosenCondition
                    ? chosenCondition
                    : "Select Condition"
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
                    conditionChoices.map((cond, i) => {
                      let conditionDescription = getConditionDescription(cond)
                      return (
                        <Tooltip key={cond + `${i}`}
                          title={conditionDescription}
                          placement={"top"}
                        >
                          <Button
                            key={cond + `${i}`}
                            classes={{
                              root: clsx(
                                classes.buttonRoot,
                                (cond === fprops.values.condition)
                                  ? classes.buttonSelected
                                  : null,
                              )
                            }}
                            variant="outlined"
                            onClick={() => {
                              fprops.setFieldTouched("condition", true)
                              setCondition({
                                label: cond,
                                value: cond,
                              })
                              setOpenExpander(s => !s)
                            }}
                          >
                            {cond}
                          </Button>
                        </Tooltip>
                      )
                    })
                  }
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

          <div className={classes.validationContainer}>
            <ValidationErrorMsg
              touched={fprops.touched.condition}
              focused={false}
              errorMessage={fprops.errors.condition}
              disableInitialValidationMessage={true}
            />
          </div>
        </FormGroup>
      </div>
    </ErrorBounds>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
  defaultExpanded?: boolean
}
interface FormikFields {
  condition?: string;
}

export default withStyles(styles)( SelectCondition );








