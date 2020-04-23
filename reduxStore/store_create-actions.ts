
import { ReduxStateStoreCreate } from "./store_create-reducer";
import { ActionType } from "./actions";
import { Store } from "typings/gqlTypes";


export const reduxStoreCreateActions = {

  UPDATE_STORE: (payload?: ReduxStateStoreCreate): ActionType<ReduxStateStoreCreate> => ({
    type: "UPDATE_STORE",
    payload: payload
  }),

  UPDATE_NAME: (payload?: string): ActionType<string> => ({
    type: "UPDATE_NAME",
    payload: payload
  }),

  UPDATE_PROFILE_ID: (payload?: string): ActionType<string> => ({
    type: "UPDATE_PROFILE_ID",
    payload: payload
  }),

  UPDATE_COVER_ID: (payload?: string): ActionType<string> => ({
    type: "UPDATE_COVER_ID",
    payload: payload
  }),

  UPDATE_BIO: (payload?: string): ActionType<string> => ({
    type: "UPDATE_BIO",
    payload: payload
  }),

  UPDATE_WEBSITE: (payload?: string): ActionType<string> => ({
    type: "UPDATE_WEBSITE",
    payload: payload
  }),

}
