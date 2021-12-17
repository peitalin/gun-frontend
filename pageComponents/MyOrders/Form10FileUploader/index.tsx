import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import { styles } from "./styles";

// Media uploader
import { IFileWithMeta, IUploadParams } from "components/DropzoneUploader/Dropzone";
import Dropzone from "components/DropzoneUploader/Dropzone";
import UploadInput from "pageComponents/MyOrders/Form10FileUploader/UploadInput";
import {
  google_storage_register,
  google_storage_save_file_to_db,
} from "queries/requests";

// graphl
import { useApolloClient } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_BUYER_ORDERS_CONNECTION,
  GET_SELLER_ORDERS_CONNECTION,
  GET_SELLER_ORDERS_ACTION_ITEMS_CONNECTION,
} from "queries/orders-queries";
import {
  ADD_FORM_10,
  REMOVE_FORM_10,
} from "queries/orders-mutations";

// Typings
import { Order, UploadType, OrderStatus, UserPrivate, OrdersConnection } from "typings/gqlTypes";
import { GoogleUpload } from "typings/dropzone";

// Material UI
import ErrorBounds from 'components/ErrorBounds';
// Uploader components
import UploadLayoutPreviews from "./UploadLayoutPreviews";
// Snackbar
import { useSnackbar } from "notistack";
// initial variables for updating apollo cache
import { initialVariables } from "pageComponents/MyOrders";





