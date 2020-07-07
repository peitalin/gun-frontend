import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// GraphQL
import { Product, UserPrivate, Chat_Users } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
// Material UI
import Typography from "@material-ui/core/Typography";
import SellerProfile from "pageComponents/P/ProductDetails/SellerProfile";
import { SelectedVariantProps } from "../ProductId";
// redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
// gql
import { SUBSCRIBE_USER_CONVERSATIONS } from "queries/chat-subscriptions";
import { useSubscription } from '@apollo/client';

// import ProductDescription from "./ProductDescription";
import dynamic from "next/dynamic";
const ProductDescription = dynamic(
  () => import("pageComponents/P/ProductDetails/ProductDescription"), {
    loading: () => <Loading inline/>,
    ssr: false,
  }
)
import CreateChatButton from "pageComponents/ChatCenter/CreateChatButton";
import OpenChatButton from "pageComponents/ChatCenter/OpenChatButton";



const ProductDetails = (props: ReactProps) => {

  const {
    classes,
    selectedOption,
  } = props;

  const productVariant = selectedOption.value
  const dispatch = useDispatch();
  const user = useSelector<GrandReduxState, UserPrivate>(s =>
    s.reduxLogin.user
  )


  const { data, loading, error } = useSubscription<QueryData, QueryVar>(
    SUBSCRIBE_USER_CONVERSATIONS, {
      variables: {
        userId: option(user).id()
      }
    }
  );

  React.useEffect(() => {
    // set initial conversation on mount + data response
    if (option(data).conversations([]).length > 0) {
      dispatch(Actions.reduxConversation.SET_CONVERSATIONS(data.conversations))
    }
  }, [data, loading])

  const existingChatsProductIds = option(data).conversations([]).map(c => {
    return {
      chatRoomId: option(c).chatRoom.id(),
      productId: option(c).chatRoom.product.id()
    }
  })
  const alreadyChattingAboutProduct = existingChatsProductIds.find(
    z => z.productId === option(props).product.id()
  )
  // console.log("existing productIds", existingChatsProductIds)
  // console.log("alreadyChatting about product?", alreadyChattingAboutProduct)


  return (
    <div className={classes.productDetailsContainer}>
      {
        option(props).product.store() &&
        <SellerProfile store={props.product.store}/>
      }
      {
        option(props).product.description() &&
        <ProductDescription
          product={props.product}
        />
      }
      {
        (option(user).id() && !alreadyChattingAboutProduct) &&
        <CreateChatButton
          title={"Message Seller"}
          buyerUserId={user.id}
          sellerUserId={
            // temporary
            option(props).product.store.id() ||
            "user_82cc9d34-6119-4748-8ea2-ff440f1b85af"
          }
          productId={option(props).product.id()}
          openChatAfterwards={true}
        />
      }
      {
        (
          option(user).id() &&
          alreadyChattingAboutProduct &&
          alreadyChattingAboutProduct.productId &&
          alreadyChattingAboutProduct.chatRoomId
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
  selectedOption: SelectedVariantProps;
  product: Product;
}
interface QueryData {
  conversations: Chat_Users[]
}
interface QueryVar {
  // query: ConnectionOffsetQuery
}

const styles = (theme: Theme) => createStyles({
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

export default withStyles(styles)( ProductDetails );
