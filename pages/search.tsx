import React from "react";
// Utils
import { Colors } from "layout/AppTheme";
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient } from "@apollo/client";
import { serverApolloClient } from "utils/apollo";
// GraphQL
import { GET_PRODUCT_CATEGORIES } from "queries/categories-queries";
// Typings
import {
  ProductsConnection,
  Categories,
} from "typings/gqlTypes";
// Components
import Search from "pageComponents/Search";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";





const SearchResults: NextPage<ReactProps> = (props) => {
  return (
    <>
      <MetaHeadersPage
        title="Search for firearms"
        description={`
        `}
        ogTitle="Search firearms"
        ogDescription={`
        `}
        robots={"noindex"}
      />
      <Search
        initialSearch={undefined}
        initialRouteCategory={props.selectedCategory}
      />
    </>
  )
}

interface ReactProps {
  selectedCategory: Categories;
}

interface QueryData1 {
  getProductCategories: Categories[];
}
interface QueryVar1 {
  slug?: string;
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<object>;
}

SearchResults.getInitialProps = async (ctx: Context) => {

  const searchTerm = decodeURIComponent(ctx.query.q as string);
  const categorySlug: string = ctx.query.category as any
    || ctx.query.categorySlug as any;

  if (categorySlug) {

    try {

      const { data } = await serverApolloClient(ctx).query<QueryData1, QueryVar1>({
        query: GET_PRODUCT_CATEGORIES,
      })

      let selectedCategory = (data?.getProductCategories ?? []).find(s => {
        return s.slug === categorySlug
      })

      let categoryName = selectedCategory?.name
      console.log("selectedCategory: ", selectedCategory)

      // return props
      return {
        categoryName: categoryName,
        selectedCategory: selectedCategory,
      };
    } catch(e) {
      return {
        categoryName: "",
        selectedCategory: undefined,
      };
    }

  } else {
    return {
      categoryName: "",
      selectedCategory: undefined,
    };
  }

  // try {
    // const { data } = await ctx.apolloClient.query<QueryData, QueryVar>({
    //   query: SEARCH,
    //   variables: {
    //     // searchTerm: searchTerm || " ", // if no search term, don't error, return all.
    //     searchTerm: searchTerm,
    //     pageNumber: 1
    //   }
    // });
    // console.log('getInitialProps Search: ', data.search);
    // return props
    // return {
      // initialSearch: data.search || {
      //   pageInfo: {
      //     pageNumber: 0,
      //     isLastPage: true
      //   },
      //   edges: []
      // },
  //     initialSearch: {
  //       pageInfo: {
  //         pageNumber: 0,
  //         isLastPage: true
  //       },
  //       edges: []
  //     },
  //   };

  // } catch(e) {
  //   return {
  //     initialSearch: {
  //       pageInfo: {
  //         pageNumber: 0,
  //         isLastPage: true
  //       },
  //       edges: []
  //     },
  //   };
  // }
}

export default SearchResults;



