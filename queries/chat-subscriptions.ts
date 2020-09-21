import gql from "graphql-tag";

export const PreviewItemFragment = gql`
  fragment PreviewItemFragment on product_preview_items {
    id
    imageId
    youTubeEmbedLink
    image {
      id
      original {
        id
        url
        mimeType
        heightInPixels
        widthInPixels
        sizeInBytes
        url
      }
      variants {
        id
        mimeType
        sizeInBytes
        widthInPixels
        heightInPixels
        url
      }
      createdAt
      tags
      description
    }
  }
`;


export const ProductFragment = gql`
  fragment ProductFragment on products {
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
    }
    category {
      id
      name
    }
    productVariants {
      price
      previewItems {
        ...PreviewItemFragment
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
      ...PreviewItemFragment
    }
    bid {
      id
      productId
      productSnapshotId
      variantId
      variantSnapshotId
      offerPrice
      acceptedPrice
      orderId
      bidStatus
      createdAt
      updatedAt
    }
  }
  ${PreviewItemFragment}
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
      ...ProductFragment
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
  ${ProductFragment}
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
