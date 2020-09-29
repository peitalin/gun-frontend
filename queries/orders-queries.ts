import gql from "graphql-tag";
import {
  ProductFragment,
  PaymentMethodFragment,
  ImageFragment,
  OrdersFragment,
} from "./fragments";



export const GET_ALL_ORDERS_CONNECTION2 = gql`
  query getOrdersPendingApprovalConnectionAdmin(
    $query: ConnectionOffsetQueryOrders!
  ) {
    getOrdersPendingApprovalConnectionAdmin(query: $query) {
      totalCount
      pageInfo {
        isLastPage
        endCursor
      }
      edges {
        node {
          ...OrdersFragment
        }
      }
    }
  }
  ${OrdersFragment}
`;

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


export const GET_SELLER_ORDERS_CONNECTION = gql`
  query ($query: ConnectionOffsetQueryOrders) {
    user {
      id
      ... on UserPrivate {
        sellerOrdersConnection(query: $query) {
          totalCount
          pageInfo {
            isLastPage
            endCursor
          }
          edges {
            node {
              ...OrdersFragment
            }
          }
        }
      }
    }
  }
  ${OrdersFragment}
`;



export const GET_BUYER_ORDERS_CONNECTION = gql`
  query ($query: ConnectionOffsetQueryOrders) {
    user {
      id
      ... on UserPrivate {
        buyerOrdersConnection(query: $query) {
          totalCount
          pageInfo {
            isLastPage
            endCursor
          }
          edges {
            node {
              ...OrdersFragment
            }
          }
        }
      }
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