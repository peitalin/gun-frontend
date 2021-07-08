import React from "react";
// GraphQL
import { GET_CATEGORIES } from "queries/categories-queries";
// Typings
import {
  Categories,
} from "typings/gqlTypes";
import CategoryId from "pageComponents/Categories/CategoryId";
// SSR
import { NextPage, NextPageContext, GetStaticProps } from 'next';
import { serverApolloClient } from "utils/apollo";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";




const NewProductsSSR: NextPage<ReactProps> = (props) => {

  return (
    <>
      <MetaHeadersPage
        title={"Browse New Listings - Used Guns - Gun Marketplace"}
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
        initialProducts={undefined}
        initialRouteCategory={props.selectedCategory}
        initialDropdownCategories={props.initialCategories}
        disableCategoriesFilter={false}
        bannerTitle={"New Listings"}
        bannerBlurb={"Browse and search through new listings"}
      />
    </>
  )
}

interface ReactProps {
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



export const getStaticProps: GetStaticProps = async (ctx) => {

  const categorySlug: string = ctx?.params?.categorySlug as any;

  const { data } = await serverApolloClient().query<QueryData1, QueryVar1>({
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
    .find(s => s.slug === categorySlug) ?? ""

  let categoryName = selectedCategory?.name ?? ""

  return {
    props: {
      initialCategories: data?.getCategories,
      categoryName: categoryName,
      selectedCategory: selectedCategory,
    }
  };
}


export default NewProductsSSR;



