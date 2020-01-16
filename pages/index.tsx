import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Typings
import { Connection, Product, ProductsConnection } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from 'components/ErrorBounds';
import Loading from "components/Loading";
// SSR
import { NextPage, NextPageContext } from 'next';
import ApolloClient from "apollo-client";
import dynamic from "next/dynamic";
// GraphQL
import { serverApolloClient } from "utils/apollo";
import {
  GET_RECOMMENDED_PRODUCTS,
  GET_DEALS_ENDING_SOON_PRODUCTS,
  GET_LIMITED_RELEASE_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY,
} from "queries/products-queries";
// Main components
import ProductGallery from "pageComponents/ProductGallery";



const FrontPage: NextPage<ReactProps> = (props) => {

  // from getInitialProps
  const initialProductsRecommended = props.initialProductsRecommended;
  const initialProductsDealsEndingSoon = props.initialProductsDealsEndingSoon;
  const initialProductsLimitedRelease = props.initialProductsLimitedRelease;

  return (
    <ProductGallery
      initialProductsRecommended={initialProductsRecommended}
      initialProductsDealsEndingSoon={initialProductsDealsEndingSoon}
      initialProductsLimitedRelease={initialProductsLimitedRelease}
    />
  )
}


const styles = (theme: Theme) => createStyles({
  root: {},
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  initialProductsRecommended?: ProductsConnection;
  initialProductsDealsEndingSoon?: ProductsConnection;
  initialProductsLimitedRelease?: ProductsConnection;
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

FrontPage.getInitialProps = async (ctx: Context) => {

  // Will trigger this getInitialProps when requesting route /pages/ProductGallery
  // otherwise initialProps may be fed via /pages/index.tsx's getInitialProps
  const aClient = serverApolloClient(ctx);
  const emptyConnection = { pageInfo: {}, edges: [] };

  try {
    // const req1 = aClient.query({
    //   query: GET_RECOMMENDED_PRODUCTS,
    //   variables: {
    //     query: {
    //       count: 6,
    //       cursor: null,
    //       pageBackwards: false,
    //       sortAscending: false,
    //     }
    //   }
    // });

    // const req2 = aClient.query({
    //   query: GET_DEALS_ENDING_SOON_PRODUCTS,
    //   variables: {
    //     query: {
    //       count: 5,
    //       cursor: null,
    //       pageBackwards: false,
    //       sortAscending: false,
    //     }
    //   }
    // });

    // const req3 = aClient.query({
    //   query: GET_LIMITED_RELEASE_PRODUCTS,
    //   variables: {
    //     query: {
    //       count: 5,
    //       cursor: null,
    //       pageBackwards: false,
    //       sortAscending: false,
    //     }
    //   }
    // });

    // const [res1, res2, res3] = await Promise.all([req1, req2, req3]);
    // const [res1] = await Promise.all([req1]);
    // console.log('===============')
    // console.log('getInitialProps Products: ', res1.data);
    // console.log('===============')
    // console.log('getInitialProps Products: ', res2.data);
    // console.log('===============')
    // console.log('getInitialProps Products: ', res3.data);
    // console.log('===============')

    // return props
    return {
      // initialProductsDealsEndingSoon: res2.data.productsDealsEndingSoonConnection
      //   || emptyConnection,
      // initialProductsLimitedRelease: res2.data.productsDealsEndingSoonConnection
      //   || emptyConnection,
      // initialProductsLimitedRelease: res3.data.initialProductsLimitedRelease

      // initial load uses the same data, then client will refetch
      // initialProductsRecommended: res1.data.productsRecommendedConnection,
      // initialProductsDealsEndingSoon: res1.data.productsRecommendedConnection,
      // initialProductsLimitedRelease: res1.data.productsRecommendedConnection,

      // initialProductsDealsEndingSoon: res2.data.productsDealsEndingSoonConnection
      //   || emptyConnection,
      // initialProductsLimitedRelease: res2.data.productsDealsEndingSoonConnection
      //   || emptyConnection,
      // initialProductsLimitedRelease: res3.data.initialProductsLimitedRelease

      initialProductsRecommended: emptyConnection,
      initialProductsDealsEndingSoon: emptyConnection,
      initialProductsLimitedRelease: emptyConnection,
      classes: undefined,
    } as any;

  } catch(e) {
    console.error('getInitialProps Products Err: ', e);
    return {
      initialProductsRecommended: emptyConnection,
      initialProductsDealsEndingSoon: emptyConnection,
      initialProductsLimitedRelease: emptyConnection,
      classes: undefined,
    };
  }
}


export default withStyles(styles)( FrontPage );






