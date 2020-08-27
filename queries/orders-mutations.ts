import gql from "graphql-tag";
import {
  OrdersFragment,
} from "./fragments";


export const ADD_FORM_10 = gql`
  mutation addForm10(
    $orderId: String!
    $form10ImageId: String!
  ) {
    addForm10(
      orderId: $orderId
      form10ImageId: $form10ImageId
    ) {
      order {
        ...OrdersFragment
      }
    }
  }
  ${OrdersFragment}
`;

export const REMOVE_FORM_10 = gql`
  mutation removeForm10(
    $orderId: String!
  ) {
    removeForm10(
      orderId: $orderId
    ) {
      order {
        ...OrdersFragment
      }
    }
  }
  ${OrdersFragment}
`;


export const APPROVE_FORM_10 = gql`
  mutation approveForm10(
    $orderId: String!
    $adminApproverId: String!
  ) {
    approveForm10(
      orderId: $orderId
      adminApproverId: $adminApproverId
    ) {
      order {
        ...OrdersFragment
      }
    }
  }
  ${OrdersFragment}
`;













