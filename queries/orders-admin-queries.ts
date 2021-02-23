import gql from "graphql-tag";
import {
  ProductFragment,
  ImageFragment,
  OrdersFragment,
} from "./fragments";




export const GET_ORDERS_CREATED_CONNECTION = gql`
  query($query: ConnectionOffsetQueryOrders!) {
    getOrdersCreatedConnectionAdmin(query: $query) {
      edges {
        node {
          ...OrdersFragment
        }
      }
      totalCount
    }
  }
  ${OrdersFragment}
`;
// note whereOrderSnapshots query variable used in OrdersFragment


export const GET_ORDERS_PENDING_APPROVAL_CONNECTION = gql`
  query($query: ConnectionOffsetQueryOrders!) {
    getOrdersPendingApprovalConnectionAdmin(query: $query) {
      edges {
        node {
          ...OrdersFragment
        }
      }
      totalCount
    }
  }
  ${OrdersFragment}
`;


export const GET_ORDERS_ADMIN_APPROVED_CONNECTION = gql`
  query($query: ConnectionOffsetQueryOrders!) {
    getOrdersAdminApprovedConnection(query: $query) {
      edges {
        node {
          ...OrdersFragment
        }
      }
      totalCount
    }
  }
  ${OrdersFragment}
`;


export const GET_ORDERS_PAYOUTS_COMPLETE_CONNECTION = gql`
  query($query: ConnectionOffsetQueryOrders!) {
    getOrdersPayoutCompleteConnection(query: $query) {
      edges {
        node {
          ...OrdersFragment
        }
      }
      totalCount
    }
  }
  ${OrdersFragment}
`;

export const GET_ORDERS_CANCELLED_CONNECTION = gql`
  query($query: ConnectionOffsetQueryOrders!) {
    getOrdersCancelledConnection(query: $query) {
      edges {
        node {
          ...OrdersFragment
        }
      }
      totalCount
    }
  }
  ${OrdersFragment}
`;

export const GET_ORDERS_EXPIRING_CONNECTION = gql`
  query($query: ConnectionOffsetQueryOrders!) {
    getOrdersExpiringConnection(query: $query) {
      edges {
        node {
          ...OrdersFragment
        }
      }
      totalCount
    }
  }
  ${OrdersFragment}
`;



export const GET_ORDER_AS_ADMIN = gql`
  query getOrderAsAdmin($orderId: String!) {
    getOrderAsAdmin(orderId: $orderId) {
      ...OrdersFragment
    }
  }
  ${OrdersFragment}
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