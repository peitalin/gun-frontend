import React from "react";
import {oc as option} from "ts-optchain";
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient } from "@apollo/client";
import { serverApolloClient } from "utils/apollo";

import { UserPrivate, Connection, OrdersConnection } from "typings/gqlTypes";
// Typings
import {
  GET_BUYER_ORDERS_CONNECTION,
  GET_SELLER_ORDERS_CONNECTION,
} from "queries/orders-queries";
import MyOrders from "pageComponents/MyOrders";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";




const MyOrdersPage: NextPage<ReactProps> = (props) => {
  return (
    <>
      <MetaHeadersPage
        title="My Downloads - Relay Downloads"
      />
      <MyOrders
        initialBuyerOrders={props.initialBuyerOrders}
        initialSellerOrders={props.initialSellerOrders}
      />
    </>
  )
}

interface QueryData {
  user: UserPrivate
}
interface QueryVar {
}

interface ReactProps {
  initialBuyerOrders: OrdersConnection;
  initialSellerOrders: OrdersConnection;
}


////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<object>;
}

MyOrdersPage.getInitialProps = async (ctx: Context) => {

  try {
    // const { data } = await ctx.apolloClient.query<QueryData, QueryVar>({
    const bResponse = await serverApolloClient(ctx).query<QueryData, QueryVar>({
      query: GET_BUYER_ORDERS_CONNECTION,
    })
    const sResponse = await serverApolloClient(ctx).query<QueryData, QueryVar>({
      query: GET_SELLER_ORDERS_CONNECTION,
    })

    console.log('getInitialProps initialBuyingOrders: ', bResponse);
    // return props
    return {
      initialSellerOrders: option(sResponse).data.user.sellerOrdersConnection(),
      initialBuyerOrders: option(bResponse).data.user.buyerOrdersConnection(),
      classes: undefined,
    };
  } catch(e) {
    return {
      initialSellerOrders: undefined,
      initialBuyerOrders: undefined,
      classes: undefined,
    };
  }
}


export default MyOrdersPage;



