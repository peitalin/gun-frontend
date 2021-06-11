import React from "react";
// Typings
import { Product, ID } from "typings/gqlTypes";
import { GET_PRODUCT } from "queries/products-queries";
// SSR
import { NextPage, NextPageContext } from 'next';
import { serverApolloClient } from "utils/apollo";
import { ApolloClient } from "@apollo/client";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// import ProductId from "pageComponents/P/ProductId";
// Dynamic
import dynamic from "next/dynamic";
const ProductId = dynamic(() => import("pageComponents/P/ProductId"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})



const ProductPage: NextPage<ReactProps> = (props) => {
  // MetaHeaders in ProductId as it needs product name
  const { initialProduct: p } = props
  const previewItem = p?.featuredVariant?.previewItems?.pop();
  const img = previewItem?.image
  const imgVariant = img?.variants?.find(v => v.widthInPixels === 400)
  // console.log("IMG: ", img)

  return (
    <>
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
      <ProductId
        initialProduct={props.initialProduct}
      />
    </>
  )
}


interface ReactProps {
  initialProduct: Product;
}
interface QueryData {
  getProductById: Product;
}
interface QueryVar {
  productId: ID;
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

export async function getServerSideProps(ctx: Context) {

  const productId: string = ctx.query.productId as any;
  console.log('getInitialProps ctx: ', ctx.query);

  if (!productId) {
    return {
      props: {
        initialProduct: null,
        classes: null,
      }
    };
  }

  try {
    const { data } = await serverApolloClient(ctx).query<QueryData, QueryVar>({
      query: GET_PRODUCT,
      variables: {
        productId: productId
      },
    })
    // console.log('getInitialProps ProductPage: ', data);
    return {
      props: {
        initialProduct: data?.getProductById,
        classes: null,
      }
    };
  } catch(e) {
    return {
      props: {
        initialProduct: null,
        classes: null,
      }
    };
  }
}

export default ProductPage;
