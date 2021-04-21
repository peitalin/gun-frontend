import gql from "graphql-tag";
import { UserPrivateFragment } from "./fragments";


export const LOG_IN_USING_EMAIL = gql`
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
      ... on UserPrivate {
        firstName
        lastName
        email
        ...UserPrivateFragment
      }
    }
  }
  ${UserPrivateFragment}
`;
