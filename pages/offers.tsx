import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Utils Components
import ErrorBounds from 'components/ErrorBounds';
import Loading from "components/Loading";
// SSR
import { NextPage, NextPageContext } from 'next';
import dynamic from "next/dynamic";
// GraphQL
import { serverApolloClient } from "utils/apollo";
import ChatCenter from "pageComponents/ChatCenter";
// Redux
import { useSelector } from 'react-redux';
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { UserPrivate } from "typings/gqlTypes";
import gql from 'graphql-tag'
import { useApolloClient, ApolloClient } from "@apollo/client";



const OffersPage: NextPage<ReactProps> = (props) => {

  const apolloClient = useApolloClient()
  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );
  const userId = user?.id

  return (
    <div>
      <ChatCenter asModal={false} />
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

OffersPage.getInitialProps = async (ctx: Context) => {

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


export default withStyles(styles)( OffersPage );






