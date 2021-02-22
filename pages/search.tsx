import React from "react";
// Typings
import { Product, ProductsConnection } from "typings/gqlTypes";
import { SEARCH_ALL_PRODUCTS } from "queries/search-queries";
// Utils
import { Colors } from "layout/AppTheme";
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient } from "@apollo/client";
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
      <Search initialSearch={undefined}/>
    </>
  )
}

interface ReactProps {
}
interface QueryData {
  search: ProductsConnection;
}
interface QueryVar {
  searchTerm: string;
  pageNumber: number;
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<object>;
}

SearchResults.getInitialProps = async (ctx: Context) => {

  const searchTerm = decodeURIComponent(ctx.query.q as string);

  try {
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
    return {
      // initialSearch: data.search || {
      //   pageInfo: {
      //     pageNumber: 0,
      //     isLastPage: true
      //   },
      //   edges: []
      // },
      initialSearch: {
        pageInfo: {
          pageNumber: 0,
          isLastPage: true
        },
        edges: []
      },
    };

  } catch(e) {
    return {
      initialSearch: {
        pageInfo: {
          pageNumber: 0,
          isLastPage: true
        },
        edges: []
      },
    };
  }
}

export default SearchResults;



