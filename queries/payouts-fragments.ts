import gql from "graphql-tag";


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
    total
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
      id
      transactionId
      orderId
      orderItemIds
      createdAt
      reason
      reasonDetails
    }
  }
`;

export const PayoutItemFragment = gql`
  fragment PayoutItemFragment on PayoutItem {
    id
    storeId
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
          updatedAt
          createdAt
          payoutType
          bsb
          accountNumber
          accountName
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
    storeId
    payeeType
    payoutDate
    createdAt
    startPeriod
    endPeriod
    payoutStatus
    # payoutEmail
    approvedByAdmins {
      id
      firstName
      lastName
      email
    }
  }
`;
