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
        dealerId
        dealer {
          id
          name
          address
          city
          state
          postCode
          licenseNumber
        }
      }
    }
  }
  ${ImageFragment}
`;

export const GET_DEALER_PRIVATE = gql`
  query getDealerPrivate{
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
        dealerId
        dealer {
          id
          name
          address
          city
          state
          postCode
          licenseNumber
        }
      }
    }
  }
  ${ImageFragment}
`;


export const DASHBOARD_PRODUCTS_CONNECTION = gql`
  query dashboardProductsConnection(
    $searchTerm: String
    $query: ConnectionQuery
  ) {
    dashboardProductsConnection(
      searchTerm: $searchTerm
      query: $query
    ) {
      edges {
        node {
          ...ProductFragment
          ... on ProductPrivate {
            uniqueProductViews {
              aggregate {
                count
              }
            }
          }
        }
      }
      totalCount
      pageInfo {
        isLastPage
      }
    }
  }
  ${ProductFragment}
`;


export const GET_STORE_PRODUCTS_FOR_SALE_CONNECTION = gql`
  query getStoreProductsForSaleConnection(
    $storeId: String!
    $searchTerm: String
    $query: ConnectionQuery
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
