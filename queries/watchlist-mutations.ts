import gql from "graphql-tag";

export const ADD_PRODUCT_TO_WATCHLIST = gql`
  mutation addProductToWatchlist($productId: ID!, $variantId: ID!) {
    addProductToWatchlist(productId: $productId, variantId: $variantId) {
      __typename
    }
  }
`;

export const REMOVE_PRODUCT_FROM_WATCHLIST = gql`
  mutation removeProductFromWatchlist($productId: ID!, $variantId: ID!) {
    removeProductFromWatchlist(productId: $productId, variantId: $variantId) {
      __typename
    }
  }
`;
