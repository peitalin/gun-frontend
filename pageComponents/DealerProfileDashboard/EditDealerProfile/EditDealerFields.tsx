import React from "react";
import { oc as option } from "ts-optchain";
import { useState } from "react";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
/// Debounce
import { useDebouncedCallback } from 'use-debounce';
// Styles
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
// import { styles } from "./styles";
import { styles } from "./styles";
// Material UI
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";
import Divider from "components/Divider";
import Button from "@material-ui/core/Button";
// router
import { useRouter } from "next/router";
// Typings
import { UserPrivate, Dealers } from "typings/gqlTypes";
import { HtmlEvent, EditStoreInput } from "typings";
// Validation
import { FormikProps } from 'formik';






const EditStoreFields: React.FC<ReactProps & FormikProps<FormikFields>> = (props) => {

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
      fprops.setFieldValue('name', null)
      // backend fails on empty string
    } else {
      fprops.setFieldValue('name', name)
    }
  };


  const handleUpdateAddress = (e: HtmlEvent) => {
    let a = e.target.value;
    if (!a) {
      fprops.setFieldValue('address', null)
      // backend fails on empty string
    } else {
      fprops.setFieldValue('address', a)
    }
  };


  return (
    <div className={classes.root}>
      <div className={classes.innerRoot}>


        <Typography variant="subtitle1" className={classes.subtitle1}>
          Your Dealer Name
          {
            errors.name
            ? <span className={classes.redText}>{` - ${errors.name}`}</span>
            : <span className={classes.greyText}> - public</span>
          }
        </Typography>
        <div className={clsx(classes.formContainer, "fadeInFast")}>
          <TextInput
            placeholder="Dealer Name"
            className={classes.textField}
            value={values.name}
            onChange={handleUpdateName}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.name}
            touched={touched.name}
          />
          <div style={{ marginTop: '0.25rem' }}></div>
        </div>


        <div className={classes.margin1}>
          <div className={clsx(classes.formContainer, "fadeInFast")}>

            <TextInput
              placeholder={"Enter your BSB number"}
              className={clsx(classes.textField, classes.marginBottomHalf)}
              value={values.address}
              onChange={handleUpdateAddress}
              inputProps={{ style: { width: '100%' }}}
              errorMessage={errors.address}
              touched={touched.address}
            />
            {
              errors.address &&
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}>
                <Typography variant="subtitle1" className={classes.subtitle1}>
                  <span className={classes.redText}>{errors.address}</span>
                </Typography>
              </div>
            }

            <Divider/>
            <Typography variant="body1" className={classes.subtitle4}>
              By signing up, you agree to comply with GM’s Terms of Service
              and Dealer Agreement.
              <a className={classes.link}
                href={'https://help.gunmarketpace.com.au/hc/en-us/articles/360038530771-Terms-of-Service'}
                target="_blank"
                style={{ marginLeft: '0.25rem' }}
              >
                  Learn more
              </a>
            </Typography>
          </div>
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
  dealer: Dealers;
}


export default withStyles(styles)( EditStoreFields );

