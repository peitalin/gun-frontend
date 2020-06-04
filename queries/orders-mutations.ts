import gql from "graphql-tag";
// import { OrderFragment } from "./fragments";
// import { Order } from "typings/gqlTypes";
type Order = any;


export interface CheckoutCartResponse {
  data?: {
    checkoutCart: {
      order: Order;
    };
  };
}

export const CHECKOUT_PRODUCTS = gql`
  mutation checkoutProducts(
    $productsInfo: [ProductProductVariantId!]!
    $promoCodesToAdd: [String!]
    $quotedPrice: Price!
    $paymentProcessorData: String!
  ) {
    checkoutProducts(
      productsInfo: $productsInfo
      promoCodesToAdd: $promoCodesToAdd
      quotedPrice: $quotedPrice
      paymentProcessorData: $paymentProcessorData
    ) {
      ... on OrderCreateMutationResponse {
        unconfirmedOrder {
          id
          # ...OrderFragment
        }
      }
    }
  }
`;
  // # ${OrderFragment}

export interface CheckoutProductsResponse {
  data?: {
    checkoutProducts: {
      order: Order;
    };
  };
}

export const CHECKOUT_CART_FOR_FRONTEND_PAYMENT = gql`
  mutation checkoutCartForFrontendPayment($quotedPrice: Price!) {
    checkoutCartForFrontendPayment(quotedPrice: $quotedPrice) {
      ... on OrderMutationResponse {
        order {
          id
        }
      }
    }
  }
`;
  // ${OrderFragment}

export interface CheckoutCartForFrontendPaymentResponse {
  data?: {
    checkoutCartForFrontendPayment: {
      order: Order;
    };
  };
}

export const CHECKOUT_PRODUCTS_FOR_FRONTEND_PAYMENT = gql`
  mutation checkoutProductsForFrontendPayment(
    $productsInfo: [ProductProductVariantId!]!
    $promoCodesToAdd: [String!]
    $quotedPrice: Price!
  ) {
    checkoutProductsForFrontendPayment(
      productsInfo: $productsInfo
      promoCodesToAdd: $promoCodesToAdd
      quotedPrice: $quotedPrice
    ) {
      ... on OrderMutationResponse {
        order {
          id
          # ...OrderFragment
        }
      }
    }
  }
`;
  // ${OrderFragment}

export interface CheckoutProductsForFrontendPaymentResponse {
  data: {
    checkoutProductsForFrontendPayment: {
      order: Order;
    };
  };
}

export const CONFIRM_ORDER_AFTER_FRONTEND_PAYMENT = gql`
  mutation confirmOrderAfterFrontendPayment(
    $orderId: ID!
    $paymentProcessorData: String!
  ) {
    confirmOrderAfterFrontendPayment(
      orderId: $orderId
      paymentProcessorData: $paymentProcessorData
    ) {
      ... on OrderMutationResponse {
        order {
          id
          # ...OrderFragment
        }
      }
    }
  }
`;
  // ${OrderFragment}

export interface ConfirmOrderAfterFrontendPaymentResponse {
  data?: {
    confirmOrderAfterFrontendPayment: {
      order: Order;
    };
  };
}
