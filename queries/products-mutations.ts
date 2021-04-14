import gql from "graphql-tag";
import { ImageFragment, ProductFragment } from "./fragments";


export const CREATE_PRODUCT = gql`
  mutation createProduct($productCreateInput: ProductCreateInput) {
    createProduct(productCreateInput: $productCreateInput) {
      ... on ProductMutationResponse {
        product {
          ...ProductFragment
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

