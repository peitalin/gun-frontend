import gql from "graphql-tag";
import {
  ImageFragment,
  ProductFragment,
  StorePublicFragment
} from "./fragments";

export const GET_RECOMMENDED_PRODUCTS = gql`
  query getRecommendedProducts($query: ConnectionQuery) {
    getRecommendedProductsConnection(query: $query) {
      totalCount
      pageInfo {
        isLastPage
      }
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${ProductFragment}
`;


export const GET_ALL_NEW_PRODUCTS = gql`
  query productsAllConnection(
    $searchTerm: String!
    $query: ConnectionQuery
  ) {
    productsAllConnection(
      searchTerm: $searchTerm,
      query: $query
    ) {
      totalCount
      pageInfo {
        isLastPage
      }
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${ProductFragment}
`;



export const GET_PRODUCT = gql`
  query getProductById($productId: String!) {
    getProductById(productId: $productId) {
      ...ProductFragment
      store {
        ...StorePublicFragment
      }
    }
  }
  ${ProductFragment}
  ${StorePublicFragment}
`;


export const GET_PRODUCTS_BY_CATEGORY = gql`
  query productsByCategoryConnection(
    $query: ConnectionQuery!
    $categorySlugs: [String]!
    $dealerStates: [String]
    $calibers: [String]
    $actionTypes: [String]
    $searchTerm: String
  ) {
    productsByCategoryConnection(
      query: $query
      categorySlugs: $categorySlugs
      dealerStates: $dealerStates
      calibers: $calibers
      actionTypes: $actionTypes
      searchTerm: $searchTerm
    ) {
      totalCount
      pageInfo {
        isLastPage
      }
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${ProductFragment}
`;


export const GET_RECENT_PRODUCTS = gql`
  query getRecentProducts($limit: Int!, $offset: Int!) {
    getRecentProducts(limit: $limit, offset: $offset) {
      ...ProductFragment
    }
  }
  ${ProductFragment}
`;


export const INSERT_UNIQUE_PRODUCT_VIEW = gql`
  mutation insertUniqueProductView(
    $userId: String!
    $productId: String!
    $sellerUserId: String!
  ) {
    insertUniqueProductView(
      userId: $userId
      productId: $productId
      sellerUserId: $sellerUserId
    ) {
      userId
      productId
      sellerUserId
    }
  }
`;