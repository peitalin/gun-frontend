import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// GQL
import { GET_PAGE_CONFIG_BY_PATH } from "queries/page_configs-queries";
// Typings
import { PageConfig } from "typings/gqlTypes";
// SSR
import { NextPage, NextPageContext } from 'next';
// GraphQL
import { serverApolloClient } from "utils/apollo";
import PromoteListings from "pageComponents/PromoteListings";
import { useApolloClient, ApolloClient } from "@apollo/client";



const PromoteListingsSSR: NextPage<ReactProps> = (props) => {
  return (
    <PromoteListings
      pageConfig={props.pageConfig}
    />
  )
}


const styles = (theme: Theme) => createStyles({
  root: {},
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
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

PromoteListingsSSR.getInitialProps = async (ctx: Context) => {

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

    return {
      pageConfig: data?.getPageConfig,
      classes: undefined,
    };

  } catch(e) {
    return {
      pageConfig: undefined,
      classes: undefined,
    };
  }
}


export default withStyles(styles)( PromoteListingsSSR );






