import gql from "graphql-tag";
import { ChatRoomFragment } from "./chat-subscriptions";
import { BidFragment, MessageFragment } from "./fragments";



export const SEND_BID_MESSAGE = gql`
  mutation sendBidMessage(
    $chatRoomId: String!
    $content: String!
    $productId: String!
    $productSnapshotId: String!
    $variantId: String!
    $offerPrice: Int!
    $bidStatus: String!
  ) {
    sendBidMessage(
      chatRoomId: $chatRoomId,
      content: $content,
      productId: $productId,
      productSnapshotId: $productSnapshotId,
      variantId: $variantId,
      offerPrice: $offerPrice,
      bidStatus: $bidStatus
    ) {
      ...MessageFragment
    }
  }
  ${MessageFragment}
`;


export const UPDATE_BID_MESSAGE = gql`
  mutation updateBid(
    $bidId: String!
    $bidStatus: String!
  ) {
    updateBid(
      bidId: $bidId
      bidStatus: $bidStatus
    ) {
      ...BidFragment
    }
  }
  ${BidFragment}
`;


export const UPDATE_CHAT_STATUS = gql`
  mutation(
    $chatRoomId: String!
    $chatStatus: String!
  ) {
    updateChatStatus(
      chatRoomId: $chatRoomId
      chatStatus: $chatStatus
    ) {
      ...ChatRoomFragment
    }
  }
  ${ChatRoomFragment}
`

export const CREATE_NEW_CHAT = gql`
  # create chat room between buyer and seller
  mutation createNewChat(
    $productId: String!
    $name: String
  ) {
    createNewChat(
      productId: $productId,
      name: $name,
    ) {
      ...ChatRoomFragment
    }
  }
  ${ChatRoomFragment}
`;

export const EMIT_ONLINE_EVENT = gql`
  mutation ($senderId:String!){
    update_users (
      _set: { lastSeen: "now()" }
      where: { id: { _eq: $senderId } }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`;