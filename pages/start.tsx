import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// SSR
import { NextPage, GetServerSideProps } from 'next';
// GraphQL
import LandingPageStart from "pageComponents/LandingPage/start";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import SocialFloatingBanner from "layout/SocialFloatingBanner";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";




const StartLandingPageSSR: NextPage<ReactProps> = (props) => {

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






