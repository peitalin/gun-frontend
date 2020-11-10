import React from "react";
// Apollo
import { Categories } from "typings/gqlTypes";
import { ActionType } from "typings";
import { GET_PRODUCT_CATEGORIES } from "queries/categories-queries";
import { useApolloClient } from "@apollo/client";



export const useCategoriesList = () => {

  const aClient = useApolloClient();
  const [categories, setCategories] = React.useState([] as Categories[]);

  const staticCategories = [
    "Ammo",
    "Pistols",
    "Rifles",
    "Misc"
  ]

  React.useEffect(() => {
    if (categories.length < 1) {
      aClient.query<QueryData>({
        query: GET_PRODUCT_CATEGORIES
      }).then(({ data }: { data?: QueryData }) => {
        if (data && data.categories) {
          setCategories(
            data.categories
              .filter(c => !!c.name)
              .sort(sortCategoriesByName)
          )
        }
      }).catch(e => console.log("CategoryBar err: ", e))
    }
  }, [])

  return {
    categories,
    staticCategories
  }
}


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