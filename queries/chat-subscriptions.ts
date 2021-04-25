import gql from "graphql-tag";
import { UserLicenseFragment, BidFragment, ProductFragment } from "./fragments";

import { enableExperimentalFragmentVariables } from 'graphql-tag'
enableExperimentalFragmentVariables()



export const MessageFragment = gql`
  fragment MessageFragment on Message {
    id
    chatRoomId
    createdAt
    senderId
    sender {
      id
      ...on UserPrivate {
        firstName
        lastName
      }
      license {
        ...UserLicenseFragment
      }
    }
    content
    bid {
      ...BidFragment
    }
  }
  ${BidFragment}
  ${UserLicenseFragment}
`;

export const ChatRoomFragment = gql`
  fragment ChatRoomFragment on ChatRoom {
    id
    name
    owner {
      id
      ...on UserPrivate {
        firstName
        lastName
      }
      license {
        ...UserLicenseFragment
      }
    }
    product {
      ...ProductFragment
    }
    participants {
      user {
        id
        license {
          ...UserLicenseFragment
        }
      }
    }
    messages {
      ...MessageFragment
    }
    buyerChatStatus
    sellerChatStatus
  }
  ${ProductFragment}
  ${UserLicenseFragment}
  ${MessageFragment}
`;



export const SUBSCRIBE_USER_CONVERSATIONS = gql`
  subscription($messageLimit: Int) {
    myConversations(messageLimit: $messageLimit) {
      userId
      chatRoomId
      chatRoom {
        ...ChatRoomFragment
      }
    }
  }
  ${ChatRoomFragment}
`;


// export const GET_USER_TYPING = gql`
//   subscription ($selfId: String) {
//     users_typing (
//       where: { id: { _neq: $selfId } },
//       limit: 2
//       order_by: {lastTyped:desc}
//     ){
//       lastTyped
//       id
//       firstName
//       lastName
//       email
//     }
//   }
// `;

export const SAY_SOMETHING_MUTATION = gql`
  mutation saySomething($message: String!) {
    saySomething(message: $message)
  }
`;

export const SAY_SOMETHING_SUBSCRIPTION = gql`
  subscription {
    saidSomething
  }
`;

// export const FETCH_ONLINE_USERS_SUBSCRIPTION = gql`
//   subscription {
//     users_online (
//       order_by: {lastSeen:asc}
//     ) {
//       id
//       firstName
//       lastName
//       email
//     }
//   }
// `;
