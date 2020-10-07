import React from "react";
import { oc as option } from "ts-optchain";
import { useState } from "react";
// Styles
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Redux
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
/// Debounce
import { useDebouncedCallback } from 'use-debounce';
// Material UI
import Typography from "@material-ui/core/Typography";
import TextInput from "components/Fields/TextInput";
import Divider from "components/Divider";
import Button from "@material-ui/core/Button";
// router
import { useRouter } from "next/router";
// Typings
import { StorePrivate, UserPrivate, Image_Parents } from "typings/gqlTypes";
import { HtmlEvent, CreateStoreInput } from "typings";
// Validation
import { FormikProps } from 'formik';
import StoreCreateProfilePic from "./StoreCreateProfilePic";






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

  const userId = useSelector<GrandReduxState, string>(
    s => s.reduxLogin.user.id
  )

  // state
  const [profileImage, setProfileImage] = useState(undefined);
  const [showAbout, setShowAbout] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);


  const handleUpdateName = (e: HtmlEvent) => {
    let name = e.target.value;
    fprops.setFieldValue('name', name)
  };

  const handleUpdateBio = (e: HtmlEvent) => {
    let bio: string = e.target.value;
    // 200 chars limit
    fprops.setFieldValue('bio', bio.slice(0,200))
  };

  const handleUpdateWebsite = (e: HtmlEvent) => {
    let website: string = e.target.value;
    fprops.setFieldValue('website', website)
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

  const handleUpdateProfile = (image: Image_Parents) => {
    setProfileImage(image);
    fprops.setFieldValue('profileId', image.id)
  };


  const copyText = () => {
    var copyText = document.getElementById("copyText") as HTMLInputElement;
    copyText.select();
    document.execCommand("copy");
    console.log("copied: ", copyText.value);
  }


  return (
    <div className={classes.root}>
      <div className={classes.innerRoot}>
        <div className={clsx(classes.flexCol, classes.width100)}>
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
              {/* {
                errors.profileId
                ? <span className={classes.redText}>{`Profile pic required`}</span>
                : <span className={classes.greyText}></span>
              } */}
            </Typography>
          </div>
        </div>

        <Typography variant="subtitle1" className={classes.subtitle1}>
          Your store name
          {
            errors.name
            && <span className={classes.redText}>*</span>
          }
          {/* {
            errors.name
            ? <span className={classes.redText}>{` - ${errors.name}`}</span>
            : <span className={classes.greyText}> - public</span>
          } */}
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
        </div>

        <div className={classes.margin1}>
          <div className={clsx(classes.flexRow, classes.spaceBetween)}>
            <Typography variant="subtitle1" className={classes.subtitle1}>
              Bio<span className={classes.greyText}> - optional</span>
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle1}>
              <a className={classes.link}
                onClick={() => setShowAbout(s => !s)}
              >
                {
                  showAbout
                  ? "Cancel"
                  : "Add bio"
                }
              </a>
            </Typography>
          </div>
          {
            showAbout &&
            <div className={clsx(
              classes.formContainer,
              "fadeInFast",
            )}>
              <TextInput
                placeholder="Bio"
                className={classes.textField}
                value={values.bio}
                onChange={handleUpdateBio}
                inputProps={{ style: { width: '100%' }}}
                multiline
                rows="4"
              />
              {
                values?.bio?.length > 0 &&
                <div className={classes.bioLength}>{`${values.bio.length}/200`}</div>
              }
            </div>
          }
        </div>

        <div className={classes.margin1}>
          <div className={clsx(classes.flexRow, classes.spaceBetween)}>
            <Typography variant="subtitle1" className={classes.subtitle1}>
              Website
              <span className={classes.greyText}> - optional</span>
            </Typography>
            <Typography variant="subtitle1" className={classes.subtitle1}>
              <a className={classes.link}
                onClick={() => setShowWebsite(s => !s)}
              >
                {
                  showWebsite
                  ? "Cancel"
                  : "Add website"
                }
              </a>
            </Typography>
          </div>
          {
            showWebsite &&
            <div className={clsx(classes.formContainer, "fadeInFast")}>
              <TextInput
                placeholder="Website"
                className={classes.textField}
                value={values.website}
                onChange={handleUpdateWebsite}
                inputProps={{ style: { width: '100%' }}}
              />
            </div>
          }
        </div>


        <div className={classes.margin1}>
          <div className={clsx(classes.flexRow, classes.width100)}>
            <Typography variant="subtitle1" className={classes.subtitle1}>
              Where should we send your monthly earnings?
            </Typography>
            {
              errors.bsb
              && <span className={classes.redText}>*</span>
            }
          </div>
          <div className={clsx(classes.formContainer, "fadeInFast")}>
            <TextInput
              placeholder={"Enter your BSB number"}
              className={classes.textField}
              value={values.bsb}
              onChange={handleSetNewBsb}
              inputProps={{ style: { width: '100%' }}}
              errorMessage={errors.bsb}
              touched={touched.bsb}
            />
            <TextInput
              placeholder={"Enter your bank account number"}
              className={classes.textField}
              value={values.accountNumber}
              onChange={handleSetNewAccountNumber}
              inputProps={{ style: { width: '100%' }}}
              errorMessage={errors.accountNumber}
              touched={touched.accountNumber}
            />
            <TextInput
              placeholder={"Enter your account name"}
              className={classes.textField}
              value={values.accountName}
              onChange={handleSetNewAccountName}
              inputProps={{ style: { width: '100%' }}}
              errorMessage={errors.accountName}
              touched={touched.accountName}
            />
            <Typography variant="body1" className={classes.subtitle3}>
              We will send your monthly earnings automatically to this Bank account
              after your order has been settled and approved, typically wihtin 5 days.
            </Typography>

            <Divider/>
            <Typography variant="body1" className={classes.subtitle4}>
              By signing up, you agree to comply with Gunmarketplace’s Terms of Service
              and Seller Agreement.
              <a className={classes.link}
                href={'https://help.gunmarketplace.com/hc/en-us/articles/360038530771-Terms-of-Service'}
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
  storeId?: string;
}


export default withStyles(styles)( CreateStoreFields );

