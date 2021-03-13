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





const Form10PreviewCard: React.FC<ReactProps> = (props) => {

  //// Props and State ////
  const {
    classes,
    order,
  } = props;

  const snackbar = useSnackbar();
  const ref = React.createRef();

  //// Functions ////

  const handleRemoveForm10 = async() => {
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


  const [removeForm10, removeForm10Response] = useMutation<MutDataRemove, MutVarRemove>(
    REMOVE_FORM_10, {
      variables: {
        orderId: order.id,
      },
      refetchQueries: refetchQueriesList,
    }
  );


  const [showModal, setShowModal] = React.useState(false);

  let form10FilePreview = props?.order?.currentSnapshot?.form10File;
  let orderStatus = props?.order?.currentSnapshot?.orderStatus;
  console.log("mimeType: ", form10FilePreview?.mimeType)

  return (
    <div className={classes.cardContainer}>
      {
        orderStatus === OrderStatus.FORM_10_SUBMITTED &&
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
                : "Upload Form-10"
            }
          >
            {
              form10FilePreview?.id
              ? <>
                  {
                    form10FilePreview?.mimeType === 'application/pdf'
                    ? <CardMedia
                        component="img"
                        classes={{
                          media: classes.cardMediaWide
                        }}
                        image={"/img/pdf-uploaded.png"}
                        onClick={() => setShowModal(true)}
                      />
                    : <CardMedia
                        component="img"
                        classes={{
                          media: classes.cardMediaWide
                        }}
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



// remove form10
interface MutDataRemove {
  order: Order
}
interface MutVarRemove {
  orderId: string
}

interface ReactProps extends WithStyles<typeof styles> {
  order: Order;
  onMouseDown(a: any): void;
}


export const cardDimensions = {
  height: 93.33, // 135/1.5
  width: 140,
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
    borderRadius: "4px",
    // border: `1px solid ${Colors.mediumLightGrey}`,
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
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23${patternColor}' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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
    ...cardDimensions
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



