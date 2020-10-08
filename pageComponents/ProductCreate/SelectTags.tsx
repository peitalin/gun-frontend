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
// Select Component
import DropdownInput from "components/Fields/DropdownInput";
import KeywordDropdownInput from "components/Fields/KeywordDropdownInput";
// Util components
import Loading from "components/Loading";
import ErrorDisplay from "components/Error";
import ErrorBounds from 'components/ErrorBounds';
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
import { createOption } from "components/Fields/KeywordDropdownInput";




const SelectTags = (props: ReactProps & FormikProps<FormikFields>) => {

  const { classes, reducerName, ...fprops } = props;
  const dispatch = useDispatch();
  const actions = Actions[reducerName];

  const setTags = (options: SelectOption[]) => {
    let newTags = options || [];
    // Formik
    fprops.setFieldValue("tags", newTags.map(t => t.value))
    fprops.setFieldTouched("tags", true)
    props.validateForm()
  }

  return (
    <ErrorBounds className={clsx(classes.selectTagsRoot, classes.positionRelative)}>
      <div className={classes.formContainer}>
        <Typography variant="subtitle1" className={classes.tagsTitle}>
          Tags <span className={classes.optionalText}>- optional</span>
        </Typography>
        <FormGroup row
          className={clsx(classes.formGroup, classes.positionRelative)}
        >

          <KeywordDropdownInput
            // disabled={loading}
            // loading={loading}
            initialTags={
              (fprops.values.tags as string[]).map(t => createOption(t))
            }
            setTags={setTags}
            disableInitialValidationMessage={true}
            limit={{
              count: option(fprops).values.tags([]).length,
              max: 10,
            }}
            // touched={!!fprops.touched.tags}
            // errorMessage={fprops.errors.tags as string}
          />

        </FormGroup>
        <Typography className={classes.tagsTip}>
          Tags will help people find your product on Relay.
          Tags are not public. Separate with commas.
        </Typography>
      </div>
    </ErrorBounds>
  )
}


export interface SelectOption {
  label: string;
  value: string | any;
}
interface ReactProps extends WithStyles<typeof styles> {
  reducerName: ReducerName
}
interface FormikFields {
  categoryId: string;
  tags: string[] | string;
}

export default withStyles(styles)( SelectTags );








