import gql from "graphql-tag";
import {
  ImageFragment,
  ProductFragment,
  StorePublicFragment,
  StorePrivateFragment,
} from "./fragments";


export const GET_STORE_PUBLIC = gql`
  query getStorePublic($storeId: String!) {
    store(id: $storeId) {
      ...StorePublicFragment
      productsForSaleConnection(query: {
        limit: 10,
        offset: 0,
      }) {
        edges {
          node {
            id
            serialNumber
            title
          }
        }
      }
    }
  }
  ${StorePublicFragment}
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
          cover {
            ...ImageFragment
          }
          profile {
            ...ImageFragment
          }
          productsForSaleConnection(query: {
            limit: 20,
            offset: 0,
          }) {
            edges {
              node {
                ...ProductFragment
              }
            }
          }
        }
      }
    }
  }
  ${ImageFragment}
  ${ProductFragment}
`;
  // ${ProductSalesFragment}


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
query dashboardProductsConnection($query: ConnectionOffsetQuery) {
  dashboardProductsConnection(query: $query) {
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
${ImageFragment}
${ProductFragment}
`;

