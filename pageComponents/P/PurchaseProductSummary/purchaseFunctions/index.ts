import {
  StripeError,
  PaymentIntent,
} from "@stripe/stripe-js";
import {
  Orders, OrderStatus,
  ID,
  ProductProductVariantId,
} from "typings/gqlTypes";
////////// EXPORT //////////

////////////////////////////
////////////////////////////
/// Common Typings
////////////////////////////
////////////////////////////

export interface StripeAuthorizePaymentData {
  paymentMethod: string;
  customerId?: string;
}

export interface StripeConfirmPaymentData {
  paymentIntent: any;
  customerId?: string;
}

export interface StripeConfirmResponse {
  paymentIntent?: PaymentIntent;
  error?: StripeError;
}


