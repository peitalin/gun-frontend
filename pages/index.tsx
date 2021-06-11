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
import dynamic from "next/dynamic";
// GraphQL
import { serverApolloClient } from "utils/apollo";
import FrontPage from "pageComponents/FrontPage";
import { useQuery, ApolloClient } from "@apollo/client";
import { categoryPreviewsBackup } from "components/CategoryCarouselStart/utils";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";



const HomePage: NextPage<ReactProps> = (props) => {

  const { data } = useQuery<QData1, QVar1>(
    GET_PAGE_CONFIG_BY_PATH, {
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
      {
        data?.getPageConfig &&
        <FrontPage
          pageConfig={data?.getPageConfig}
          initialCategories={initialCategories}
          // pageConfig={props?.getPageConfig}
          // initialCategories={props.initialCategories}
        />
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
  pageConfig: PageConfig;
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
      pageConfig: data?.getPageConfig,
    }, // will be passed to the page component as props
  }
}

// HomePage.getInitialProps = async (ctx: Context) => {

//   // Will trigger this getInitialProps when requesting route /pages/ProductGallery
//   // otherwise initialProps may be fed via /pages/index.tsx's getInitialProps
//   const aClient = serverApolloClient(ctx);

//   const { data } = await aClient.query<QData1, QVar1>({
//     query: GET_PAGE_CONFIG_BY_PATH,
//     variables: {
//       urlPath: "/"
//     }
//   })

//   // const { data: data2 } = await serverApolloClient(ctx).query<QData2, QVar2>({
//   //   query: GET_CATEGORIES,
//   // })

//   // console.log("getPageConfig: ", data?.getPageConfig)
//   // console.log("getCategories ssr: ", data2?.getCategories)

//   // let initialCategories = data2?.getCategories ?? [];
//   let initialCategories: Categories[] = categoryPreviewsBackup as any;

//   return {
//     initialCategories: initialCategories,
//     pageConfig: data?.getPageConfig,
//     classes: undefined,
//   };
// }


export default withStyles(styles)( HomePage );






