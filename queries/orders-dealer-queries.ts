import gql from "graphql-tag";
import {
  ProductFragment,
  ImageFragment,
  OrdersGovFragment,
} from "./fragments";




export const GET_ORDERS_ARRIVING_CONNECTION_DEALER = gql`
  query($query: ConnectionQueryOrders!) {
    getOrdersArrivingConnectionDealer(query: $query) {
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
// note whereOrderSnapshots query variable used in OrdersGovFragment


export const GET_ORDERS_COMPLETING_CONNECTION_DEALER = gql`
  query($query: ConnectionQueryOrders!) {
    getOrdersCompletingConnectionDealer(query: $query) {
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
