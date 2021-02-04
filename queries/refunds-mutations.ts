import gql from "graphql-tag";
import { OrdersFragment } from "./fragments";

export const REFUND_ORDER = gql`
  mutation refundOrder(
    $orderId: String!
    $reason: String
    $reasonDetails: String
  ) {
    refundOrder(
      orderId: $orderId,
      reason: $reason,
      reasonDetails: $reasonDetails,
    ) {
      order {
        ...OrdersFragment
      }
    }
  }
  ${OrdersFragment}
`;


export const CANCEL_ORDER_AND_PAYMENT = gql`
  mutation cancelOrderAndPayment(
    $orderId: String!
    $markProductAbandoned: Boolean
  ) {
    cancelOrderAndPayment(
      orderId: $orderId,
      markProductAbandoned: $markProductAbandoned,
    ) {
      order {
        ...OrdersFragment
      }
    }
  }
  ${OrdersFragment}
`;