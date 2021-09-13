import gql from "graphql-tag";
import {
  OrdersDashboardFragment,
} from "./fragments";


export const GET_SELLER_ORDERS_CONNECTION = gql`
  query ($query: ConnectionQueryOrders) {
    sellerOrdersConnection(query: $query) {
      totalCount
      pageInfo {
        isLastPage
      }
      edges {
        node {
          ...OrdersDashboardFragment
        }
      }
    }
  }
  ${OrdersDashboardFragment}
`;


export const GET_SELLER_ORDERS_ACTION_ITEMS_CONNECTION = gql`
  query ($query: ConnectionQueryOrders) {
    sellerOrdersActionItemsConnection(query: $query) {
      totalCount
      pageInfo {
        isLastPage
      }
      edges {
        node {
          ...OrdersDashboardFragment
        }
      }
    }
  }
  ${OrdersDashboardFragment}
`;



export const GET_BUYER_ORDERS_CONNECTION = gql`
  query ($query: ConnectionQueryOrders) {
    buyerOrdersConnection(query: $query) {
      totalCount
      pageInfo {
        isLastPage
      }
      edges {
        node {
          ...OrdersDashboardFragment
        }
      }
    }
  }
  ${OrdersDashboardFragment}
`;
