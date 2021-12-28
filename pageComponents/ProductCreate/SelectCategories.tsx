import React from "react";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Styles
import { styles } from './commonStyles';
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
// Graphql
import { GET_CATEGORIES } from "queries/categories-queries";
import { useQuery } from '@apollo/client';
// Typings
import { Categories } from "typings/gqlTypes";
import { ReducerName } from "typings/dropzone";
// Material UI
import Typography from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
// Select Component
import { sortCategoriesByName } from "./categoryHooks";
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

import { categoryPreviewsBackup } from "utils/categories"



const SelectCategories = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    defaultExpanded = false,
    ...fprops
  } = props;

  const [openExpander, setOpenExpander] = React.useState(defaultExpanded);

  const setCategoryId = (newCat: SelectOption) => {
    // // Redux
    // dispatch(actions.UPDATE_CATEGORY_ID(newCat.value))
    // Formik
    fprops.setFieldValue("categoryId", newCat.value)
    // props.validateForm()
  }

  // // Apollo Graphql
  // const {
  //   loading,
  //   error,
  //   data
  // } = useQuery<QueryData, null>(GET_CATEGORIES)

  // remove items for now
  const categories = categoryPreviewsBackup
  .filter(c => c.slug !== 'items')
  // (data?.getCategories ?? []).filter(c => !!c && !!c.name)

  const chosenCategory = categories.find(c => c.id === fprops.values.categoryId)

  return (
    <ErrorBounds className={classes.positionRelative}>
      <div className={clsx(classes.formContainer)}>
        <Typography color={"primary"} variant="subtitle1">
          Category
        </Typography>
        <FormGroup row
          className={clsx(classes.formGroup, classes.marginTop05)}
        >

          <Accordion
            defaultExpanded={defaultExpanded}
            classes={{
              root: clsx(
                classes.expansionPanelRoot,
                (fprops.errors?.categoryId && fprops.touched?.categoryId) &&
                classes.expansionPanelError,
              ),
              expanded: classes.expansionPanelExpanded,
            }}
            expanded={openExpander}
            onChange={(event, expanded) => {
              setOpenExpander(s => !s)
              if (!fprops.touched.categoryId) {
                fprops.setFieldTouched("categoryId", true)
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
                  !chosenCategory?.name
                    ? classes.selectedCategoryEmpty
                    : openExpander
                      ? classes.selectedCategoryOpen
                      : classes.selectedCategoryClosed
                }
                color={"primary"}
                variant="subtitle1"
              >
                {
                  chosenCategory?.name
                    ? chosenCategory.name
                    : "Select a category"
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
                        categories.map((category, i) => {
                          return (
                            <Button
                              key={category.name + `${i}`}
                              classes={{
                                root: clsx(
                                  classes.buttonRoot,
                                  (category.id === fprops.values.categoryId)
                                    ? classes.buttonSelected
                                    : null,
                                )
                              }}
                              variant="outlined"
                              onClick={() => {
                                fprops.setFieldTouched("categoryId", true)
                                setCategoryId({
                                  label: category.name,
                                  value: category.id,
                                })
                                setOpenExpander(s => !s)
                              }}
                            >
                              {category.name}
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
              touched={fprops.touched.categoryId}
              focused={false}
              errorMessage={fprops.errors.categoryId}
              disableInitialValidationMessage={false}
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
interface QueryData {
  getCategories: Categories[]
}
interface FormikFields {
  categoryId: string;
}

export default withStyles(styles)( SelectCategories );








