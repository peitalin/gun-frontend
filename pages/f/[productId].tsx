import React from "react";
// Typings
import { Product, PromotedSlot, ID, UserPrivate } from "typings/gqlTypes";
import { GET_PROMOTED_SLOT_BY_PRODUCT_ID } from "queries/promoted_lists-queries";
// SSR
import { NextPage, NextPageContext } from 'next';
import { serverApolloClient } from "utils/apollo";
import { ApolloClient, useQuery } from "@apollo/client";
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



const FeaturedProductPageSSR: NextPage<ReactProps> = (props) => {

  const router = useRouter()
  const productId: string = router.query.productId as any;
  const promotedListId: string = router.query.promotedListId as any; // optional

  let noNavbarPadding = router.pathname === "/"
    || router.pathname === "/start"
    || router.pathname === "/sell"
    || router.pathname.startsWith("/f/")

  // MetaHeaders in FeaturedProductId as it needs product name
  // const { initialPromotedSlot: promotedSlot } = props

  const { data } = useQuery<QueryData, QueryVar>(
    GET_PROMOTED_SLOT_BY_PRODUCT_ID, {
    variables: {
      productId: productId,
      promotedListId: promotedListId, // optional
    },
  })

  const promotedSlot = data?.getPromotedSlotByProductId;
  const p = promotedSlot?.product;
  const previewItem = p?.featuredVariant?.previewItems?.slice(-1)?.[0];
  const img = previewItem?.image
  const imgVariant = img?.variants?.find(v => v.widthInPixels === 400)

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  );


  let {
    isExpired,
    userOwnsSlotNow,
    anotherUserOwnsSlotNow,
  } = React.useMemo(
    () => isSlotExpiredYet(promotedSlot, user),
    [promotedSlot, user]
  )

  // const snackbar = useSnackbar()


  React.useEffect(() => {
    // snackbar.enqueueSnackbar(
    //   'success test',
    //   { variant: "success", persist: true }
    // )
    // snackbar.enqueueSnackbar(
    //   'error test',
    //   { variant: "error", persist: true }
    // )
    // snackbar.enqueueSnackbar(
    //   'info test',
    //   { variant: "info", persist: true }
    // )

    // only for promoted products
    // check if this product is actually listed as on the promotedSlot
    if (!promotedSlot?.productId) {
      if (p?.id) {
        router.replace(
          "/p/[productId]",
          `/p/${p?.id}`
        )
      }
    }
    // can make it so only non-expired products get featured page
    // OR allow expired ones to continue having this page until it is replaced
    // by the admins (promotedSlot.productId is overridden by admins)
  }, [promotedSlot, isExpired])

  console.log("promotedSlot", promotedSlot)

  return (
    <>
      {
        p?.id &&
        <MetaHeadersPage
          title={`${p?.currentSnapshot?.title} ${p?.currentSnapshot?.caliber} - buy on Gun Marketplace Australia`}
          ogTitle={`${p?.currentSnapshot?.title} ${p?.currentSnapshot?.caliber} - buy on Gun Marketplace Australia`}
          description={
            `Buy ${p?.currentSnapshot?.title} ${p?.currentSnapshot?.caliber} on Gun Marketplace Australia.
            Location: ${p?.currentSnapshot?.dealer?.state}
            `
          }
          ogDescription={
            `Buy ${p?.currentSnapshot?.title} ${p?.currentSnapshot?.caliber} on Gun Marketplace Australia.
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
        {
          // only for promoted products
          p?.id &&
          <FeaturedProductId
            initialProduct={p}
          />
        }
      </PageWithStripe>
    </>
  )
}


interface ReactProps {
  initialPromotedSlot: PromotedSlot;
}
interface QueryData {
  getPromotedSlotByProductId: PromotedSlot;
}
interface QueryVar {
  productId: ID;
  promotedListId?: ID;
}

// export async function getServerSideProps(ctx: NextPageContext) {

//   const productId: string = ctx.query.productId as any;
//   const promotedListId: string = ctx.query.promotedListId as any; // optional

//   if (!productId) {
//     return {
//       props: {
//         initialPromotedSlot: null,
//         classes: null,
//       }
//     };
//   }

//   try {
//     const { data } = await serverApolloClient(ctx).query<QueryData, QueryVar>({
//       query: GET_PROMOTED_SLOT_BY_PRODUCT_ID,
//       variables: {
//         productId: productId,
//         promotedListId: promotedListId, // optional
//       },
//     })
//     return {
//       props: {
//         initialPromotedSlot: data?.getPromotedSlotByProductId,
//         classes: null,
//       }
//     };
//   } catch(e) {
//     return {
//       props: {
//         initialPromotedSlot: null,
//         classes: null,
//       }
//     };
//   }
// }

export default FeaturedProductPageSSR;
