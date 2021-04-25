import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Message, Bid, BidStatus } from "typings/gqlTypes";
// Styles
import { Colors, BorderRadius } from "layout/AppTheme";

import CounterBid from "./CounterBid";
import TheirBid from "./TheirBid";





const BidItem = (props: BidProps) => {

  const {
    isMe,
    message
  } = props;

  const isBidDisabled = (b: Bid) => {
    if (b?.bidStatus !== undefined) {
      return b.bidStatus === BidStatus.WITHDRAWN
          || b.bidStatus === BidStatus.DECLINED
          || b.bidStatus === BidStatus.ACCEPTED
    } else {
      return true
    }
  }

  let bidDisabled = isBidDisabled(message.bid)

  if (isMe) {
    return (
      <CounterBid
        message={message}
        bidDisabled={bidDisabled}
      />
    )
  } else {
    return (
      <TheirBid
        message={message}
        bidDisabled={bidDisabled}
      />
    )
  }
}


interface BidProps extends WithStyles<typeof styles> {
  isMe?: boolean;
  message: Message;
}

interface MutData {
  updateBid: Bid[]
}
interface MutVars {
  bidId: string
  bidStatus: string
}

const styles = (theme: Theme) => createStyles({
})


export default withStyles(styles)(BidItem)