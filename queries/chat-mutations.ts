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
    $messageLimit: Int # used for ChatRoom fragment on backend
  ) {
    updateChatStatus(
      chatRoomId: $chatRoomId
      chatStatus: $chatStatus
      messageLimit: $messageLimit
    ) {
      ...ChatRoomFragment
    }
  }
  ${ChatRoomFragment}
`

export const CREATE_INITIAL_BID = gql`
  # create chat room between buyer and seller and initial bid
  mutation createInitialBid(
    # chatRoom
    $productId: String!
    $name: String
    $messageLimit: Int # used for ChatRoom fragment on backend
    # bid
    $productSnapshotId: String!
    $variantId: String!
    $offerPrice: Int!
  ) {
    createInitialBid(
      productId: $productId,
      name: $name,
      messageLimit: $messageLimit
      productSnapshotId: $productSnapshotId
      variantId: $variantId
      offerPrice: $offerPrice
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