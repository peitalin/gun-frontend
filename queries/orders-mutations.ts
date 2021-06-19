import gql from "graphql-tag";
import {
  OrdersFragment,
} from "./fragments";


export const AUTHORIZE_PAYMENT = gql`
  mutation authorizePayment(
    $productId: String!
    $total: Int!
    $internationalFee: Int!
    $buyerLicenseId: String!
    $stripeAuthorizePaymentData: String!
    $bidId: String
  ) {
    authorizePayment(
      productId: $productId
      total: $total
      internationalFee: $internationalFee
      buyerLicenseId: $buyerLicenseId
      stripeAuthorizePaymentData: $stripeAuthorizePaymentData
      bidId: $bidId
    ) {
      stripePaymentIntent
    }
  }
`;

export const CONFIRM_ORDER = gql`
  mutation confirmOrder(
    $productId: String!
    $total: Int!
    $internationalFee: Int!
    $buyerId: String!
    $buyerLicenseId: String!
    $sellerStoreId: String!
    $paymentIntentId: String!
    $bidId: String
  ) {
    confirmOrder(
      productId: $productId
      total: $total
      internationalFee: $internationalFee
      buyerId: $buyerId
      buyerLicenseId: $buyerLicenseId
      sellerStoreId: $sellerStoreId
      paymentIntentId: $paymentIntentId
      bidId: $bidId
    ) {
      confirmedOrder {
        ...OrdersFragment
      }
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
    $form10FileId: String!
  ) {
    addForm10(
      orderId: $orderId
      form10FileId: $form10FileId
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


// ADMIN ONLY
export const APPROVE_FORM_10 = gql`
  mutation approveForm10(
    $orderId: String!
  ) {
    approveForm10(
      orderId: $orderId
    ) {
      order {
        ...OrdersFragment
      }
    }
  }
  ${OrdersFragment}
`;


// ADMIN ONLY
export const UNAPPROVE_FORM_10 = gql`
  mutation unapproveForm10(
    $orderId: String!
  ) {
    unapproveForm10(
      orderId: $orderId
    ) {
      order {
        ...OrdersFragment
      }
    }
  }
  ${OrdersFragment}
`;


// ADMIN ONLY
export const REVISE_AND_RESUBMIT_FORM_10 = gql`
  mutation reviseAndResubmitForm10(
    $orderId: String!
  ) {
    reviseAndResubmitForm10(
      orderId: $orderId
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


