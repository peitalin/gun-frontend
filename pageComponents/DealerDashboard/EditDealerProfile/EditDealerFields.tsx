import React from "react";
import { useState } from "react";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { styles } from "./styles";
// Material UI
import Typography from "@mui/material/Typography";
import TextInput from "components/Fields/TextInput";
import Divider from "components/Divider";
import Button from "@mui/material/Button";
// router
import { useRouter } from "next/router";
// Typings
import { UserPrivate, Dealer } from "typings/gqlTypes";
import { HtmlEvent, EditStoreInput } from "typings";
// Validation
import { FormikProps } from 'formik';






const EditDealerFields: React.FC<ReactProps & FormikProps<FormikFields>> = (props) => {

  const {
    classes,
    dealer,
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

  // Redux dispatchers
  const router = useRouter();

  const userRedux = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )


  const handleUpdateName = (e: HtmlEvent) => {
    let name = e.target.value;
    if (!name) {
      fprops.setFieldValue('name', "")
      // backend fails on empty string
    } else {
      fprops.setFieldValue('name', name)
    }
  };


  const handleUpdateLicenseNumber = (e: HtmlEvent) => {
    let s = e.target.value;
    if (!s) {
      fprops.setFieldValue('licenseNumber', "")
    } else {
      fprops.setFieldValue('licenseNumber', s)
    }
  };


  const handleUpdateCity = (e: HtmlEvent) => {
    let c = e.target.value;
    if (!c) {
      fprops.setFieldValue('city', "")
    } else {
      fprops.setFieldValue('city', c)
    }
  };

  const handleUpdatePostcode = (e: HtmlEvent) => {
    let c = e.target.value;
    if (!c) {
      fprops.setFieldValue('postCode', "")
    } else {
      fprops.setFieldValue('postCode', c)
    }
  };

  const handleUpdateState = (e: HtmlEvent) => {
    let c = e.target.value;
    if (!c) {
      fprops.setFieldValue('state', "")
    } else {
      fprops.setFieldValue('state', c)
    }
  };

  const handleUpdateAddress = (e: HtmlEvent) => {
    let a = e.target.value;
    if (!a) {
      fprops.setFieldValue('address', "")
      // backend fails on empty string
    } else {
      fprops.setFieldValue('address', a)
    }
  };


  return (
    <div className={classes.root}>
      <div className={classes.innerRoot}>


        <Typography variant="subtitle1" className={classes.subtitle1}>
          Dealership Name
          {
            errors.name
            ? <span className={classes.redText}>{` - ${errors.name}`}</span>
            : <span className={classes.greyText}> - public</span>
          }
        </Typography>
        <div className={clsx(classes.formContainer, "fadeInFast")}>
          <TextInput
            placeholder="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleUpdateName}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.name}
            touched={touched.name}
          />
          <div style={{ marginTop: '0.25rem' }}></div>
        </div>

        <Typography variant="subtitle1" className={classes.subtitle1}>
          License Number
          {
            errors.licenseNumber
            ? <span className={classes.redText}>{` - ${errors.licenseNumber}`}</span>
            : <span className={classes.greyText}> - public</span>
          }
        </Typography>
        <div className={clsx(classes.formContainer, "fadeInFast")}>
          <TextInput
            placeholder="License Number"
            className={classes.textField}
            value={values.licenseNumber}
            onChange={handleUpdateLicenseNumber}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.licenseNumber}
            touched={touched.licenseNumber}
          />
          <div style={{ marginTop: '0.25rem' }}></div>
        </div>

        <Typography variant="subtitle1" className={classes.subtitle1}>
          Postcode
          {
            errors.postCode
            ? <span className={classes.redText}>{` - ${errors.postCode}`}</span>
            : <span className={classes.greyText}> - public</span>
          }
        </Typography>
        <div className={clsx(classes.formContainer, "fadeInFast")}>
          <TextInput
            placeholder="Post Code"
            className={classes.textField}
            value={values.postCode}
            onChange={handleUpdatePostcode}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.postCode}
            touched={touched.postCode}
          />
          <div style={{ marginTop: '0.25rem' }}></div>
        </div>

        <Typography variant="subtitle1" className={classes.subtitle1}>
          City
          {
            errors.city
            ? <span className={classes.redText}>{` - ${errors.city}`}</span>
            : <span className={classes.greyText}> - public</span>
          }
        </Typography>
        <div className={clsx(classes.formContainer, "fadeInFast")}>
          <TextInput
            placeholder="City"
            className={classes.textField}
            value={values.city}
            onChange={handleUpdateCity}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.city}
            touched={touched.city}
          />
          <div style={{ marginTop: '0.25rem' }}></div>
        </div>

        <Typography variant="subtitle1" className={classes.subtitle1}>
          State
          {
            errors.state
            ? <span className={classes.redText}>{` - ${errors.state}`}</span>
            : <span className={classes.greyText}> - public</span>
          }
        </Typography>
        <div className={clsx(classes.formContainer, "fadeInFast")}>
          <TextInput
            placeholder="State"
            className={classes.textField}
            value={values.state}
            onChange={handleUpdateState}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.state}
            touched={touched.state}
          />
          <div style={{ marginTop: '0.25rem' }}></div>
        </div>

        <Typography variant="subtitle1" className={classes.subtitle1}>
          Address
          {
            errors.address
            ? <span className={classes.redText}>{` - ${errors.address}`}</span>
            : <span className={classes.greyText}> - public</span>
          }
        </Typography>
        <div className={clsx(classes.formContainer, "fadeInFast")}>
          <TextInput
            placeholder="State"
            className={classes.textField}
            value={values.address}
            onChange={handleUpdateAddress}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.address}
            touched={touched.address}
          />
          <div style={{ marginTop: '0.25rem' }}></div>
        </div>

      </div>
    </div>
  )
}

interface FormikFields {
  name: string
  address: string
  city: string
  postCode: string
  state: string
  licenseNumber: string
}

interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  dealer: Dealer;
}


export default withStyles(styles)( EditDealerFields );