const FileUploader: React.FC<ReactProps> = (props) => {

  //// Props and State ////
  const {
    classes,
    order,
  } = props;

  const [googleUploads, setGoogleUploads] = React.useState<GoogleUpload[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingColor, setLoadingColor] = React.useState(Colors.gradientUniswapBlue1);

  const aClient = useApolloClient();
  const snackbar = useSnackbar();


  //// Functions ////

  const getUploadParams = async({ file, meta }: IFileWithMeta): Promise<IUploadParams> => {
    // https://react-dropzone-uploader.js.org/docs/api
    console.log("meta:....", meta)
    console.log("file", file)

    let { uploadId, uploadUrl } = await google_storage_register(
      UploadType.PRODUCT_FILE,
      meta.type || "application/octet-stream",
      meta.size,
      aClient
    )

    setGoogleUploads(state => [
      ...state,
      {
        metaId: meta.id,
        googleUploadId: uploadId,
        googleUploadUrl: uploadUrl
      }
    ])
    return {
      body: file,
      url: uploadUrl,
      method: "PUT",
      headers: {
        "Content-Type": meta.type,
        // "Content-Disposition": `attachment; filename=${file.name}`
      }
      // require Content-Disposition attachment, otherwise browser
      // will try open downloaded file in-browser, instead of downloading
      // to desktop
    }
  }

  const handleChangeStatus = (fileWithMeta: IFileWithMeta, status: string) => {
    //// called every time a file's `status` changes
    let { meta, file, xhr } = fileWithMeta;
    // console.info("status:", status, meta, file)
    setLoading(true)

    if (status === "done") {

      let googleUpload = googleUploads.find(g => g.metaId === meta.id);

      // Owner is going to be the store, but may also be the product if it already exists
      const ownerIds = [props.order.sellerStoreId];

      google_storage_save_file_to_db(
        googleUpload.googleUploadId,
        file.name,
        ownerIds,
        aClient
      ).then(async (fileId) => {

        // console.log("meta::", meta)
        // console.log("file::", file)
        // let newFilePreview = {
        //   id: meta.id,
        //   name: meta.name,
        //   previewUrl: meta.previewUrl,
        //   fileId: fileId,
        //   percent: meta.percent,
        //   size: meta.size,
        //   duration: meta.duration,
        //   fileWithMeta: fileWithMeta,
        // }

        /// update order with form 10 here
        let orderStatus = props.order.currentSnapshot.orderStatus;

        if (
          orderStatus === OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED
          || orderStatus === OrderStatus.FORM_10_SUBMITTED
          || orderStatus === OrderStatus.FORM_10_REVISE_AND_RESUBMIT
        ) {
          await addForm10({
            variables: {
              orderId: order.id,
              form10FileId: fileId,
            },
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
        console.log("save_to_db response:", fileId)

      })
      .catch(err => {
        console.log("err response:", err)
      })
      .finally(() => {
        setLoading(false)
      })

    } else {
      // uncaught Uploader state, undo loading state
    }
  }




  const refetchQueriesList = [
    {
      query: GET_SELLER_ORDERS_CONNECTION,
      variables: {
        query: {
          limit: initialVariables.query.limit ?? 6,
          offset: initialVariables.query.offset ?? 0,
        }
      }
    },
    {
      query: GET_BUYER_ORDERS_CONNECTION,
      variables: {
        query: {
          limit: initialVariables.query.limit ?? 6,
          offset: initialVariables.query.offset ?? 0,
        }
      }
    },
  ]

  // const user2 = aClient?.cache?.readQuery<UserPrivate, any>({
  //   query: GET_BUYER_ORDERS_CONNECTION,
  //   variables: initialVariables,
  // });
  // console.log("aClient.CACHE user: ", user2)

  const [addForm10, addForm10Response] = useMutation<MutDataAdd, MutVarAdd>(
    ADD_FORM_10, {
      variables: {
        orderId: order.id,
        form10FileId: undefined // required
      },
      update: (cache, { data: { addForm10 }}) => {

        let newOrder = addForm10?.order;

        const cacheDataSellerActionItems = cache.readQuery<QData, any>({
          query: GET_SELLER_ORDERS_ACTION_ITEMS_CONNECTION,
          variables: initialVariables,
        });

        let actionItemsConnection = cacheDataSellerActionItems?.sellerOrdersActionItemsConnection

        cache.writeQuery({
          query: GET_SELLER_ORDERS_ACTION_ITEMS_CONNECTION,
          variables: initialVariables,
          data: {
            sellerOrdersActionItemsConnection: {
              ...actionItemsConnection,
              // remove order which uploaded form10 from the "urgent" list
              edges: (actionItemsConnection?.edges ?? [])
                .filter(edge => edge?.node?.id !== newOrder?.id),
              totalCount: (actionItemsConnection?.edges?.length ?? 1) - 1,
            }
          },
        });
      },
      refetchQueries: refetchQueriesList,
    }
  );

  const handleRemoveForm10 = async() => {
    setLoading(true)
    setLoadingColor(Colors.red)
    return await removeForm10({
      variables: {
        orderId: order?.id,
      },
    }).finally(() => {
      setLoading(false)
      setLoadingColor(Colors.gradientUniswapBlue1)
    })
  }

  const [
    removeForm10,
    removeForm10Response
  ] = useMutation<MutDataRemove, MutVarRemove>(
    REMOVE_FORM_10, {
      variables: {
        orderId: order?.id,
      },
      update: (cache, { data: { removeForm10 }}) => {

        let newOrder = removeForm10?.order;

        const cacheDataSellerActionItems = cache.readQuery<QData, any>({
          query: GET_SELLER_ORDERS_ACTION_ITEMS_CONNECTION,
          variables: initialVariables,
        });

        let actionItemsConnection = cacheDataSellerActionItems?.sellerOrdersActionItemsConnection

        cache.writeQuery({
          query: GET_SELLER_ORDERS_ACTION_ITEMS_CONNECTION,
          variables: initialVariables,
          data: {
            sellerOrdersActionItemsConnection: {
              ...actionItemsConnection,
              // remove order which uploaded form10 from the "urgent" list
              edges: [
                { __typename: "OrdersEdge", node: newOrder },
                ...(actionItemsConnection?.edges ?? [])
              ],
              totalCount: (actionItemsConnection?.edges?.length ?? 0) + 1,
            }
          },
        });
      },
      refetchQueries: refetchQueriesList,
    }
  );

  let orderStatus = props?.order?.currentSnapshot?.orderStatus;

  let disableButton =
    orderStatus === OrderStatus.ADMIN_APPROVED ||
    orderStatus === OrderStatus.COMPLETE ||
    orderStatus === OrderStatus.REFUNDED ||
    orderStatus === OrderStatus.CANCELLED ||
    orderStatus === OrderStatus.FAILED

  const buttonTextFromOrderStatus = (orderStatus: string) => {
    switch (orderStatus) {
      case OrderStatus.ADMIN_APPROVED: {
        return "Approved"
      }
      case OrderStatus.COMPLETE: {
        return "Completed"
      }
      case OrderStatus.FORM_10_SUBMITTED: {
        return "Change Form"
      }
      case OrderStatus.FORM_10_REVISE_AND_RESUBMIT: {
        return "Change Form"
      }
      case OrderStatus.CANCELLED: {
        return "Cancelled"
      }
      case OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED: {
        return "Upload Form"
      }
      case OrderStatus.FAILED: {
        return "Upload Form" // disabled
      }
      case OrderStatus.REFUNDED: {
        return "Upload Form" //disabled
      }
      default: {
        return "Upload Form" //disabled
      }
    }
  }

  let buttonText = buttonTextFromOrderStatus(orderStatus)

  // console.log("order: ", props.order)
  // console.log("form10FilePreview: ", form10FilePreview)
  // // console.log("addform10Response: ", addForm10Response)
  // console.log("orderStatus: ", orderStatus)


  return (
    <ErrorBounds className={classes.fileUploadRoot}>

      <Dropzone
        // uploaderType="file-uploader"
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        LayoutComponent={(layProps) =>
          <UploadLayoutPreviews
            order={order}
            {...layProps}
          />
        }
        InputComponent={(layProps) =>
          <UploadInput
            order={order}
            disableButton={disableButton}
            loading={loading}
            loadingColor={loadingColor}
            handleRemoveForm10={handleRemoveForm10}
            buttonText={buttonText}
            {...layProps}
          />
        }
        accept={"image/*,.pdf,"}
        inputContent={(files, extra) => {
          return extra.reject
            ? 'Images and pdf files only'
            : 'Drag Files'
        }}
        styles={{
          dropzoneReject: {
            borderColor: "#EE655F",
            backgroundColor: '#DAA',
          },
          dropzone: {
            border: "none",
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
    </ErrorBounds>
  )
}


// add form10
interface MutDataAdd {
  addForm10: {
    order: Order
  }
}
interface MutVarAdd {
  orderId: string
  form10FileId: string
}
// remove form10
interface MutDataRemove {
  removeForm10: {
    order: Order
  };
}
interface MutVarRemove {
  orderId: string
}

interface QData {
  sellerOrdersActionItemsConnection: OrdersConnection
}

interface ReactProps extends WithStyles<typeof styles> {
  order: Order;
  errorMessage?: string;
}

export default withStyles(styles)( FileUploader );



