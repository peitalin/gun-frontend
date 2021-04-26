import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Message, Bid, Product } from "typings/gqlTypes";
// Styles
import {
  Colors,
  BoxShadows,
  BorderRadius2x,
  BorderRadius,
  Gradients,
  isThemeDark,
} from "layout/AppTheme";
// gql
import { useMutation } from "@apollo/client";
import { UPDATE_BID_MESSAGE } from "queries/chat-mutations";
// format
import { useTheme } from "@material-ui/core";
import { formatNiceDate } from "utils/dates";
import { asCurrency as c } from "utils/prices";

import CallReceivedIcon from '@material-ui/icons/CallReceived';
import BidActionsByUser from "./BidActionsByUser";




const NormalBid = (props: BidProps) => {

  const {
    classes,
    isMe,
    iOwnThisProduct,
    bidDisabled,
    bidAccepted,
    message: m,
  } = props;

  const theme = useTheme()


  return (
    <div className={clsx(
      classes.messageRoot,
      isMe ? classes.isMeBorder : classes.isNotMeBorder,
      bidDisabled && classes.disabledMsg,
      bidAccepted && classes.acceptedMsg,
    )}>

      {/* <ArrowDownwardIcon /> */}
      <CallReceivedIcon
        className={clsx(
          classes.icon1,
          bidDisabled && classes.disabledIcon,
        )}
      />

      <div className={clsx(classes.flexCol, classes.columnUser)}>
        <div className={classes.userAndTime}>
          {
            isMe ? "You made a bid" : "Bid by user"
          }
          {
            !isMe &&
            <span className={classes.userId}>
              {
                m?.sender?.license?.licenseNumber
                ? `${m.sender?.license?.licenseNumber}`
                : `${m.sender?.id?.slice(-12)}`
              }
            </span>
          }
        </div>
        <div className={classes.messageTime}>
          {formatNiceDate(m.createdAt)}
        </div>
      </div>

      <div className={clsx(classes.flexCol, classes.columnBid)}>
        <div>
          {`${c(m?.bid?.offerPrice)}`}
        </div>
        <div className={classes.bidStatusText}>
          {`${m?.bid?.bidStatus}`}
        </div>
      </div>

      {
        props.bidDisabled
        ? <div className={classes.buttonsPlaceholder}></div>
        : <BidActionsByUser
            isMe={isMe}
            iOwnThisProduct={iOwnThisProduct}
            bidId={m?.bid?.id}
            bidDisabled={bidDisabled}
            bidAccepted={bidAccepted}
            chatRoomId={m?.chatRoomId}
            updateBidMessage={props.updateBidMessage}
            product={props.product}
          />
      }

    </div>
  )
}


interface BidProps extends WithStyles<typeof styles> {
  isMe: boolean;
  iOwnThisProduct: boolean;
  message: Message;
  bidDisabled: boolean;
  bidAccepted: boolean;
  product: Product;
  updateBidMessage({
    variables: {
      bidId: string,
      bidStatus: BidStatus,
    }
  })
}



const styles = (theme: Theme) => createStyles({
  messageRoot: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: '0.5rem',
    marginRight: '1rem',
    marginBottom: '0.5rem',
    padding: '0.5rem',
    background: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    borderRadius: BorderRadius,
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadowWhite.boxShadow
      : BoxShadows.shadow3.boxShadow,
  },
  isMeBorder: {
    border: `1px solid ${Colors.purple}`,
  },
  isNotMeBorder: {
    border: `1px solid ${Colors.gradientUniswapFluro1}`,
  },
  disabledMsg: {
    "& > div": {
      opacity: '0.5',
    },
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGreyDarkest}`,
    boxShadow: 'unset',
  },
  disabledIcon: {
    opacity: 0.5,
  },
  acceptedMsg: {
    // "& > div": {
    //   opacity: '0.5',
    // },
    border: isThemeDark(theme)
      ? `1px solid ${Colors.ultramarineBlueLight}`
      : `1px solid ${Colors.ultramarineBlueLight}`,
    // marginTop: "1rem",
    marginBottom: "1.5rem",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  columnUser: {
    flexBasis: '30%',
    flexGrow: 1,
  },
  columnBid: {
    flexBasis: '15%',
    alignItems: "center",
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  userAndTime: {
    lineHeight: '1.125rem',
    fontSize: '0.9rem',
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyBlack,
      // marginBottom: '0.25rem',
  },
  userId: {
    fontSize: '0.8rem',
    textTransform: "uppercase",
    marginLeft: '0.25rem',
    fontWeight: 600,
  },
  icon1: {
    marginLeft: '0.25rem',
    marginRight: '0.75rem',
    transform: 'scaleX(-1)',
    fill: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack
  },
  messageTime: {
    textAlign: 'right',
    paddingRight: '5px',
    fontSize: '12px',
    color: Colors.darkGrey,
  },
  bidStatusText: {
    textAlign: 'center',
    fontSize: '11px',
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.uniswapMediumGrey
      : Colors.slateGreyDarkest,
  },
  buttonsPlaceholder: {
    minWidth: 110,
  },
})


export default withStyles(styles)(NormalBid)