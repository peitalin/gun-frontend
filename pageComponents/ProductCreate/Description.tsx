import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { Colors } from "layout/AppTheme";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "./commonStyles";
// Material UI
import Typography from "@material-ui/core/Typography";
// Components
import Loading from "components/Loading";
import ErrorBounds from 'components/ErrorBounds';
import TextInput from "components/Fields/TextInput";

import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
// SSR dynamic import
import dynamic from 'next/dynamic'
import TextEditorPlaceholder from 'components/TextEditor/TextEditorPlaceholder';
const TextEditorSSR = dynamic(() => import('../../components/TextEditor'), {
  loading: () => <TextEditorPlaceholder/>,
  ssr: false
})
import { maxLengthProductDescription } from "utils/limitsAndRules";
/// Debounce
import { useDebouncedCallback } from 'use-debounce';




const Description = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    showHtml = false,
    ...fprops
  } = props;


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

  const [description, setDescription] = React.useState(
    fprops.values.description || undefined
  )

  // Debounce Formik State changes to limit lag
  const [updateDescription] = useDebouncedCallback((description: string) => {
    fprops.setFieldValue('description', description)
    // if (!fprops.touched.description) {
    //   fprops.setFieldTouched('description', true)
    // }
  }, 64);

  React.useEffect(() => {
    // use react state to update Formik as a side-effect
    // becuase Formik and Slate.js is shit and swallows events
    updateDescription(description)
  }, [description])


  return (
    <ErrorBounds>
      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        Description
      </Typography>

      <TextEditorSSR
        errorMessage={errors.description}
        onChange={(value) => {
          setDescription(value)
        }}
        limit={{
          max: maxLengthProductDescription, // 2000 chars
        }}
        errors={fprops.errors}
        values={fprops.values}
        touched={fprops.touched}
        setFieldTouched={fprops.setFieldTouched}
      />

      {/* <TextInput
        name="description"
        placeholder="Tell customers more about your product"
        className={classes.textField}
        value={description}
        multiline
        rows="6"
        onChange={(e) => {
          if (e.target.value.length <= maxLengthProductDescription) {
            updateDescription(e.target.value)
          }
        }}
        //// BUG: onBlur swallows events. Means you have to upload files twice
        //// if you want to click on the uploader right after clicking on this input
        /////
        // onBlur={(e) => {
        //   // must set timeout of 150ms otherwise swallows event
        //   // disable, makes it require 2 clicks to click off the input
        //   // meaning, file upload requires 2 clicks to open menu
        // }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.description}
        touched={!!touched.description}
        disableInitialValidationMessage={true}
        limit={{
          max: maxLengthProductDescription,
          count: description.length
        }}
      /> */}
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  showHtml?: boolean;
}
interface FormikFields {
  description: string;
}


export default withStyles(styles)(React.memo(
  (props: ReactProps & FormikProps<FormikFields>) => <Description {...props}/>,
));

