
import { ReduxStateWishlist } from "./wishlist-reducer";
import { ActionType } from "./actions";
import {
  WishlistItem, ID, Connection,
  WishlistItemsConnection,
} from "typings/gqlTypes";
import { GenericConnection, GenericPageBasedConnection } from "typings";
import { WishlistItemId } from "./wishlist-reducer";



export const reduxWishlistActions = {

  CLEAR_WISHLIST: (payload?: null): ActionType<null> => ({
    type: "CLEAR_WISHLIST",
    payload: payload
  }),

  SET_WISHLIST: (
    payload?: GenericConnection<WishlistItem>
  ): ActionType<GenericConnection<WishlistItem>> => ({
    type: "SET_WISHLIST",
    payload: payload
  }),

  ADD_WISHLIST_ITEM: (payload?: WishlistItemId): ActionType<WishlistItemId> => ({
    type: "ADD_WISHLIST_ITEM",
    payload: payload
  }),

  REMOVE_WISHLIST_ITEM: (payload?: WishlistItemId): ActionType<WishlistItemId> => ({
    type: "REMOVE_WISHLIST_ITEM",
    payload: payload
  }),

}
