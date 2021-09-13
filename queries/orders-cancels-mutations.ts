import gql from "graphql-tag";
import { OrdersGovFragment } from "./fragments";


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
        ...OrdersGovFragment
      }
    }
  }
  ${OrdersGovFragment}
`;


export const CANCEL_PAYMENT_INTENT_FAILURE = gql`
  mutation cancelPaymentIntentFailure(
    $paymentIntentId: String!
  ) {
    cancelPaymentIntentFailure(
      paymentIntentId: $paymentIntentId,
    ) {
      status
      success
    }
  }
`;