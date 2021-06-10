import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// GraphQL
import { GET_CATEGORIES } from "queries/categories-queries";
// Typings
import {
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
        title={"Browse New Listings - Used Guns - Gun Marketplace Australia"}
        description={`
          Shop Gun Marketplace and browse newly listed local firearms to trade.
        `}
        ogTitle={"Browse New Listings - Used Guns - Gun Marketplace Australia"}
        ogDescription={`
          Shop Gun Marketplace and browse newly listed local firearms to trade.
        `}
        // ogImage={
        //   "https://image-content.gunmarketplace.com.au/og-img-category.png"
        // }
      />
      <CategoryId
        initialProducts={props.initialProducts}
        initialRouteCategory={props.selectedCategory}
        initialDropdownCategories={props.initialCategories}
        bannerTitle={"New Listings"}
        bannerBlurb={"Browse and search through new listings"}
      />
    </>
  )
}

interface ReactProps {
  initialProducts: ProductsConnection;
  initialCategories: Categories[];
  categoryName?: string;
  selectedCategory: Categories;
}

interface QueryData1 {
  getCategories: Categories[];
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


  if (categorySlug) {

    const { data } = await serverApolloClient(ctx).query<QueryData1, QueryVar1>({
      query: GET_CATEGORIES,
    })

    // "all" category slug is filtered out on the backend and ignored
    // no category filter -> all categories
    let defaultCategory = {
      id: "",
      slug: "all",
      name: "All Categories"
    } as any

    let selectedCategory = [ ...data?.getCategories, defaultCategory ]
      .find(s => s.slug === categorySlug)

    let categoryName = selectedCategory?.name

    // return props
    return {
      initialProducts: undefined,
      initialCategories: data?.getCategories,
      categoryName: categoryName,
      selectedCategory: selectedCategory,
    };

  } else {
    return {
      initialProducts: undefined,
      initialCategories: undefined,
      categoryName: "",
      selectedCategory: undefined,
    };
  }
}

export default CategorySlugSSR;



