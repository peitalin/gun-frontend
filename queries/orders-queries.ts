import gql from "graphql-tag";
import { OrderFragment } from "./fragments";

export const GET_ORDER_AS_ADMIN = gql`
  query getOrderAsAdmin($orderId: ID!) {
    getOrderAsAdmin(orderId: $orderId) {
      ...OrderFragment
    }
  }
  ${OrderFragment}
`;

export const GET_RECENT_TRANSACTIONS = gql`
  query getRecentTransactions($count: Int!) {
    getRecentTransactions(count: $count) {
      id
      orderId
      chargeId
      createdAt
      subtotal
      paymentProcessingFee
      currency
      # paymentMethod {
      #   id
      #   email
      #   last4
      #   expYear
      # }
      # paymentMethodId
      # paymentIntentId
      # paymentProcessor
      # details
      # refund {
      #   id
      #   createdAt
      #   transactionId
      #   storeId
      #   orderItemIds
      # }
    }
  }
`;
