import gql from "graphql-tag";
import { ImageFragment, BidFragment } from "./fragments";



export const ProductLiteFragment = gql`
  fragment ProductLiteFragment on products {
    id
    currentSnapshotId
    currentSnapshot {
      id
      title
      createdAt
      actionType
      ammoType
      make
      model
      magazineCapacity
      barrelLength
    }
    category {
      id
      name
    }
    productVariants {
      price
      previewItems {
        id
        imageId
        image {
          ...ImageFragment
        }
      }
      createdAt
      isDefault
      variantId
      snapshotId
      variantSnapshotId
      variantName
      variantDescription
    }
  }
  ${ImageFragment}
`;



export const MessageFragment = gql`
  fragment MessageFragment on chat_messages {
    id
    chatRoomId
    createdAt
    sender {
      id
      firstName
      lastName
    }
    content
    previewItem {
      id
      imageId
      image {
        ...ImageFragment
      }
    }
    bid {
      ...BidFragment
    }
  }
  ${ImageFragment}
  ${BidFragment}
`;

export const ChatRoomFragment = gql`
  fragment ChatRoomFragment on chat_rooms {
    id
    name
    status
    owner {
      id
      firstName
      lastName
    }
    product {
      ...ProductLiteFragment
    }
    users {
      user {
        id
        firstName
        lastName
      }
    }
    messages(
      order_by: { createdAt: asc }
      limit: 40
    ) {
      ...MessageFragment
    }
  }
  ${ProductLiteFragment}
  ${MessageFragment}
`;



export const SUBSCRIBE_USER_CONVERSATIONS = gql`
  subscription($userId: String!) {
    conversations: chat_users (
      order_by: {chatRoom: {createdAt: desc}}
      where:{userId:{_eq: $userId}}
    ) {
      chatRoom {
        ...ChatRoomFragment
      }
    }
  }
  ${ChatRoomFragment}
`;


export const GET_USER_TYPING = gql`
  subscription ($selfId: String) {
    users_typing (
      where: { id: { _neq: $selfId } },
      limit: 2
      order_by: {lastTyped:desc}
    ){
      lastTyped
      id
      firstName
      lastName
      email
    }
  }
`;

export const FETCH_ONLINE_USERS_SUBSCRIPTION = gql`
  subscription {
    users_online (
      order_by: {lastSeen:asc}
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;
