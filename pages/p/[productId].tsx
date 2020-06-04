import React from "react";
// Typings
import { Product, ID } from "typings/gqlTypes";
import { GET_PRODUCT } from "queries/products-queries";
// SSR
import { NextPage, NextPageContext } from 'next';
import ApolloClient from "apollo-client";
import { serverApolloClient } from "utils/apollo";
// Components
import Loading from "components/Loading";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// import ProductId from "pageComponents/P/ProductId";
// Dynamic
import dynamic from "next/dynamic";
const ProductId = dynamic(() => import("pageComponents/P/ProductId"), {
  loading: () => <Loading/>,
  ssr: false,
})



const ProductPage: NextPage<ReactProps> = (props) => {
  // MetaHeaders in ProductId as it needs product name
  return (
    <>
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
  product: Product;
}
interface QueryVar {
  productId: ID;
}

// ////////// SSR ///////////
// interface Context extends NextPageContext {
//   apolloClient: ApolloClient<any>;
// }

// export async function getServerSideProps(ctx: Context) {
//   const productId: string = ctx.query.productId || ctx.query.productIdOrSlug as any;
//   console.log('getInitialProps ctx: ', ctx.query);
//   return {
//     props: {
//       initialProduct: null,
//       classes: null,
//     }
//   };

//   // if (productId) {
//   //   const { data } = await serverApolloClient(ctx).query<QueryData, QueryVar>({
//   //     query: GET_PRODUCT,
//   //     variables: {
//   //       productId: productId
//   //     },
//   //   })

//   //   console.log('getInitialProps ProductPage: ', data);
//   //   if (data.product) {
//   //     return {
//   //       props: {
//   //         initialProduct: data.product,
//   //         // initialProduct: undefined,
//   //         classes: null,
//   //       }
//   //     };
//   //   } else {
//   //     return {
//   //       props: {
//   //         initialProduct: null,
//   //         classes: null,
//   //       }
//   //     };
//   //   }
//   // } else {
//   //   return {
//   //     props: {
//   //       initialProduct: null,
//   //       classes: null,
//   //     }
//   //   };
//   // }
// }

export default ProductPage;
