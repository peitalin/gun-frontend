import gql from "graphql-tag";
import {
  ImageFragment,
  ProductFragment,
  ProductSalesFragment,
  StorePublicFragment,
  StorePrivateFragment,
} from "./fragments";


export const FOLLOW_STORE = gql`
  mutation followStore($storeId: ID!, $query: ConnectionQuery) {
    followStore(
      storeId: $storeId
      query: $query
    ) {
      edges {
        cursor
        node {
          createdAt
          lastVisited
          store {
            ...StorePublicFragment
          }
        }
      }
    }
  }
  ${ImageFragment}
  ${ProductFragment}
  ${StorePublicFragment}
`;

export const UNFOLLOW_STORE = gql`
  mutation unfollowStore($storeId: ID!, $query: ConnectionQuery) {
    unfollowStore(
      storeId: $storeId
      query: $query
    ) {
      edges {
        cursor
        node {
          createdAt
          lastVisited
          store {
            ...StorePublicFragment
          }
        }
      }
    }
  }
  ${ImageFragment}
  ${ProductFragment}
  ${StorePublicFragment}
`;

export const VISIT_STORE = gql`
  mutation visitStore($storeId: ID!, $query: ConnectionQuery) {
    visitStore(
      storeId: $storeId
      query: $query
    ) {
      edges {
        cursor
        node {
          createdAt
          lastVisited
          store {
            ...StorePublicFragment
          }
        }
      }
    }
  }
  ${ImageFragment}
  ${ProductFragment}
  ${StorePublicFragment}
`;
