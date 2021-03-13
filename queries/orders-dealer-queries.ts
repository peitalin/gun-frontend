import gql from "graphql-tag";
import {
  ProductFragment,
  ImageFragment,
  OrdersFragment,
} from "./fragments";




export const GET_ORDERS_ARRIVING_CONNECTION_DEALER = gql`
  query($query: ConnectionOffsetQueryOrders!) {
    getOrdersArrivingConnectionDealer(query: $query) {
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


export const GET_ORDERS_COMPLETING_CONNECTION_DEALER = gql`
  query($query: ConnectionOffsetQueryOrders!) {
    getOrdersCompletingConnectionDealer(query: $query) {
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
