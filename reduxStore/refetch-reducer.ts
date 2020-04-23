import { ActionType } from './actions'
import { reduxRefetchActions as A } from "./refetch-actions";
import { ID } from "typings/gqlTypes";
import { oc as option } from "ts-optchain";


////// Refetch state reducer //////////
export interface ReduxStateRefetch {
  refetchUser?(): void;
  refetchProducts?(): void;
}

const initialRefetchState: ReduxStateRefetch = {
  refetchUser: () => console.log("uninitialized"),
  refetchProducts: () => console.log("uninitialized"),
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

    case A.SET_REFETCH_PRODUCTS().type: {
      return {
        ...state,
        refetchProducts: action.payload
      }
    }


    default: {
      return state
    }
  }
}


