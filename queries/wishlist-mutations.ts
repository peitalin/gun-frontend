import gql from "graphql-tag";

export const ADD_PRODUCT_TO_WISHLIST = gql`
  mutation addProductToWishlist($productId: ID!, $variantId: ID!) {
    addProductToWishlist(productId: $productId, variantId: $variantId) {
      __typename
    }
  }
`;

export const REMOVE_PRODUCT_FROM_WISHLIST = gql`
  mutation removeProductFromWishlist($productId: ID!, $variantId: ID!) {
    removeProductFromWishlist(productId: $productId, variantId: $variantId) {
      __typename
    }
  }
`;
