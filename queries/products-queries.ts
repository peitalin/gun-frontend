import gql from "graphql-tag";
import {
  ImageFragment,
  ProductFragment,
  StorePublicFragment
} from "./fragments";

export const GET_RECOMMENDED_PRODUCTS = gql`
  query getRecommendedProducts($query: ConnectionQuery) {
    productsRecommendedConnection(query: $query) {
      totalCount
      pageInfo {
        isLastPage
        endCursor
      }
      edges {
        # cursor
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${ImageFragment}
  ${ProductFragment}
`;


export const GET_ALL_PRODUCTS = gql`
  query productsAllConnection($query: ConnectionQuery) {
    productsAllConnection(query: $query) {
      totalCount
      pageInfo {
        isLastPage
        endCursor
      }
      edges {
        # cursor
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${ImageFragment}
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
    $categoryId: String
    $categoryName: String
    $query: ConnectionQuery
  ) {
    productsByCategoryConnection(
      categoryId: $categoryId
      categoryName: $categoryName
      query: $query
    ) {
      totalCount
      pageInfo {
        isLastPage
        endCursor
      }
      edges {
        # cursor
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${ImageFragment}
  ${ProductFragment}
`;
