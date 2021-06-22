import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// GraphQL
import { Product, Conversation, ChatRoomStatus } from "typings/gqlTypes";
// redux
import { useDispatch } from "react-redux";
import { Actions } from "reduxStore/actions";
// gql
import { SUBSCRIBE_USER_CONVERSATIONS } from "queries/chat-subscriptions";
import { useSubscription } from '@apollo/client';

import CreateBidFormButton from "pageComponents/BiddingRoom/CreateBidFormButton";
import OpenChatButton from "pageComponents/BiddingRoom/OpenChatButton";



const CreatePriceSuggestion = (props: ReactProps) => {

  const {
    classes,
    userId,
    chatRoomStatuses = [ ChatRoomStatus.ACTIVE, ChatRoomStatus.ARCHIVED ]
  } = props;

  const dispatch = useDispatch();

  const { data, loading, error } = useSubscription<QueryData, QueryVar>(
    SUBSCRIBE_USER_CONVERSATIONS, {
      variables: {
        chatRoomStatuses: chatRoomStatuses,
        messageLimit: 20,
        // login-logOut updates userRedux which prompots resubscribes
      },
    }
  );


  const existingChatsProductIds = (data?.myConversations ?? []).map(c => {
    return {
      chatRoomId: c?.chatRoom?.id,
      productId: c?.chatRoom?.product?.id
    }
  })

  const alreadyChattingAboutProduct = existingChatsProductIds.find(
    z => z.productId === props?.product?.id
  )

  // console.log("existing productIds", existingChatsProductIds)
  // console.log("alreadyChatting about product?", alreadyChattingAboutProduct)

  let buyerIsSeller = props?.product?.store?.userId === userId

  // console.log("buyerIsSeller", buyerIsSeller)
  // console.log("userId", userId)
  // console.log("userId2", props.product?.store?.userId)

  return (
    <div className={classes.createOfferRoot}>
      {
        (userId && !buyerIsSeller) &&
        alreadyChattingAboutProduct
        ? <OpenChatButton
            title={"View Offers"}
            productId={alreadyChattingAboutProduct?.productId}
            chatRoomId={alreadyChattingAboutProduct?.chatRoomId}
          />
        : <CreateBidFormButton
            title={
              !userId
              ? "Log in to Suggest a Price"
              : loading
                ? "Loading"
                : "Suggest a Price"
            }
            sellerUserId={
              // if storeId, backend won't looks up the user.id for the store
              // make sure its the store's user.id
              props?.product?.store?.userId
            }
            disabled={
              buyerIsSeller
              || loading
              || !props.userId
            }
            // disabled={true}
            product={props?.product}
            openChatAfterwards={true}
          />
      }
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  userId: string;
  product: Product;
  chatRoomStatuses?: ChatRoomStatus[]
}
interface QueryData {
  myConversations: Conversation[]
}
interface QueryVar {
  // query: ConnectionQuery
  chatRoomStatuses: ChatRoomStatus[]
  messageLimit?: number;
}

const styles = (theme: Theme) => createStyles({
  createOfferRoot: {
  },
  productDetailsContainer: {
    height: "100%",
    position: "relative",
    wordWrap: 'break-word',
    marginBottom: '4rem',
  },
  title: {
    marginTop: '1.5rem',
    marginBottom: '1rem',
    fontWeight: 500,
  },
  productDescription: {
    maxHeight: "33vh",
    overflowY: 'hidden',
  },
});

export default withStyles(styles)( CreatePriceSuggestion );
