import gql from "graphql-tag";
import {
  ProductFragment,
  ImageFragment,
  OrdersGovFragment,
  OrdersGovCancelledFragment,
} from "./fragments";




export const GET_ORDERS_CREATED_CONNECTION = gql`
  query($query: ConnectionQueryOrders!) {
    getOrdersCreatedConnectionAdmin(query: $query) {
      edges {
        node {
          ...OrdersGovFragment
          ...on OrderAdmin {
            paymentIntent {
              id
              amount
              amountCapturable
              amountReceived
              captureMethod
              createdAt
              currency
              liveMode
              status
            }
          }
        }
      }
      totalCount
    }
  }
  ${OrdersGovFragment}
`;
// note whereOrderSnapshots query variable used in OrdersGovFragment


export const GET_ORDERS_PENDING_APPROVAL_CONNECTION = gql`
  query($query: ConnectionQueryOrders!) {
    getOrdersPendingApprovalConnectionAdmin(query: $query) {
      edges {
        node {
          ...OrdersGovFragment
          ...on OrderAdmin {
            paymentIntent {
              id
              amount
              amountCapturable
              amountReceived
              captureMethod
              createdAt
              currency
              liveMode
              status
            }
          }
        }
      }
      totalCount
    }
  }
  ${OrdersGovFragment}
`;


export const GET_ADMIN_APPROVED_ORDER_IDS_GROUPED_BY_DAY = gql`
  query {
    getAdminApprovedOrderIdsGroupedByDay {
      day
      orderIds
    }
  }
`;

export const GET_ORDERS_ADMIN_APPROVED_BY_IDS_CONNECTION = gql`
  query(
    $orderIds: [String!]!
    $limit: Int!
    $offset: Int!
  ) {
    getOrdersAdminApprovedByIdsConnection(
      orderIds: $orderIds
      limit: $limit
      offset: $offset
    ) {
      edges {
        node {
          ...OrdersGovFragment
          # Already captured, no need to spam Stripe for status
          # ...on OrderAdmin {
          #   paymentIntent {
          #     id
          #     amount
          #     amountCapturable
          #     amountReceived
          #     captureMethod
          #     createdAt
          #     currency
          #     liveMode
          #     status
          #   }
          # }
        }
      }
      totalCount
    }
  }
  ${OrdersGovFragment}
`;


export const GET_COMPLETE_ORDER_IDS_GROUPED_BY_DAY = gql`
  query(
    $before: Date
    $after: Date
  ) {
    getCompleteOrderIdsGroupedByDay(
      before: $before
      after: $after
    ) {
      day
      orderIds
    }
  }
`;

export const GET_ORDERS_COMPLETE_BY_IDS_CONNECTION = gql`
  query(
    $orderIds: [String!]!
    $limit: Int!
    $offset: Int!
  ) {
    getOrdersCompleteByIdsConnection(
      orderIds: $orderIds
      limit: $limit
      offset: $offset
    ) {
      edges {
        node {
          ...OrdersGovFragment
          # Already captured, no need to spam Stripe for status
          # ...on OrderAdmin {
          #   paymentIntent {
          #     id
          #     amount
          #     amountCapturable
          #     amountReceived
          #     captureMethod
          #     createdAt
          #     currency
          #     liveMode
          #     status
          #   }
          # }
        }
      }
      totalCount
    }
  }
  ${OrdersGovFragment}
`;



export const GET_ORDERS_ADMIN_APPROVED_CONNECTION = gql`
  query($query: ConnectionQueryOrders!) {
    getOrdersAdminApprovedConnection(query: $query) {
      edges {
        node {
          ...OrdersGovFragment
          # Already captured, no need to spam Stripe for status
          # ...on OrderAdmin {
          #   paymentIntent {
          #     id
          #     amount
          #     amountCapturable
          #     amountReceived
          #     captureMethod
          #     createdAt
          #     currency
          #     liveMode
          #     status
          #   }
          # }
        }
      }
      totalCount
    }
  }
  ${OrdersGovFragment}
`;

export const GET_ADMIN_APPROVED_PAYOUT_SUMMARY = gql`
  query($orderIds: [String!]!) {
    getAdminApprovedPayoutSummary(orderIds: $orderIds) {
      nodes {
        id
        createdAt
        storeId
        payeeType
        amount
        paymentProcessingFee
        taxes
        payoutStatus
        currency
        txnId
        payoutId
        orderId
        order {
          id
          currentSnapshot {
            orderStatus
          }
        }
      }
      aggregate {
        sum {
          amount
          paymentProcessingFee
          taxes
        }
      }
    }
  }
`;

export const GET_COMPLETE_ORDERS_PAYOUT_SUMMARY = gql`
  query($orderIds: [String!]!) {
    getCompleteOrdersPayoutSummary(orderIds: $orderIds) {
      nodes {
        id
        createdAt
        storeId
        payeeType
        amount
        paymentProcessingFee
        taxes
        payoutStatus
        currency
        txnId
        payoutId
        orderId
        order {
          id
          currentSnapshot {
            orderStatus
          }
        }
      }
      aggregate {
        sum {
          amount
          paymentProcessingFee
          taxes
        }
      }
    }
  }
`;




export const GET_ORDERS_PAYOUTS_COMPLETE_CONNECTION = gql`
  query($query: ConnectionQueryOrders!) {
    getOrdersPayoutCompleteConnection(query: $query) {
      edges {
        node {
          ...OrdersGovFragment
        }
      }
      totalCount
    }
  }
  ${OrdersGovFragment}
`;

export const GET_ORDERS_CANCELLED_CONNECTION = gql`
  query($query: ConnectionQueryOrders!) {
    getOrdersCancelledConnection(query: $query) {
      edges {
        node {
          ...OrdersGovCancelledFragment
        }
      }
      totalCount
    }
  }
  ${OrdersGovCancelledFragment}
`;

export const GET_ORDERS_EXPIRING_CONNECTION_ADMIN = gql`
  query($query: ConnectionQueryOrders!) {
    getOrdersExpiringConnectionAdmin(query: $query) {
      edges {
        node {
          ...OrdersGovFragment
          ...on OrderAdmin {
            paymentIntent {
              id
              amount
              amountCapturable
              amountReceived
              captureMethod
              createdAt
              currency
              liveMode
              status
            }
          }
        }
      }
      totalCount
    }
  }
  ${OrdersGovFragment}
`;



export const GET_ORDER_AS_ADMIN = gql`
  query getOrderAsAdmin($orderId: String!) {
    getOrderAsAdmin(orderId: $orderId) {
      ...OrdersGovFragment
      ...on OrderAdmin {
        paymentIntent {
          id
          amount
          amountCapturable
          amountReceived
          captureMethod
          createdAt
          currency
          liveMode
          status
        }
      }
    }
  }
  ${OrdersGovFragment}
`;

export const GET_RECENT_TRANSACTIONS = gql`
  query getRecentTransactions($count: Int!) {
    getRecentTransactions(count: $count) {
      id
      orderId
      createdAt
      total
      currency
      paymentMethod {
        id
        email
        last4
        expYear
      }
      paymentMethodId
      paymentIntentId
      paymentProcessor
      details
      refund {
        id
        transactionId
        orderId
        createdAt
        reason
        reasonDetails
        receiptNumber
      }
    }
  }
`;