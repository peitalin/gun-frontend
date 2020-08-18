import gql from "graphql-tag";

export const RefundFragment = gql`
  fragment RefundFragment on Refund {
    id
    transactionId
    orderId
    orderItemIds
    createdAt
    reason
    reasonDetails
  }
`;

/// Lookup Store via OrderItem
export const OrderItemStoreFragment = gql`
  fragment OrderItemStoreFragment on OrderItem {
    id
    orderId
    product {
      title
      store {
        id
        name
        website
      }
    }
  }
`;

export const TransactionFragment = gql`
  fragment TransactionFragment on Transaction {
    id
    orderId
    subtotal
    taxes
    paymentProcessingFee
    currency
    customerId
    createdAt
    paymentMethod {
      id
      email
      last4
      expYear
    }
    paymentProcessor
    paymentMethodId
    paymentIntentId
    chargeId
    details
    order {
      id
      buyer {
        id
        email
        firstName
        lastName
      }
    }
    refund {
      ...RefundFragment
    }
  }
  ${RefundFragment}
`;

export const PayoutItemFragment = gql`
  fragment PayoutItemFragment on PayoutItem {
    id
    payeeId
    payeeType
    amount
    paymentProcessingFee
    createdAt
    payoutStatus
    currency
    store {
      id
      user {
        payoutMethod {
          id
          payoutType
          payoutEmail
          payoutProcessor
          updatedAt
          createdAt
        }
      }
    }
    orderItemId
    # orderItem
    orderItem {
      ...OrderItemStoreFragment
    }
    txnId
    # transaction
    payoutId
    # payout
  }
  ${OrderItemStoreFragment}
`;

export const PayoutFragment = gql`
  fragment PayoutFragment on Payout {
    id
    payeeId
    payeeType
    payoutDate
    createdAt
    startPeriod
    endPeriod
    payoutStatus
    payoutEmail
    approvedByAdmins {
      id
      firstName
      lastName
      email
    }
  }
`;
