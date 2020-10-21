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



const MakeAndModel = (props: ReactProps & FormikProps<FormikFields>) => {

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
    <ErrorBounds>

      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        Serial Number
      </Typography>
      <TextInput
        name="serial-number"
        placeholder="Serial number"
        className={classes.textField}
        value={values.serialNumber}
        onChange={(e) => {
          if (e.target.value.length <= maxLengthTitle) {
            fprops.setFieldValue("serialNumber", e.target.value)
          }
          fprops.setFieldTouched('serialNumber', true)
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.serialNumber}
        touched={!!touched.serialNumber}
        disableInitialValidationMessage={true}
        limit={{
          max: maxLengthTitle,
          count: values.serialNumber.length
        }}
      />

      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        Action Type
      </Typography>
      <TextInput
        name="action type"
        placeholder="Action Type"
        className={classes.textField}
        value={values.actionType}
        onChange={(e) => {
          fprops.setFieldValue("actionType", e.target.value)
          fprops.setFieldTouched('actionType', true)
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.actionType}
        touched={!!touched.actionType}
        disableInitialValidationMessage={true}
        limit={{
          max: maxLengthTitle,
          count: values.actionType.length
        }}
      />

      <Typography color={"primary"} variant="subtitle1" gutterBottom>
        Ammo Type
      </Typography>
      <TextInput
        name="ammo type"
        placeholder="Ammo Type"
        className={classes.textField}
        value={values.ammoType}
        onChange={(e) => {
          fprops.setFieldValue("ammoType", e.target.value)
          fprops.setFieldTouched('ammoType', true)
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={props.errors.ammoType}
        touched={!!touched.ammoType}
        disableInitialValidationMessage={true}
        limit={{
          max: maxLengthTitle,
          count: values.ammoType.length
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
          count: values.caliber.length
        }}
      />
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}
interface FormikFields {
  serialNumber: string;
  actionType: string;
  ammoType: string;
  caliber: string;
}


export default withStyles(styles)(React.memo(
  (props: ReactProps & FormikProps<FormikFields>) => <MakeAndModel {...props}/>,
));

