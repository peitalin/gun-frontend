import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// GraphQL
import { Product, Conversation } from "typings/gqlTypes";
// redux
import { useDispatch } from "react-redux";
import { Actions } from "reduxStore/actions";
// gql
import { SUBSCRIBE_USER_CONVERSATIONS } from "queries/chat-subscriptions";
import { useSubscription } from '@apollo/client';

import CreateBidFormButton from "pageComponents/BiddingRoom/CreateBidFormButton";
import OpenChatButton from "pageComponents/BiddingRoom/OpenChatButton";



const CreateOfferSubscription = (props: ReactProps) => {

  const {
    classes,
    userId,
  } = props;

  const dispatch = useDispatch();

  const { data, loading, error } = useSubscription<QueryData, QueryVar>(
    SUBSCRIBE_USER_CONVERSATIONS, {
      variables: { }
    }
  );

  // React.useEffect(() => {
  //   // set initial conversation on mount + data response
  //   if ((data?.myConversations ?? []).length > 0) {
  //     dispatch(Actions.reduxConversation.SET_CONVERSATIONS(data.myConversations))
  //   }
  // }, [data, loading])

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
            title={loading ? "Loading" : "Suggest a price"}
            sellerUserId={
              // if storeId, backend won't looks up the user.id for the store
              // make sure its the store's user.id
              props?.product?.store?.userId
            }
            disabled={buyerIsSeller || loading}
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
}
interface QueryData {
  myConversations: Conversation[]
}
interface QueryVar {
  // query: ConnectionQuery
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

export default withStyles(styles)( CreateOfferSubscription );
