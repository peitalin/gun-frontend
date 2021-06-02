import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Message, Product, BidStatus } from "typings/gqlTypes";
// Styles
import {
  Colors,
  BoxShadows,
  BorderRadius2x,
  BorderRadius3x,
  BorderRadius,
  Gradients,
  isThemeDark,
} from "layout/AppTheme";
// format
import { useMediaQuery, useTheme } from "@material-ui/core";

import ConfirmActionModal from "components/ConfirmActionModal";
import CounterBidModal from "./CounterBidModal";
import TooltipToggle from "./TooltipToggle";

import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import BlockIcon from '@material-ui/icons/Block';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ReplyIcon from '@material-ui/icons/Reply';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Link from "next/link";





const BidActionsByUser = (props: BidProps) => {

  const {
    classes,
    isMe,
    iOwnThisProduct,
    bidDisabled,
    bidAccepted,
    product,
    updateBidMessage,
  } = props;

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))

  // const [openDeclineModal, setOpenDeclineModal] = React.useState(false)
  const [openAcceptModal, setOpenAcceptModal] = React.useState(false)
  const [openWithdrawBidModal, setOpenWithdrawBidModal] = React.useState(false)

  const name = `${props.product?.currentSnapshot?.model} - ${props.product?.currentSnapshot?.make}`

  if (bidAccepted) {
    if (iOwnThisProduct) {
      return (
        <div className={clsx(classes.flexRow)}>
          <Typography variant="body1" className={classes.acceptedBidCheckoutText}>
            Pending Checkout
          </Typography>
        </div>
      )
    } else {
      return (
        <div className={clsx(classes.flexRow)}>
          <Typography variant="body1" className={classes.acceptedBidCheckoutText}>
            Checkout
          </Typography>
          <Tooltip placement={"top"}
            title={"Purchase Item"}
          >
            <span>
              <Link
                href={`/p/[productId]?bidId=${props.bidId}`}
                as={`/p/${product?.id}?bidId=${props.bidId}`}
              >
                <a>
                  <IconButton className={
                    mdDown ? classes.bidMsgButtonMobile : classes.bidMsgButton
                  }>
                    <ArrowForwardIcon
                      className={classes.acceptedBidCheckoutIcon}
                    />
                  </IconButton>
                </a>
              </Link>
            </span>
          </Tooltip>
        </div>
      )
    }
  }


  if (isMe) {
    return (
      <div className={clsx(classes.flexRow)}>
        <TooltipToggle
          placement={"top"}
          title={bidDisabled ? "Disabled" : "Withdraw Bid"}
          disabled={bidDisabled}
        >
          <span>
            <IconButton
              className={clsx(
                mdDown ? classes.bidMsgButtonMobile : classes.bidMsgButton,
                bidDisabled ? classes.bidMsgDisabled : classes.bidMsgRed,
              )}
              onClick={() => setOpenWithdrawBidModal(true)}
              disabled={bidDisabled}
            >
              <BlockIcon
                className={bidDisabled ? null : classes.bidMsgRed}
              />
            </IconButton>
          </span>
        </TooltipToggle>
        <ConfirmActionModal
          title={"Do you wish to withdraw this bid?"}
          showModal={openWithdrawBidModal}
          setShowModal={() => setOpenWithdrawBidModal(s => !s)}
          onConfirmFunction={async() => {
            updateBidMessage({
              variables: {
                bidId: props.bidId,
                bidStatus: BidStatus.WITHDRAWN,
              }
            })
          }}
        />
      </div>
    )
  } else {
    return (
      <div className={clsx(classes.flexRow)}>
        {
          !bidDisabled &&
          <TooltipToggle
            placement={"top"}
            title={bidDisabled ? "Disabled" : "Accept Bid"}
            disabled={bidDisabled}
          >
            <span>
              <IconButton
                className={clsx(
                  mdDown ? classes.bidMsgButtonMobile : classes.bidMsgButton,
                  bidDisabled ? classes.bidMsgDisabled : classes.bidMsgBlue,
                )}
                onClick={() => setOpenAcceptModal(true)}
                disabled={bidDisabled}
              >
                <CheckIcon
                  className={bidDisabled ? null : classes.bidMsgBlue}
                />
              </IconButton>
            </span>
          </TooltipToggle>
        }

        {/* <TooltipToggle
          placement={"top"}
          title={bidDisabled ? "Disabled" : "Decline Bid"}
          disabled={bidDisabled}
        >
          <span>
            <IconButton
              className={clsx(
                mdDown ? classes.bidMsgButtonMobile : classes.bidMsgButton,
                bidDisabled ? classes.bidMsgDisabled : classes.bidMsgRed,
              )}
              onClick={() => setOpenDeclineModal(true)}
              disabled={bidDisabled}
            >
              <ClearIcon
                className={bidDisabled ? null : classes.bidMsgRed}
              />
            </IconButton>
          </span>
        </TooltipToggle> */}

        {
          (props.noActiveBids || !bidDisabled) &&
          <CounterBidModal
            bidDisabled={
              !props.noActiveBids && bidDisabled
              // allow counterbidding if noActiveBids,
              // disabled is always false if noActiveBids
            }
            chatRoomId={props.chatRoomId}
            product={props.product}
            name={name}
            counterBidId={props.bidId}
          />
        }


        <ConfirmActionModal
          title={"Do you wish to accept this bid?"}
          showModal={openAcceptModal}
          setShowModal={() => setOpenAcceptModal(s => !s)}
          onConfirmFunction={() => {
            updateBidMessage({
              variables: {
                bidId: props.bidId,
                bidStatus: BidStatus.ACCEPTED,
              }
            })
          }}
        />
        {/* <ConfirmActionModal
          title={"Do you wish to decline this bid?"}
          showModal={openDeclineModal}
          setShowModal={() => setOpenDeclineModal(s => !s)}
          onConfirmFunction={() => {
            updateBidMessage({
              variables: {
                bidId: props.bidId,
                bidStatus: BidStatus.DECLINED,
              }
            })
          }}
        /> */}
      </div>
    )
  }
}

