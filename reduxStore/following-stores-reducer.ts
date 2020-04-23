import { ActionType } from './actions';
import { ID } from "typings/gqlTypes";
import { reduxFollowingStoresActions as A } from "./following-stores-actions";


////// FollowingStore state reducer //////////
export interface ReduxStateFollowingStores {
  followingStoresIds: string[];
}

const initialFollowingStoresState: ReduxStateFollowingStores = {
  followingStoresIds: [],
}

export const reduxReducerFollowingStores = (
  state: ReduxStateFollowingStores = initialFollowingStoresState,
  action: ActionType
): ReduxStateFollowingStores => {

  console.log("ReduxFollowingStore payload: ", action.payload)

  switch ( action.type ) {

    case A.SET_FOLLOWING_STORES().type: {
      const followingStoresIds: ID[] = action.payload;
      return {
        followingStoresIds: followingStoresIds
      }
    }

    case A.FOLLOW_STORE().type: {

      const storeId = action.payload;
      const alreadyExists = state.followingStoresIds.findIndex(sid => {
        return storeId === sid
      }) >= 0; // -1 if not found

      return {
        ...state,
        followingStoresIds: [
          ...state.followingStoresIds,
          ...(alreadyExists ? [] : [storeId])
        ]
      }
    }

    case A.UNFOLLOW_STORE().type: {

      const storeId = action.payload;
      const newFollowingStores = state.followingStoresIds.filter(sid => {
        return storeId !== sid
      })

      return {
        ...state,
        followingStoresIds: newFollowingStores
      }
    }

    default: {
      return state
    }
  }
}


