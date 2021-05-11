
import { ReduxStateWatchlist } from "./watchlist-reducer";
import { ActionType } from "./actions";
import {
  WatchlistItem, ID, Connection,
  WatchlistItemsConnection,
} from "typings/gqlTypes";
import { GenericConnection } from "typings";
import { WatchlistItemId } from "./watchlist-reducer";



export const reduxWatchlistActions = {

  CLEAR_WATCHLIST: (payload?: null): ActionType<null> => ({
    type: "CLEAR_WATCHLIST",
    payload: payload
  }),

  SET_WATCHLIST: (
    payload?: GenericConnection<WatchlistItem>
  ): ActionType<GenericConnection<WatchlistItem>> => ({
    type: "SET_WATCHLIST",
    payload: payload
  }),

  ADD_WATCHLIST_ITEM: (payload?: WatchlistItemId): ActionType<WatchlistItemId> => ({
    type: "ADD_WATCHLIST_ITEM",
    payload: payload
  }),

  REMOVE_WATCHLIST_ITEM: (payload?: WatchlistItemId): ActionType<WatchlistItemId> => ({
    type: "REMOVE_WATCHLIST_ITEM",
    payload: payload
  }),

}
