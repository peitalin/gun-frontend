import gql from "graphql-tag";
import {
  ProductFragment,
  ImageFragment,
  OrdersFragment,
} from "./fragments";




export const GET_ORDERS_CREATED_CONNECTION = gql`
  query($query: ConnectionQueryOrders!) {
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
  query($query: ConnectionQueryOrders!) {
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
  query($query: ConnectionQueryOrders!) {
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
  query($query: ConnectionQueryOrders!) {
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
  query($query: ConnectionQueryOrders!) {
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

export const GET_ORDERS_EXPIRING_CONNECTION_ADMIN = gql`
  query($query: ConnectionQueryOrders!) {
    getOrdersExpiringConnectionAdmin(query: $query) {
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