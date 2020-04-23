import * as React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
import { GrandReduxState } from "reduxStore/grand-reducer";
// Graphql
import { GET_PRODUCT_CATEGORIES } from "queries/categories-queries";
import { useQuery } from '@apollo/react-hooks';
// Typings
import { ProductCategory } from "typings/gqlTypes";
import { ReducerName } from "typings/dropzone";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from './commonStyles';
// Material UI
import Typography from "@material-ui/core/Typography";
import FormGroup from '@material-ui/core/FormGroup';
// Select Component
import DropdownInput from "components/Fields/DropdownInput";
// Util components
import Loading from "components/Loading";
import ErrorDisplay from "components/Error";
import ErrorBounds from 'components/ErrorBounds';
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';



const SelectCategories = (props: ReactProps & FormikProps<FormikFields>) => {

  const { classes, reducerName, ...fprops } = props;
  const dispatch = useDispatch();
  const actions = Actions[reducerName];

  const setCategoryId = (newCat: SelectOption) => {
    // // Redux
    // dispatch(actions.UPDATE_CATEGORY_ID(newCat.value))
    // Formik
    fprops.setFieldValue("categoryId", newCat.value)
    fprops.setFieldTouched("categoryId", true)
    props.validateForm()
  }

  // Apollo Graphql
  const {
    loading,
    error,
    data
  } = useQuery<QueryData, null>(GET_PRODUCT_CATEGORIES)

  const categorySuggestions = createCategorySuggestions(option(data).categories([]));

  return (
    <ErrorBounds className={classes.positionRelative}>
      <div className={clsx(classes.formContainer)}>
        <Typography color={"primary"} variant="subtitle1">
          Category
        </Typography>
        <FormGroup className={classes.formGroup} row>
          <Loading inline loading={loading} delay={"400ms"} />
          {
            error
            ? <ErrorDisplay title={"SelectCategories"} error={error}/>
            : <DropdownInput
                stateShape={
                  categorySuggestions.find(s =>
                    s.value === option(fprops).values.categoryId())
                  // { label: "Design Templates", value: "category_123123"}
                }
                onChange={({ label, value }: SelectOption) =>
                  setCategoryId({ label, value })
                }
                onMenuOpen={() => fprops.setFieldTouched("categoryId", true)}
                options={
                  createCategorySuggestions(option(data).categories([]))
                }
                placeholder={"Select a category"}
                className={classes.optionValues}
                errorMessage={fprops.errors.categoryId}
                touched={fprops.touched.categoryId}
                disableInitialValidationMessage={true}
              />
          }
        </FormGroup>
      </div>
    </ErrorBounds>
  )
}


const createCategorySuggestions = (categories: ProductCategory[]) => {
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
}
interface ReactState {
  category: SelectOption;
}
interface ReduxState {
  categoryId: string;
}
interface QueryData {
  categories: ProductCategory[]
}
interface FormikFields {
  categoryId: string;
}

export default withStyles(styles)( SelectCategories );








