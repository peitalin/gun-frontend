import React from "react";
// Styles
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Redux
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
// Material UI
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";
import Divider from "components/Divider";
import Link from "next/link";
// router
import { useRouter } from "next/router";
// Typings
import { StorePrivate, UserPrivate, Image_Parents } from "typings/gqlTypes";
import { HtmlEvent, CreateStoreInput } from "typings";
// Validation
import { FormikProps } from 'formik';
// import StoreCreateProfilePic from "./StoreCreateProfilePic";






const CreateStoreFields: React.FC<ReactProps & FormikProps<FormikFields>> = (props) => {

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

  // state
  const [profileImage, setProfileImage] = React.useState(undefined);

  const handleUpdateName = (e: HtmlEvent) => {
    let name = e.target.value;
    fprops.setFieldValue('name', name)
  };

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

  // const handleUpdateProfile = (image: Image_Parents) => {
  //   setProfileImage(image);
  //   fprops.setFieldValue('profileId', image.id)
  // };

  console.log("fprops values: ", fprops.values)


  return (
    <div className={classes.root}>
      <div className={classes.innerRoot}>

        {/* <div className={clsx(classes.flexCol, classes.width100)}>
          <StoreCreateProfilePic
            userId={userId} // store create associates to userId
            profileImage={profileImage}
            setProfileImage={(e) => handleUpdateProfile(e)}
            errorMessage={errors.profileId}
            {...fprops}
          />
          <div className={classes.avatarErrorMsg}>
            <Typography variant="subtitle1" className={classes.subtitle1}>
              <span className={classes.greyText}></span>
              {
                errors.profileId
                ? <span className={classes.redText}>{`Profile pic required`}</span>
                : <span className={classes.greyText}></span>
              }
            </Typography>
          </div>
        </div> */}

        {/* <Typography variant="subtitle1" className={classes.subtitle1}>
          Your store name
          {
            errors.name
            && <span className={classes.redText}>*</span>
          }
        </Typography>
        <div className={clsx(classes.formContainer, "fadeInFast")}>
          <TextInput
            placeholder="Store Name"
            className={classes.textField}
            value={values.name}
            onChange={handleUpdateName}
            inputProps={{ style: { width: '100%' }}}
            errorMessage={errors.name}
            touched={touched.name}
          />
          <div style={{ marginTop: '0.25rem' }}></div>
        </div> */}


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

            <Divider/>
            <Typography variant="body1" className={classes.subtitle4}>
              By signing up, you agree to comply with gunmarketplace.com.au’s Terms of Service.
              <Link href={"/help/terms"}>
                <a className={classes.link} style={{ marginLeft: '0.25rem' }} >
                  Learn more
                </a>
              </Link>
            </Typography>
          </div>
        </div>



      </div>
    </div>
  )
}

interface FormikFields {
  name: string;
  bio: string;
  website: string;
  coverId?: string;
  profileId?: string;
  bsb?: string;
  accountNumber?: string;
  accountName?: string;
}

interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
}


export default withStyles(styles)( CreateStoreFields );

