import React from "react";
// GraphQL
import { GET_CATEGORIES } from "queries/categories-queries";
// Typings
import {
  Categories,
} from "typings/gqlTypes";
import SearchOpenSea from "pageComponents/SearchOpenSea";
// SSR
import { NextPage, GetStaticProps } from 'next';
import { serverApolloClient } from "utils/apollo";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import VerifyEmailBanner from "components/VerifyGunLicenseBanner";

import dynamic from "next/dynamic";
import LoadingBarSSR from "components/LoadingBarSSR";
import { UserProfileProps } from "layout/GetUser/UserProfileWrapper";
const UserProfileWrapper = dynamic(() => import("layout/GetUser/UserProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})



const New2ProductsSSR: NextPage<ReactProps> = (props) => {

  return (
    <>
      <MetaHeadersPage
        title="Gun Marketplace - Buy guns smarter. Sell guns faster."
        ogTitle="Gun Marketplace - Buy guns smarter. Sell guns faster."
        description={`
          Browse new used guns across various marketplaces on Gun Marketplace.
        `}
        ogDescription={`
          Browse new used guns across various marketplaces on Gun Marketplace.
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
                ? <SearchOpenSea
                    initialRouteCategory={props.selectedCategory}
                    initialDropdownCategories={props.initialCategories}
                    user={user}
                    bannerTitle={"Search New Listings"}
                    bannerBlurb={"Browse and search through new listings"}
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


export default New2ProductsSSR;



