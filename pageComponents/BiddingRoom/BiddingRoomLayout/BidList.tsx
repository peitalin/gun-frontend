import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Message, Bid, Product } from "typings/gqlTypes";
// Styles
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";

import BidItem from "./BidItem";




export const BidList: React.FC<ReactProps> = (props) => {

  const {
    classes,
    product,
    userId,
  } = props;

  return (
    <div className={classes.bidListRoot}>
      {
        (props.messages ?? []).map((message, i) => {
          const isMe = message?.sender?.id === userId
          return (
            <BidItem key={message?.id}
              isMe={isMe}
              iOwnThisProduct={props.iOwnThisProduct}
              message={message}
              product={props.product}
            />
          );
        })
      }
    </div>
  );
};




interface ReactProps extends WithStyles<typeof styles> {
  userId: string;
  iOwnThisProduct: boolean;
  messages: Message[];
  product: Product;
}

const styles = (theme: Theme) => createStyles({
  bidListRoot: {
    flexBasis: '100%',
  },
})


export default withStyles(styles)( BidList );