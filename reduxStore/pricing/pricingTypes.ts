import { Discount, ID, CartItem } from "typings/gqlTypes";

export interface CartWithoutPricing {
  id: ID;
  userId: ID;
  updatedAt: Date;
  items: CartItem[];
  relevantPromoCodes: Array<Discount>;
}