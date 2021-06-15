import React from "react";
// Typings
import { Store } from "typings/gqlTypes";
import StoreId from "pageComponents/S/StoreId";
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient, useQuery } from "@apollo/client";
import { serverApolloClient } from "utils/apollo";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import { useRouter } from "next/router";
import { GET_STORE_PUBLIC } from 'queries/store-queries';
import PageContainer from "layout/PageContainer";


const Stores = (props: ReactProps) => {

  const router = useRouter()
  const storeId = router?.query?.storeId as string;

  const { data } = useQuery<QData, QVar>(
    GET_STORE_PUBLIC, {
    variables: {
      storeId: storeId,
    },
  })

  let store = data.store;
  console.log('store SSR: ', store);

  return (
    <>
      <MetaHeadersPage
        title={`${store?.name} - Purchase firearms on Gun Marketplace`}
        description={
          store?.bio
          ? `${store?.bio} — Purchase firearms by ${store?.name} on GM.`
          : `Purchase firearms by ${store?.name} on GM.`
        }
      />
      <PageContainer>
        { store?.name ?? "Your Store" }
        {
          store?.id &&
          <StoreId initialStore={store}/>
        }
      </PageContainer>
    </>
  )
}

interface ReactProps {
}
interface QData {
  store: Store;
}
interface QVar {
  storeId: string;
}

export default Stores;



