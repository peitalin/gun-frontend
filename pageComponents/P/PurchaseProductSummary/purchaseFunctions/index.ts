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

export interface StripeCreatePaymentData {
  paymentMethod: string;
  customerId?: string;
  savePaymentMethod?: boolean;
}

export interface StripeConfirmPaymentData {
  paymentIntent: any;
  customerId?: string;
}

export interface StripeConfirmResponse {
  paymentIntent?: PaymentIntent;
  error?: StripeError;
}


