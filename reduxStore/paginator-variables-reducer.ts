import { ActionType } from './actions';
import { ConnectionQuery, OrderBy } from "typings/gqlTypes";
import { reduxPaginatorVariablesActions as A } from "./paginator-variables-actions";
import { PaginatorVariables } from "./paginator-variables-actions";


export const orderByOptions = [
  { label: "Newest", value: { createdAt: OrderBy.DESC }},
  { label: "Oldest", value: { createdAt: OrderBy.ASC }},
  // { label: "Highest Price", value: { price: OrderBy.DESC }},
  // { label: "Lowest Price", value: { price: OrderBy.ASC }},
];


////// Paginator Connections variables state reducer //////////
export interface ReduxStatePaginatorVariables {
  newProductsVariables: PaginatorVariables
  dashboardProductsVariables: PaginatorVariables
}

const initialPaginatorVariablesState: ReduxStatePaginatorVariables = {
  newProductsVariables: {
    searchTerm: "",
    query: {
      limit: 12,
      offset: 0,
      orderBy: orderByOptions[0].value,
    },
  },
  dashboardProductsVariables: {
    searchTerm: "*",
    query: {
      limit: 12,
      offset: 0,
      orderBy: orderByOptions[0].value,
    },
  },
}


export const reduxReducerPaginatorVariables = (
  state: ReduxStatePaginatorVariables = initialPaginatorVariablesState,
  action: ActionType
): ReduxStatePaginatorVariables => {

  // console.log("ReduxFollowingStore payload: ", action.payload)

  switch ( action.type ) {

    case A.SET_NEW_PRODUCTS_VARIABLES().type: {
      const paginatorVariables: PaginatorVariables = action.payload;
      return {
        ...state,
        newProductsVariables: paginatorVariables,
      }
    }

    case A.SET_DASHBOARD_PRODUCTS_VARIABLES().type: {
      const paginatorVariables: PaginatorVariables = action.payload;
      return {
        ...state,
        dashboardProductsVariables: paginatorVariables,
      }
    }

    default: {
      return state
    }
  }
}


