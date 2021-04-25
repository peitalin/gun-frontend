import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Message, Bid, BidStatus, Product } from "typings/gqlTypes";
// Styles
import { Colors, BorderRadius } from "layout/AppTheme";
// gql
import { useMutation } from "@apollo/client";
import { UPDATE_BID_MESSAGE } from "queries/chat-mutations";

import CounterBid from "./CounterBid";
import NormalBid from "./NormalBid";





const BidItem = (props: BidProps) => {

  const {
    isMe,
    iOwnThisProduct,
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

  const [updateBidMessage, updateBidMessageResponse] = useMutation<MutData, MutVars>(
    UPDATE_BID_MESSAGE, {
      variables: {
        bidId: undefined,
        bidStatus: undefined,
      },
      onCompleted: (data) => {
        console.log(data)
      },
    }
  )


  let bidDisabled = isBidDisabled(message.bid)

  if (
    iOwnThisProduct && isMe // you are the seller of the product
    || (!iOwnThisProduct && !isMe)
  ) {
    return (
      <CounterBid
        isMe={isMe}
        message={message}
        bidDisabled={bidDisabled}
        product={props.product}
        updateBidMessage={updateBidMessage}
      />
    )
  } else {
    return (
      <NormalBid
        isMe={isMe}
        message={message}
        bidDisabled={bidDisabled}
        product={props.product}
        updateBidMessage={updateBidMessage}
      />
    )
  }
}


interface BidProps extends WithStyles<typeof styles> {
  isMe: boolean;
  iOwnThisProduct: boolean;
  message: Message;
  product: Product;
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