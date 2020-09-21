import gql from "graphql-tag";
import { ChatRoomFragment } from "./chat-subscriptions";


export const INSERT_MESSAGE = gql`
  mutation sendChatMessage(
    $msgId: String!
    $chatRoomId: String!
    $senderId: String!
    $content: String!
    $previewItemId: String
  ) {
    insert_chat_messages(objects: [{
      id: $msgId,
      chatRoomId: $chatRoomId,
      content: $content,
      senderId: $senderId,
      previewItemId: $previewItemId
    }]) {
      affected_rows
      returning {
        id
        sender {
          id
          firstName
          lastName
          email
        }
        content
      }
    }
  }
`;

export const INSERT_BID_MESSAGE = gql`
  mutation sendBidMessage(
    $msgId: String!
    $chatRoomId: String!
    $senderId: String!
    $content: String!
    $bidId: String!
    $productId: String!
    $productSnapshotId: String!
    $variantId: String!
    $variantSnapshotId: String!
    $offerPrice: Int!
    $bidStatus: String!
  ) {
    insert_chat_messages(objects: [{
      id: $msgId,
      chatRoomId: $chatRoomId,
      content: $content,
      senderId: $senderId,
      bidId: $bidId,
      bids: {data: [
        {
          id: $bidId,
          productId: $productId,
          productSnapshotId: $productSnapshotId,
          variantId: $variantId,
          variantSnapshotId: $variantSnapshotId,
          offerPrice: $offerPrice,
          bidStatus: $bidStatus
        }
      ]}
    }]) {
      affected_rows
      # ...ChatMessageFragment
    }
    # insert_bids(objects: [{
    #   id: $bidId,
    #   productId: $productId,
    #   productSnapshotId: $productSnapshotId,
    #   variantId: $variantId,
    #   variantSnapshotId: $variantSnapshotId,
    #   offerPrice: $offerPrice,
    #   bidStatus: $bidStatus
    # }]) {
    #   affected_rows
    # }
  }
`;


export const UPDATE_BID_MESSAGE = gql`
  mutation updateBids(
    $bidId: String!
    $bidStatus: String!
  ) {
    update_bids(
      where: {id: {_eq: $bidId}},
      _set: {bidStatus: $bidStatus}
    ) {
      affected_rows
    }
  }
`;


export const EMIT_TYPING_EVENT = gql`
  mutation update_users($senderId: String!) {
    update_users(
      _set: { lastTyped: "now()" }
      where: { id: { _eq: $senderId } }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const UPDATE_CHAT_STATUS = gql`
  mutation(
    $chatRoomId: String
    $chatStatus: String
  ) {
    update_chat_rooms(
      where:{id: {_eq: $chatRoomId }},
      _set: { status: $chatStatus }
    ) {
      returning {
        ...ChatRoomFragment
      }
    }
  }
  ${ChatRoomFragment}
`