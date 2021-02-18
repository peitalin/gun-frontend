import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";
// Utils
import { ID, StorePrivate, UploadType, Image_Parents } from "typings/gqlTypes";
// Media uploader
import {
  IFileWithMeta,
  IUploadParams,
} from "components/DropzoneUploader/Dropzone";
import Dropzone from "components/DropzoneUploader/Dropzone";

import {
  google_storage_register, google_storage_save_image_to_db,
} from "queries/requests";

// Material UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
// Components
import { useApolloClient } from "@apollo/client";
// DZU components
import UploadLayout from "./UploadLayout";
import UploadInput from "./UploadInput";
// Validation
import { FormikProps } from 'formik';




const StoreEditProfilePic = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    ...fprops
  } = props;

  // upload
  const [uploadId, setUploadID] = React.useState("")
  // imgloaded
  const [profilePicPreview, setProfilePicPreview] = React.useState(
    option(props).profileImage.original.url()
  );
  const aClient = useApolloClient();


  const getUploadParams = async({ file, meta }): Promise<IUploadParams> => {
    // https://react-dropzone-uploader.js.org/docs/api

    let { uploadId, uploadUrl } = await google_storage_register(
      UploadType.IMAGE,
      meta.type,
      meta.size,
      aClient
    )

    setUploadID(uploadId)

    return {
      body: file,
      url: uploadUrl,
      method: "PUT",
      headers: {
        "Content-Type": meta.type,
      }
    }
  }

  const handleChangeStatus = ({ meta, file, xhr }: IFileWithMeta, status) => {
    //// called every time a file's `status` changes
    // console.info("status:", status, meta, file)
    if (status === "done") {

      console.log("associating pic to storeId: ", props.storeId)
      // Owner is going to be the store, but may also be the product if it already exists
      const ownerIds = [props.storeId];
      const description = null;
      const tags = "";
      google_storage_save_image_to_db(
        uploadId,
        description,
        tags,
        ownerIds,
        aClient
      ).then(image => {
          console.log('imageId...', image.id)
          props.setProfileImage(image)
          setTimeout(() => {
            setProfilePicPreview(meta.previewUrl)
            // slight delay for validation message to transition out
          }, 0)
          console.log("save_to_db response:", image.id)
        })
    }
  }



  return (
    <div className={classes.flexCol}>
      <div className={classes.root}>

        <div className={classes.avatarBorder}>
          <Avatar className={clsx(
            classes.avatar,
            classes.avatarEdit,
          )}>
            {
              profilePicPreview
              ? <img src={profilePicPreview}
                  className={classes.avatarImg}
                />
              : <img className={classes.avatarPlaceholder}
                  style={{ }}
                  src={"/img/avatar-placeholder.png"}
                />
            }
          </Avatar>
        </div>

        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          LayoutComponent={React.memo((layProps) =>
            <UploadLayout
              {...layProps}
              profilePicPreview={profilePicPreview}
              setProfilePicPreview={setProfilePicPreview}
              removeProfilePicPreview={() => {
                setProfilePicPreview(undefined)
                fprops.setFieldValue('profileId', undefined)
              }}
            />
          )}
          InputComponent={React.memo((layProps) =>
            <UploadInput
              {...layProps}
            />
          )}
          accept={"image/*"}
          inputContent={(files, extra) => (extra.reject ? 'Image files only' : 'Drag Images')}
          styles={{
            dropzoneReject: {
              borderColor: "#EE655F",
              backgroundColor: '#DAA'
            },
            dropzone: {
              color: Colors.uniswapLightestGrey,
              border: "0px none rgba(0,0,0,0)", // disable default border
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: 'unset',
            },
            dropzoneActive: {
              border: "1px dashed #2484FF"
            },
            inputLabel: (files, extra) => (extra.reject ? { color: '#CD584F' } : {}),
          }}
        />
      </div>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  storeId: string;
  profileImage: Image_Parents;
  setProfileImage(image: any): void;
  errorMessage?: any;
}
interface FormikFields {
  name: string;
  bio: string;
  website: string;
  coverId?: string;
  profileId?: string;
  // payout methods
  bsb: string;
  accountNumber: string;
  accountName: string;
}




const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    width: '100%',
  },
  innerRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: "0.5rem",
    width: '100%',
    maxWidth: 400,
  },
  // avatar outline circle
  avatar: {
    width: 92,
    height: 92,
    border: `5px solid ${Colors.uniswapNavy}`,
    marginTop: '1rem',
    marginBottom: '0.5rem',
    background: Colors.uniswapNavy,
  },
  avatarEdit: {
    transition: theme.transitions.create('transform, border', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
    marginBottom: "1rem",
    // "&:hover": {
    //   border: "1px solid #24A4FF",
    //   transition: theme.transitions.create('border', {
    //     easing: theme.transitions.easing.easeIn,
    //     duration: "100ms",
    //   }),
    // }
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: '1rem',
  },
  // avatar image
  avatarBorder: {
    marginBottom: "1rem",
    height: '102px',
    width: '102px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    // background: Gradients.gradientPurple.background,
    background: Gradients.gradientUniswapFluro.background,
  },
  avatarImg: {
    // make a little bigger to fit avatar
    objectFit: 'cover',
    height: "105%",
    width: "105%",
    transition: theme.transitions.create('filter', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  avatarPlaceholder: {
    objectFit: 'cover',
    height: "105%",
    width: "105%",
  },
  subtitle1: {
    marginBottom: '0.25rem',
    fontSize: '1rem',
  },
  textField: {
    flexGrow: 1,
    minWidth: 200,
  },
  bioLength: {
    fontSize: '0.8rem',
    color: '#cccccc',
  },
  addItemButtonLi: {
    marginBottom: '1rem',
  },
  addItemButton: {
    padding: "0.5rem 1rem",
    marginBottom: "0.25rem",
  },
  addItemButtonText: {
    textAlign: 'center',
  },
  storeNameCopyContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '1rem',
    width: '100%',
    maxWidth: 400,
  },
  storeNameCopyButton: {
    borderRadius: '0px 4px 4px 0px',
    borderTop: '1px solid rgba(36, 132, 255, 0.7)',
    borderRight: '1px solid rgba(36, 132, 255, 0.7)',
    borderBottom: '1px solid rgba(36, 132, 255, 0.7)',
    borderLeft: '1px solid rgba(36, 132, 255, 0.7)',
    color: "rgba(36, 132, 255, 0.8)",
    backgroundColor: "rgba(36, 132, 255, 0.1)",
  },
  storeNameCopy: {
    width: '100%',
    height: 35,
    fontSize: '1rem',
    border: '1px solid #ced4da',
    borderRight: '0px solid rgba(36, 132, 255, 0.7)',
    borderRadius: '4px 0px 0px 4px',
    padding: '0rem 0.5rem',
    outline: 'none',
  },
});


export default withStyles(styles)( StoreEditProfilePic );