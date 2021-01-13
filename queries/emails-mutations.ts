import gql from "graphql-tag";
import { UserPrivateFragment } from "./fragments";


export const SEND_WELCOME_EMAIL = gql`
  mutation sendWelcomeEmail {
    sendWelcomeEmail {
      success
      status
    }
  }
`;

export const SEND_RESET_PASSWORD_EMAIL = gql`
  mutation sendResetPasswordEmail(
    $email: String!
  ) {
    sendResetPasswordEmail(
      email: $email
    ) {
      resetId
      emailSentTo
      status
    }
  }
`;

export const CONFIRM_RESET_PASSWORD = gql`
  mutation confirmResetPassword(
    $email: String!
    $expiresAt: Date!
    $resetId: String!
    $newPassword: String!
  ) {
    confirmResetPassword(
      email: $email
      expiresAt: $expiresAt
      resetId: $resetId
      newPassword: $newPassword
    ) {
      email
      resetId
      expiresAt
    }
  }
`;

export const SEND_TEST_PASSWORD_CHANGED_EMAIL = gql`
  mutation sendTestPasswordChangedEmail(
    $email: String
  ) {
    sendTestPasswordChangedEmail(
      email: $email
    ) {
      success
      status
    }
  }
`;

export const SEND_PAYOUT_DETAILS_CHANGED_EMAIL = gql`
  mutation sendPayoutDetailsChangedEmail(
    $userId: String!
  ) {
    sendPayoutDetailsChangedEmail(
      userId: $userId
    ) {
      success
      status
    }
  }
`;


export const SEND_CONFIRMED_PAYMENT_BUYER_EMAIL = gql`
  mutation sendConfirmedPaymentBuyerEmail(
    $userId: String!
    $orderId: String!
  ) {
    sendConfirmedPaymentBuyerEmail(
      userId: $userId
      orderId: $orderId
    ) {
      success
      status
    }
  }
`;

export const SEND_CONFIRMED_PAYMENT_SELLER_EMAIL = gql`
  mutation sendConfirmedPaymentSellerEmail(
    $userId: String!
    $orderId: String!
  ) {
    sendConfirmedPaymentSellerEmail(
      userId: $userId
      orderId: $orderId
    ) {
      success
      status
    }
  }
`;

export const SEND_CONFIRMED_PAYMENT_ADMIN_EMAIL = gql`
  mutation sendConfirmedPaymentAdminEmail(
    $orderId: String!
  ) {
    sendConfirmedPaymentAdminEmail(
      orderId: $orderId
    ) {
      success
      status
    }
  }
`;

export const SEND_CONFIRMED_PAYMENT_DEALER_EMAIL = gql`
  mutation sendConfirmedPaymentDealerEmail(
    $dealerId: String!
    $sellerId: String!
    $buyerId: String!
    $orderId: String!
  ) {
    sendConfirmedPaymentDealerEmail(
      dealerId: $dealerId
      sellerId: $sellerId
      buyerId: $buyerId
      orderId: $orderId
    ) {
      success
      status
    }
  }
`;


export const SEND_REFUNDED_BUYER_EMAIL = gql`
  mutation sendRefundedBuyerEmail(
    $userId: String!
    $orderId: String!
  ) {
    sendRefundedBuyerEmail(
      userId: $userId
      orderId: $orderId
    ) {
      success
      status
    }
  }
`;

export const SEND_REFUNDED_SELLER_EMAIL = gql`
  mutation sendRefundedSellerEmail(
    $userId: String!
    $orderId: String!
  ) {
    sendRefundedSellerEmail(
      userId: $userId
      orderId: $orderId
    ) {
      success
      status
    }
  }
`;


export const SEND_REFUNDED_ADMIN_EMAIL = gql`
  mutation sendRefundedAdminEmail(
    $orderId: String!
    $buyerEmail: String!
  ) {
    sendRefundedAdminEmail(
      orderId: $orderId
      buyerEmail: $buyerEmail
    ) {
      success
      status
    }
  }
`;


export const SEND_FORM10_REVISE_AND_RESUBMIT_SELLER_EMAIL = gql`
  mutation sendForm10ReviseAndResubmitSellerEmail(
    $userId: String!
    $orderId: String!
  ) {
    sendForm10ReviseAndResubmitSellerEmail(
      userId: $userId
      orderId: $orderId
    ) {
      success
      status
    }
  }
`;

export const SEND_FORM10_SUBMITTED_ADMIN_EMAIL = gql`
  mutation sendForm10SubmittedAdminEmail(
    $orderId: String!
    $sellerEmail: String!
  ) {
    sendForm10SubmittedAdminEmail(
      orderId: $orderId
      sellerEmail: $sellerEmail
    ) {
      success
      status
    }
  }
`;


export const SEND_FORM10_APPROVED_BUYER_EMAIL = gql`
  mutation sendForm10ApprovedBuyerEmail(
    $userId: String!
    $orderId: String!
  ) {
    sendForm10ApprovedBuyerEmail(
      userId: $userId
      orderId: $orderId
    ) {
      success
      status
    }
  }
`;

export const SEND_FORM10_APPROVED_SELLER_EMAIL = gql`
  mutation sendForm10ApprovedSellerEmail(
    $userId: String!
    $orderId: String!
  ) {
    sendForm10ApprovedSellerEmail(
      userId: $userId
      orderId: $orderId
    ) {
      success
      status
    }
  }
`;

export const SEND_PAYOUT_COMPLETE_SELLER_EMAIL = gql`
  mutation sendPayoutCompleteSellerEmail(
    $userId: String!
    $orderId: String!
  ) {
    sendPayoutCompleteSellerEmail(
      userId: $userId
      orderId: $orderId
    ) {
      success
      status
    }
  }
`;
