import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// SSR
import { NextPage, GetServerSideProps } from 'next';
// GraphQL
import { serverApolloClient } from "utils/apollo";
import LandingPage from "pageComponents/LandingPage";
import { useApolloClient, ApolloClient } from "@apollo/client";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import { useRouter } from "next/router";
import SocialFloatingBanner from "layout/SocialFloatingBanner";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";




const StartLandingPageSSR: NextPage<ReactProps> = (props) => {

  let router = useRouter()
  let showSocialBanner = true
  let noNavbarPadding = router.pathname === "/"
    || router.pathname === "/start"
    || router.pathname === "/sell"
    || router.pathname.startsWith("/f/")

  return (
    <>
      <MetaHeadersPage
        title="Gun Marketplace Australia - Buy and sell firearms safely with escrow"
        ogTitle="Gun Marketplace Australia - Buy and sell firearms safely with escrow"
        description={`
          Sell used guns online with free listings.
          Upload and edit unlimited product listings for free.
          Create a free account and start selling your collection today.
        `}
        ogDescription={`
          Sell used guns online with free listings.
          Upload and edit unlimited product listings for free.
          Create a free account and start selling your collection today.
        `}
      />

      <LandingPage />
      {
        showSocialBanner &&
        <ShowOnMobileOrDesktopSSR desktop>
          <SocialFloatingBanner/>
        </ShowOnMobileOrDesktopSSR>
      }
    </>
  )
}


const styles = (theme: Theme) => createStyles({
  root: {},
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  // console.log("appProps: ", appProps)

  let darkMode = (ctx.query?.dark === "true" || ctx.query?.dark === "1")
    ? "dark"
    : (ctx.query?.light === "true" || ctx.query?.light === "1")
      ? "light"
      : null
    // when null, localStorage determines darkmode
    // must be null, can't deserilize undefined

  return {
    props: {
      initialDarkModeSSR: darkMode,
    },
  }
};

export default withStyles(styles)( StartLandingPageSSR );






