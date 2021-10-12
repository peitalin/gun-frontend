import gql from "graphql-tag";
import { ImageFragment, ProductFragment } from "./fragments";


export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $productCreateInput: ProductCreateInput!
    $classifiedAdPaymentInput: ClassifiedAdPaymentInput
  ) {
    createProduct(
      productCreateInput: $productCreateInput
      classifiedAdPaymentInput: $classifiedAdPaymentInput
    ) {
      ... on ProductListingMutationResponse {
        product {
          ...ProductFragment
        }
        stripePaymentIntent
        classifiedAdPurchase {
          id
          buyerId
          productId
          createdAt
          total
          fees
          currency
          paymentIntentId
        }
      }
    }
  }
  ${ProductFragment}
`;

export const EDIT_PRODUCT = gql`
  mutation editProduct($productEditInput: ProductEditInput) {
    editProduct(productEditInput: $productEditInput) {
      product {
        ...ProductFragment
      }
    }
  }
  ${ProductFragment}
`;


export const PUBLISH_PRODUCT = gql`
  mutation publishProduct($productId: String!) {
    publishProduct(productId: $productId) {
      product {
        ...ProductFragment
      }
    }
  }
  ${ProductFragment}
`;

export const UNPUBLISH_PRODUCT = gql`
  mutation unpublishProduct($productId: String!) {
    unpublishProduct(productId: $productId) {
      product {
        ...ProductFragment
      }
    }
  }
  ${ProductFragment}
`;


export const MARK_PRODUCT_SOLD = gql`
  mutation markProductSold($productId: String!) {
    marketProductSold(productId: $productId) {
      product {
        ...ProductFragment
      }
    }
  }
  ${ProductFragment}
`;






