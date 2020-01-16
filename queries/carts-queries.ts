import gql from "graphql-tag";
import { CartFragment, DiscountFragment } from "./fragments";

// Only used to update cart when user profile is already fetched
export const GET_USER_CART = gql`
  query getUserCart {
    user {
      id
      ... on UserPrivate {
        cart {
          ...CartFragment
        }
      }
    }
  }
  ${CartFragment}
`;

export const TRY_PROMO_CODE_FOR_LOGGED_OUT_CART = gql`
  query tryPromoCode(
    $code: String!
    $cartProductsInfo: [ProductProductVariantId!]!
  ) {
    tryPromoCode(code: $code, cartProductsInfo: $cartProductsInfo) {
      ...DiscountFragment
    }
  }
  ${DiscountFragment}
`;
