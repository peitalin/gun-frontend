import React from "react";
// Styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius, fontFam } from "layout/AppTheme";

// graphl
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_BUYER_ORDERS_CONNECTION,
  GET_SELLER_ORDERS_CONNECTION,
} from "queries/orders-queries";
import { REMOVE_FORM_10 } from "queries/orders-mutations";
import { ADD_FORM_10 } from "queries/orders-mutations";

// Typings
import { Order, OrderStatus } from "typings/gqlTypes";

// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import Tick from "components/Icons/Tick";
// Uploader components
import Form10Modal from "./Form10Modal";
// Snackbar
import { useSnackbar } from "notistack";
import { Typography } from "@material-ui/core";


export const cardDimensionsDefault = {
  height: 93.33, // 135/1.5
  width: 140,
}




const Form10PreviewCard: React.FC<ReactProps> = (props) => {

  //// Props and State ////
  const {
    classes,
    order,
    cardDimensions = { ...cardDimensionsDefault }
  } = props;

  const snackbar = useSnackbar();
  const ref = React.createRef();

  //// Functions ////

  const handleRemoveForm10 = async() => {
    return await removeForm10({
      variables: {
        orderId: order?.id,
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


  const [removeForm10, removeForm10Response] = useMutation<MutDataRemove, MutVarRemove>(
    REMOVE_FORM_10, {
      variables: {
        orderId: order?.id,
      },
      refetchQueries: refetchQueriesList,
    }
  );


  const tipTextFromOrderStatus = (orderStatus: string) => {
    switch (orderStatus) {
      case OrderStatus.ADMIN_APPROVED: {
        return "Approved by admin"
      }
      case OrderStatus.COMPLETE: {
        return "Order Complete"
      }
      case OrderStatus.FORM_10_SUBMITTED: {
        if (props.inDealerDashboard) {
          return "Pending Admin Approval"
        } else {
          return "Pending Approval"
        }
      }
      case OrderStatus.FORM_10_REVISE_AND_RESUBMIT: {
        return "Form resubmission needed"
      }
      case OrderStatus.CANCELLED: {
        return "Order Cancelled"
      }
      case OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED: {
        if (props.inDealerDashboard) {
          return "Generate Receipt for Seller"
        } else if (props.inAdminDashboard) {
          return "Waiting for Seller to upload receipt"
        } else {
          return "Upload Receipt from Dealer"
        }
      }
      case OrderStatus.FAILED: {
        return "Payment failed" // disabled
      }
      case OrderStatus.REFUNDED: {
        return "Payment refunded" //disabled
      }
      default: {
        return "" //disabled
      }
    }
  }



  const [showModal, setShowModal] = React.useState(false);

  let form10FilePreview = props?.order?.currentSnapshot?.form10File;
  let form10ImgPreview = props?.order?.currentSnapshot?.form10Image;

  let orderStatus = props?.order?.currentSnapshot?.orderStatus;
  let tipText = tipTextFromOrderStatus(orderStatus)


  return (
    <div className={classes.cardContainer}>

      {
        orderStatus === OrderStatus.FORM_10_SUBMITTED &&
        !props.inAdminDashboard &&
        !props.inDealerDashboard &&
        <Tooltip title="Remove file" placement={"right"}>
          <IconButton
            onClick={handleRemoveForm10}
            className={classes.previewIconButton}
            classes={{
              root: classes.iconButton,
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

      <Card className={classes.card} elevation={0}
        style={{...cardDimensions}}
      >
        <CardActionArea
          // onClick={props.onClick}
          classes={{
            root: classes.cardActionAreaWide,
            focusHighlight: classes.focusHighlight,
            focusVisible: classes.focusHighlight,
          }}
          style={{...cardDimensions}}
        >
          <Tooltip placement="top"
            title={tipText}
          >
            {
              (form10FilePreview?.id || form10ImgPreview?.id)
              ? <>
                  {
                    form10FilePreview?.mimeType === 'application/pdf'
                    ? <CardMedia
                        component="img"
                        classes={{
                          media: classes.cardMediaWide
                        }}
                        style={{...cardDimensions}}
                        image={"/img/pdf-uploaded.png"}
                        onClick={() => setShowModal(true)}
                      />
                    : <CardMedia
                        component="img"
                        classes={{
                          media: classes.cardMediaWide
                        }}
                        style={{...cardDimensions}}
                        image={"/img/img-uploaded.png"}
                        onClick={() => setShowModal(true)}
                      />
                  }
                  <Typography className={classes.previewText} variant={"caption"}>
                    Click to preview
                  </Typography>
                </>
              : <CardMedia
                  component="img"
                  classes={{
                    media: classes.cardMediaWide
                  }}
                  style={{...cardDimensions}}
                  image={"/img/pdf-missing.png"}
                  onMouseDown={props.onMouseDown}
                />
            }
          </Tooltip>
        </CardActionArea>
      </Card>
      <Form10Modal
        order={order}
        // orderCancelled={orderCancelled}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      </div>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  order: Order;
  inDealerDashboard?: boolean;
  inAdminDashboard?: boolean;
  // onMouseDown only before OrderStatus === FORM10_SUBMITTED state
  onMouseDown(a: any): void;
  cardDimensions?: {
    height?: any;
    width?: any;
  }
}


// remove form10
interface MutDataRemove {
  order: Order
}
interface MutVarRemove {
  orderId: string
}


export const styles = (theme: Theme) => createStyles({
  cardContainer: {
    position: "relative",
    marginBottom: '0.5rem',
  },
  iconButton: {
    background: Colors.darkGrey,
    "&:hover": {
      background: Colors.darkGrey,
      // background: Colors.red,
      // buggy on hover,
    },
    color: Colors.lightGrey,
    padding: 2, // determines button size
  },
  previewText: {
    position: "absolute",
    bottom: '.3rem',
    width: '100%',
    fontSize: '0.7rem',
    textAlign: 'center',
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyDarkest,
  },
  card: {
    position: "relative",
    borderRadius: "4px",
    // border: `1px solid ${Colors.mediumLightGrey}`,
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
    backgroundColor: "rgba(0,0,0,0)",
    // ...cardDimensions
  },
  cardActionAreaWide: {
    // height: '100%',
    display: "flex",
    flexDirection: "row",
    "&:hover $focusHighlight": {
      opacity: 0
    },
    // ...cardDimensions
  },
  previewIconButton: {
    position: "absolute",
    right: -8,
    top: -8,
    zIndex: 1502,
  },
  cardMediaWide: {
    // objectFit: "scale-down",
    background: theme.palette.type === 'dark'
      ? Colors.uniswapNavy
      : Colors.slateGrey,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDark}`,
    padding: '1.1rem',
    objectFit: "contain",
    borderRadius: BorderRadius,
    // ...cardDimensions
  },
  focusHighlight: {
    opacity: 0, // disable hover dither
    "&:hover": {
      opacity: 0, // disable hover dither
    }
  },
  svgIcon: {
    fill: "#eaeaea",
    "&:hover": {
      fill: "#fafafa",
    },
  },
})


export default withStyles(styles)( Form10PreviewCard );



