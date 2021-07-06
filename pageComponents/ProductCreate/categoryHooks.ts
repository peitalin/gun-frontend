import React from "react";
// Apollo
import { Categories } from "typings/gqlTypes";
import { ActionType } from "typings";
import { GET_CATEGORIES } from "queries/categories-queries";
import { useApolloClient } from "@apollo/client";



interface QueryData {
  categories: Categories[]
}

export const sortCategoriesByName = (a: Categories, b: Categories) => {
  let textA = a.name.toUpperCase();
  let textB = b.name.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

export const sortActionTypeByName = (a: ActionType, b: ActionType) => {
  let textA = a.toUpperCase();
  let textB = b.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

export const sortByName = (a: string, b: string) => {
  let textA = a.toUpperCase();
  let textB = b.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}