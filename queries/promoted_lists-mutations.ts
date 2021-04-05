import gql from "graphql-tag";
import { ProductFragment } from "./fragments";





export const PURCHASE_PROMOTION = gql`
  mutation purchasePromotion(
    $promotedListItemId: String!
    $productId: String!
    $total: Int!
    $buyerId: String!
    $stripeAuthorizePaymentData: String!
    $currency: String
    $bidId: String
  ) {
    purchasePromotion(
      promotedListItemId: $promotedListItemId
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
        promotedListItemId
        createdAt
        total
        fees
        currency
        paymentIntentId
      }
      promotedListItem {
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
      }
      stripePaymentIntent
    }
  }
  ${ProductFragment}
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
//         promotedListItemId
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