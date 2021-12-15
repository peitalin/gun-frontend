import React from "react";
// Styles
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
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
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Tick from "components/Icons/Tick";
// Uploader components
import Form10Modal from "./Form10Modal";
// Snackbar
import { useSnackbar } from "notistack";
import { Typography } from "@mui/material";


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

  const tipTextFromOrderStatus = (orderStatus: string) => {
    switch (orderStatus) {
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
      case OrderStatus.CANCELLED: {
        return "Order Cancelled"
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
      case OrderStatus.ADMIN_APPROVED: {
        return "Approved by admin"
      }
      case OrderStatus.COMPLETE: {
        return "Order Complete"
      }
      default: {
        return "!" //disabled
      }
    }
  }


  const [showModal, setShowModal] = React.useState(false);

  let form10FilePreview = props?.order?.currentSnapshot?.form10File;
  let form10ImgPreview = props?.order?.currentSnapshot?.form10Image;

  let orderStatus = props?.order?.currentSnapshot?.orderStatus;
  let tipText = tipTextFromOrderStatus(orderStatus)
  // console.log("loading2: ", props.loading)

  return (
    <div className={classes.cardContainer}>

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

      <Tooltip placement="left" title={tipText}>
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
          </CardActionArea>
        </Card>
      </Tooltip>

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
  loading?: boolean;
  inDealerDashboard?: boolean;
  inAdminDashboard?: boolean;
  // onMouseDown only before OrderStatus === FORM10_SUBMITTED state
  onMouseDown(a: any): void;
  cardDimensions?: {
    height?: any;
    width?: any;
  }
}


export const styles = (theme: Theme) => createStyles({
  cardContainer: {
    position: "relative",
    marginBottom: '0.5rem',
  },
  previewText: {
    position: "absolute",
    bottom: '.3rem',
    width: '100%',
    fontSize: '0.7rem',
    textAlign: 'center',
    color: theme.palette.mode === 'dark'
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
  cardMediaWide: {
    // objectFit: "scale-down",
    background: theme.palette.mode === 'dark'
      ? Colors.uniswapNavy
      : Colors.slateGrey,
    border: theme.palette.mode === 'dark'
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
  previewIconButton: {
    position: "absolute",
    right: -8,
    top: -8,
    zIndex: 2,
  },
})


export default withStyles(styles)( Form10PreviewCard );



