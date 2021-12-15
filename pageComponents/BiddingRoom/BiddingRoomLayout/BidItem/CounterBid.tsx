import React from 'react';
// Styles
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Message, BidStatus, Product } from "typings/gqlTypes";
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
import { useMediaQuery, useTheme } from "@mui/material";
import { formatNiceDate } from "utils/dates";
import { asCurrency as c } from "utils/prices";

import DoneIcon from '@mui/icons-material/Done';
import CallMissedIcon from '@mui/icons-material/CallMissed';
import BidActionsByUser from "./BidActionsByUser";



const CounterBid = (props: BidProps) => {

  const {
    classes,
    bidDisabled,
    bidAccepted,
    isMe,
    iOwnThisProduct,
    precedingBidMessage,
    message: m,
  } = props;

  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <div className={clsx(
      classes.messageRoot,
      (precedingBidMessage?.sender?.id === m.sender?.id) && classes.counterBidMarginTop,
      // extra top margin if successive counter bids
      mdDown && classes.messageRootMobile,
      isMe ? classes.isMeBorder : classes.isNotMeBorder,
      bidDisabled && classes.disabledMsg,
      bidAccepted && classes.acceptedMsg,
    )}>

      <div className={clsx(
        mdDown ? classes.flexColMobile : classes.flexCol,
        mdDown && classes.marginMobile,
        mdDown && classes.mobileIcon,
      )}>
      {
        bidAccepted
        ? <DoneIcon className={classes.iconDone} />
        : <CallMissedIcon
            className={clsx(
              classes.icon1,
              bidDisabled && classes.disabledIcon,
            )}
          />
      }
      </div>

      <div className={clsx(
        classes.columnUser,
        mdDown ? classes.flexColMobile : classes.flexCol,
        mdDown && classes.marginMobile,
        bidDisabled && classes.disabledCol,
      )}>
        <div className={classes.userAndTime}>
          {
            bidAccepted
            ? props.isMe
              ? "Your bid was accepted"
              : "You accepted seller's bid"
            : props.isMe
                ? "You made a counter bid"
                : "Seller's counter bid"
          }
        </div>
        <div className={classes.messageTime}>
          {formatNiceDate(m.createdAt)}
        </div>
      </div>

      <div className={clsx(
        classes.columnBid,
        mdDown ? classes.flexColMobile : classes.flexCol,
        mdDown && classes.marginMobile,
        bidDisabled && classes.disabledCol,
      )}>
        <div>
          {`${c(m?.bid?.offerPrice)}`}
        </div>
        <div className={classes.bidStatusText}>
          {
            m?.bid?.bidStatus === BidStatus.SPENT
              ? "PURCHASED"
              : `${m?.bid?.bidStatus}`
          }
        </div>
      </div>

      <div className={clsx(
        classes.columnBidActions,
        mdDown ? classes.flexColMobile : classes.flexColFlexEnd,
        mdDown && classes.marginMobile,
      )}>
        {
          (props.bidDisabled)
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
              noActiveBids={props.noActiveBids}
            />
        }
      </div>

    </div>
    )
}


interface BidProps extends WithStyles<typeof styles> {
  message: Message;
  isMe: boolean;
  iOwnThisProduct: boolean;
  bidDisabled: boolean;
  bidAccepted: boolean;
  product: Product;
  updateBidMessage({
    variables: {
      bidId: string,
      bidStatus: BidStatus,
    }
  });
  noActiveBids: boolean
  precedingBidMessage: Message;
}


const opacity = 0.6

const styles = (theme: Theme) => createStyles({
  messageRoot: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: '0.5rem',
    transform: "translate(1rem, -1rem)",
    marginBottom: '-1rem', // offset transform
    padding: '0.5rem',
    width: 'calc(100% - 2.5rem)',
    maxWidth: 540,
    background: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    borderRadius: BorderRadius,
    boxShadow: isThemeDark(theme)
      ? BoxShadows.shadowWhite.boxShadow
      : BoxShadows.shadow5.boxShadow,
  },
  messageRootMobile: {
    flexDirection: "column",
  },
  isMeBorder: {
    border: `1px solid ${Colors.purple}`,
  },
  isNotMeBorder: {
    // border: `1px solid ${Colors.gradientUniswapFluro1}`,
    border: `1px solid ${Colors.ultramarineBlueLight}`,
  },
  disabledMsg: {
    border: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGreyDarkest}`,
    boxShadow: 'unset',
  },
  disabledCol: {
    opacity: opacity,
  },
  disabledIcon: {
    opacity: opacity,
  },
  acceptedMsg: {
    // "& > div": {
    //   opacity: '0.5',
    // },
    border: isThemeDark(theme)
      ? `1px solid ${Colors.green}`
      : `1px solid ${Colors.green}`,
    // marginTop: "1rem",
    marginBottom: "1.5rem",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  flexColFlexEnd: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  flexColMobile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    minWidth: 110,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    justifyContent: "flex-end",
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
  iconDone: {
    marginLeft: '0.25rem',
    marginRight: '0.75rem',
    fill: Colors.green,
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
  buttonsPlaceholder: {
    minWidth: 110,
  },
  marginMobile: {
    marginTop: '0.1rem',
    marginBottom: '0.1rem',
  },
  counterBidMarginTop: {
    marginTop: "1.5rem",
  },
  mobileIcon: {
    position: 'absolute',
    top: 'calc(50% - 0.5rem)',
    left: '1rem',
  },
})


export default withStyles(styles)(CounterBid)