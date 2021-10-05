// Redux
import { createStore, applyMiddleware, Store, combineReducers } from "redux";
import thunk from "redux-thunk";
// State Typings
import { ReduxStateLogin } from './login-reducer';
import { ReduxStateModals } from './modals-reducer';
import { ReduxStateProductCreate } from './product_create-reducer';
import { ReduxStateProductEdit } from './product_edit-reducer';
import { ReduxStateCollections } from './collections-reducer';
import { ReduxStateFollowingStores } from './following-stores-reducer';
import { ReduxStateRefetch } from './refetch-reducer';
import { ReduxStateConversation } from './conversation-reducer';
import { ReduxStatePaginatorVariables } from './paginator-variables-reducer';
import { ReduxStateImageSwap } from './image_swap-reducer';
// Reducers
import { reduxReducerLogin } from "./login-reducer";
import { reduxReducerModals } from "./modals-reducer";
import { reduxReducerProductCreate } from "./product_create-reducer";
import { reduxReducerProductEdit } from "./product_edit-reducer";
import { reduxReducerCollections } from "./collections-reducer";
import { reduxReducerFollowingStores } from "./following-stores-reducer";
import { reduxReducerRefetch } from "./refetch-reducer";
import { reduxReducerConversation } from "./conversation-reducer";
import { reduxReducerPaginatorVariables } from "./paginator-variables-reducer";
// Claim Reducers
import { reduxReducerImageSwap } from "./image_swap-reducer";


import { Actions } from "./actions";
export { Actions }


export const makeStore = (initialState) => {
  return createStore(
    combineReducers({
      reduxLogin: reduxReducerLogin,
      reduxModals: reduxReducerModals,
      reduxProductCreate: reduxReducerProductCreate,
      reduxProductEdit: reduxReducerProductEdit,
      reduxCollections: reduxReducerCollections,
      reduxFollowingStores: reduxReducerFollowingStores,
      reduxRefetch: reduxReducerRefetch,
      reduxConversation: reduxReducerConversation,
      reduxPaginatorVariables: reduxReducerPaginatorVariables,
      reduxImageSwap: reduxReducerImageSwap,
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
  reduxCollections: ReduxStateCollections;
  reduxFollowingStores: ReduxStateFollowingStores;
  reduxRefetch: ReduxStateRefetch;
  reduxConversation: ReduxStateConversation;
  reduxPaginatorVariables: ReduxStatePaginatorVariables;
  reduxImageSwap: ReduxStateImageSwap,
}


// import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
// // wrapper for next-redux-wrapper
// // https://github.com/kirill-konshin/next-redux-wrapper#installation
// export const wrapper = createWrapper<Store<GrandReduxState>>(makeStore, {debug: true});


