import gql from "graphql-tag";
import { UserPrivateFragment, StorePrivateFragment } from "./fragments";

export const CREATE_USER = gql`
  mutation signUpUsingEmail(
    $email: String!
    $password: String!
    $username: String
    $firstName: String
    $lastName: String
    $productProductVariantIds: [ProductProductVariantId]
  ) {
    signUpUsingEmail(
      email: $email
      password: $password
      username: $username
      firstName: $firstName
      lastName: $lastName
      productProductVariantIds: $productProductVariantIds
    ) {
      user {
        ...UserPrivateFragment
      }
      sendgridResponse {
        verified {
          email
          username
          expiresAt
          id
        }
        status {
          message
        }
      }
      stripeCustomerCreationResponse {
        endpoint
        status
        response {
          id
          email
          currency
          created
          balance
          description
          defaultSource
        }
      }
    }
  }
  ${UserPrivateFragment}
`;

// # userId: $userId,
// NOTE: userID is extracted from the auth-cookie automatically server-side
// It is attached automatically if you are logged in.
export const UPDATE_USER = gql`
  mutation editUserProfile(
    $username: String
    $email: String
    $firstName: String
    $lastName: String
    $payoutMethod: String
  ) {
    editUserProfile(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
      payoutMethod: $payoutMethod
    ) {
      user {
        id
        lastName
        firstName
        username
        email
        ... on UserPrivate {
          ...UserPrivateFragment
        }
      }
    }
  }
  ${UserPrivateFragment}
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($currentPassword: String!, $newPassword: String!) {
    changePassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      ... on UserMutationResponse {
        user {
          id
          email
        }
      }
    }
  }
`;

// """e.g. Paypal, Bank, Card"""
// payoutType: String

// """Paypal only, or email associated with a bank account"""
// payoutEmail: String

// """Name of payout provider: Paypal, Westpac, etc"""
// payoutProcessor: string;

// """ID associated with payout method from payout provider"""
// payoutProcessorId: string;
export const SET_PAYOUT_METHOD = gql`
  mutation setPayoutMethod(
    $payoutType: String
    $payoutEmail: String
    $payoutProcessor: String
    $payoutProcessorId: String
  ) {
    setPayoutMethod(
      payoutType: $payoutType
      payoutEmail: $payoutEmail
      payoutProcessor: $payoutProcessor
      payoutProcessorId: $payoutProcessorId
    ) {
      ... on UserMutationResponse {
        user {
          ...UserPrivateFragment
        }
      }
    }
  }
  ${UserPrivateFragment}
`;

export const LOGOUT = gql`
  mutation logOut {
    logOut {
      ... on BlankMutationResponse {
        success
      }
    }
  }
`;
