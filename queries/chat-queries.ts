import gql from "graphql-tag";
import { ChatRoomFragment } from "./chat-subscriptions";


export const GET_USER_BIDS_FOR_PRODUCT = gql`
  query getUserBidsForProduct($productId: String!) {
    getUserBidsForProduct(productId: $productId) {
      name
      createdAt
      participants {
        userId
      }
      productId
      messages {
        bid {
          id
          offerPrice
          bidStatus
          productId
          orderId
          acceptedPrice
          createdAt
        }
      }
      buyerChatStatus
      sellerChatStatus
    }
  }
`;
