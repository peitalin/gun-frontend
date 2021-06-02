import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Message, Bid, Product, BidStatus } from "typings/gqlTypes";
// Styles
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";

import BidItem from "./BidItem";




export const BidList: React.FC<ReactProps> = (props) => {

  const {
    classes,
    userId,
    sellerId,
  } = props;

  const noActiveBids = !props.messages.some(m =>
    m.bid.bidStatus === BidStatus.ACTIVE ||
    m.bid.bidStatus === BidStatus.ACCEPTED
  )
  const numBids = props.messages.length
  const otherUserId = props.messages?.[0]?.senderId

  console.log(`noActiveBids in bidder ${otherUserId}'s ${numBids} bids:`, noActiveBids)
  // console.log("messages", props.messages)

  return (
    <div className={classes.bidListRoot}>
      {
        (props.messages ?? [])
        .filter(message => !!message?.bid?.id)
        // .filter(( message, i ) => {
        //   if (i === 0) {
        //     // allow first bid no matter what bid status
        //     return true
        //   }
        //   return message.bid.bidStatus === BidStatus.ACTIVE
        //       || message.bid.bidStatus === BidStatus.ACCEPTED
        //       || message.bid.bidStatus === BidStatus.DECLINED
        // })
        .map((message, i) => {
          const isMe = message?.sender?.id === userId
          return (
            <BidItem key={message?.id}
              isMe={isMe}
              iOwnThisProduct={props.iOwnThisProduct}
              message={message}
              product={props.product}
              noActiveBids={noActiveBids}
              precedingBidMessage={props.messages?.[i-1]}
            />
          );
        })
      }
    </div>
  );
};




interface ReactProps extends WithStyles<typeof styles> {
  userId: string;
  sellerId: string;
  iOwnThisProduct: boolean;
  messages: Message[];
  product: Product;
}

const styles = (theme: Theme) => createStyles({
  bidListRoot: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    marginLeft: '1rem',
    flexBasis: '100%',
  },
})


export default withStyles(styles)( BidList );