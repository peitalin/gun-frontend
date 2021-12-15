import React from "react";
// styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// SSR
import { NextPage, GetServerSideProps } from 'next';
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import { useRouter } from "next/router";
import SocialFloatingBanner from "layout/SocialFloatingBanner";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";




const QR1SSR: NextPage<ReactProps> = (props) => {

  // let showSocialBanner = true
  let REDIRECT_URL = 'https://www.gunmarketplace.com.au'

  React.useEffect(() => {
    // redirect
    if (window) {
      window?.location?.replace(REDIRECT_URL)
    }
  }, [])

  return (
    <>
      <MetaHeadersPage
        title="Gun Marketplace - Buy guns smarter. Sell guns faster."
        ogTitle="Gun Marketplace - Buy guns smarter. Sell guns faster."
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
      {/* {
        showSocialBanner &&
        <ShowOnMobileOrDesktopSSR desktop>
          <SocialFloatingBanner/>
        </ShowOnMobileOrDesktopSSR>
      } */}
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

export default withStyles(styles)( QR1SSR );






