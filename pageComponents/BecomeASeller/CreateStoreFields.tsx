import React from "react";
import { oc as option } from "ts-optchain";
import { useState } from "react";
// Styles
import { withStyles, WithStyles, Theme, createStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import clsx from "clsx";
import { Colors } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { ReduxStateStoreCreate } from "reduxStore/store_create-reducer";
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
import { StorePrivate, UserPrivate, Image } from "typings/gqlTypes";
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

  // Redux dispatchers
  const dispatch = useDispatch();
  const router = useRouter();
  const actions = Actions.reduxStoreCreate;
  const userId = useSelector<GrandReduxState, string>(
    s => s.reduxLogin.user.id
  )

  // state
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImage, setProfileImage] = useState(undefined);
  const [newPayoutEmail, setNewPayoutEmail] = React.useState("");

  const [showAbout, setShowAbout] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);

  // Debounce Redux State changes to limit lag
  const [debounceUpdateName] = useDebouncedCallback((name: string) => {
    // dispatch(actions.UPDATE_NAME(name))
    fprops.setFieldValue('name', name)
  }, 100);
  const [debounceUpdateBio] = useDebouncedCallback((bio: string) => {
    // dispatch(actions.UPDATE_BIO(bio))
    fprops.setFieldValue('bio', bio)
  }, 100);
  const [debounceUpdateWebsite] = useDebouncedCallback((website: string) => {
    // dispatch(actions.UPDATE_WEBSITE(website))
    fprops.setFieldValue('website', website)
  }, 100);
  const [debounceUpdatePayoutEmail] = useDebouncedCallback((email: string) => {
    fprops.setFieldValue('payoutEmail', email)
  }, 100);

  const handleUpdateName = (e: HtmlEvent) => {
    let name = e.target.value;
    setName(name);
    debounceUpdateName(name);
  };

  const handleUpdateBio = (e: HtmlEvent) => {
    let bio: string = e.target.value;
    // 200 chars limit
    setBio(bio.slice(0,200))
    debounceUpdateBio(bio.slice(0,200));
  };

  const handleUpdateWebsite = (e: HtmlEvent) => {
    let website: string = e.target.value;
    setWebsite(website)
    debounceUpdateWebsite(website);
  };

  const handleSetNewPayoutEmail = (e: HtmlEvent) => {
    let email = e.target.value;
    setNewPayoutEmail(email);
    debounceUpdatePayoutEmail(email);
  };

  const handleUpdateProfile = (image: Image) => {
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
            value={name}
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
                value={bio}
                onChange={handleUpdateBio}
                inputProps={{ style: { width: '100%' }}}
                multiline
                rows="4"
              />
              {
                bio && bio.length &&
                <div className={classes.bioLength}>{`${bio.length}/200`}</div>
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
                value={website}
                onChange={handleUpdateWebsite}
                inputProps={{ style: { width: '100%' }}}
              />
            </div>
          }
        </div>

        {/* <div className={classes.margin1}>
          <Typography variant="subtitle1" className={classes.subtitle1}>
            Store Link
            <span className={classes.greyText}> - public</span>
          </Typography>
          <div className={classes.storeNameCopyContainer}>
            <input
              className={classes.storeNameCopy}
              type="text"
              value={`relaydownloads.com/s/${props.storeId}`}
              onChange={() => {}}
              id="copyText"
            />
            <Button
              variant="outlined"
              className={classes.storeNameCopyButton}
              onClick={copyText}
            >
              Copy
            </Button>
          </div>
        </div> */}


        <div className={classes.margin1}>
          <div className={clsx(classes.flexRow, classes.width100)}>
            <Typography variant="subtitle1" className={classes.subtitle1}>
              Where should we send your monthly earnings?
            </Typography>
            {
              errors.payoutEmail
              && <span className={classes.redText}>*</span>
            }
          </div>
          <div className={clsx(classes.formContainer, "fadeInFast")}>
            <TextInput
              placeholder={"Enter your Paypal email"}
              className={classes.textField}
              value={newPayoutEmail}
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
            {/* {
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
            } */}
            <Divider/>
            <Typography variant="body1" className={classes.subtitle4}>
              By signing up, you agree to comply with Relay’s Terms of Service
              and Seller Agreement.
              <a className={classes.link}
                href={'https://help.relaydownloads.com/hc/en-us/articles/360038530771-Terms-of-Service'}
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
}

// const styles = (theme: Theme) => createStyles({
// });


export default withStyles(styles)( CreateStoreFields );

