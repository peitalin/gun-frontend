import React from "react";
// Typings
import { PromotedSlot, ID } from "typings/gqlTypes";
import { GET_PROMOTED_SLOT } from "queries/promoted_lists-queries";
// SSR
import { NextPage, NextPageContext } from 'next';
import { serverApolloClient } from "utils/apollo";
import { ApolloClient } from "@apollo/client";
// Components
import Loading from "components/Loading";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// import ProductId from "pageComponents/P/ProductId";
// Dynamic
import dynamic from "next/dynamic";
const PromotedSlotId = dynamic(() => import("pageComponents/F/PromotedSlotId"), {
  loading: () => <Loading/>,
  ssr: false,
})



const FeaturedProductPage: NextPage<ReactProps> = (props) => {
  // MetaHeaders in ProductId as it needs product name
  const { initialPromotedSlot } = props

  const p = initialPromotedSlot?.product;
  const previewItem = p?.featuredVariant?.previewItems?.pop();
  const img = previewItem?.image
  const imgVariant = img?.variants?.find(v => v.widthInPixels === 400)
  // console.log("IMG: ", img)

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
      <PromotedSlotId
        initialPromotedSlot={props.initialPromotedSlot}
      />
    </>
  )
}


interface ReactProps {
  initialPromotedSlot: PromotedSlot;
}
interface QueryData {
  getPromotedSlotById: PromotedSlot;
}
interface QueryVar {
  promotedSlotId: ID;
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

// export async function getServerSideProps(ctx: Context) {

FeaturedProductPage.getInitialProps = async (ctx: Context) => {

  const promotedSlotId: string = ctx.query.promotedSlotId as any;
  console.log('getInitialProps ctx: ', ctx.query);

  if (!promotedSlotId) {
    return {
      initialPromotedSlot: null,
      classes: null,
    };
  }

  try {
    const { data } = await serverApolloClient(ctx).query<QueryData, QueryVar>({
      query: GET_PROMOTED_SLOT,
      variables: {
        promotedSlotId: promotedSlotId
      },
    })
    // console.log('getInitialProps FeaturedProductPage: ', data);
    return {
      initialPromotedSlot: data?.getPromotedSlotById,
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
