import React from "react";
import { createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from '../commonStyles';
// Util components
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
// Typings
import { Dealers } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";



const InputNewDealer = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    defaultExpanded = false,
    ...fprops
  } = props;

  let maxLength = 60;

  console.log('errors:', fprops.errors)

  return (
    <>
      <Typography color={"primary"} variant="subtitle2" gutterBottom>
        Name
      </Typography>
      <TextInput
        name="dealer.name"
        placeholder="Dealer name"
        className={classes.textField}
        value={fprops.values?.dealer?.name}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            fprops.setFieldValue("dealer.name", e.target.value)
          }
          fprops.setFieldTouched('dealer.name', true)
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={fprops.errors?.dealer?.name}
        touched={!!fprops.touched?.dealer?.name}
        disableInitialValidationMessage={true}
        limit={{
          max: maxLength,
          count: fprops.values?.dealer?.name?.length ?? 0
        }}
      />

      <Typography color={"primary"} variant="subtitle2" gutterBottom>
        License Number - required
      </Typography>
      <TextInput
        name="dealer.licenseNumber"
        placeholder="License Number"
        className={classes.textField}
        value={fprops.values?.dealer?.licenseNumber}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            fprops.setFieldValue("dealer.licenseNumber", e.target.value)
          }
          fprops.setFieldTouched('dealer.licenseNumber', true)
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={fprops.errors?.dealer}
        touched={!!fprops?.touched?.dealer}
        // disableInitialValidationMessage={true}
        limit={{
          max: maxLength,
          count: fprops?.values?.dealer?.licenseNumber?.length ?? 0
        }}
      />


      <Typography color={"primary"} variant="subtitle2" gutterBottom>
        Address
      </Typography>
      <TextInput
        name="dealer.address"
        placeholder="Address"
        className={classes.textField}
        value={fprops.values?.dealer?.address}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            fprops.setFieldValue("dealer.address", e.target.value)
          }
          fprops.setFieldTouched('dealer.address', true)
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={fprops.errors?.dealer?.address}
        touched={!!fprops.touched?.dealer?.address}
        disableInitialValidationMessage={true}
        limit={{
          max: maxLength,
          count: fprops.values?.dealer?.address?.length ?? 0
        }}
      />

      <Typography color={"primary"} variant="subtitle2" gutterBottom>
        City
      </Typography>
      <TextInput
        name="dealer.city"
        placeholder="City"
        className={classes.textField}
        value={fprops.values?.dealer?.city}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            fprops.setFieldValue("dealer.city", e.target.value)
          }
          fprops.setFieldTouched('dealer.city', true)
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={fprops.errors?.dealer?.city}
        touched={!!fprops.touched?.dealer?.city}
        disableInitialValidationMessage={true}
        limit={{
          max: maxLength,
          count: fprops.values?.dealer?.city?.length ?? 0
        }}
      />

      <Typography color={"primary"} variant="subtitle2" gutterBottom>
        State
      </Typography>
      <TextInput
        name="dealer.state"
        placeholder="State"
        className={classes.textField}
        value={fprops.values?.dealer?.state}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            fprops.setFieldValue("dealer.state", e.target.value)
          }
          fprops.setFieldTouched('dealer.state', true)
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={fprops.errors?.dealer?.state}
        touched={!!fprops.touched?.dealer?.state}
        disableInitialValidationMessage={true}
        limit={{
          max: maxLength,
          count: fprops.values?.dealer?.state?.length ?? 0
        }}
      />

      <Typography color={"primary"} variant="subtitle2" gutterBottom>
        Post Code
      </Typography>
      <TextInput
        name="dealer.postCode"
        placeholder="Post Code"
        className={classes.textField}
        value={fprops.values?.dealer?.postCode}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            fprops.setFieldValue("dealer.postCode", e.target.value)
          }
          fprops.setFieldTouched('dealer.postCode', true)
        }}
        inputProps={{ style: { width: '100%' }}}
        errorMessage={fprops.errors?.dealer?.postCode}
        touched={!!fprops.touched?.dealer?.postCode}
        disableInitialValidationMessage={true}
        limit={{
          max: maxLength,
          count: fprops.values?.dealer?.postCode?.length ?? 0
        }}
      />
    </>
  )
}


export interface SelectOption {
  label: string;
  value: string | any;
}
interface ReactProps extends WithStyles<typeof styles> {
  defaultExpanded?: boolean
  dealers: Dealers[]
}
interface FormikFields {
  dealer?: {
    name: string;
    address: string;
    city: string;
    state: string;
    postCode: string;
    licenseNumber: string;
  }
}

export default withStyles(styles)( InputNewDealer );








