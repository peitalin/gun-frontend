import { ActionType } from "./actions"
import { reduxLoginActions as A } from "./login-actions";
// import { User, UserPrivate } from "typings/gqlTypes";
type UserPrivate = any;
type StorePrivate = any;


////// login state reducer //////////
export interface ReduxStateLogin {
  user?: UserPrivate
  status?: undefined | string;
  loading?: boolean;
  loggedIn?: boolean;
  error?: any;
  email?: string;
}


const initialLoginState: ReduxStateLogin = {
  user: undefined,
  status: "",
  loading: false,
  loggedIn: false,
  error: undefined,
  email: "",
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

    case A.UPDATE_LOGIN_STATUS().type: {
      return { ...state, status: action.payload }
    }

    case A.UPDATE_LOGIN_LOADING().type: {
      return { ...state, loading: action.payload }
    }

    case A.UPDATE_LOGIN_ERROR().type: {
      return { ...state, error: action.payload }
    }

    case A.UPDATE_LOGIN_EMAIL().type: {
      return { ...state, email: action.payload }
    }

    default: {
      return state
    }
  }
}


