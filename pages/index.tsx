import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// GQL
import { GET_PAGE_CONFIG_BY_PATH } from "queries/page_configs-queries";
// Typings
import { PageConfig, Categories } from "typings/gqlTypes";
// SSR
import { NextPage, NextPageContext } from 'next';
import dynamic from "next/dynamic";
// GraphQL
import { serverApolloClient } from "utils/apollo";
import FrontPage from "pageComponents/FrontPage";
import { useApolloClient, ApolloClient } from "@apollo/client";
import { categoryPreviewsBackup } from "components/CategoryCarouselStart/utils";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";



const HomePage: NextPage<ReactProps> = (props) => {
  return (
    <>
      <MetaHeadersPage
        title="gunmarketplace.com.au - Buy and sell firearms safely"
        ogTitle="gunmarketplace.com.au - Buy and sell firearms safely"
        description={`
          Gun Marketplace is a marketplace for buying and selling firearms
        `}
        ogDescription={`
          Gun Marketplace is a marketplace for buying and selling firearms
        `}
      />
      <FrontPage
        pageConfig={props.pageConfig}
        initialCategories={props.initialCategories}
        // initialDarkMode={props.initialDarkMode}
      />
    </>
  )
}


const styles = (theme: Theme) => createStyles({
  root: {},
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  initialCategories: Categories[];
  // initialDarkMode: "dark" | "light";
  pageConfig: PageConfig;
}
interface QueryData1 {
  getPageConfig: PageConfig;
}
interface QueryVar1 {
  urlPath: string;
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

HomePage.getInitialProps = async (ctx: Context) => {

  // Will trigger this getInitialProps when requesting route /pages/ProductGallery
  // otherwise initialProps may be fed via /pages/index.tsx's getInitialProps
  const aClient = serverApolloClient(ctx);

  try {

    const { data } = await aClient.query<QueryData1, QueryVar1>({
      query: GET_PAGE_CONFIG_BY_PATH,
      variables: {
        urlPath: "/"
      }
    })
    console.log("2pageConfig: ", data?.getPageConfig)

    // let initialCategories = data?.getProductCategories ?? categoryPreviewsBackup as any;
    let initialCategories: Categories[] = categoryPreviewsBackup as any;

    return {
      initialCategories: initialCategories,
      pageConfig: data?.getPageConfig,
      classes: undefined,
    };

  } catch(e) {
    return {
      initialCategories: [],
      pageConfig: undefined,
      classes: undefined,
    };
  }
}


export default withStyles(styles)( HomePage );






