
import { ActionType } from "./actions";
import { ID, FollowedStore } from "typings/gqlTypes";



export const reduxFollowingStoresActions = {

  SET_FOLLOWING_STORES: (
    payload?: ID[]
  ): ActionType<ID[]> => ({
    type: "SET_FOLLOWING_STORES",
    payload: payload
  }),

  FOLLOW_STORE: (payload?: ID): ActionType<ID> => ({
    type: "FOLLOW_STORE",
    payload: payload
  }),

  UNFOLLOW_STORE: (payload?: ID): ActionType<ID> => ({
    type: "UNFOLLOW_STORE",
    payload: payload
  }),

}
