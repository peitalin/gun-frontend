
// Redux
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
// State Typings
import { ReduxStateLogin } from './login-reducer';
import { ReduxStateModals } from './modals-reducer';
// Reducers
import { reduxReducerLogin } from "./login-reducer";
import { reduxReducerModals } from "./modals-reducer";



export const makeStore = (initialState, options) => {
    return createStore(
      combineReducers({
        reduxLogin: reduxReducerLogin,
        reduxModals: reduxReducerModals,
      }),
      initialState,
      applyMiddleware(thunk),
    );
};


export interface GrandReduxState {
  reduxLogin: ReduxStateLogin;
  reduxModals: ReduxStateModals;
}

