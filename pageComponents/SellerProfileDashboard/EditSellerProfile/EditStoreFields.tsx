import React from "react";
import { oc as option } from "ts-optchain";
import { useState } from "react";
import clsx from "clsx";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
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
import { StorePrivate, UserPrivate, Image } from "typings/gqlTypes";
import { HtmlEvent, EditStoreInput } from "typings";
// Validation
import { FormikProps } from 'formik';
import StoreEditProfilePic from "pageComponents/SellerProfileDashboard/EditSellerProfile/StoreEditProfilePic";






const EditStoreFields: React.FC<ReactProps & FormikProps<FormikFields>> = (props) => {

  const {
    classes,
    storePrivate,
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

  const [state, setState] = React.useState({
    displayErr: true,
    displaySuccess: true,
  })

  const handleUpdateName = (e: HtmlEvent) => {
    let name = e.target.value;
    if (!name) {
      fprops.setFieldValue('name', null)
      // backend fails on empty string
    } else {
      fprops.setFieldValue('name', name)
    }
  };

  const handleUpdateBio = (e: HtmlEvent) => {
    let bio: string = e.target.value;
    if (!bio) {
      fprops.setFieldValue('bio', null)
      // backend fails on empty string
    } else {
      // 200 chars limit
      fprops.setFieldValue('bio', bio.slice(0,200))
    }
  };

  const handleUpdateWebsite = (e: HtmlEvent) => {
    let website: string = e.target.value;
    if (!website) {
      fprops.setFieldValue('website', null)
      // backend fails on empty string
    } else {
      fprops.setFieldValue('website', website)
    }
  };

  const handleSetNewPayoutEmail = (e: HtmlEvent) => {
    let email = e.target.value;
    fprops.setFieldValue('payoutEmail', email)
  };

  const handleUpdateProfile = (image: Image) => {
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
          <StoreEditProfilePic
            storeId={option(props).storeId()}
            profileImage={storePrivate.profile}
            setProfileImage={handleUpdateProfile}
            errorMessage={errors.profileId}
            {...fprops}
          />
          <div className={classes.avatarErrorMsg}>
            <Typography variant="subtitle1" className={classes.subtitle1}>
            {
              errors.profileId
              ? <span className={classes.redText}>{`Profile pic required`}</span>
              : <span className={classes.greyText}></span>
            }
            </Typography>
          </div>
        </div>

        <Typography variant="subtitle1" className={classes.subtitle1}>
          Your Seller Name
          {
            errors.name
            ? <span className={classes.redText}>{` - ${errors.name}`}</span>
            : <span className={classes.greyText}> - public</span>
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
        </div>

        <div className={classes.margin1}>
          <div className={clsx(classes.flexRow, classes.spaceBetween)}>
            <Typography variant="subtitle1" className={classes.subtitle1}>
              Bio<span className={classes.greyText}> - optional</span>
            </Typography>
          </div>
          <div className={clsx(
            classes.formContainer,
            "fadeInFast",
          )}>
            <TextInput
              placeholder="Bio"
              className={classes.textField}
              value={values.bio ? values.bio : ""}
              onChange={handleUpdateBio}
              inputProps={{ style: { width: '100%' }}}
              multiline
              rows="4"
            />
            {
              values.bio && values.bio.length &&
              <div className={classes.bioLength}>{`${values.bio.length}/200`}</div>
            }
          </div>
        </div>

        <div className={classes.margin1}>
          <div className={clsx(classes.flexRow, classes.spaceBetween)}>
            <Typography variant="subtitle1" className={classes.subtitle1}>
              Website
              <span className={classes.greyText}> - optional</span>
            </Typography>
          </div>
          <div className={clsx(classes.formContainer, "fadeInFast")}>
            <TextInput
              placeholder="Website"
              className={classes.textField}
              value={values.website ? values.website : ""}
              onChange={handleUpdateWebsite}
              inputProps={{ style: { width: '100%' }}}
            />
          </div>
        </div>


        <div className={classes.margin1}>
          <div className={clsx(classes.flexRow, classes.spaceBetween)}>
            <Typography variant="subtitle1" className={classes.subtitle1}>
              Where should we send your monthly earnings?
            </Typography>
          </div>
          <div className={clsx(classes.formContainer, "fadeInFast")}>
            <TextInput
              placeholder={"Enter your Paypal email"}
              className={classes.textField}
              value={values.payoutEmail}
              onChange={handleSetNewPayoutEmail}
              inputProps={{ style: { width: '100%' }}}
              errorMessage={errors.payoutEmail}
              touched={touched.payoutEmail}
            />
            <Typography variant="body1" className={classes.subtitle3}>
              We will send your monthly earnings automatically to this PayPal account
              on the 15th of each month.
              You can change this in settings anytime.
            </Typography>
            {
              errors.payoutEmail
              && <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}>
                  <Typography variant="subtitle1" className={classes.subtitle1}>
                    <span className={classes.redText}>{errors.payoutEmail}</span>
                  </Typography>
                </div>
            }
            <Divider/>
            <Typography variant="body1" className={classes.subtitle4}>
              By signing up, you agree to comply with Relay’s Terms of Service
              and Seller Agreement.
              <a className={classes.link}
                href={'https://help.relaydownloads.com/hc/en-us/articles/360038530771-Terms-of-Service'}
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
  name: string;
  bio: string;
  website: string;
  coverId?: string;
  profileId?: string;
  payoutEmail?: string;
}

interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  storeId?: string;
  storePrivate: StorePrivate;
}


export default withStyles(styles)( EditStoreFields );

