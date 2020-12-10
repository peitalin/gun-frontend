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
  mutation sendResetPasswordEmail($email: String!) {
    sendResetPasswordEmail(email: $email) {
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
  mutation sendTestPasswordChangedEmail($email: String) {
    sendTestPasswordChangedEmail(email: $email) {
      success
      status
    }
  }
`;

export const SEND_PAYOUT_DETAILS_CHANGED_EMAIL = gql`
  mutation sendPayoutDetailsChangedEmail($userId: String!) {
    sendPayoutDetailsChangedEmail(userId: $userId) {
      success
      status
    }
  }
`;


export const SEND_CONFIRMED_PAYMENT_BUYER_EMAIL = gql`
  mutation sendConfirmedPaymentBuyerEmail($userId: String!) {
    sendConfirmedPaymentBuyerEmail(userId: $userId) {
      success
      status
    }
  }
`;

export const SEND_CONFIRMED_PAYMENT_SELLER_EMAIL = gql`
  mutation sendConfirmedPaymentSellerEmail($userId: String!) {
    sendConfirmedPaymentSellerEmail(userId: $userId) {
      success
      status
    }
  }
`;

export const SEND_CONFIRMED_PAYMENT_ADMIN_EMAIL = gql`
  mutation sendConfirmedPaymentAdminEmail {
    sendConfirmedPaymentAdminEmail {
      success
      status
    }
  }
`;

export const SEND_REFUNDED_BUYER_EMAIL = gql`
  mutation sendRefundedBuyerEmail($userId: String!) {
    sendRefundedBuyerEmail(userId: $userId) {
      success
      status
    }
  }
`;

export const SEND_REFUNDED_SELLER_EMAIL = gql`
  mutation sendRefundedSellerEmail($userId: String!) {
    sendRefundedSellerEmail(userId: $userId) {
      success
      status
    }
  }
`;

export const SEND_REFUNDED_ADMIN_EMAIL = gql`
  mutation sendRefundedAdminEmail {
    sendRefundedAdminEmail {
      success
      status
    }
  }
`;


export const SEND_FORM10_REVISE_AND_RESUBMIT_SELLER_EMAIL = gql`
  mutation sendForm10ReviseAndResubmitSellerEmail($userId: String!) {
    sendForm10ReviseAndResubmitSellerEmail(userId: $userId) {
      success
      status
    }
  }
`;

export const SEND_FORM10_SUBMITTED_ADMIN_EMAIL = gql`
  mutation sendForm10SubmittedAdminEmail {
    sendForm10SubmittedAdminEmail {
      success
      status
    }
  }
`;


export const SEND_FORM10_APPROVED_BUYER_EMAIL = gql`
  mutation sendForm10ApprovedBuyerEmail($userId: String!) {
    sendForm10ApprovedBuyerEmail(userId: $userId) {
      success
      status
    }
  }
`;

export const SEND_FORM10_APPROVED_SELLER_EMAIL = gql`
  mutation sendForm10ApprovedSellerEmail($userId: String!) {
    sendForm10ApprovedSellerEmail(userId: $userId) {
      success
      status
    }
  }
`;

export const SEND_PAYOUT_COMPLETE_SELLER_EMAIL = gql`
  mutation sendPayoutCompleteSellerEmail($userId: String!) {
    sendPayoutCompleteSellerEmail(userId: $userId) {
      success
      status
    }
  }
`;
