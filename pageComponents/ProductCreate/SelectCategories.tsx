import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
// Graphql
import { GET_PRODUCT_CATEGORIES } from "queries/categories-queries";
import { useQuery } from '@apollo/client';
// Typings
import { Categories } from "typings/gqlTypes";
import { ReducerName } from "typings/dropzone";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from './commonStyles';
// Material UI
import Typography from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
// Select Component
import DropdownInput from "components/Fields/DropdownInput";
import { sortCategoriesByName } from "layout/NavBarMain/CategoryBar/categoryHooks";
// Util components
import Loading from "components/Loading";
import ErrorDisplay from "components/Error";
import ErrorBounds from 'components/ErrorBounds';
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
// MUI expander
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const SelectCategories = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    reducerName,
    defaultExpanded = false,
    ...fprops
  } = props;

  const dispatch = useDispatch();
  const actions = Actions[reducerName];
  const [openExpander, setOpenExpander] = React.useState(defaultExpanded);

  const setCategoryId = (newCat: SelectOption) => {
    // // Redux
    // dispatch(actions.UPDATE_CATEGORY_ID(newCat.value))
    // Formik
    fprops.setFieldValue("categoryId", newCat.value)
    // props.validateForm()
  }

  // Apollo Graphql
  const {
    loading,
    error,
    data
  } = useQuery<QueryData, null>(GET_PRODUCT_CATEGORIES)


  const categories = option(data).getProductCategories([])
      .filter(c => !!c && !!c.name)
      .sort(sortCategoriesByName)

  const chosenCategory = categories.find(c => c.id === fprops.values.categoryId)
  // const categorySuggestions = createCategorySuggestions(categories);

  return (
    <ErrorBounds className={classes.positionRelative}>
      <div className={clsx(classes.formContainer)}>
        <Typography color={"primary"} variant="subtitle1">
          Category
        </Typography>
        <FormGroup row
          className={clsx(classes.formGroup, classes.marginTop05)}
        >

          <ExpansionPanel
            defaultExpanded={defaultExpanded}
            classes={{
              root: classes.expansionPanelRoot,
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
                appear: 200,
                enter: 200,
                exit: 200,
              }
            }}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{
                root: classes.expanderRoot,
                expanded: classes.expanderExpanded,
                content: classes.expanderContent,
                expandIcon: classes.expandIcon,
              }}
            >
              <Typography className={
                  !option(chosenCategory).name()
                    ? classes.selectedCategoryEmpty
                    : openExpander
                      ? classes.selectedCategoryOpen
                      : classes.selectedCategoryClosed
                }
                color={"primary"}
                variant="body1"
              >
                {
                  option(chosenCategory).name()
                    ? chosenCategory.name
                    : "Select a category"
                }
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0px',
                width: '100%'
              }}>
                {
                  error
                  ? <ErrorDisplay title={"SelectCategories"} error={error}/>
                  : <div className={classes.categoryButtonsContainer}>
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
                }
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ValidationErrorMsg
            touched={fprops.touched.categoryId}
            focused={false}
            errorMessage={fprops.errors.categoryId}
            disableInitialValidationMessage={true}
          />
        </FormGroup>
      </div>
    </ErrorBounds>
  )
}


const createCategorySuggestions = (categories: Categories[]) => {
  return categories.sort().map(category => {
    return {
      label: `${category.name}`,
      value: category.id,
    }
  })
}

export interface SelectOption {
  label: string;
  value: string | any;
}
interface ReactProps extends WithStyles<typeof styles> {
  reducerName: ReducerName
  defaultExpanded?: boolean
}
interface QueryData {
  getProductCategories: Categories[]
}
interface FormikFields {
  categoryId: string;
}

export default withStyles(styles)( SelectCategories );








