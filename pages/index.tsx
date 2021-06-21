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
import { categoryPreviewsBackup } from "components/CategoryCarouselStart/utils";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import SocialFloatingBanner from "layout/SocialFloatingBanner";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
import { useRouter } from "next/router";



const HomePage: NextPage<ReactProps> = (props) => {

  // const { data } = useQuery<QData1, QVar1>(
  //   GET_PAGE_CONFIG_BY_PATH, {
  //   variables: {
  //     urlPath: "/"
  //   }
  // })

  // const { data: data2 } = await serverApolloClient(ctx).query<QData2, QVar2>({
  //   query: GET_CATEGORIES,
  // })

  // console.log("getPageConfig: ", data?.getPageConfig)
  // console.log("getCategories ssr: ", data2?.getCategories)

  // let initialCategories = data2?.getCategories ?? [];
  // let initialCategories: Categories[] = categoryPreviewsBackup as any;

  let router = useRouter()

  let showSocialBanner = router.pathname === '/'
    || router.pathname.startsWith("/start")
    || router.pathname.startsWith("/help")

  return (
    <>
      <MetaHeadersPage
        title="Gun Marketplace Australia - Buy and sell guns with escrow. Free listings forever."
        ogTitle="Gun Marketplace Australia - Buy and sell guns with escrow. Free listings forever."
        description={`
          Buy and sell used guns and second hand firearms with escrowed checkouts.
          Get started selling your used guns with 100% free listings
        `}
        ogDescription={`
          Buy and sell used guns and second hand firearms with escrowed checkouts.
          Get started selling your used guns with 100% free listings
        `}
      />
      <FrontPage
        // pageConfig={data?.getPageConfig}
        // initialCategories={initialCategories}
        pageConfig={props?.getPageConfig}
        initialCategories={props.initialCategories}
      />
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






