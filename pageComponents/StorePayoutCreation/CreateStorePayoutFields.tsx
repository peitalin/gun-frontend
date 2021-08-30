import React from "react";
// Styles
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";
// Typings
import { HtmlEvent } from "typings";
// Validation
import { FormikProps } from 'formik';






const CreateStorePayoutFields: React.FC<ReactProps & FormikProps<FormikFields>> = (props) => {

  const {
    classes,
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

  const handleSetNewBsb = (e: HtmlEvent) => {
    let bsb = e.target.value;
    if (bsb.length > 6) {
      return
    }
    fprops.setFieldValue('bsb', bsb)
  };

  const handleSetNewAccountNumber = (e: HtmlEvent) => {
    let accNum = e.target.value;
    if (accNum.length > 9) {
      return
    }
    fprops.setFieldValue('accountNumber', accNum)
  };

  const handleSetNewAccountName = (e: HtmlEvent) => {
    let accName = e.target.value;
    fprops.setFieldValue('accountName', accName)
  };


  return (
    <div className={classes.root}>
      <div className={classes.innerRoot}>

            <Typography variant="body1" className={classes.subtitle3}>
              You will need to add a bank account for escrow listings so
              that we can transfer funds to you.
            </Typography>

        <div className={classes.margin1}>
          <div className={clsx(classes.flexRow, classes.width100)}>
            <Typography variant="subtitle1" className={classes.subtitle1}>
              Where should we send your funds?
            </Typography>
            {
              errors.bsb
              && <span className={classes.redText}>*</span>
            }
          </div>
          <div className={clsx(classes.formContainer, "fadeInFast")}>
            <TextInput
              placeholder={"BSB number"}
              className={classes.textField2}
              value={values.bsb}
              onChange={handleSetNewBsb}
              inputProps={{ style: { width: '100%' }}}
              validationErrorMsgStyle={{
                marginBottom: "0.75rem"
              }}
              errorMessage={errors.bsb}
              touched={touched.bsb}
            />
            <TextInput
              placeholder={"Bank account number"}
              className={classes.textField2}
              value={values.accountNumber}
              onChange={handleSetNewAccountNumber}
              inputProps={{ style: { width: '100%' }}}
              validationErrorMsgStyle={{
                marginBottom: "0.75rem"
              }}
              errorMessage={errors.accountNumber}
              touched={touched.accountNumber}
            />
            <TextInput
              placeholder={"Account name"}
              className={classes.textField2}
              value={values.accountName}
              onChange={handleSetNewAccountName}
              inputProps={{ style: { width: '100%' }}}
              validationErrorMsgStyle={{
                marginBottom: "0.75rem"
              }}
              errorMessage={errors.accountName}
              touched={touched.accountName}
            />
            <Typography variant="body1" className={classes.subtitle3}>
              We will send your funds to this bank account
              after your order has been settled and approved,
              typically in 5 business days.
            </Typography>

          </div>
        </div>

      </div>
    </div>
  )
}

interface FormikFields {
  bsb?: string;
  accountNumber?: string;
  accountName?: string;
}

interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
}


export default withStyles(styles)( CreateStorePayoutFields );

