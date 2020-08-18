import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';

import Typography from "@material-ui/core/Typography";
import { oc as option } from "ts-optchain";
// Graphql
import { useQuery, ApolloClient, useApolloClient } from "@apollo/client";
import { GET_USER } from "queries/user-queries";
import { UserPrivate, Role } from 'typings/gqlTypes';
import LoadingBarSSR from "components/LoadingBarSSR";
// SSR disable
import dynamic from "next/dynamic";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})



const GovRoot = (props: ReactProps) => {
  return (
    <AdminProfileWrapper>
      {({ data, loading, error }: AdminProfileProps) => {

        const user = option(data).user();
        const disabled = option(user).userRole() !== Role.PLATFORM_ADMIN;

        return (
          <div className='hero'>
            {
              !user &&
              <Typography variant="h4">
                Please login
              </Typography>
            }
            {
              user && disabled &&
              <Typography variant="h4">
                Access denied
              </Typography>
            }
            {
              user && !disabled &&
              <Typography variant="h4">
                {`Logged in as Admin: ${user.email}`}
              </Typography>
            }
          </div>
        )
      }}
    </AdminProfileWrapper>
  )

}

interface ReactProps {
  user: UserPrivate;
  apolloClient: ApolloClient<any>;
}
interface QueryData {
  user: UserPrivate;
}


////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

GovRoot.getInitialProps = async (ctx: Context) => {

  try {
    const { data, loading, errors } = await ctx.apolloClient.query<QueryData>({
      query: GET_USER,
    });
    console.log("getInitialProps: ", data)
    // return props
    return {
      user: data.user,
      apolloClient: ctx.apolloClient,
    };
  } catch(e) {
    return {
      user: null,
      apolloClient: ctx.apolloClient,
    };
  }

}


export default GovRoot;
