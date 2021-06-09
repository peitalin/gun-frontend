import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Typings
import { PageConfig, Categories } from "typings/gqlTypes";
// SSR
import { NextPage, NextPageContext } from 'next';
import dynamic from "next/dynamic";
// GraphQL
import { serverApolloClient } from "utils/apollo";
import LandingPage from "pageComponents/LandingPage";
import { useApolloClient, ApolloClient } from "@apollo/client";
import { categoryPreviewsBackup } from "components/CategoryCarouselStart/utils";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";



const LandingPageSSR: NextPage<ReactProps> = (props) => {
  return (
    <>
      <MetaHeadersPage
        title="Gun Marketplace Australia - Buy and sell firearms safely with escrow"
        ogTitle="Gun Marketplace Australia - Buy and sell firearms safely with escrow"
        description={`
          Gun Marketplace is a marketplace for buying and selling firearms.
          Buy and sell used guns and second hand firearms using our escrow checkout.
          Get started selling your used guns with unlimited free listings
        `}
        ogDescription={`
          Gun Marketplace is a marketplace for buying and selling firearms.
          Buy and sell used guns and second hand firearms using our escrow checkout.
          Get started selling your used guns with unlimited free listings
        `}
      />
      <LandingPage
        initialCategories={props.initialCategories}
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

LandingPageSSR.getInitialProps = async (ctx: Context) => {

  // // Will trigger this getInitialProps when requesting route /pages/ProductGallery
  // // otherwise initialProps may be fed via /pages/index.tsx's getInitialProps
  // const aClient = serverApolloClient(ctx);

  try {

    // let initialCategories = data?.getCategories ?? categoryPreviewsBackup as any;
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


export default withStyles(styles)( LandingPageSSR );