interface BidProps extends WithStyles<typeof styles> {
  isMe: boolean;
  iOwnThisProduct: boolean;
  bidId: string;
  bidDisabled: boolean;
  bidAccepted: boolean;
  chatRoomId: string;
  product: Product;
  updateBidMessage({
    variables: {
      bidId: string,
      bidStatus: BidStatus,
    }
  })
  noActiveBids: boolean
}


const styles = (theme: Theme) => createStyles({
  disabled: {
    opacity: '0.6',
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  columnBidActions: {
    minWidth: 110,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    justifyContent: "flex-end",
  },
  bidMsgButton: {
    color: Colors.cream,
    padding: '0rem', // safari alignment bug
    height: 36,
    width: 36,
  },
  bidMsgButtonMobile: {
    color: Colors.cream,
    padding: '0rem', // safari alignment bug
    marginLeft: '0.25rem',
    marginRight: '0.25rem',
    height: 36,
    width: 36,
  },
  bidMsgRed: {
    fill: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    "&:hover": {
      "& > span > svg": {
        fill: Colors.magenta,
      }
    },
  },
  bidMsgBlue: {
    fill: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    "&:hover": {
      "& > span > svg": {
        fill: Colors.ultramarineBlueLight,
      }
    },
  },
  bidMsgDisabled: {
  },
  acceptedBidCheckoutText:{
    fontSize: "0.8rem",
    textTransform: "uppercase",
    fontWeight: 600,
    color: Colors.green,
    marginRight: '0.25rem',
  },
  acceptedBidCheckoutIcon: {
    fill: Colors.green,
  },
  buttonsPlaceholder: {
    minWidth: 110,
  },
})


export default withStyles(styles)(BidActionsByUser)