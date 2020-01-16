
// Redux
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
// State Typings
import { ReduxStateLogin } from './login-reducer';
import { ReduxStateCart } from './cart-reducer';
import { ReduxStateModals } from './modals-reducer';
// Reducers
import { reduxReducerLogin } from "./login-reducer";
import { reduxReducerCart } from "./cart-reducer";
import { reduxReducerModals } from "./modals-reducer";



export const makeStore = (initialState, options) => {
    return createStore(
      combineReducers({
        reduxLogin: reduxReducerLogin,
        reduxCart: reduxReducerCart,
        reduxModals: reduxReducerModals,
      }),
      initialState,
      applyMiddleware(thunk),
    );
};


export interface GrandReduxState {
  reduxCart: ReduxStateCart;
  reduxLogin: ReduxStateLogin;
  reduxModals: ReduxStateModals;
}

