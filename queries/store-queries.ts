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
    }
  }
  ${StorePublicFragment}
`;


// export const GET_STORE_PUBLIC_BY_ID_OR_SLUG = gql`
//   query getStoreByStoreIdOrSlug($storeIdOrSlug: String!) {
//     getStoreByStoreIdOrSlug(storeIdOrSlug: $storeIdOrSlug) {
//       ...StorePublicFragment
//     }
//   }
//   ${ImageFragment}
//   ${ProductFragment}
//   ${StorePublicFragment}
// `;

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
        }
      }
    }
  }
  ${ImageFragment}
`;
  // ${ProductFragment}
  // ${ProductSalesFragment}


// export const GET_ALL_STORES = gql`
//   query getAllStores {
//     storesAdminConnection(
//       query: {
//         sortAscending: false
//         count: 5
//         cursor: null
//         pageBackwards: false
//       }
//     ) {
//       pageInfo {
//         isLastPage
//         endCursor
//       }
//       edges {
//         cursor
//         node {
//           id
//           name
//           ... on StorePrivate {
//             promoCodeDiscounts(query: { count: 5 }) {
//               edges {
//                 node {
//                   id
//                   createdAt
//                   modifier
//                   valuePercentageOff
//                   promoCode
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;


// export const GET_PUBLISHED_PRODUCTS_CONNECTION = gql`
// query getPublishedProductsConnection($query: ConnectionQuery) {
//   user {
//     id
//     ... on UserPrivate {
//       store {
//         id
//         dashboardPublishedProductsConnection(query: $query) {
//           edges {
//             cursor
//             node {
//               ...ProductFragment
//             }
//           }
//           totalCount
//           pageInfo {
//             isLastPage
//             endCursor
//           }
//         }
//       }
//     }
//   }
// }
// ${ImageFragment}
// ${ProductFragment}
// `;


// export const GET_UNPUBLISHED_PRODUCTS_CONNECTION = gql`
// query getUnpublishedProductsConnection($query: ConnectionQuery) {
//   user {
//     id
//     ... on UserPrivate {
//       store {
//         id
//         dashboardUnpublishedProductsConnection(query: $query) {
//           edges {
//             cursor
//             node {
//               ...ProductFragment
//             }
//           }
//           totalCount
//           pageInfo {
//             isLastPage
//             endCursor
//           }
//         }
//       }
//     }
//   }
// }
// ${ProductFragment}
// `;



// export const GET_PROMO_CODES_CONNECTION = gql`
// query getPromoCodesConnection($query: ConnectionQuery) {
//   user {
//     id
//     ... on UserPrivate {
//       store {
//         id
//         promoCodeDiscounts(query: $query) {
//           edges {
//             cursor
//             node {
//               id
//               createdAt
//               modifier
//               valuePercentageOff
//               promoCode
//             }
//           }
//           totalCount
//           pageInfo {
//             isLastPage
//             endCursor
//           }
//         }
//       }
//     }
//   }
// }
// `;