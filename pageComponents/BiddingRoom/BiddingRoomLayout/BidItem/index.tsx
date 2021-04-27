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
    return b?.bidStatus === BidStatus.WITHDRAWN
        || b?.bidStatus === BidStatus.DECLINED
        || b?.bidStatus === BidStatus.EXPIRED
        || b?.bidStatus === BidStatus.SPENT
  }

  const isBidAccepted = (b: Bid) => {
    return b?.bidStatus === BidStatus.ACCEPTED
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
  let bidAccepted = isBidAccepted(message.bid)

  if (
    iOwnThisProduct && isMe // you are the seller of the product
    || (!iOwnThisProduct && !isMe)
  ) {
    return (
      <CounterBid
        isMe={isMe}
        iOwnThisProduct={iOwnThisProduct}
        message={message}
        bidDisabled={bidDisabled}
        bidAccepted={bidAccepted}
        product={props.product}
        updateBidMessage={updateBidMessage}
        precedingBidMessage={props.precedingBidMessage}
        // if preceding bid is also a seller's counter bid, make bigger margins
      />
    )
  } else {
    return (
      <NormalBid
        isMe={isMe}
        iOwnThisProduct={iOwnThisProduct}
        message={message}
        bidDisabled={bidDisabled}
        bidAccepted={bidAccepted}
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
  precedingBidMessage: Message;
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