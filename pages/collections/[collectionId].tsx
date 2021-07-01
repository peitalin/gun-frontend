import React from "react";
// Typings
import { Collection } from "typings/gqlTypes";
import CollectionsPage from "pageComponents/Collections/CollectionsPage";
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient, useQuery } from "@apollo/client";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import { useRouter } from "next/router";
import { GET_COLLECTION } from 'queries/collections-queries';
import PageContainer from "layout/PageContainer";


const CollectionSSR = (props: ReactProps) => {

  const router = useRouter()
  const collectionId = router?.query?.collectionId as string;

  const { data } = useQuery<QData, QVar>(
    GET_COLLECTION, {
    variables: {
      collectionId: collectionId,
    },
  })

  let collection = data.getCollection;
  // console.log('colll: ', collection);

  return (
    <>
      <MetaHeadersPage
        title={`Used guns collection - ${collection?.name} - view on Gun Marketplace`}
        description={
          `Collection of used guns on gunmarketplace.com.au - ${collection?.name}`
        }
      />
      <PageContainer>
        { collection?.name ?? "Your Collection" }
      </PageContainer>
    </>
  )
}

interface ReactProps {
}
interface QData {
  getCollection: Collection;
}
interface QVar {
  collectionId: string;
}

export default CollectionSSR;



