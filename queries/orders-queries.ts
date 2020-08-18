import gql from "graphql-tag";
import {
  ProductFragment,
  // OrderFragment,
  PaymentMethodFragment,
  ImageFragment,
} from "./fragments";
import {
  OrdersFragment as HasuraOrdersFragment,
} from "./Hasura/fragments";

export const OrderFragment = gql`
  fragment OrderFragment on Order {
    id
    createdAt
    updatedAt
    bidId
    bid {
      id
      bidStatus
      createdAt
      updatedAt
      acceptedPrice
      offerPrice
    }
    total
    currency
    buyerId
    buyer {
      id
      email
    }
    sellerId
    seller {
      id
      email
    }
    currentSnapshot {
      id
      orderStatus
      createdAt
      form10Image {
        ...ImageFragment
      }
    }
    orderSnapshots {
      id
      orderStatus
      createdAt
      adminApprover {
        id
        email
      }
      dealerApprover {
        id
        email
      }
      form10Image {
        ...ImageFragment
      }
    }
    productId
    product {
      ...ProductFragment
    }
    # order {
    #   ...OrderFragment
    #   currentSnapshot {
    #     transaction {
    #       id
    #       createdAt
    #       subtotal
    #       paymentProcessingFee
    #       taxes
    #       paymentProcessor
    #       customerId
    #       currency
    #       paymentMethodId
    #       paymentMethod {
    #         ... on PaymentMethod {
    #           ...PaymentMethodFragment
    #         }
    #       }
    #       paymentIntentId
    #       chargeId
    #     }
    #   }
    # }
  }
  ${ProductFragment}
  ${ImageFragment}
`;
  // ${PaymentMethodFragment}
  // ${OrderFragment}


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
              ...OrderFragment
            }
          }
        }
      }
    }
  }
  ${OrderFragment}
`;


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
          ...OrderFragment
        }
      }
    }
  }
  ${OrderFragment}
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
  ${HasuraOrdersFragment}
`;
// note whereOrderSnapshots query variable used in HasuraOrdersFragment


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
  ${HasuraOrdersFragment}
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
  ${HasuraOrdersFragment}
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
              ...OrderFragment
            }
          }
        }
      }
    }
  }
  ${OrderFragment}
`;


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
