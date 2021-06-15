
import React from "react";
// Utils Components
import ErrorBounds from 'components/ErrorBounds';
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient } from "@apollo/client";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";



const Stores: NextPage<ReactProps> = (props) => {

  return (
    <ErrorBounds>
      Stores
    </ErrorBounds>
  )
}

///////////////// TYPINGS ///////////////////
interface ReactProps {
}

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default Stores






