import gql from "graphql-tag";
import { PaymentMethodFragment } from "./fragments";

export const GET_USER_PAYMENT_METHODS = gql`
  query getUserPaymentMethods {
    user {
      ... on UserPrivate {
        id
        paymentMethods {
          ... on PaymentMethod {
            ...PaymentMethodFragment
          }
        }
        defaultPaymentMethod {
          ... on PaymentMethod {
            ...PaymentMethodFragment
          }
        }
      }
    }
  }
  ${PaymentMethodFragment}
`;
