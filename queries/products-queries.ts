import gql from "graphql-tag";
import {
  ImageFragment,
  ProductFragment,
  StorePublicFragment
} from "./fragments";

export const GET_RECOMMENDED_PRODUCTS = gql`
  query getRecommendedProducts($query: ConnectionOffsetQuery) {
    getRecommendedProductsConnection(query: $query) {
      totalCount
      pageInfo {
        isLastPage
        endCursor
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
    $categorySlug: String!
    $query: ConnectionOffsetQuery!
    $searchTerm: String
  ) {
    productsByCategoryConnection(
      categorySlug: $categorySlug
      query: $query
      searchTerm: $searchTerm
    ) {
      totalCount
      pageInfo {
        isLastPage
        endCursor
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
