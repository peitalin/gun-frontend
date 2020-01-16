
import { ReduxStateCart } from "./cart-reducer";
import { ActionType } from "./actions";
import { CartItem, Cart, ID } from "typings/gqlTypes";


export const reduxCartActions = {

  UPDATE_CART: (payload?: Cart): ActionType<Cart> => ({
    type: "UPDATE_CART",
    payload: payload
  }),

  CLEAR_CART: (payload?: null): ActionType<null> => ({
    type: "CLEAR_CART",
    payload: payload
  }),

  TOGGLE_CART_OPEN: (payload?: boolean): ActionType<boolean> => ({
    type: "TOGGLE_CART_OPEN",
    payload: payload
  }),

  SET_CART_STATUS: (payload?: string): ActionType<string> => ({
    type: "SET_CART_STATUS",
    payload: payload
  }),

  ADD_CART_ITEM: (payload?: CartItem): ActionType<CartItem> => ({
    type: "ADD_CART_ITEM",
    payload: payload
  }),

  REMOVE_CART_ITEM: (payload?: ID): ActionType<ID> => ({
    type: "REMOVE_CART_ITEM",
    payload: payload
  }),

}
