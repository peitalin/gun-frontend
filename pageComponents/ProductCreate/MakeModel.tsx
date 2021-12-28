import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { styles } from "./commonStyles";
// Material UI
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";
// Components
import Loading from "components/Loading";
import ErrorBounds from 'components/ErrorBounds';
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
import {
  maxLengthTitle,
} from "utils/limitsAndRules";
import RefLink, { refLinks } from "./RefLink";


const MakeModel = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    ...fprops
  } = props;

  // local React state for smooth UI
  // const [make, setMake] = React.useState(fprops.values.make)
  // const [model, setModel] = React.useState(fprops.values.model)

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


  return (
    <ErrorBounds className={classes.positionRelative}>

      <RefLink refId={refLinks.model}/>

      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        Make
      </Typography>
      <TextInput
        name="make"
        placeholder="Make"
        className={classes.textField}
        value={values.make}
        onChange={(e) => {

          // must be before setFieldValue for render order is 1 behind
          // https://github.com/jaredpalmer/formik/issues/2083#issuecomment-884831583
          if (!fprops.touched.make) {
            fprops.setFieldTouched('make', true, false)
            fprops.setFieldTouched('title', true, false)
          }

          if (e.target.value.length <= maxLengthTitle) {
            let word = (e.target.value as string).toUpperCase()
            // set title first, then model or you'll have 1 render behind validation bug
            fprops.setFieldValue(
              "title",
              `${word} ${fprops.values.model.trim()}`.trim(),
              false,
            )
            // last formik update has validation = true
            fprops.setFieldValue("make", word, true)
          }
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.make}
        touched={!!touched.make}
        disableInitialValidationMessage={false}
        limit={{
          max: maxLengthTitle,
          count: values.make.length
        }}
      />

      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        Model
      </Typography>
      <TextInput
        name="model"
        placeholder="Model"
        className={classes.textField}
        value={values.model}
        onChange={(e) => {

          // must be before setFieldValue for render order is 1 behind
          // https://github.com/jaredpalmer/formik/issues/2083#issuecomment-884831583
          if (!fprops.touched.model) {
            fprops.setFieldTouched('model', true, false)
            fprops.setFieldTouched('title', true, false)
          }
          if (e.target.value.length <= maxLengthTitle) {
            let word = (e.target.value as string).toUpperCase()
            // set title first, then model or you'll have 1 render behind validation bug
            fprops.setFieldValue(
              "title",
              `${fprops.values.make} ${word.trim()}`.trim(),
              false
            )
            // last formik update has validation = true
            fprops.setFieldValue("model", word, true)
          }
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.model}
        touched={!!touched.model}
        disableInitialValidationMessage={false}
        limit={{
          max: maxLengthTitle,
          count: values.model.length
        }}
      />
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}
interface FormikFields {
  make: string;
  model: string;
}


export default withStyles(styles)(MakeModel)
