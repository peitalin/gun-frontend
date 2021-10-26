import React from "react";
// Typings
import {
  PageConfig,
  PromotedList,
  PromotedSlot,
  ID,
  UserPrivate,
  Product,
} from "typings/gqlTypes";
import {
  GET_PROMOTED_SLOT_BY_PRODUCT_ID,
  GET_PROMOTED_LIST,
} from "queries/promoted_lists-queries";
import { GET_PAGE_CONFIG_BY_PATH } from "queries/page_configs-queries";
// SSR
import {
  NextPage,
  NextPageContext,
  GetStaticPathsContext,
  GetStaticPropsContext,
} from 'next';
import { serverApolloClient } from "utils/apollo";
import { useLazyQuery, useQuery } from "@apollo/client";
// Router
import { useRouter } from "next/router";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// Dynamic
import dynamic from "next/dynamic";
// const FeaturedProductId = dynamic(() => import("pageComponents/F/FeaturedProductId"), {
//   loading: () => <LoadingBarSSR/>,
//   ssr: false,
// })
import FeaturedProductId from "pageComponents/F/FeaturedProductId"
// redux
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import {
  isSlotExpiredYet,
} from "pageComponents/PromoteListings/PromotedSlotPurchaseModal/utils"
import PageWithStripe from "layout/PageWithStripe";
import { GET_PRODUCT } from "queries/products-queries";



const FeaturedProductPageSSR: NextPage<ReactProps> = (props) => {

  // const router = useRouter()
  const promotedSlot = props.initialPromotedSlot

  const p = promotedSlot?.product
  const previewItem = p?.featuredVariant?.previewItems?.slice(-1)?.[0]
  const img = previewItem?.image
  const imgVariant = img?.variants?.find(v => v.widthInPixels === 400)
  // const user = useSelector<GrandReduxState, UserPrivate>(
  //   s => s.reduxLogin.user
  // );


  // let {
  //   isExpired,
  //   userOwnsSlotNow,
  //   anotherUserOwnsSlotNow,
  // } = React.useMemo(
  //   () => isSlotExpiredYet(promotedSlot, user),
  //   [promotedSlot, user]
  // )


  //// NOTE!!!!!! when in SSG mode, this page
  //// redirects to 404 page automatically if product is not found....
  //// ...i.e. when not one of the precompiled promotedSlotIds are found....
  //// so make the redirect from /f/ to /p/ in the /404.tsx page

  // React.useEffect(() => {
  //   // only for promoted products
  //   // check if this product is actually listed as on the promotedSlot
  //   if (!promotedSlot?.productId || productId) {
  //     if (p?.id) {
  //       router.replace(
  //         "/p/[productId]",
  //         `/p/${p?.id}`
  //       )
  //     }
  //   }
  //   // can make it so only non-expired products get featured page
  //   // OR allow expired ones to continue having this page until it is replaced
  //   // by the admins (promotedSlot.productId is overridden by admins)
  // }, [promotedSlot, isExpired])


  return (
    <>
      {
        p?.id &&
        <MetaHeadersPage
          title={`${p?.currentSnapshot?.title} ${p?.currentSnapshot?.caliber} - buy on Gun Marketplace`}
          ogTitle={`${p?.currentSnapshot?.title} ${p?.currentSnapshot?.caliber} - buy on Gun Marketplace`}
          description={
            `Buy ${p?.currentSnapshot?.title} ${p?.currentSnapshot?.caliber} on Gun Marketplace.
            Location: ${p?.currentSnapshot?.dealer?.state}
            `
          }
          ogDescription={
            `Buy ${p?.currentSnapshot?.title} ${p?.currentSnapshot?.caliber} on Gun Marketplace.
            Location: ${p?.currentSnapshot?.dealer?.state}
            `
          }
          ogImage={`${imgVariant?.url}`} // must be larger than 200 x 200
          ogUrl={
            process.env.GUN_ENV === "development"
            ? `https://dev.gunmarketplace.com.au/p/${p?.id}`
            : `https://www.gunmarketplace.com.au/p/${p?.id}`
          }
        />
      }
      <PageWithStripe>
        <FeaturedProductId
          initialProduct={p}
          loading={false}
        />
      </PageWithStripe>
    </>
  )
}


interface ReactProps {
  initialPromotedSlot: PromotedSlot;
}
interface QData {
  getPromotedSlotByProductId: PromotedSlot;
}
interface QVar {
  productId: ID;
  promotedListId?: ID;
}
interface QData1 {
  getPageConfig: PageConfig;
}
interface QVar1 {
  urlPath: string;
}
interface QData2 {
  getProductById: Product;
}
interface QVar2 {
  productId: string
}
interface QData3 {
  getPromotedList: PromotedList;
}
interface QVar3 {
  promotedListId: string
  limit: number
  offset: number
}

//////////// SSR ///////////


export const getStaticPaths = async (ctx: GetStaticPathsContext) => {

  const aClient = serverApolloClient(ctx);

  const { data } = await aClient.query<QData1, QVar1>({
    query: GET_PAGE_CONFIG_BY_PATH,
    variables: {
      urlPath: "/"
    }
  })

  interface Path {
    params: { productId: string }
  }
  // Get the paths we want to pre-render based on posts
  // const paths = [
  //   { params: { productId: "p111111111" } },
  // ]
  let paths: Path[] = []

  await Promise.all(data?.getPageConfig?.pageConfigSections?.map(async section => {
    if (section.promotedListId) {
      // console.log("\npromotedListId: ", section?.promotedListId)
      const { data: data3 } = await serverApolloClient(ctx).query<QData3, QVar3>({
        query: GET_PROMOTED_LIST,
        variables: {
          promotedListId: section.promotedListId,
          limit: 4,
          offset: 0,
        },
      })

      data3?.getPromotedList?.promotedSlotsConnection?.edges?.forEach(e => {
        let productId = e?.node?.productId
        if (productId) {
          if (!paths.find(path => path?.params?.productId === productId)) {
            paths.push({
              params: {
                productId: productId
              }
            } as Path)
          }
        }
      })
    }
  }))

  console.log("staticPaths: ", paths)

  return {
    paths: paths,
    fallback: false,
  }
}


export async function getStaticProps(ctx: GetStaticPropsContext) {

  const productId: string = ctx.params?.productId as any;
  const promotedListId: string = ctx.params?.promotedListId as any;

  const aClient = serverApolloClient(ctx);

  const { data } = await aClient.query<QData, QVar>({
    query: GET_PROMOTED_SLOT_BY_PRODUCT_ID,
    variables: {
      productId: productId,
      promotedListId: promotedListId, // optional
    },
  })

  // get full Product with sellerLicense, etc
  // promotedSlot.product only get a lite versiona of product
  const { data: data2 } = await aClient.query<QData2, QVar2>({
    query: GET_PRODUCT,
    variables: {
      productId: productId,
    },
  })

  let promotedSlot = {
    ...data?.getPromotedSlotByProductId,
    product: {
      ...data2?.getProductById
    }
  }
  // console.log("promotedSlotporuduct: ", promotedSlot?.product)

  return {
    props: {
      initialPromotedSlot: promotedSlot,
    }, // will be passed to the page component as props
    revalidate: 60, // 1min
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
  }
}


export default FeaturedProductPageSSR;
