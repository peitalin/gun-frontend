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
    currentSnapshot {
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
    product_variants {
      price
      previewItems {
        ...PreviewItemFragment
      }
      createdAt
      isDefault
      variantId
      snapshotId
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