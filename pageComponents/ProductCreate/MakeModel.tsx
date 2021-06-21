import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
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
          if (e.target.value.length <= maxLengthTitle) {
            let word = (e.target.value as string).toUpperCase()
            fprops.setFieldValue("make", word)
            fprops.setFieldValue(
              "title",
              `${word} ${fprops.values.model}`.trim()
            )
          }
          fprops.setFieldTouched('make', true)
          fprops.setFieldTouched('title', true)
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.make}
        touched={!!touched.make}
        disableInitialValidationMessage={true}
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
          if (e.target.value.length <= maxLengthTitle) {
            let word = (e.target.value as string).toUpperCase()
            fprops.setFieldValue("model", word)
            fprops.setFieldValue(
              "title",
              `${fprops.values.make} ${word}`.trim()
            )
          }
          fprops.setFieldTouched('model', true)
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.model}
        touched={!!touched.model}
        disableInitialValidationMessage={true}
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
