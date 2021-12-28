import React from "react";
import clsx from "clsx";
// Redux
import { useSelector, useDispatch } from "react-redux";
/// Debounce
import { useDebouncedCallback } from 'use-debounce';
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
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
import RefLink, { refLinks } from "./RefLink";



const TitleSerialNumber = (props: ReactProps & FormikProps<FormikFields>) => {

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
    <ErrorBounds className={classes.positionRelative}>

      <RefLink refId={refLinks.title}/>

      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        Serial Number
      </Typography>
      <TextInput
        name="serial-number"
        placeholder="Serial number"
        className={classes.textField}
        value={values.serialNumber}
        onChange={(e) => {
          if (!fprops.touched.serialNumber) {
            // must be before setFieldValue for render order is 1 behind
            fprops.setFieldTouched('serialNumber', true)
          }
          if (e.target.value.length <= maxLengthTitle) {
            fprops.setFieldValue("serialNumber", e.target.value)
          }
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.serialNumber}
        touched={!!touched.serialNumber}
        disableInitialValidationMessage={false}
        limit={{
          max: maxLengthTitle,
          count: values?.serialNumber?.length
        }}
      />

    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}
interface FormikFields {
  title: string;
  serialNumber: string;
}


export default withStyles(styles)(React.memo(
  (props: ReactProps & FormikProps<FormikFields>) => <TitleSerialNumber {...props}/>,
));

