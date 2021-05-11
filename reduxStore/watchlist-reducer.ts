import { ActionType } from './actions'
import { reduxWatchlistActions as A } from "./watchlist-actions";
import { WatchlistItem, ID, Connection, WatchlistItemsConnection } from "typings/gqlTypes";


////// Watchlist state reducer //////////
export interface ReduxStateWatchlist {
  watchlistIds: WatchlistItemId[];
}

export interface WatchlistItemId {
  productId: ID;
  variantId: ID;
}

const initialWatchlistState: ReduxStateWatchlist = {
  watchlistIds: [],
}

export const reduxReducerWatchlist = (
  state: ReduxStateWatchlist = initialWatchlistState,
  action: ActionType
): ReduxStateWatchlist => {

  // console.info("ReduxWatchlist payload: ", action.payload)

  switch ( action.type ) {

    case A.CLEAR_WATCHLIST().type: {
      return {
        watchlistIds: []
      }
    }

    case A.SET_WATCHLIST().type: {
      const watchlist: WatchlistItemsConnection = action.payload;
      return {
        watchlistIds: (watchlist?.edges ?? []).map(w => {
          return {
            productId: w?.node?.product?.id,
            variantId: w?.node?.product?.featuredVariant?.variantId
          }
        })
      }
    }

    case A.ADD_WATCHLIST_ITEM().type: {

      const watchlistItem: WatchlistItemId = action.payload;
      const alreadyExists = state.watchlistIds.findIndex(w => {
        return watchlistItem.productId === w.productId &&
              watchlistItem.variantId === w.variantId
      }) >= 0; // -1 if not found

      return {
        ...state,
        watchlistIds: [
          ...state.watchlistIds,
          ...(alreadyExists ? [] : [watchlistItem])
        ]
      }
    }

    case A.REMOVE_WATCHLIST_ITEM().type: {

      const watchlistItem: WatchlistItemId = action.payload;
      const newWatchlist = state.watchlistIds.filter(w => {
        return watchlistItem.productId !== w.productId ||
              watchlistItem.variantId !== w.variantId
      })

      return {
        ...state,
        watchlistIds: newWatchlist
      }
    }

    default: {
      return state
    }
  }
}


