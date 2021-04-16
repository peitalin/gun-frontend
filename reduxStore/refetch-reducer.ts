import { ActionType } from './actions'
import { reduxRefetchActions as A } from "./refetch-actions";
import { ApolloRefetch } from "layout/GetUser";


////// Refetch state reducer //////////
export interface ReduxStateRefetch {
  refetchUser: ApolloRefetch;
  refetchStore: ApolloRefetch;
  refetchProducts: ApolloRefetch;
  refetchFollowingStores: ApolloRefetch;
}

const initialRefetchState: ReduxStateRefetch = {
  refetchUser: () => console.log("uninitialized") as any,
  refetchStore: () => console.log("uninitialized") as any,
  refetchProducts: () => console.log("uninitialized") as any,
  refetchFollowingStores: () => console.log("uninitialized") as any,
}

export const reduxReducerRefetch = (
  state: ReduxStateRefetch = initialRefetchState,
  action: ActionType
): ReduxStateRefetch => {

  // console.info("ReduxRefetch payload: ", action.payload)

  switch ( action.type ) {

    case A.SET_REFETCH_USER().type: {
      return {
        ...state,
        refetchUser: action.payload
      }
    }

    case A.SET_REFETCH_STORE().type: {
      return {
        ...state,
        refetchStore: action.payload
      }
    }

    case A.SET_REFETCH_PRODUCTS().type: {
      return {
        ...state,
        refetchProducts: action.payload
      }
    }

    case A.SET_REFETCH_FOLLOWING_STORES().type: {
      return {
        ...state,
        refetchFollowingStores: action.payload
      }
    }

    default: {
      return state
    }
  }
}


