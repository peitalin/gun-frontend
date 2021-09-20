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

import dynamic from "next/dynamic";
import LoadingBarSSR from "components/LoadingBarSSR";
import { UserProfileProps } from "layout/GetUser/UserProfileWrapper";
const UserProfileWrapper = dynamic(() => import("layout/GetUser/UserProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})



const NewProductsSSR: NextPage<ReactProps> = (props) => {

  return (
    <>
      <MetaHeadersPage
        title={"Browse new listings for used guns - Gun Marketplace"}
        description={`
          Shop Gun Marketplace and browse newly listed used firearms to trade.
        `}
        ogTitle={"Browse new used guns listings - Gun Marketplace Australia"}
        ogDescription={`
          Shop Gun Marketplace and browse newly listed used firearms to trade.
        `}
        // ogImage={
        //   "https://image-content.gunmarketplace.com.au/og-img-category.png"
        // }
      />
      <UserProfileWrapper>
        {(dataUser: UserProfileProps) => {
          return (
            <>
              {
                dataUser?.data?.user?.defaultLicense?.verified
                ? <CategoryId
                    initialProducts={undefined}
                    initialRouteCategory={props.selectedCategory}
                    initialDropdownCategories={props.initialCategories}
                    disableCategoriesFilter={false}
                    bannerTitle={"New Listings"}
                    bannerBlurb={"Browse and search through new listings"}
                  />
                : <div>Verify account</div>
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
  selectedCategory: Categories;
}

interface QueryData1 {
  getCategories: Categories[];
}
interface QueryVar1 {
  slug?: string;
}



export const getStaticProps: GetStaticProps = async (ctx) => {
// export async function getServerSideProps(ctx: NextPageContext) {

  const categorySlug: string = ctx?.params?.categorySlug as any;
  // const categorySlug: string = ctx?.query?.categorySlug as any;

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


  return {
    props: {
      initialCategories: data?.getCategories,
      selectedCategory: selectedCategory,
      revalidate: 120, // 2min
    }
  };
}


export default NewProductsSSR;



