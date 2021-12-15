import React from "react";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
import { ReducerName } from "typings/dropzone";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { styles } from './commonStyles';
// Material UI
import Typography from "@mui/material/Typography";
import FormGroup from '@mui/material/FormGroup';
// Select Component
import DropdownInput from "components/Fields/DropdownInput";
import dynamic from 'next/dynamic'

import SelectTagsPlaceholder from 'pageComponents/ProductCreate/SSR/SelectTagsPlaceholder';
const KeywordDropdownInput = dynamic(() => import('components/Fields/KeywordDropdownInput'), {
  loading: () => <SelectTagsPlaceholder/>,
  ssr: false
})
import { createOption } from "components/Fields/KeywordDropdownInput";
import ErrorBounds from 'components/ErrorBounds';
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';




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
    <ErrorBounds className={clsx(classes.positionRelative)}>
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
              ((fprops.values?.tags as string[]) ?? []).map(t => createOption(t))
            }
            setTags={setTags}
            disableInitialValidationMessage={true}
            limit={{
              count: (fprops?.values?.tags ?? []).length,
              max: 10,
            }}
            // touched={!!fprops.touched.tags}
            // errorMessage={fprops.errors.tags as string}
          />

        </FormGroup>
        <Typography className={classes.tagsTip}>
          Tags will help people find your product in search.
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
  tags?: string[] | string;
}

export default withStyles(styles)( SelectTags );








