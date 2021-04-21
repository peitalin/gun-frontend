import React from 'react';
// components
import dynamic from "next/dynamic";


import SendBidInput from './SendBidInput'
import ConversationsListPanel from './ConversationsListPanel';
import ProductPanel from './ProductPanel';
// typings
import { UserPrivate, Conversation, SoldOutStatus } from "typings/gqlTypes";
// Styles
import { Colors, BoxShadows, BorderRadius2x, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// graphql
import { useSubscription } from '@apollo/client';
import gql from 'graphql-tag'
import { SUBSCRIBE_USER_CONVERSATIONS } from "queries/chat-subscriptions";
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { GrandReduxState, Actions } from 'reduxStore/grand-reducer';
import BidList from "./BidList";




export const BiddingRoomLayout: React.FC<ReactProps> = (props) => {

  const {
    classes,
    user,
  } = props;

  const dispatch = useDispatch()
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const { data, loading, error } = useSubscription<QueryData, QueryVar>(
    SUBSCRIBE_USER_CONVERSATIONS, {
      variables: {
        messageLimit: 5
      }
    }
  );

  console.log("subscription data: ", data)


  let productIds = data?.myConversations?.map(c => c?.chatRoom?.product?.id)


  return (
    <main className={classes.rootLayout}>
      <div className={classes.productList}>
        {
          productIds &&
          productIds.map(pid => {

            // all bidding convos about this product
            // pick just the first one for product info
            let allConvos = data?.myConversations.filter(c => c.chatRoom.product?.id === pid)
            let convo = allConvos?.[0]

            return (
              <div className={classes.flexRow}>
                <ProductPanel
                  currentConversation={convo}
                />
                {
                  allConvos.map(convo2 =>
                    <>
                      <BidList
                        userId={convo2?.userId}
                        messages={convo2?.chatRoom?.messages}
                      />
                      <SendBidInput
                        userId={convo?.userId}
                        chatRoomId={convo?.chatRoom?.id}
                        product={convo?.chatRoom?.product}
                      />
                    </>
                  )
                }
              </div>
            )
          })
        }
      </div>
    </main>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
  refetch?(a?: any): void;
  setRefetch?(a?: any): void;
}

interface QueryData {
  myConversations: Conversation[]
}
interface QueryVar {
  // query: ConnectionQuery
  messageLimit: number
}

const styles = (theme: Theme) => createStyles({
  rootLayout: {
    display: 'flex',
    width: '100%',
    flexDirection: "column",
    borderRadius: BorderRadius,
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    flexBasis: '100%',
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    marginBottom: '1rem',
    borderRadius: BorderRadius,
  },
  productList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  }
})


export default withStyles(styles)( BiddingRoomLayout );