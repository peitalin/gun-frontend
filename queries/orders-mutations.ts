import gql from "graphql-tag";
import {
  OrdersFragment,
} from "./fragments";

export const CREATE_ORDER = gql`
  mutation createOrder(
    $productId: String!
    $productSnapshotId: String!
    $variantId: String!
    $variantSnapshotId: String!
    $total: Int!
    $buyerId: String!
    $sellerId: String!
    $bidId: String
  ) {
    createOrder(
      productId: $productId
      productSnapshotId: $productSnapshotId
      variantId: $variantId
      variantSnapshotId: $variantSnapshotId
      total: $total
      buyerId: $buyerId
      sellerId: $sellerId
      bidId: $bidId
    ) {
      order {
        ...OrdersFragment
      }
    }
  }
  ${OrdersFragment}
`;

export const CONFIRM_ORDER = gql`
  mutation confirmOrder(
    $orderId: String!
    $singleUseTokenId: String!
  ) {
    confirmOrder(
      orderId: $orderId
      singleUseTokenId: $singleUseTokenId
    ) {
      order {
        ...OrdersFragment
      }
    }
  }
  ${OrdersFragment}
`;


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




export const MARK_PAYOUT_AS_PAID = gql`
  mutation marktPayoutsAsPaid(
    $orderIds: [String!]!
    $payoutId: String!
  ) {
    markPayoutsAsPaid(
      orderIds: $orderIds
      payoutId: $payoutId
    ) {
      orders {
        ...OrdersFragment
      }
    }
  }
  ${OrdersFragment}
`;