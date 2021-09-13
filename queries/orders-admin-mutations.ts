import gql from "graphql-tag";
import {
  OrdersGovFragment,
} from "./fragments";


// ADMIN ONLY
export const APPROVE_FORM_10 = gql`
  mutation approveForm10(
    $orderId: String!
  ) {
    approveForm10(
      orderId: $orderId
    ) {
      order {
        ...OrdersGovFragment
      }
    }
  }
  ${OrdersGovFragment}
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
        ...OrdersGovFragment
      }
    }
  }
  ${OrdersGovFragment}
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
        ...OrdersGovFragment
      }
    }
  }
  ${OrdersGovFragment}
`;



export const MARK_PAYOUTS_AS_PAID = gql`
  mutation markPayoutsAsPaid(
    $orderIds: [String!]!
    $payoutId: String!
  ) {
    markPayoutsAsPaid(
      orderIds: $orderIds
      payoutId: $payoutId
    ) {
      orders {
        ...OrdersGovFragment
      }
    }
  }
  ${OrdersGovFragment}
`;


