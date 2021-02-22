import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// GraphQL
import { Product, Chat_Users } from "typings/gqlTypes";
// redux
import { useDispatch } from "react-redux";
import { Actions } from "reduxStore/actions";
// gql
import { SUBSCRIBE_USER_CONVERSATIONS } from "queries/chat-subscriptions";
import { useSubscription } from '@apollo/client';

import CreateChatButton from "pageComponents/ChatCenter/CreateChatButton";
import OpenChatButton from "pageComponents/ChatCenter/OpenChatButton";



const CreateOfferSubscription = (props: ReactProps) => {

  const {
    classes,
    userId,
  } = props;

  const dispatch = useDispatch();

  const { data, loading, error } = useSubscription<QueryData, QueryVar>(
    SUBSCRIBE_USER_CONVERSATIONS, {
      variables: {
        userId: userId
      }
    }
  );

  React.useEffect(() => {
    // set initial conversation on mount + data response
    if ((data?.conversations ?? []).length > 0) {
      dispatch(Actions.reduxConversation.SET_CONVERSATIONS(data.conversations))
    }
  }, [data, loading])

  const existingChatsProductIds = (data?.conversations ?? []).map(c => {
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

  return (
    <div className={classes.createOfferRoot}>

      {
        (userId && !alreadyChattingAboutProduct) &&
        <CreateChatButton
          title={"Make a bid"}
          buyerUserId={userId}
          sellerUserId={
            // if storeId, backend won't looks up the user.id for the store
            // make sure its the store's user.id
            props?.product?.store?.userId
          }
          disabled={buyerIsSeller}
          productId={props?.product?.id}
          openChatAfterwards={true}
        />
      }

      {
        (
          userId &&
          alreadyChattingAboutProduct?.productId &&
          alreadyChattingAboutProduct?.chatRoomId &&
          !buyerIsSeller
        ) &&
        <OpenChatButton
          title={"Continue Offer"}
          productId={alreadyChattingAboutProduct.productId}
          chatRoomId={alreadyChattingAboutProduct.chatRoomId}
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
  conversations: Chat_Users[]
}
interface QueryVar {
  // query: ConnectionOffsetQuery
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
