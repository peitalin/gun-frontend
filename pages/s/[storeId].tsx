import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// import { styles } from "pageComponents/Stores/styles";
// GraphQL
// import { GET_STORE_PUBLIC_BY_ID_OR_SLUG } from "queries/store-queries";
// Typings
import { Store, ID, ConnectionOffsetQuery } from "typings/gqlTypes";
// import StoreId from "pageComponents/Stores/StoreId";
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient } from "@apollo/client";
import { serverApolloClient } from "utils/apollo";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";


const Stores = (props: ReactProps) => {

  const { initialStore: store } = props

  return (
    <>
      <MetaHeadersPage
        title={`${option(store).name()} - Download Digital Products - Relay Downloads`}
        description={
          option(store).bio()
          ? `${option(store).bio()} — Download digital products by ${option(store).name()} on Relay.`
          : `Download digital products by ${option(store).name()} on Relay.`
        }
      />
      { option(store).name() }
      {/* <StoreId initialStore={props.initialStore}/> */}
    </>
  )
}

// interface ReactProps extends WithStyles<typeof styles> {
//   initialStore: Store;
// }
interface ReactProps {
  initialStore: Store;
}
interface QueryData {
  getStoreByStoreIdOrSlug: Store;
}
interface QueryVar {
  storeIdOrSlug: ID;
  query?: ConnectionOffsetQuery;
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<object>;
}


export async function getServerSideProps(ctx: Context) {
// Stores.getInitialProps = async (ctx: Context) => {
// getInitialProps might be faster than getServerSideProps
// https://github.com/vercel/next.js/discussions/10930
// But, seems to make intiialProps undefined for SSR pages


  const storeId: string = ctx.query.storeId || ctx.query.storeIdOrSlug as any;
  // console.log('getInitialProps ctx: ', ctx.query);
  console.log('getInitialProps storeId: ', storeId);
  // // for blocking sleep.
  // const child_process = require("child_process");
  // const sleep = (seconds) => child_process.execSync(`sleep ${seconds}`);

  if (storeId) {
    try {
      // const { data } = await serverApolloClient(ctx).query<QueryData, QueryVar>({
      //   query: GET_STORE_PUBLIC_BY_ID_OR_SLUG,
      //   variables: {
      //     storeIdOrSlug: storeId,
      //     query: {
      //       limit: 8,
      //     }
      //   },
      // })
      // // let seconds = 1
      // // console.log(`sleeping for ${seconds} secs`);
      // // sleep(seconds)
      // let initialStore = data.getStoreByStoreIdOrSlug;
      // console.log('getInitialStore SSR: ', initialStore);

      return {
        props: {
          // initialStore: initialStore || { name: storeId },
          initialStore: null,
          classes: null,
        }
      };

    } catch(e) {
      return {
        props: {
          initialStore: null,
          classes: null,
        }
      };
    }
  } else {
    return {
      props: {
        initialStore: null,
        classes: null,
      }
    };
  }
}

export default Stores;



