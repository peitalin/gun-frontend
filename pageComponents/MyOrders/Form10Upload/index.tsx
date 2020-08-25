import React from "react";
import { useState } from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Utils
import { ID, Orders, UploadType, Order_Snapshots, OrderStatus } from "typings/gqlTypes";
// Media uploader
import { IFileWithMeta, IUploadParams } from "components/DropzoneUploader/Dropzone";
import Dropzone from "components/DropzoneUploader/Dropzone";
import {
  google_storage_register, google_storage_save_image_to_db,
} from "queries/requests";
import { useApolloClient } from "@apollo/client";

// Snackbar
import { useSnackbar, ProviderContext } from "notistack";
// Material UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
// Components
import Loading from "components/Loading";
// DZU components
import UploadLayout from "./UploadLayout";
import UploadInput from "./UploadInput";
// Validation
import { FormikProps } from 'formik';
// graphl
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_BUYER_ORDERS_CONNECTION,
  GET_SELLER_ORDERS_CONNECTION,
} from "queries/orders-queries";
import { REMOVE_FORM_10 } from "queries/orders-mutations";
import { ADD_FORM_10 } from "queries/orders-mutations";

import { customAlphabet } from 'nanoid'
const ID_ALPHABET = "123456789bcdfghjklmnpqrstvwxyz";
const ID_LENGTH = 8;
const nanoid = customAlphabet(ID_ALPHABET, ID_LENGTH)



const Form10Upload = (props: ReactProps) => {

  const {
    classes,
    order,
    ...fprops
  } = props;

  const [loading, setLoading] = React.useState(false);
  const snackbar = useSnackbar();

  // upload
  const [uploadId, setUploadID] = useState("")
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
    setLoading(true)

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
    console.info("status:", status, meta, file)

    if (status === "done") {

      // console.log("associating store pic to userId: ", props.userId)

      // Owner is going to be the store, but may also be the product if it already exists
      const ownerIds = [props.order.id];
      const description = null;
      const tags = "";
      google_storage_save_image_to_db(
        uploadId,
        description,
        tags,
        ownerIds,
        aClient
      )
      .then(async (image) => {
        console.log('imageId...', image.id)
        setLoading(false)
        /// update order with form 10 here
        let orderStatus = props.order.currentSnapshot.orderStatus;
        if (
          orderStatus === OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED
          || orderStatus === OrderStatus.FORM_10_SUBMITTED
        ) {
          await addForm10({
            variables: {
              orderId: order.id,
              currentSnapshotId: `order_snapshot_${nanoid()}`,
              form10ImageId: image.id,
            },
            refetchQueries: refetchQueriesList,
          })
        } else {
          if (
            orderStatus === OrderStatus.ADMIN_APPROVED
            || orderStatus === OrderStatus.COMPLETE
          ) {
            snackbar.enqueueSnackbar(
              `Form-10 already approved by admin`,
              { variant: "success" }
            )
          }
        }
        console.log("save_to_db response:", image.id)
      })
      .catch(err => {
        setLoading(false)
      })
    }
  }

  const refetchQueriesList = [
    {
      query: GET_SELLER_ORDERS_CONNECTION,
      variables: {
        query: {
          limit: 10,
          offset: 0,
        }
      }
    },
    {
      query: GET_BUYER_ORDERS_CONNECTION,
      variables: {
        query: {
          limit: 10,
          offset: 0,
        }
      }
    },
  ]

  const [addForm10, addForm10Response] = useMutation<MutDataAdd, MutVarAdd>(
    ADD_FORM_10, {
      variables: {
        orderId: order.id,
        currentSnapshotId: `order_snapshot_${nanoid()}`,
        form10ImageId: undefined // required
      },
      refetchQueries: refetchQueriesList,
    }
  );

  const [removeForm10, removeForm10Response] = useMutation<MutDataRemove, MutVarRemove>(
    REMOVE_FORM_10, {
      variables: {
        orderId: order.id,
        currentSnapshotId: `order_snapshot_${nanoid()}`,
      },
      refetchQueries: refetchQueriesList,
    }
  );


  let form10Preview = option(props).order.currentSnapshot.form10Image();
  console.log("form10Preview: ", form10Preview)
  console.log("addform10Response: ", addForm10Response)

  return (
    <div className={classes.flexCol}>
      <div className={classes.root}>
        <Avatar className={clsx(
          classes.avatar,
          classes.avatarEdit,
        )}>
          {
            option(form10Preview).original.url()
            ? <img className={classes.avatarPlaceholder}
                src={form10Preview.original.url}
              />
            : <img className={classes.avatarPlaceholder}
                src={"/img/avatar-placeholder.png"}
              />
          }
        </Avatar>
        <a className={props.classes.link}
          onClick={async () => {
            await removeForm10({
              variables: {
                orderId: order.id,
                currentSnapshotId: `order_snapshot_${nanoid()}`,
              },
              refetchQueries: refetchQueriesList,
            })
          }}
          style={{
            // opacity: props.profilePicPreview ? 1 : 0,
            // cursor: props.profilePicPreview ? 'pointer' : 'default',
            fontSize: '0.9rem',
            textAlign: 'center',
          }}
        >
          Remove Image
        </a>

        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          LayoutComponent={React.memo((layProps) =>
            <UploadLayout
              {...layProps}
              // profilePicPreview={profilePicPreview}
              // setProfilePicPreview={setProfilePicPreview}
              // removeProfilePicPreview={() => {
              //   setProfilePicPreview(undefined)
              //   fprops.setFieldValue('profileId', undefined)
              // }}
            />
          )}
          InputComponent={React.memo((layProps) =>
            <UploadInput
              errorMessage={props.errorMessage}
              loading={loading}
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
              border: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#fefefe",
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
  order: Orders;
  errorMessage?: string;
}

// add form10
interface MutDataAdd {
  update_orders: { returning: Orders[] },
  insert_order_snapshots_one: Order_Snapshots
}
interface MutVarAdd {
  orderId: string
  currentSnapshotId: string
  form10ImageId: string
}

// remove form10
interface MutDataRemove {
  update_orders: { returning: Orders[] },
  insert_order_snapshots_one: Order_Snapshots
}
interface MutVarRemove {
  orderId: string
  currentSnapshotId: string
}


const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: '4px',
    width: '100%',
  },
  // avatar outline circle
  avatar: {
    width: 90,
    height: 90,
    border: "1px solid #fafafa",
    boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.5)",
    marginTop: '1rem',
    marginBottom: '0.5rem',
    background: Colors.lightGrey,
  },
  avatarEdit: {
    transition: theme.transitions.create('transform, border', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
    border: "1px solid #222",
    marginBottom: "1rem",
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
  avatarPlaceholder: {
    objectFit: 'cover',
    height: "105%",
    width: "105%",
  },
  link: {
    color: Colors.blue,
    "&:hover": {
      cursor: "pointer",
      color: Colors.red,
    },
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
});


export default withStyles(styles)( Form10Upload );