import React from 'react';
// components
import dynamic from "next/dynamic";

import SendBidInput from './SendBidInput'
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
    user: userRedux,
  } = props;

  const dispatch = useDispatch()
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const { data, loading, error } = useSubscription<QueryData, QueryVar>(
    SUBSCRIBE_USER_CONVERSATIONS, {
      variables: {
        messageLimit: 10
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
            // let convo = data?.myConversations?.find(c => {
            //   c?.chatRoom?.product?.id === pid
            // })

            let allConvos = (data?.myConversations ?? [])
              .filter(c => c?.chatRoom?.product?.id === pid)

            let convo = allConvos?.[0]
            let sellerId = convo?.chatRoom?.product?.store?.user?.id
            let iOwnThisProduct = sellerId === userRedux.id

            return (
                <div className={classes.flexItem}>
                  <ProductPanel
                    currentChatRoom={convo?.chatRoom}
                    iOwnThisProduct={iOwnThisProduct}
                    user={userRedux}
                  />
                  {
                    allConvos.map(convo2 => {
                      return (
                        <BidList
                          key={convo2.chatRoomId}
                          userId={convo2?.userId}
                          iOwnThisProduct={iOwnThisProduct}
                          sellerId={sellerId}
                          messages={convo2?.chatRoom?.messages}
                          product={convo2?.chatRoom?.product}
                        />
                      )
                    })
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
  productList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  flexItem: {
    display: "flex",
    flexDirection: "row",
    flexBasis: '100%',
    flexGrow: 1,
    flexWrap: "wrap",
    width: '100%',
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: theme.palette.type === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDarker}`,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    marginBottom: '1rem',
    borderRadius: BorderRadius,
  },
})


export default withStyles(styles)( BiddingRoomLayout );