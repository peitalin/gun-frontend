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
import SearchResults from "pageComponents/Search";
// SSR
import { NextPage, NextPageContext, GetStaticProps } from 'next';
import { ApolloClient } from "@apollo/client";
import { serverApolloClient } from "utils/apollo";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import { categoryPreviewsBackup } from "utils/categories";
import VerifyEmailBanner from "components/VerifyGunLicenseBanner";

import dynamic from "next/dynamic";
import LoadingBarSSR from "components/LoadingBarSSR";
import { UserProfileProps } from "layout/GetUser/UserProfileWrapper";
const UserProfileWrapper = dynamic(() => import("layout/GetUser/UserProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})




const CategorySlugSSR: NextPage<ReactProps> = (props) => {

  return (
    <>
      <MetaHeadersPage
        title={
          props.categoryName
          ? `Browse used guns for sale by ${props.categoryName} | Gun Marketplace`
          : `Browse used guns for sale by categories | Gun Marketplace`
        }
        description={`
          Shop Gun Marketplace and browse local second hand guns to trade.
        `}
        ogTitle={
          props.categoryName
          ? `Browse used guns for sale by ${props.categoryName} | Gun Marketplace`
          : `Browse used guns for sale by categories | Gun Marketplace`
        }
        ogDescription={`
          Shop Gun Marketplace and browse local second hand guns to trade.
        `}
        // ogImage={
        //   "https://image-content.gunmarketplace.com.au/og-img-category.png"
        // }
      />
      <UserProfileWrapper>
        {(dataUser: UserProfileProps) => {

          const user = dataUser?.data?.user

          return (
            <>
              {
                user?.emailVerified
                ? <SearchResults
                    initialRouteCategory={props.selectedCategory}
                    initialDropdownCategories={props.initialCategories}
                    disableCategoriesFilter={true} // disable categoriesFilter
                    user={user}
                  />
                : <div style={{ padding: '1rem'}}>
                    <VerifyEmailBanner/>
                  </div>
              }
            </>
          )
        }}
      </UserProfileWrapper>
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



export const getStaticPaths = async (ctx: NextPageContext) => {

  const { data } = await serverApolloClient(ctx).query<QueryData1, QueryVar1>({
    query: GET_CATEGORIES,
  })
  const initialCategories = data?.getCategories
  // const initialCategories = categoryPreviewsBackup

  // Get the paths we want to pre-render based on posts
  const paths = [
    { params: { categorySlug: "all" } },
    ...initialCategories.map(category => ({
      params: {
        categorySlug: category.slug
      },
    }))
  ]

  return {
    paths: paths,
    fallback: false,
  }
}


export const getStaticProps: GetStaticProps = async (ctx) => {

  const categorySlug: string = ctx?.params?.categorySlug as any;

  const { data } = await serverApolloClient(ctx).query<QueryData1, QueryVar1>({
    query: GET_CATEGORIES,
  })
  const initialCategories = data?.getCategories
  // const initialCategories = categoryPreviewsBackup

  // "all" category slug is filtered out on the backend and ignored
  // no category filter -> all categories
  let defaultCategory = {
    id: "",
    slug: "all",
    name: "All Categories"
  } as any

  let selectedCategory = [ ...initialCategories, defaultCategory ]
    .find(s => s.slug === categorySlug) ?? ""

  let categoryName = selectedCategory?.name ?? ""

  return {
    props: {
      initialCategories: initialCategories,
      categoryName: categoryName,
      selectedCategory: selectedCategory,
      revalidate: 120, // 2min
    }
  };
}

export default CategorySlugSSR;



