
import { ReduxStateCollections } from "./collections-reducer";
import { ActionType } from "./actions";
import {
  CollectionItem,
  CollectionItemsConnection,
  Collection,
} from "typings/gqlTypes";
import { } from "typings";
import { CollectionItemId } from "./collections-reducer";



export const reduxCollectionsActions = {

  SET_SELECTED_PRODUCT_EXTERNAL_PRODUCT_ID: (payload?: string): ActionType<string> => ({
    type: "SET_SELECTED_PRODUCT_EXTERNAL_PRODUCT_ID",
    payload: payload
  }),

  CLEAR_COLLECTIONS: (payload?: null): ActionType<null> => ({
    type: "CLEAR_COLLECTIONS",
    payload: payload
  }),

  SET_COLLECTIONS: (
    payload?: Collection[]
  ): ActionType<Collection[]> => ({
    type: "SET_COLLECTIONS",
    payload: payload
  }),

  ADD_COLLECTION_ITEM: (payload?: CollectionItemId): ActionType<CollectionItemId> => ({
    type: "ADD_COLLECTION_ITEM",
    payload: payload
  }),

  REMOVE_COLLECTION_ITEM: (payload?: CollectionItemId): ActionType<CollectionItemId> => ({
    type: "REMOVE_COLLECTION_ITEM",
    payload: payload
  }),

}
