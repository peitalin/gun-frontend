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
    $stripeAuthorizePaymentData: String!
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
      stripeAuthorizePaymentData: $stripeAuthorizePaymentData
      bidId: $bidId
    ) {
      unconfirmedOrder {
        ...OrdersFragment
      }
      stripePaymentIntent
    }
  }
  ${OrdersFragment}
`;

export const CAPTURE_PAYMENT_FOR_ORDER = gql`
  mutation capturePaymentForOrder(
    $orderId: String!
    $stripeConfirmPaymentData: String!
  ) {
    capturePaymentForOrder(
      orderId: $orderId
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


export const UNAPPROVE_FORM_10 = gql`
  mutation unapproveForm10(
    $orderId: String!
    $adminApproverId: String!
  ) {
    unapproveForm10(
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


export const REVISE_AND_RESUBMIT_FORM_10 = gql`
  mutation reviseAndResubmitForm10(
    $orderId: String!
    $adminApproverId: String!
  ) {
    reviseAndResubmitForm10(
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




export const MARK_PAYOUTS_AS_PAID = gql`
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



export const REFUND_ORDER = gql`
  mutation createOrder(
    $orderId: String!
    $reason: String
    $reasonDetails: String
  ) {
    refundOrder(
      orderId: $orderId
      reason: $reason
      reasonDetails: $reasonDetails
    ) {
      order {
        ...OrdersFragment
      }
    }
  }
  ${OrdersFragment}
`;
