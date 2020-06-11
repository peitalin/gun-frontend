import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Utils Components
import ErrorBounds from 'components/ErrorBounds';
import Loading from "components/Loading";
// SSR
import { NextPage, NextPageContext } from 'next';
import ApolloClient from "apollo-client";
import dynamic from "next/dynamic";
// GraphQL
import { serverApolloClient } from "utils/apollo";
import FrontPage from "pageComponents/FrontPage";



const HomePage: NextPage<ReactProps> = (props) => {

  return (
    <div>
      <FrontPage/>
    </div>
  )
}


const styles = (theme: Theme) => createStyles({
  root: {},
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
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

    return {
      classes: undefined,
    } as any;

  } catch(e) {
    return {
      classes: undefined,
    };
  }
}


export default withStyles(styles)( HomePage );






