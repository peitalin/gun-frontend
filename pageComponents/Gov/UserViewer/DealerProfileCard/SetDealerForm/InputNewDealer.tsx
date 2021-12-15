import React from "react";
import { Theme } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import { Colors } from "layout/AppTheme";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
// Util components
import ValidationErrorMsg from "components/Fields/ValidationErrorMsg";
import { Formik, Form, FormikProps, ErrorMessage } from 'formik';
// Typings
import { Dealers } from "typings/gqlTypes";
// Material UI
import Typography from "@mui/material/Typography";
import TextInput from "components/Fields/TextInput";



const InputNewDealer = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    defaultExpanded = false,
    ...fprops
  } = props;

  let maxLength = 60;

  // console.log('errors:', fprops.errors)
  // console.log('dealer:',  fprops.values?.dealer)

  return (
    <div className={classes.inputNewDealerRoot}>
      <Typography color={"primary"} variant="subtitle2" gutterBottom>
        Name - required
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
        errorMessage={fprops.errors?.dealer?.licenseNumber}
        touched={!!fprops?.touched?.dealer}
        // disableInitialValidationMessage={true}
        limit={{
          max: maxLength,
          count: fprops?.values?.dealer?.licenseNumber?.length ?? 0
        }}
      />


      <Typography color={"primary"} variant="subtitle2" gutterBottom>
        Address - required
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
    </div>
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
  dealerId?: string;
  dealer?: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    postCode?: string;
    licenseNumber?: string;
  };
}


export const styles = (theme: Theme) => createStyles({
  inputNewDealerRoot: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  textField: {
    width: "100%",
    paddingBottom: '1rem',
    "&:focus-within": {
      // color: '#24A4FF',
      color: Colors.charcoal,
    },
  },
})

export default withStyles(styles)( InputNewDealer );








