import React from "react";
// Typings
import { Product, ID } from "typings/gqlTypes";
import { GET_PRODUCT } from "queries/products-queries";
// SSR
import { NextPage, NextPageContext } from 'next';
// import { serverApolloClient } from "utils/apollo";
import { ApolloClient, useQuery } from "@apollo/client";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// import ProductId from "pageComponents/P/ProductId";
import { useRouter } from "next/router";
// Dynamic
import dynamic from "next/dynamic";
const ProductId = dynamic(() => import("pageComponents/P/ProductId"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
import PageWithStripe from "layout/PageWithStripe";




const ProductPage: NextPage<ReactProps> = (props) => {

  const router = useRouter()
  const productId: string = router.query.productId as string;

  // MetaHeaders in ProductId as it needs product name
  // const { initialProduct: p } = props

  const { data } = useQuery<QueryData, QueryVar>(
    GET_PRODUCT, {
    variables: {
      productId: productId
    },
  })

  const p = data?.getProductById;
  const previewItem = p?.featuredVariant?.previewItems?.slice(-1)?.[0];
  const img = previewItem?.image
  const imgVariant = img?.variants?.find(v => v.widthInPixels === 400)
  // console.log("IMG: ", img)

  let showMetaHeaders = p?.id &&
    !p?.isDeleted &&
    !p?.isSoldElsewhere &&
    !p?.isSuspended &&
    p?.isPublished

  return (
    <>
      {
        showMetaHeaders
        ? <MetaHeadersPage
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
        : <meta name="robots" content={"noindex"}/>
      }
      <PageWithStripe>
        <ProductId
          initialProduct={props.initialProduct}
        />
      </PageWithStripe>
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
// interface Context extends NextPageContext {
//   apolloClient: ApolloClient<any>;
// }

// export async function getServerSideProps(ctx: Context) {

//   const productId: string = ctx.query.productId as any;

//   if (!productId) {
//     return {
//       props: {
//         initialProduct: null,
//         classes: null,
//       }
//     };
//   }

//   try {
//     const { data } = await serverApolloClient(ctx).query<QueryData, QueryVar>({
//       query: GET_PRODUCT,
//       variables: {
//         productId: productId
//       },
//     })
//     return {
//       props: {
//         initialProduct: data?.getProductById,
//         classes: null,
//       }
//     };
//   } catch(e) {
//     return {
//       props: {
//         initialProduct: null,
//         classes: null,
//       }
//     };
//   }
// }


// export const getStaticProps = async (context) => {

//   const { data } = useQuery<QueryData, QueryVar>(
//     GET_PRODUCT, {
//     variables: {
//       productId: productId
//     },
//   })

//   const p = data?.getProductById;
//   const previewItem = p?.featuredVariant?.previewItems?.slice(-1)?.[0];
//   const img = previewItem?.image
//   const imgVariant = img?.variants?.find(v => v.widthInPixels === 400)
//   // console.log("IMG: ", img)
//   return { props: { } };
// };

export default ProductPage;
