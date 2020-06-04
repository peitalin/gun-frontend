
import { ReduxStateRefetch } from "./refetch-reducer";
import { ActionType } from "./actions";
import { ID, Connection } from "typings/gqlTypes";

type refetchType = (v?: any) => {};

export const reduxRefetchActions = {

  SET_REFETCH_USER: (payload?: refetchType): ActionType<refetchType> => ({
    type: "SET_REFETCH_USER",
    payload: payload
  }),

  SET_REFETCH_STORE: (payload?: refetchType): ActionType<refetchType> => ({
    type: "SET_REFETCH_STORE",
    payload: payload
  }),

  SET_REFETCH_PRODUCTS: (payload?: refetchType): ActionType<refetchType> => ({
    type: "SET_REFETCH_PRODUCTS",
    payload: payload
  }),

  SET_REFETCH_FOLLOWING_STORES: (payload?: refetchType): ActionType<refetchType> => ({
    type: "SET_REFETCH_FOLLOWING_STORES",
    payload: payload
  }),

}
