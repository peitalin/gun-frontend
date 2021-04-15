import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import { Store, ID, ConnectionQuery } from "typings/gqlTypes";
import StoreId from "pageComponents/S/StoreId";
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
        title={`${store?.name} - Purchase firearms on Gun Marketplace`}
        description={
          store?.bio
          ? `${store?.bio} — Purchase firearms by ${store?.name} on GM.`
          : `Purchase firearms by ${store?.name} on GM.`
        }
      />
      { store?.name ?? "Your Store" }
      <StoreId initialStore={props.initialStore}/>
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
  query?: ConnectionQuery;
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<object>;
}


// export async function getServerSideProps(ctx: Context) {

Stores.getInitialProps = async (ctx: Context) => {
// Stores.getInitialProps = async (ctx: Context) => {
// getInitialProps might be faster than getServerSideProps
// https://github.com/vercel/next.js/discussions/10930
// But, seems to make intiialProps undefined for SSR pages

  const storeId: string = ctx.query.storeId as any;
  // console.log('getInitialProps ctx: ', ctx.query);
  console.log('getInitialProps storeId: ', storeId);
  // // for blocking sleep.
  // const child_process = require("child_process");
  // const sleep = (seconds) => child_process.execSync(`sleep ${seconds}`);

  if (!storeId) {
    return {
      initialStore: null,
      classes: null,
    };
  }

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
        // initialStore: initialStore || { name: storeId },
        initialStore: null,
        classes: null,
    };

  } catch(e) {
    return {
        initialStore: null,
        classes: null,
    };
  }
}

export default Stores;



