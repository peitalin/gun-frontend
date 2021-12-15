import React from "react";
// styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// SSR
import { NextPage, GetServerSideProps } from 'next';
// GraphQL
import { serverApolloClient } from "utils/apollo";
import LandingPageStart from "pageComponents/LandingPage/start";
import { useApolloClient, ApolloClient } from "@apollo/client";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import { useRouter } from "next/router";
import SocialFloatingBanner from "layout/SocialFloatingBanner";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";




const StartLandingPageSSR: NextPage<ReactProps> = (props) => {

  let router = useRouter()
  let showSocialBanner = true

  return (
    <>
      <MetaHeadersPage
        title="Gun Marketplace - Buy guns smarter. Sell guns faster."
        ogTitle="Gun Marketplace - Buy guns smarter. Sell guns faster."
        description={`
          Find and comparse used guns across the market.
          Upload and edit unlimited product listings for free.
          Create a free account and start selling today.
        `}
        ogDescription={`
          Find and comparse used guns across the market.
          Upload and edit unlimited product listings for free.
          Create a free account and start selling today.
        `}
      />

      <LandingPageStart />
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






