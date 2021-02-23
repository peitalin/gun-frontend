import gql from "graphql-tag";
import {
  OrdersFragment,
} from "./fragments";


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


export const GET_SELLER_ORDERS_ACTION_ITEMS_CONNECTION = gql`
  query ($query: ConnectionOffsetQueryOrders) {
    user {
      id
      ... on UserPrivate {
        sellerOrdersActionItemsConnection(query: $query) {
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
