import { ActionType } from "./actions"
import { reduxLoginActions as A } from "./login-actions";
import { User, UserPrivate, StorePrivate } from "typings/gqlTypes";


////// login state reducer //////////
export interface ReduxStateLogin {
  user?: UserPrivate;
  loggedIn?: boolean;
  darkMode?: "dark" | "light";
}


const initialLoginState: ReduxStateLogin = {
  user: undefined,
  loggedIn: false,
  darkMode: "light",
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

    case A.SET_DARK_MODE().type: {
      if (process.browser && !!window) {
        window?.localStorage?.setItem('gmDarkMode', "dark");
      }
      return {
        ...state,
        darkMode: "dark"
      }
    }

    case A.SET_LIGHT_MODE().type: {
      if (process.browser && !!window) {
        window?.localStorage?.setItem('gmDarkMode', "light");
      }
      return {
        ...state,
        darkMode: "light"
      }
    }

    case A.UPDATE_LOGIN_STATE().type: {
      return { ...state, ...action.payload }
    }

    default: {
      return state
    }
  }
}


