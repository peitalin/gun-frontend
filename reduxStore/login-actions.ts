
import { ReduxStateLogin } from "./login-reducer";
import { ActionType } from "./actions";
// import { UserPrivate, StorePrivate } from "typings/gqlTypes";

type UserPrivate = any;
type StorePrivate = any;

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
  }
