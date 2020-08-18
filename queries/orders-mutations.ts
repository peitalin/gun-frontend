import gql from "graphql-tag";
// import { OrderFragment } from "./fragments";
import {
  OrderStatus
} from "typings/gqlTypes";
type Order = any;
import {
  ProductFragment,
  // OrderFragment,
  PaymentMethodFragment,
  ImageFragment,
} from "./fragments";
import {
  OrderFragment,
} from "./orders-queries";


export const REMOVE_FORM_10 = gql`
  mutation(
    $orderId: String!
    $currentSnapshotId: String!
  ) {
    update_orders(
      where: {id: {_eq: $orderId}},
      _set: {currentSnapshotId: $currentSnapshotId}
    ) {
      returning {
        id
      }
    }

    insert_order_snapshots_one(object: {
      id: $currentSnapshotId,
      orderId: $orderId,
      orderStatus: "CONFIRMED_PAYMENT_FORM_10_REQUIRED",
      form10ImageId: null,
    }) {
      id
      orderId
    }
  }
`;



export const ADD_FORM_10 = gql`
  mutation(
    $orderId: String!
    $currentSnapshotId: String!
    $form10ImageId: String!
  ) {
    update_orders(
      where: {id: {_eq: $orderId}},
      _set: {currentSnapshotId: $currentSnapshotId}
    ) {
      returning {
        id
      }
    }

    insert_order_snapshots_one(object: {
      id: $currentSnapshotId,
      orderId: $orderId,
      orderStatus: "FORM_10_SUBMITTED",
      form10ImageId: $form10ImageId,
    }) {
      id
      orderId
    }
  }
`;



export const APPROVE_FORM_10 = gql`
  mutation(
    $orderId: String!
    $currentSnapshotId: String!
    $form10ImageId: String!
    $adminApproverId: String!
  ) {
    update_orders(
      where: {id: {_eq: $orderId}},
      _set: {currentSnapshotId: $currentSnapshotId}
    ) {
      returning {
        id
      }
    }

    insert_order_snapshots_one(object: {
      id: $currentSnapshotId,
      orderId: $orderId,
      orderStatus: "ADMIN_APPROVED",
      form10ImageId: $form10ImageId,
      adminApproverId: $adminApproverId,
    }) {
      id
      orderId
    }
  }
`;


















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
