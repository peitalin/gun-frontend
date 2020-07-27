import gql from "graphql-tag";
import {
  ProductFragment,
  // OrderFragment,
  PaymentMethodFragment
} from "./fragments";

export const OrderFragment = gql`
  fragment OrderFragment on Order {
    id
    createdAt
    updatedAt
    bidId
    # bid {
    #   id
    #   bidStatus
    #   createdAt
    #   updatedAt
    #   acceptedPrice
    #   offerPrice
    # }
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
      total
      createdAt
      currency
      form10Image {
        id
      }
    }
    orderSnapshots {
      id
      orderStatus
      total
      createdAt
      currency
      form10Image {
        id
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
