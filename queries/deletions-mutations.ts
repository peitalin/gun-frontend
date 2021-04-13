
import gql from "graphql-tag";
import { ProductFragment, StorePrivateFragment } from "./fragments";

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount($password: String!) {
    deleteAccount(password: $password) {
      __typename
    }
  }
`;


export const DELETE_STORE = gql`
  mutation deleteStore($password: String!) {
    deleteStore(password: $password) {
      __typename
      store {
        ...StorePrivateFragment
      }
    }
  }
  ${StorePrivateFragment}
`;


export const DELETE_PRODUCT = gql`
  mutation deleteProduct($productId: String!) {
    deleteProduct(productId: $productId) {
      products {
        ...ProductFragment
      }
    }
  }
  ${ProductFragment}
`;