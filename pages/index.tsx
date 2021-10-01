import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// GQL
import { GET_PAGE_CONFIG_BY_PATH } from "queries/page_configs-queries";
import { GET_CATEGORIES } from "queries/categories-queries";
import { GET_CALIBERS } from "queries/calibers-queries";
// Typings
import { PageConfig, Categories, Calibers } from "typings/gqlTypes";
// SSR
import { NextPage, NextPageContext } from 'next';
// GraphQL
import { serverApolloClient } from "utils/apollo";
import FrontPage from "pageComponents/FrontPage";
import { useQuery, ApolloClient } from "@apollo/client";
import { categoryPreviewsBackup } from "utils/categories";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import SocialFloatingBanner from "layout/SocialFloatingBanner";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
import { useRouter } from "next/router";
import Trending from "pageComponents/Trending";



const HomePage: NextPage<ReactProps> = (props) => {

  let router = useRouter()
  const [showSocialBanner, setShowSocialBanner] = React.useState(false)

  React.useEffect(() => {
    let showSocialBanner = router.pathname === '/'
      || router.pathname.startsWith("/start")
      || router.pathname.startsWith("/help")

    setShowSocialBanner(showSocialBanner)
  }, [])

  return (
    <>
      <MetaHeadersPage
        title="Gun Marketplace - Buy guns smarter. Sell guns faster."
        ogTitle="Gun Marketplace - Buy guns smarter. Sell guns faster."
        description={`
          Browse the latest used guns on the market.
          Buy and sell used guns with escrow listings and classified ads.
        `}
        ogDescription={`
          Browse the latest used guns on the market.
          Buy and sell used guns with escrow listings and classified ads.
        `}
      />
      {/* <MetaHeadersPage
        // title="Trending used guns for sale - gunmarketplace.com.au"
        // ogTitle="Trending used guns for sale - gunmarketplace.com.au"
        title="Gun Marketplace Australia - Browse trending used guns for sale"
        ogTitle="Gun Marketplace Australia - Browser trending used guns for sale"
        description={"Browse used guns from usedguns.com.au, ssaagunsales.com, ozgunsales.com, etc."}
        ogDescription={"Browse used guns from usedguns.com.au, ssaagunsales.com, ozgunsales.com, etc."}
      /> */}
      {/* <UserProfileWrapper>
        {(dataUser: UserProfileProps) => {
          return (
            <div className={classes.contentContainerPublicPage}>
              <Trending />
            </div>
          )
        }}
      </UserProfileWrapper> */}
      {/* <div className={props.classes.contentContainerPublicPage}>
        <Trending/>
      </div> */}
      <FrontPage
        pageConfig={props?.getPageConfig}
        initialCategories={props.initialCategories}
      />
      {
        showSocialBanner &&
        <ShowOnMobileOrDesktopSSR desktop implementation="js">
          <SocialFloatingBanner/>
        </ShowOnMobileOrDesktopSSR>
      }
    </>
  )
}


const styles = (theme: Theme) => createStyles({
  contentContainerPublicPage: {
    position: "relative",
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  initialCategories: Categories[];
  getPageConfig: PageConfig;
}
interface QData1 {
  getPageConfig: PageConfig;
}
interface QVar1 {
  urlPath: string;
}


// ////////// SSR ///////////
interface Context extends NextPageContext {
}

export async function getStaticProps(ctx: Context) {

  const aClient = serverApolloClient(ctx);
  const { data } = await aClient.query<QData1, QVar1>({
    query: GET_PAGE_CONFIG_BY_PATH,
    variables: {
      urlPath: "/"
    }
  })

  // const { data: data2 } = await serverApolloClient(ctx).query<QData2, QVar2>({
  //   query: GET_CATEGORIES,
  // })

  // console.log("getPageConfig: ", data?.getPageConfig)
  // console.log("getCategories ssr: ", data2?.getCategories)

  // let initialCategories = data2?.getCategories ?? [];
  let initialCategories: Categories[] = categoryPreviewsBackup as any;

  return {
    props: {
      initialCategories: initialCategories,
      getPageConfig: data?.getPageConfig,
      revalidate: 120, // 2min
    }, // will be passed to the page component as props
  }
}


export default withStyles(styles)( HomePage );






