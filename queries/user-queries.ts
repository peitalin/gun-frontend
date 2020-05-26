import gql from "graphql-tag";
import { UserPrivateFragment } from "./fragments";

export const LOGIN = gql`
mutation logInUsingEmail(
  $email: String!
  $password: String!
) {
  logInUsingEmail(
    email: $email
    password: $password
  ) {
    jwt
    user {
      ...UserPrivateFragment
    }
  }
}
  ${UserPrivateFragment}
`;

export const GET_USER = gql`
  query getUser {
    user {
      id
      firstName
      lastName
      email
      ... on UserPrivate {
        ...UserPrivateFragment
      }
    }
  }
  ${UserPrivateFragment}
`;

export const SEND_RESET_PASSWORD_EMAIL = gql`
  mutation sendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email) {
      resetId
      emailSentTo
      status {
        message
      }
    }
  }
`;
