import gql from "graphql-tag";
import { OrdersFragment } from "./fragments";


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


export const CANCEL_PAYMENT_INTENT_3DS_FAILURE = gql`
  mutation cancelPaymentIntent3dsFailure(
    $paymentIntentId: String!
  ) {
    cancelPaymentIntent3dsFailure(
      paymentIntentId: $paymentIntentId,
    ) {
      status
      success
    }
  }
`;