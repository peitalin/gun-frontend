// The purpose of this file is to map imports to make the other pricing files more portable (they import this).
// This file shouldn't be copied between repos because it should point to where these types can be found, specific to the repo

import {
  ProductVariant,
  Discount,
  Price,
  Product,
  ID,
  PriceDetails,
  Cart,
  CartItem,
  PriceDetailsDiscountBreakdown,
  StockLevel
} from "typings/gqlTypes";

// Have to export aliases instead of re-exporting the type above because TS won't let you when isolatedModules is true
export type ProductVariant = ProductVariant;
export type Discount = Discount;
export type Price = Price;
export type Product = Product;
export type ID = ID;
export type PriceDetails = PriceDetails;
export type Cart = Cart;
export type CartItem = CartItem;
export type PriceDetailsDiscountBreakdown = PriceDetailsDiscountBreakdown;
export type StockLevel = StockLevel;

// Re-exporting functions and enums is fine tho
export { filterUnique } from "utils/misc";
export {
  DiscountScope,
  DiscountModifier,
  PaymentProcessor,
  CartItemPurchasableStatus,
  DiscountUnavailableRule
} from "typings/gqlTypes";

export interface CartWithoutPricing {
  id: ID;
  userId: ID;
  updatedAt: Date;
  items: CartItem[];
  relevantPromoCodes: Array<Discount>;
}
