import gql from "graphql-tag";
import {
  OrdersDashboardFragment,
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
        ...OrdersDashboardFragment
      }
    }
  }
  ${OrdersDashboardFragment}
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
        ...OrdersDashboardFragment
      }
    }
  }
  ${OrdersDashboardFragment}
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
        ...OrdersDashboardFragment
      }
    }
  }
  ${OrdersDashboardFragment}
`;

export const REMOVE_FORM_10 = gql`
  mutation removeForm10(
    $orderId: String!
  ) {
    removeForm10(
      orderId: $orderId
    ) {
      order {
        ...OrdersDashboardFragment
      }
    }
  }
  ${OrdersDashboardFragment}
`;

