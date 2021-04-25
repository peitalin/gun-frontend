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
import { useTheme } from "@material-ui/core";

import ConfirmActionModal from "components/ConfirmActionModal";
import CounterBidModal from "./CounterBidModal";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import BlockIcon from '@material-ui/icons/Block';

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import ReplyIcon from '@material-ui/icons/Reply';





const BidActionsByUser = (props: BidProps) => {

  const {
    classes,
    isMe,
    bidDisabled,
    updateBidMessage,
  } = props;

  const theme = useTheme()

  const [openDeclineModal, setOpenDeclineModal] = React.useState(false)
  const [openAcceptModal, setOpenAcceptModal] = React.useState(false)
  const [openCounterBidModal, setOpenCounterBidModal] = React.useState(false)
  const [openWithdrawBidModal, setOpenWithdrawBidModal] = React.useState(false)

  const name = `${props.product?.currentSnapshot?.model} - ${props.product?.currentSnapshot?.make}`


  if (isMe) {
    return (
      <div className={clsx(classes.flexRow, classes.columnBidActions)}>
        <Tooltip placement={"top"}
          title={bidDisabled ? "Disabled" : "Withdraw Bid"}
        >
          <span>
            <IconButton
              className={clsx(
                classes.bidMsgButton,
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
        </Tooltip>
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
      <div className={clsx(classes.flexRow, classes.columnBidActions)}>
        <Tooltip placement={"top"}
          title={bidDisabled ? "Disabled" : "Accept Bid"}
        >
          <span>
            <IconButton
              className={clsx(
                classes.bidMsgButton,
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
        </Tooltip>

        <Tooltip placement={"top"}
          title={bidDisabled ? "Disabled" : "Decline Bid"}
        >
          <span>
            <IconButton
              className={clsx(
                classes.bidMsgButton,
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
        </Tooltip>

        <CounterBidModal
          bidDisabled={bidDisabled}
          chatRoomId={props.chatRoomId}
          product={props.product}
          name={name}
        />
        {/* <Tooltip placement={"top"}
          title={bidDisabled ? "Disabled" : "Counter Offer"}
        >
          <span>
            <IconButton
              className={clsx(
                classes.bidMsgButton,
                bidDisabled ? classes.bidMsgDisabled : classes.bidMsgPurple,
              )}
              onClick={() => setOpenCounterBidModal(true)}
              disabled={bidDisabled}
            >
              <ReplyIcon
                className={bidDisabled ? null : classes.bidMsgPurple}
              />
          </IconButton>
          </span>
        </Tooltip> */}


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
        <ConfirmActionModal
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
        />
        <ConfirmActionModal
          title={"Make a counter offer to this bid"}
          showModal={openCounterBidModal}
          setShowModal={() => setOpenCounterBidModal(s => !s)}
          onConfirmFunction={() => {
            console.log("COUNTER!")
          }}
        />
      </div>
    )
  }
}


interface BidProps extends WithStyles<typeof styles> {
  isMe: boolean;
  bidId: string;
  bidDisabled: boolean;
  chatRoomId: string;
  product: Product;
  updateBidMessage({
    variables: {
      bidId: string,
      bidStatus: BidStatus,
    }
  })
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
    height: 36,
    width: 36,
  },
  bidMsgRed: {
    fill: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    "&:hover": {
      "& > span > svg": {
        fill: Colors.lightRed,
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
  bidMsgPurple: {
    fill: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    "&:hover": {
      "& > span > svg": {
        fill: Colors.purple,
      }
    },
  },
  bidMsgDisabled: {
  },
})


export default withStyles(styles)(BidActionsByUser)