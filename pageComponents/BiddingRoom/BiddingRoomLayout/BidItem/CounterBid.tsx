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
  BorderRadius3x,
  BorderRadius,
  isThemeDark,
  Gradients,
} from "layout/AppTheme";
// format
import { useTheme } from "@material-ui/core";
import { formatNiceDate } from "utils/dates";
import { asCurrency as c } from "utils/prices";

import CallMissedIcon from '@material-ui/icons/CallMissed';
import BidActionsByUser from "./BidActionsByUser";



const CounterBid = (props: BidProps) => {

  const {
    classes,
    bidDisabled,
    isMe,
    message: m,
  } = props;

  const theme = useTheme()


  return (
    <div className={clsx(
      classes.messageRoot,
      bidDisabled && classes.disabled
    )}>

      <CallMissedIcon
        className={classes.icon1}
      />

      <div className={clsx(classes.flexCol, classes.columnUser)}>
        <div className={classes.userAndTime}>
          {
            props.isMe
              ? "You made a counter offer"
              : "Seller's counter offer"
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

      <BidActionsByUser
        isMe={isMe}
        bidId={m?.bid?.id}
        bidDisabled={bidDisabled}
        chatRoomId={m?.chatRoomId}
        product={props.product}
        updateBidMessage={props.updateBidMessage}
      />

    </div>
    )
}


interface BidProps extends WithStyles<typeof styles> {
  message: Message;
  isMe: boolean;
  bidDisabled: boolean;
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
    transform: "translate(1rem, -1.5rem)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: '1rem',
    padding: '0.5rem',
    width: 'calc(100% - 4rem)',
    background: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Gradients.gradientGrey.background,
    border: isThemeDark(theme)
      ? `1px solid ${Colors.purple}`
      : `1px solid ${Colors.blue}`,
    borderRadius: BorderRadius,
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadowWhite.boxShadow
      : BoxShadows.shadow4.boxShadow,
  },
  disabled: {
    // opacity: '0.8',
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGreyDarkest}`,
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
    flexBasis: '15%', // align with TheirBid prices
    alignItems: "center",
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
  },
  columnBidActions: {
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
    // transform: 'scaleX(-1)',
    fill: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack
  },
  messageTime: {
    textAlign: 'right',
    paddingRight: '4px',
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


export default withStyles(styles)(CounterBid)