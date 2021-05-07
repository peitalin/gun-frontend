import React from "react";
// Typings
import { Product, PromotedSlot, ID, UserPrivate } from "typings/gqlTypes";
import { GET_PROMOTED_SLOT_BY_PRODUCT_ID } from "queries/promoted_lists-queries";
// SSR
import { NextPage, NextPageContext } from 'next';
import { serverApolloClient } from "utils/apollo";
import { ApolloClient } from "@apollo/client";
// Router
import { useRouter } from "next/router";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
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
} from "pageComponents/PromoteListings/PromotedSlotPurchaseModal/BuyPromotedSlotPage"


import {useSnackbar} from "notistack";
import { Snackbar } from "@material-ui/core";



const FeaturedProductPage: NextPage<ReactProps> = (props) => {

  const router = useRouter()
  // MetaHeaders in FeaturedProductId as it needs product name
  const { initialPromotedSlot: promotedSlot } = props

  const p = promotedSlot?.product
  const previewItem = p?.featuredVariant?.previewItems?.pop();
  const img = previewItem?.image
  const imgVariant = img?.variants?.find(v => v.widthInPixels === 400)
  // console.log("IMG: ", img)

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  );


  let {
    isExpired,
    userOwnsSlotNow,
    anotherUserOwnsSlotNow,
  } = isSlotExpiredYet(promotedSlot, user)

  const snackbar = useSnackbar()


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
    if (!promotedSlot?.productId) {
      router.replace(
        "/p/[productId]",
        `/p/${p.id}`
      )
    }
    // can make it so only non-expired products get featured page
    // OR allow expired ones to continue having this page until it is replaced
    // by the admins (promotedSlot.productId is overridden by admins)
  }, [promotedSlot, isExpired])

  return (
    <>
      <MetaHeadersPage
        title={`${p?.currentSnapshot?.title} - view on Gun Marketplace`}
        ogTitle={`${p?.currentSnapshot?.title} - view on Gun Marketplace`}
        description={
          `View ${p?.currentSnapshot?.make} - ${p?.currentSnapshot?.model} on Gun Marketplace.`
        }
        ogDescription={
          `View ${p?.currentSnapshot?.make} - ${p?.currentSnapshot?.model} on Gun Marketplace.`
        }
        ogImage={`${imgVariant?.url}`} // must be larger than 200 x 200
        ogUrl={
          process.env.GUN_ENV === "development"
          ? `https://dev.gunmarketplace.com.au/p/${p?.id}`
          : `https://www..gunmarketplace.com.au/p/${p?.id}`
        }
      />
      {
        // only for promoted products
        promotedSlot.product?.id &&
        <FeaturedProductId
          initialProduct={p}
        />
      }
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

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

// export async function getServerSideProps(ctx: Context) {

FeaturedProductPage.getInitialProps = async (ctx: Context) => {

  const productId: string = ctx.query.productId as any;
  const promotedListId: string = ctx.query.promotedListId as any; // optional
  console.log('getInitialProps ctx: ', ctx.query);

  if (!productId) {
    return {
      initialPromotedSlot: null,
      classes: null,
    };
  }

  try {
    const { data } = await serverApolloClient(ctx).query<QueryData, QueryVar>({
      query: GET_PROMOTED_SLOT_BY_PRODUCT_ID,
      variables: {
        productId: productId,
        promotedListId: promotedListId, // optional
      },
    })
    // console.log('getInitialProps FeaturedProductPage: ', data);
    return {
      initialPromotedSlot: data?.getPromotedSlotByProductId,
      classes: null,
    };
  } catch(e) {
    return {
      initialPromotedSlot: null,
      classes: null,
    };
  }
}

export default FeaturedProductPage;
