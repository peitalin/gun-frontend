
// Redux
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
// State Typings
import { ReduxStateLogin } from './login-reducer';
import { ReduxStateModals } from './modals-reducer';
import { ReduxStateProductCreate } from './product_create-reducer';
import { ReduxStateProductEdit } from './product_edit-reducer';
import { ReduxStateWishlist } from './wishlist-reducer';
import { ReduxStateFollowingStores } from './following-stores-reducer';
import { ReduxStateRefetch } from './refetch-reducer';
import { ReduxStateConversation } from './conversation-reducer';
import { ReduxStatePaginatorVariables } from './paginator-variables-reducer';
// Reducers
import { reduxReducerLogin } from "./login-reducer";
import { reduxReducerModals } from "./modals-reducer";
import { reduxReducerProductCreate } from "./product_create-reducer";
import { reduxReducerProductEdit } from "./product_edit-reducer";
import { reduxReducerWishlist } from "./wishlist-reducer";
import { reduxReducerFollowingStores } from "./following-stores-reducer";
import { reduxReducerRefetch } from "./refetch-reducer";
import { reduxReducerConversation } from "./conversation-reducer";
import { reduxReducerPaginatorVariables } from "./paginator-variables-reducer";

import { Actions } from "./actions";
export { Actions }


export const makeStore = (initialState, options) => {
    return createStore(
      combineReducers({
        reduxLogin: reduxReducerLogin,
        reduxModals: reduxReducerModals,
        reduxProductCreate: reduxReducerProductCreate,
        reduxProductEdit: reduxReducerProductEdit,
        reduxWishlist: reduxReducerWishlist,
        reduxFollowingStores: reduxReducerFollowingStores,
        reduxRefetch: reduxReducerRefetch,
        reduxConversation: reduxReducerConversation,
        reduxPaginatorVariables: reduxReducerPaginatorVariables,
      }),
      initialState,
      applyMiddleware(thunk),
    );
};


export interface GrandReduxState {
  reduxLogin: ReduxStateLogin;
  reduxModals: ReduxStateModals;
  reduxProductCreate: ReduxStateProductCreate;
  reduxProductEdit: ReduxStateProductEdit,
  reduxWishlist: ReduxStateWishlist;
  reduxFollowingStores: ReduxStateFollowingStores;
  reduxRefetch: ReduxStateRefetch;
  reduxConversation: ReduxStateConversation;
  reduxPaginatorVariables: ReduxStatePaginatorVariables;
}

