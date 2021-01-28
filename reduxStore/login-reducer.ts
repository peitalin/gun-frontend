import { ActionType } from "./actions"
import { reduxLoginActions as A } from "./login-actions";
import { User, UserPrivate, StorePrivate } from "typings/gqlTypes";


////// login state reducer //////////
export interface ReduxStateLogin {
  user?: UserPrivate
  loggedIn?: boolean;
}


const initialLoginState: ReduxStateLogin = {
  user: undefined,
  loggedIn: false,
}

export const reduxReducerLogin = (
  state: ReduxStateLogin = initialLoginState,
  action: ActionType
): ReduxStateLogin => {

  // console.info("ReduxLogin payload: ", action.payload)

  switch ( action.type ) {

    case A.SET_USER().type: {
      return {
        ...state,
        user: action.payload
      }
    }

    case A.SET_USER_STORE().type: {
      return {
        ...state,
        user: {
          ...state.user,
          store: action.payload
        }
      }
    }

    case A.CLEAR_USER().type: {
      return initialLoginState
    }

    case A.UPDATE_LOGIN_STATE().type: {
      return { ...state, ...action.payload }
    }

    default: {
      return state
    }
  }
}


