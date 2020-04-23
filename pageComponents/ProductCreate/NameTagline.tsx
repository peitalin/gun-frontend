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
  maxLengthTag,
  maxLengthProductName
} from "utils/limitsAndRules";



const NameTagline = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    ...fprops
  } = props;

  // local React state for smooth UI
  const [name, setName] = React.useState(fprops.values.name)
  const [tagline, setTagline] = React.useState(fprops.values.tagline)

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

  // Debounce Formik State changes to limit lag
  const [updateName] = useDebouncedCallback((name: string) => {
    fprops.setFieldValue('name', name)
  }, 64);

  const [updateTagline] = useDebouncedCallback((tagline: string) => {
    fprops.setFieldValue('tagline', tagline)
  }, 64);

  const inputRefUnfocus = React.useRef(null)


  return (
    <ErrorBounds style={{ marginBottom: '1rem'}}>
      <Typography
        color={"primary"}
        variant="subtitle1"
        // ref dom element to unfocus searchbar after enter
        ref={inputRefUnfocus}
        gutterBottom
      >
        Name of the Product
      </Typography>
      <TextInput
        name="name"
        placeholder="What are you selling?"
        className={classes.textField}
        value={name}
        onChange={(e) => {
          if (e.target.value.length <= maxLengthProductName) {
            setName(e.target.value)
            updateName(e.target.value)
          }
          fprops.setFieldTouched('name', true)
        }}
        //// BUG: onBlur swallows events. Means you have to upload files twice
        //// if you want to click on the uploader right after clicking on this input
        /////
        // onBlur={(e) => {
        //   // must set timeout of 150ms otherwise swallows event
        //   // makes it require 2 clicks to click off the input
        //   // meaning, file upload requires 2 clicks to open menu
        //   // setTimeout(() => {
        //   //   fprops.setFieldTouched('name', true)
        //   // }, 200)
        //   // setTimeout(() => {
        //   //   fprops.setFieldTouched('name', true)
        //   // }, 300)
        // }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.name}
        touched={!!touched.name}
        disableInitialValidationMessage={true}
        limit={{
          max: maxLengthProductName,
          count: name.length
        }}
      />

      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        Tagline
      </Typography>
      <TextInput
        name="tagline"
        placeholder="A short description of your product"
        className={classes.textField}
        value={tagline}
        onChange={(e) => {
          if (e.target.value.length <= maxLengthTag) {
            setTagline(e.target.value)
            updateTagline(e.target.value)
          }
          fprops.setFieldTouched('name', true)
        }}
        //// BUG: onBlur swallows events. Means you have to upload files twice
        //// if you want to click on the uploader right after clicking on this input
        /////
        // onBlur={(e) => {
        //   // must set timeout of 150ms otherwise swallows event
        //   // disable, makes it require 2 clicks to click off the input
        //   // meaning, file upload requires 2 clicks to open menu
        //   // setTimeout(() => {
        //   //   fprops.setFieldTouched('tagline', true)
        //   // }, 200)
        //   // setTimeout(() => {
        //   //   fprops.setFieldTouched('tagline', true)
        //   // }, 300)
        // }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.tagline}
        touched={!!touched.tagline}
        disableInitialValidationMessage={true}
        limit={{
          max: maxLengthTag,
          count: tagline.length
        }}
      />

    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}
interface FormikFields {
  name: string;
  tagline: string;
}


export default withStyles(styles)(React.memo(
  (props: ReactProps & FormikProps<FormikFields>) => <NameTagline {...props}/>,
));

