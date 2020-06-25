import gql from "graphql-tag";

export const GET_USER_CONVERSATIONS = gql`
  subscription($userId: String!) {
    conversations: chat_users (
      order_by: {chat: {createdAt: desc}}
      where:{userId:{_eq: $userId}}
    ) {
      chat {
        id
        name
        owner {
          id
          firstName
          lastName
        }
        product {
          id
          currentSnapshot {
            title
            createdAt
            actionType
            ammoType
            make
            model
          }
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
          limit: 10
        ) {
          id
          chatId
          createdAt
          sender {
            id
            firstName
            lastName
          }
          content
          previewItem {
            id
          }
        }
      }
    }
  }
`;

