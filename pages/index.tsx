import React from "react";
import { oc as option } from "ts-optchain";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// GQL
import { GET_PRODUCT_CATEGORIES } from "queries/categories-queries";
// Typings
import { Categories } from "typings/gqlTypes";
// SSR
import { NextPage, NextPageContext } from 'next';
import dynamic from "next/dynamic";
// GraphQL
import { serverApolloClient } from "utils/apollo";
import FrontPage from "pageComponents/FrontPage";
// Redux
import { useSelector } from 'react-redux';
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { UserPrivate } from "typings/gqlTypes";
import { useApolloClient, ApolloClient } from "@apollo/client";
import { categoryPreviewsBackup } from "components/CategoryCarouselStart/utils";



const HomePage: NextPage<ReactProps> = (props) => {
  return (
    <FrontPage initialCategories={props.initialCategories}/>
  )
}


const styles = (theme: Theme) => createStyles({
  root: {},
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  initialCategories: Categories[];
}
interface QueryData1 {
  getProductCategories: Categories[];
}
interface QueryVar1 {
  slug?: string;
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

HomePage.getInitialProps = async (ctx: Context) => {

  // Will trigger this getInitialProps when requesting route /pages/ProductGallery
  // otherwise initialProps may be fed via /pages/index.tsx's getInitialProps
  const aClient = serverApolloClient(ctx);
  const emptyConnection = { pageInfo: {}, edges: [] };

  try {

    // const { data } = await aClient.query<QueryData1, QueryVar1>({
    //   query: GET_PRODUCT_CATEGORIES,
    // })
    // let initialCategories = data?.getProductCategories ?? categoryPreviewsBackup as any;
    let initialCategories: Categories[] = categoryPreviewsBackup as any;

    return {
      initialCategories: initialCategories,
      classes: undefined,
    };

  } catch(e) {
    return {
      initialCategories: [],
      classes: undefined,
    };
  }
}


export default withStyles(styles)( HomePage );






