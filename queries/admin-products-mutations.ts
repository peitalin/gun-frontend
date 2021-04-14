import gql from "graphql-tag";
import { StorePrivateFragment, ProductFragment } from "./fragments";



export const SUSPEND_UNSUSPEND_PRODUCT = gql`
  mutation suspendUnsuspendProduct($productId: String!, $isSuspended: Boolean!) {
    suspendUnsuspendProduct(
      productId: $productId
      isSuspended: $isSuspended
    ) {
      product {
        ...ProductFragment
      }
    }
  }
  ${ProductFragment}
`;

export const SUSPEND_UNSUSPEND_STORE = gql`
  mutation suspendUnsuspendStore($storeId: String!, $isSuspended: Boolean!) {
    suspendUnsuspendStore(
      storeId: $storeId
      isSuspended: $isSuspended
    ) {
      store {
        ...StorePrivateFragment
      }
    }
  }
  ${StorePrivateFragment}
`;