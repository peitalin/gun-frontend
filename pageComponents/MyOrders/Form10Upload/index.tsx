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
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip';
// Components
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import Tick from "components/Icons/Tick";
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

        // await addForm10({
        //   variables: {
        //     orderId: order.id,
        //     form10ImageId: image.id,
        //   },
        //   refetchQueries: refetchQueriesList,
        // })

        if (
          orderStatus === OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED
          || orderStatus === OrderStatus.FORM_10_SUBMITTED
        ) {
          await addForm10({
            variables: {
              orderId: order.id,
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
          } else {

            snackbar.enqueueSnackbar(
              `OrderStatus: ${orderStatus}`,
              { variant: "error" }
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

  const handleRemoveForm10 = async() => {
    let currentSnapshotId = `order_snapshot_${nanoid()}`;
    console.log("order_snapshot_id: ", currentSnapshotId)
    return await removeForm10({
      variables: {
        orderId: order.id,
      },
      refetchQueries: refetchQueriesList,
    })
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
        form10ImageId: undefined // required
      },
      refetchQueries: refetchQueriesList,
    }
  );

  const [removeForm10, removeForm10Response] = useMutation<MutDataRemove, MutVarRemove>(
    REMOVE_FORM_10, {
      variables: {
        orderId: order.id,
      },
      refetchQueries: refetchQueriesList,
    }
  );


  let form10Preview = option(props).order.currentSnapshot.form10Image();
  let orderStatus = option(props).order.currentSnapshot.orderStatus();

  // console.log("form10Preview: ", form10Preview)
  // console.log("addform10Response: ", addForm10Response)
  console.log("orderStatus: ", orderStatus)

  return (
    <div className={classes.flexCol}>
      <div className={classes.root}>

        <div className={classes.cardContainer}>
          {
            orderStatus === OrderStatus.FORM_10_SUBMITTED &&
            <Tooltip title="Remove image" placement={"right"}>
              <IconButton
                onClick={handleRemoveForm10}
                className={classes.previewIconButton}
                classes={{
                  root: classes.iconButton
                }}
                size="small"
              >
                <ClearIcon classes={{ root: classes.svgIcon }}/>
              </IconButton>
            </Tooltip>
          }
          {
            (orderStatus === OrderStatus.ADMIN_APPROVED ||
            orderStatus === OrderStatus.COMPLETE) &&
            // orderStatus !== OrderStatus.FORM_10_SUBMITTED &&
            <Tick
              size={30}
              className={classes.previewIconButton}
              color={Colors.white}
              outerCircleColor={Colors.lightGreen}
              innerCircleColor={Colors.green}
            />
          }
          <Card className={classes.card} elevation={0}>
            <CardActionArea
              // onClick={props.onClick}
              classes={{
                root: classes.cardActionAreaWide,
                focusHighlight: classes.focusHighlight,
                focusVisible: classes.focusHighlight,
              }}
            >
              <Tooltip placement="top"
                title={
                  (orderStatus === OrderStatus.ADMIN_APPROVED ||
                  orderStatus === OrderStatus.COMPLETE)
                  ? "Approved by admin"
                  : (orderStatus === OrderStatus.FORM_10_SUBMITTED)
                    ? "Pending approval"
                    : "Upload Form10"
                }
              >
                {
                  option(form10Preview).original.url()
                  ? <CardMedia
                      component="img"
                      classes={{
                        media: classes.cardMediaWide
                      }}
                      image={form10Preview.original.url}
                    />
                  : <CardMedia
                      component="img"
                      classes={{
                        media: classes.cardMediaWide
                      }}
                      image={"/img/avatar-placeholder.png"}
                    />
                }
              </Tooltip>
            </CardActionArea>
          </Card>
        </div>


        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          LayoutComponent={React.memo((layProps) =>
            <UploadLayout
              {...layProps}
            />
          )}
          InputComponent={React.memo((layProps) =>
            <UploadInput
              errorMessage={props.errorMessage}
              loading={loading}
              disableButton={
                (orderStatus === OrderStatus.ADMIN_APPROVED ||
                orderStatus === OrderStatus.COMPLETE)
              }
              buttonText={
                orderStatus === OrderStatus.ADMIN_APPROVED
                ? "Approved"
                : (orderStatus === OrderStatus.COMPLETE)
                  ? "Complete"
                  : (orderStatus === OrderStatus.FORM_10_SUBMITTED)
                    ? "Change Form10"
                    : "Upload Form10"
              }
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
              // backgroundColor: "#fefefe",
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
  form10ImageId: string
}

// remove form10
interface MutDataRemove {
  update_orders: { returning: Orders[] },
  insert_order_snapshots_one: Order_Snapshots
}
interface MutVarRemove {
  orderId: string
}

const cardDimensions = {
  height: 93.75, // 150/1.6
  width: 150,
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
    border: `1px solid ${theme.colors.uniswapGrey}`,
    boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.5)",
    // marginTop: '1rem',
    marginBottom: '0.5rem',
    background: theme.colors.uniswapLightGrey,
  },
  avatarEdit: {
    transition: theme.transitions.create('transform, border', {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
    border: "1px solid #222",
    // marginBottom: "1rem",
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
  },
  cardContainer: {
    position: "relative",
  },
  card: {
    borderRadius: "4px",
    border: `1px solid ${Colors.mediumLightGrey}`,
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
    backgroundColor: "rgba(0,0,0,0)",
    ...cardDimensions
  },
  cardActionAreaWide: {
    // height: '100%',
    display: "flex",
    flexDirection: "row",
    "&:hover $focusHighlight": {
      opacity: 0
    },
    ...cardDimensions
    // backgroundColor: backgroundColor,
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23${patternColor}' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  },
  cardMediaWide: {
    // objectFit: "scale-down",
    background: Colors.lightestGrey,
    border: '0px',
    ...cardDimensions
  },
  cardImg: {
  },
  focusHighlight: {
    opacity: 0, // disable hover dither
    "&:hover": {
      opacity: 0, // disable hover dither
    }
  },
  iconButton: {
    background: Colors.darkGrey,
    "&:hover": {
      background: Colors.red,
    },
    color: Colors.lightGrey,
    padding: 2, // determines button size
  },
  iconButtonLabel: {
    height: '0.65rem',
    width: '0.65rem',
  },
  previewIconButton: {
    position: "absolute",
    right: -8,
    top: -8,
    zIndex: 1502,
  },
  svgIcon: {
    fill: "#eaeaea",
    "&:hover": {
      fill: "#fafafa",
    },
  },
});


export default withStyles(styles)( Form10Upload );