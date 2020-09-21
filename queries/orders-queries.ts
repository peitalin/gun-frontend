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
  query(
    $limit: Int!
    $offset: Int!
    $orderBy: [orders_order_by!]
  ) {
    orders(
      where: {
        currentSnapshot: {
          _or: [
            {orderStatus: {_eq: "CONFIRMED_PAYMENT_FORM_10_REQUIRED"}},
            {orderStatus: {_eq: "CREATED"}},
            {orderStatus: {_eq: "FAILED"}},
            {orderStatus: {_eq: "REFUNDED"}}
          ]
        }
      },
      limit: $limit
      offset: $offset
      order_by: $orderBy
    ) {
      ...OrdersFragment
    }
  }
  ${OrdersFragment}
`;
// note whereOrderSnapshots query variable used in OrdersFragment


export const GET_ORDERS_PENDING_APPROVAL_CONNECTION = gql`
  query(
    $limit: Int!
    $offset: Int!
    $orderBy: [orders_order_by!]
  ) {
    orders(
      where: { currentSnapshot: { orderStatus: {
        _eq: "FORM_10_SUBMITTED"
      } } }
      limit: $limit
      offset: $offset
      order_by: $orderBy
    ) {
      ...OrdersFragment
    }
  }
  ${OrdersFragment}
`;


export const GET_ORDERS_ADMIN_APPROVED_CONNECTION = gql`
  query(
    $limit: Int!
    $offset: Int!
    $orderBy: [orders_order_by!]
  ) {
    orders(
      where: { currentSnapshot: { orderStatus: {
        _eq: "ADMIN_APPROVED"
      } } }
      limit: $limit
      offset: $offset
      order_by: $orderBy
    ) {
      ...OrdersFragment
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
  query getOrderAsAdmin($orderId: ID!) {
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