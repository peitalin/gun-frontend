
import gql from "graphql-tag";
import { ProductFragment } from "./fragments";

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
    }
  }
`;


export const DELETE_PRODUCT = gql`
  mutation deleteProduct($productId: ID!) {
    deleteProduct(productId: $productId) {
      product {
        ...ProductFragment
      }
    }
  }
  ${ProductFragment}
`;