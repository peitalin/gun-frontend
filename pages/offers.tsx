import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// SSR
import { NextPage, NextPageContext } from 'next';
// GraphQL
import { serverApolloClient } from "utils/apollo";
import gql from 'graphql-tag'
import { useApolloClient, ApolloClient } from "@apollo/client";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import BiddingRoom from "pageComponents/BiddingRoom";

// next
import dynamic from "next/dynamic";
import { UserProfileProps } from "layout/GetUser/UserProfileWrapper";
const UserProfileWrapper = dynamic(() => import("layout/GetUser/UserProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";


const OffersPage: NextPage<ReactProps> = (props) => {

  const {
    classes
  } = props;

  return (
    <>
      <MetaHeadersPage
        title="Offers"
        robots="noindex"
      />
      <UserProfileWrapper>
      {(dataUser: UserProfileProps) => {
        return (
          <div className={classes.contentContainerPublicPage}>
            <BiddingRoom asModal={false} />
          </div>
        )
      }}
      </UserProfileWrapper>
    </>
  )
}


const styles = (theme: Theme) => createStyles({
  contentContainerPublicPage: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
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

  // const aClient = serverApolloClient(ctx);
  // const emptyConnection = { pageInfo: {}, edges: [] };

  return {
    classes: undefined,
  } as any;
}


export default withStyles(styles)( OffersPage );






