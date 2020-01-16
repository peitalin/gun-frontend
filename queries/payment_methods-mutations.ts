import gql from "graphql-tag";
import { UserPrivateFragment } from "./fragments";

export const ADD_PAYMENT_METHOD = gql`
  mutation addPaymentMethod($paymentMethodId: ID!, $customerId: ID!) {
    addPaymentMethod(
      paymentMethodId: $paymentMethodId
      customerId: $customerId
    ) {
      user {
        ...UserPrivateFragment
      }
    }
  }
  ${UserPrivateFragment}
`;

export const REMOVE_PAYMENT_METHOD = gql`
  mutation removePaymentMethod($paymentMethodId: ID!, $customerId: ID!) {
    removePaymentMethod(
      paymentMethodId: $paymentMethodId
      customerId: $customerId
    ) {
      user {
        ...UserPrivateFragment
      }
    }
  }
  ${UserPrivateFragment}
`;

export const SET_DEFAULT_PAYMENT_METHOD = gql`
  mutation setDefaultPaymentMethod($paymentMethodId: ID!, $customerId: ID!) {
    setDefaultPaymentMethod(
      paymentMethodId: $paymentMethodId
      customerId: $customerId
    ) {
      user {
        ...UserPrivateFragment
      }
    }
  }
  ${UserPrivateFragment}
`;
