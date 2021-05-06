
import { ActionType } from "./actions";
import { ID, ConnectionQuery } from "typings/gqlTypes";


export type PaginatorVariables = {
  searchTerm?: string
  query?: ConnectionQuery
}


export const reduxPaginatorVariablesActions = {

  SET_NEW_PRODUCTS_VARIABLES: (
    payload?: PaginatorVariables
  ): ActionType<PaginatorVariables> => ({
    type: "SET_NEW_PRODUCTS_VARIABLES",
    payload: payload
  }),

  SET_DASHBOARD_PRODUCTS_VARIABLES: (
    payload?: PaginatorVariables
  ): ActionType<PaginatorVariables> => ({
    type: "SET_NEW_PRODUCTS_VARIABLES",
    payload: payload
  }),

  SET_ORDERS_CREATED_VARIABLES: (
    payload?: PaginatorVariables
  ): ActionType<PaginatorVariables> => ({
    type: "SET_ORDERS_CREATED_VARIABLES",
    payload: payload
  }),

  SET_ORDERS_PENDING_APPROVAL_VARIABLES: (
    payload?: PaginatorVariables
  ): ActionType<PaginatorVariables> => ({
    type: "SET_ORDERS_PENDING_APPROVAL_VARIABLES",
    payload: payload
  }),

  SET_ORDERS_ADMIN_APPROVED_VARIABLES: (
    payload?: PaginatorVariables
  ): ActionType<PaginatorVariables> => ({
    type: "SET_ORDERS_ADMIN_APPROVED_VARIABLES",
    payload: payload
  }),
}
