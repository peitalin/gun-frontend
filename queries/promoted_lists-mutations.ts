import gql from "graphql-tag";
import { ProductFragment } from "./fragments";

export const PromotedSlotFragment = gql`
  fragment PromotedSlotFragment on PromotedSlot {
    id
    createdAt
    promotedListId
    productId
    product {
      ...ProductFragment
    }
    ownerId
    reservePrice
    isAvailableForPurchase
    expiresAt
    position
    isRandomFiller
    durationInHours
  }
  ${ProductFragment}
`;


export const EDIT_PROMOTED_SLOT = gql`
  mutation editPromotedSlot(
    $promotedSlotId: String!
    $isAvailableForPurchase: Boolean
    $reservePrice: Int
    $durationInHours: Int
  ) {
    editPromotedSlot(
      promotedSlotId: $promotedSlotId
      isAvailableForPurchase: $isAvailableForPurchase
      reservePrice: $reservePrice
      durationInHours: $durationInHours
    ) {
      ...PromotedSlotFragment
    }
  }
  ${PromotedSlotFragment}
`;



export const PURCHASE_PROMOTION = gql`
  mutation purchasePromotion(
    $promotedSlotId: String!
    $productId: String!
    $total: Int!
    $buyerId: String!
    $stripeAuthorizePaymentData: String!
    $currency: String
    $bidId: String
  ) {
    purchasePromotion(
      promotedSlotId: $promotedSlotId
      productId: $productId
      total: $total
      buyerId: $buyerId
      stripeAuthorizePaymentData: $stripeAuthorizePaymentData
      currency: $currency
      bidId: $bidId
    ) {
      promotionPurchase {
        id
        productId
        buyerId
        promotedListId
        promotedSlotId
        createdAt
        total
        fees
        currency
        paymentIntentId
      }
      promotedSlot {
        ...PromotedSlotFragment
      }
      stripePaymentIntent
    }
  }
  ${PromotedSlotFragment}
`;

////// combined this with CREATE_PROMOTION_PURCHASE
/////////////////
// export const CAPTURE_PAYMENT_FOR_PROMOTION_PURCHASE = gql`
//   mutation capturePaymentForPromotionPurchase(
//     $promotionPurchaseId: String!
//   ) {
//     capturePaymentForPromotionPurchase(
//       promotionPurchaseId: $promotionPurchaseId
//     ) {
//       promotionPurchase {
//         id
//         productId
//         buyerId
//         promotedListId
//         promotedSlotId
//         createdAt
//         total
//         fees
//         currency
//         paymentIntentId
//       }
//       stripePaymentIntent
//     }
//   }
// `;