import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Redux
import { useSelector, useDispatch } from "react-redux";
/// Debounce
import { useDebouncedCallback } from 'use-debounce';
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./commonStyles";
// Material UI
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";
// Typings
import { ProductCreateInput } from "typings/gqlTypes";
import { HtmlEvent } from "typings";
// Components
import Loading from "components/Loading";
import ErrorBounds from 'components/ErrorBounds';
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
import {
  maxLengthTitle,
  maxLengthProductName
} from "utils/limitsAndRules";



const Title = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    ...fprops
  } = props;

  // local React state for smooth UI
  const [title, setTitle] = React.useState(fprops.values.title)

  // Formik props
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = fprops;

  const [updateTitle] = useDebouncedCallback((title: string) => {
    fprops.setFieldValue('title', title)
  }, 64);

  return (
    <ErrorBounds>

      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        Title
      </Typography>
      <TextInput
        name="title"
        placeholder="The title of your product"
        className={classes.textField}
        value={title}
        onChange={(e) => {
          if (e.target.value.length <= maxLengthTitle) {
            setTitle(e.target.value)
            updateTitle(e.target.value)
          }
          fprops.setFieldTouched('title', true)
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.title}
        touched={!!touched.title}
        disableInitialValidationMessage={true}
        limit={{
          max: maxLengthTitle,
          count: title.length
        }}
      />

    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}
interface FormikFields {
  title: string;
}


export default withStyles(styles)(React.memo(
  (props: ReactProps & FormikProps<FormikFields>) => <Title {...props}/>,
));

