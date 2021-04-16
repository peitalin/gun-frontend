import { ActionType } from './actions'
import { reduxWishlistActions as A } from "./wishlist-actions";
import { WishlistItem, ID, Connection, WishlistItemsConnection } from "typings/gqlTypes";


////// Wishlist state reducer //////////
export interface ReduxStateWishlist {
  wishlistIds: WishlistItemId[];
}

export interface WishlistItemId {
  productId: ID;
  variantId: ID;
}

const initialWishlistState: ReduxStateWishlist = {
  wishlistIds: [],
}

export const reduxReducerWishlist = (
  state: ReduxStateWishlist = initialWishlistState,
  action: ActionType
): ReduxStateWishlist => {

  // console.info("ReduxWishlist payload: ", action.payload)

  switch ( action.type ) {

    case A.CLEAR_WISHLIST().type: {
      return {
        wishlistIds: []
      }
    }

    case A.SET_WISHLIST().type: {
      const wishlist: WishlistItemsConnection = action.payload;
      return {
        wishlistIds: (wishlist?.edges ?? []).map(w => {
          return {
            productId: w?.node?.product?.id,
            variantId: w?.node?.product?.featuredVariant?.variantId
          }
        })
      }
    }

    case A.ADD_WISHLIST_ITEM().type: {

      const wishlistItem: WishlistItemId = action.payload;
      const alreadyExists = state.wishlistIds.findIndex(w => {
        return wishlistItem.productId === w.productId &&
              wishlistItem.variantId === w.variantId
      }) >= 0; // -1 if not found

      return {
        ...state,
        wishlistIds: [
          ...state.wishlistIds,
          ...(alreadyExists ? [] : [wishlistItem])
        ]
      }
    }

    case A.REMOVE_WISHLIST_ITEM().type: {

      const wishlistItem: WishlistItemId = action.payload;
      const newWishlist = state.wishlistIds.filter(w => {
        return wishlistItem.productId !== w.productId ||
              wishlistItem.variantId !== w.variantId
      })

      return {
        ...state,
        wishlistIds: newWishlist
      }
    }

    default: {
      return state
    }
  }
}


