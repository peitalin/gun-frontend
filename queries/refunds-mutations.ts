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