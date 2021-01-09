import gql from "graphql-tag";
import {
  ImageFragment,
  ProductFragment,
  StorePublicFragment,
  StorePrivateFragment,
} from "./fragments";


export const GET_STORE_PUBLIC = gql`
  query getStorePublic(
    $storeId: String!
  ) {
    store(id: $storeId) {
      id
      name
      createdAt
      updatedAt
      website
      bio
      isSuspended
      isDeleted
      cover {
        ...ImageFragment
      }
      profile {
        ...ImageFragment
      }
    }
  }
  ${ImageFragment}
`;


export const GET_STORE_PRIVATE = gql`
  query getStorePrivate{
    user {
      id
      ... on UserPrivate {
        store {
          id
          name
          createdAt
          updatedAt
          website
          bio
          isSuspended
          isDeleted
          cover {
            ...ImageFragment
          }
          profile {
            ...ImageFragment
          }
        }
      }
    }
  }
  ${ImageFragment}
`;


// export const GET_ALL_STORES = gql`
//   query getAllStores {
//     storesAdminConnection(
//       query: {
//         sortAscending: false
//         count: 5
//         pageBackwards: false
//       }
//     ) {
//       pageInfo {
//         isLastPage
//         endCursor
//       }
//       edges {
//         node {
//           id
//           name
//         }
//       }
//     }
//   }
// `;


export const DASHBOARD_PRODUCTS_CONNECTION = gql`
  query dashboardProductsConnection(
    $searchTerm: String
    $query: ConnectionOffsetQuery
  ) {
    dashboardProductsConnection(
      searchTerm: $searchTerm
      query: $query
    ) {
      edges {
        node {
          ...ProductFragment
        }
      }
      totalCount
      pageInfo {
        isLastPage
        endCursor
      }
    }
  }
  ${ProductFragment}
`;


export const GET_STORE_PRODUCTS_FOR_SALE_CONNECTION = gql`
  query getStoreProductsForSaleConnection(
    $storeId: String!
    $searchTerm: String
    $query: ConnectionOffsetQuery
  ) {
    getStoreProductsForSaleConnection(
      storeId: $storeId
      searchTerm: $searchTerm
      query: $query
    ) {
      edges {
        node {
          ...ProductFragment
        }
      }
      totalCount
    }
  }
  ${ProductFragment}
`;
