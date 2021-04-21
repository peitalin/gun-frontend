import React from 'react';
// Styles
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Message, Bid, BidStatus } from "typings/gqlTypes";
// Styles
import { Colors, BoxShadows, BorderRadius2x, BorderRadius3x, BorderRadius } from "layout/AppTheme";

import { formatDate } from "utils/dates";
import ButtonLoading from "components/ButtonLoading";
import { useMutation, useApolloClient } from "@apollo/client";
import { UPDATE_BID_MESSAGE } from "queries/chat-mutations";

import BidItem from "./BidItem";




export const BidList: React.FC<ReactProps> = (props) => {

  const {
    classes,
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
              message={message}
            />
          );
        })
      }
    </div>
  );
};




interface ReactProps extends WithStyles<typeof styles> {
  userId: string;
  messages: Message[];
}

const styles = (theme: Theme) => createStyles({
  bidListRoot: {
    flexBasis: '50%',
  },
})


export default withStyles(styles)( BidList );