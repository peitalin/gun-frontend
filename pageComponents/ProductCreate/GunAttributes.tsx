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


const GunAttributes = (props: ReactProps & FormikProps<FormikFields>) => {

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
            fprops.setFieldValue("make", e.target.value)
          }
          fprops.setFieldTouched('make', true)
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
            fprops.setFieldValue("model", e.target.value)
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

      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        Caliber
      </Typography>
      <TextInput
        name="caliber"
        placeholder="Caliber"
        className={classes.textField}
        value={values.caliber}
        onChange={(e) => {
          fprops.setFieldValue("caliber", e.target.value)
          fprops.setFieldTouched('caliber', true)
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.caliber}
        touched={!!touched.caliber}
        disableInitialValidationMessage={true}
        limit={{
          max: maxLengthTitle,
          count: values?.caliber?.length
        }}
      />

      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        Magazine Capacity
      </Typography>
      <TextInput
        name="magazine-capacity"
        placeholder="Magazine Capacity"
        className={classes.textField}
        value={values.magazineCapacity}
        onChange={(e) => {
          fprops.setFieldValue("magazineCapacity", e.target.value)
          fprops.setFieldTouched('magazineCapacity', true)
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.magazineCapacity}
        touched={!!touched.magazineCapacity}
        disableInitialValidationMessage={true}
        limit={{
          max: maxLengthTitle,
          count: values?.magazineCapacity?.length
        }}
      />

      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        Barrel Length
      </Typography>
      <TextInput
        name="barrel-length"
        placeholder="Barrel Length"
        className={classes.textField}
        value={values.barrelLength}
        onChange={(e) => {
          fprops.setFieldValue("barrelLength", e.target.value)
          fprops.setFieldTouched('barrelLength', true)
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.barrelLength}
        touched={!!touched.barrelLength}
        disableInitialValidationMessage={true}
        limit={{
          max: maxLengthTitle,
          count: values?.barrelLength?.length
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
  caliber: string;
  magazineCapacity?: string;
  barrelLength?: string;
}


export default withStyles(styles)(GunAttributes)
