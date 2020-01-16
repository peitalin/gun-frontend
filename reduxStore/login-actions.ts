
import { ReduxStateLogin } from "./login-reducer";
import { ActionType } from "./actions";
import { UserPrivate, StorePrivate } from "typings/gqlTypes";

export const reduxLoginActions = {

    SET_USER: (payload?: UserPrivate): ActionType<UserPrivate> => ({
      type: "SET_USER",
      payload: payload
    }),

    SET_USER_STORE: (payload?: StorePrivate): ActionType<StorePrivate> => ({
      type: "SET_USER_STORE",
      payload: payload
    }),

    CLEAR_USER: (payload?: null): ActionType<null> => ({
      type: "CLEAR_USER",
      payload: payload
    }),

    UPDATE_LOGIN_STATE: (payload?: ReduxStateLogin): ActionType<any> => ({
      type: "UPDATE_LOGIN_STATE",
      payload: payload
    }),

    UPDATE_LOGIN_STATUS: (payload?: ReduxStateLogin): ActionType<any> => ({
      type: "UPDATE_LOGIN_STATUS",
      payload: payload
    }),

    UPDATE_LOGIN_LOADING: (payload?: ReduxStateLogin): ActionType<any> => ({
      type: "UPDATE_LOGIN_LOADING",
      payload: payload
    }),

    UPDATE_LOGIN_ERROR: (payload?: ReduxStateLogin): ActionType<any> => ({
      type: "UPDATE_LOGIN_ERROR",
      payload: payload
    }),

    UPDATE_LOGIN_EMAIL: (payload?: ReduxStateLogin): ActionType<any> => ({
      type: "UPDATE_LOGIN_EMAIL",
      payload: payload
    }),
  }
