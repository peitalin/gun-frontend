import React from 'react';
// Styles
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BoxShadows, BorderRadius2x, BorderRadius } from "layout/AppTheme";
// typings
import { UserPrivate, ChatRoomStatus, Conversation, SoldOutStatus, ChatRoom } from "typings/gqlTypes";
// css
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// graphql
import { useSubscription, useApolloClient } from '@apollo/client';
import gql from 'graphql-tag'
import { SUBSCRIBE_USER_CONVERSATIONS } from "queries/chat-subscriptions";
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { GrandReduxState, Actions } from 'reduxStore/grand-reducer';
// Components
import BidList from "./BidList";
import SendBidInput from './SendBidInput'
import ProductPanel from './ProductPanel';
import LoadingBar from "components/LoadingBar";
import Typography from "@mui/material/Typography";
import EmptyBidsMessage from "./EmptyBidsMessage";




export const BiddingRoomLayout: React.FC<ReactProps> = (props) => {

  const {
    classes,
    chatRoomStatuses,
    user: userRedux,
  } = props;

  // const aClient = useApolloClient();
  const theme = useTheme();
  // const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const { data, loading, error } = useSubscription<QueryData, QueryVar>(
    SUBSCRIBE_USER_CONVERSATIONS, {
      variables: {
        chatRoomStatuses: chatRoomStatuses,
        messageLimit: userRedux?.id ? 20 : 5,
        // login-logOut updates userRedux which prompots resubscribes
      },
      shouldResubscribe: true,
      onSubscriptionData: ({ client, subscriptionData: { data }}) => {
        console.log('bidding subscriptionData:', data)
      },
      onSubscriptionComplete: () => {
        console.log('bidding subscriptions complete.')
      },
    },
  );
  // login-logOut updates userRedux which prompots resubscribes


  let productIds = [
    ...new Set(data?.myConversations?.map(c => c?.chatRoom?.product?.id))
  ]


  return (
    <main className={classes.biddingRoomInnerLayout}>

      <LoadingBar
        absoluteTop
        color={Colors.ultramarineBlue}
        height={4}
        width={'100vw'}
        loading={loading}
        style={{ top: "-4px" }}
      />

      <Typography variant="h2" className={classes.title}>
        Bids
      </Typography>

      {
        (productIds.length === 0 && !loading)
        ? <EmptyBidsMessage/>
        : <>
            <div className={classes.productList}>
              {
                productIds.map(( pid, i ) => {

                  // all bidding convos about this product
                  // pick just the first one for product info
                  // let convo = data?.myConversations?.find(c => {
                  //   c?.chatRoom?.product?.id === pid
                  // })

                  let allConvos = (data?.myConversations ?? [])
                    .filter(c => c?.chatRoom?.product?.id === pid)

                  let convo1 = allConvos?.[0];
                  let sellerId = convo1?.chatRoom?.product?.store?.user?.id
                  let iOwnThisProduct = sellerId === userRedux.id

                  // let chatRoomStatus = convo1.chatRoomStatus
                  // console.log("CHATROOM STATUS: ", chatRoomStatus)

                  return (
                      <div className={classes.flexItem} key={pid}>
                        <ProductPanel
                          currentConversation={convo1}
                          iOwnThisProduct={iOwnThisProduct}
                          user={userRedux}
                        />
                        {
                          allConvos.map(( convo, j ) =>
                            <BidList
                              key={`${convo.chatRoomId}-${j}`}
                              userId={convo?.userId}
                              iOwnThisProduct={iOwnThisProduct}
                              sellerId={sellerId}
                              messages={convo?.chatRoom?.messages}
                              product={convo?.chatRoom?.product}
                            />
                          )
                        }
                      </div>
                  )
                })
              }
            </div>
          </>
      }
    </main>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
  chatRoomStatuses: ChatRoomStatus[]
}

interface QueryData {
  myConversations: Conversation[]
}
interface QueryVar {
  // query: ConnectionQuery
  messageLimit: number
  chatRoomStatuses: ChatRoomStatus[]
}

const styles = (theme: Theme) => createStyles({
  biddingRoomInnerLayout: {
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
    maxWidth: 600,
  },
  title: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  subtitle: {
    marginBottom: '1rem',
  },
  flexItem: {
    display: "flex",
    flexDirection: "row",
    flexBasis: '100%',
    flexGrow: 1,
    flexWrap: "wrap",
    width: '100%',
    backgroundColor: theme.palette.mode === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: theme.palette.mode === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDarker}`,
    boxShadow: theme.palette.mode === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    marginBottom: '1rem',
    borderRadius: BorderRadius,
  },
})


export default withStyles(styles)( BiddingRoomLayout );