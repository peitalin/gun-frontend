import * as React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// GraphQL
import { GET_PRODUCTS_BY_CATEGORY } from "queries/products-queries";
// import { GET_CATEGORY_PAGE_METADATA } from "queries/app-layout-queries";
// Typings
import {
  ID,
  PageBasedConnectionQuery,
  ProductsConnection,
  Categories,
  // ProductCategoryOrGroup,
  // PublicProductsConnection
} from "typings/gqlTypes";
import CategoryId from "pageComponents/Categories/CategoryId";
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient } from "@apollo/client";
import { serverApolloClient } from "utils/apollo";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";





const CategorySlugSSR: NextPage<ReactProps> = (props) => {
  return (
    <>
      <MetaHeadersPage
        title={
          props.categoryName
          ? `${props.categoryName} - gunmarketplace.com.au`
          : `Categories - gunmarketplace.com.au`
        }
        description={`
          Browse gunmarketplace for local firearms to trade
        `}
        ogTitle={
          props.categoryName
          ? `${props.categoryName} - gunmarketplace.com.au`
          : `Categories - gunmarketplace.com.au`
        }
        ogDescription={`
          Browse gunmarketplace for local firearms to trade
        `}
        // ogImage={
        //   GUN_ENV === "development"
        //   ? "https://image-content.gunmarketplace.com.au/og-img-relay-category.png"
        //   : "https://image-content.gunmarketplace.com.au/og-img-relay-category.png"
        // }
      />
      <CategoryId
        initialProducts={props.initialProducts}
        categoryOrCategoryGroup={props.categoryOrCategoryGroup}
      />
    </>
  )
}

interface ReactProps {
  initialProducts: ProductsConnection;
  categoryName?: string;
  categoryOrCategoryGroup: Categories;
}

interface QueryData1 {
  categoryOrCategoryGroup: Categories;
}
interface QueryVar1 {
  slug?: string;
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

CategorySlugSSR.getInitialProps = async (ctx: Context) => {

  const categorySlug: string = ctx.query.categorySlug as any;
  // console.log('categorySlug', categorySlug)

  if (categorySlug) {

    try {

      // const {
      //   data: { categoryOrCategoryGroup }
      // } = await serverApolloClient(ctx).query<QueryData1, QueryVar1>({
      //   query: GET_CATEGORY_PAGE_METADATA,
      //   variables: {
      //     slug: categorySlug
      //   },
      // })
      // console.log('getInitialProps CategoryPage: ', categoryOrCategoryGroup);

      // let categoryName = categoryOrCategoryGroup?.category?.name
      //   || categoryOrCategoryGroup?.categoryGroup?.name

      // return props
      return {
        initialProducts: undefined,
        // categoryName: categoryName,
        // categoryOrCategoryGroup: categoryOrCategoryGroup,
        categoryName: "",
        categoryOrCategoryGroup: undefined,
        classes: undefined,
      };
    } catch(e) {
      return {
        initialProducts: undefined,
        categoryName: "",
        categoryOrCategoryGroup: undefined,
        classes: undefined,
      };
    }

  } else {
    return {
      initialProducts: undefined,
      categoryName: "",
      categoryOrCategoryGroup: undefined,
      classes: undefined,
    };
  }
}

export default CategorySlugSSR;



