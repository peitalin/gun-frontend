import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';

import Typography from "@material-ui/core/Typography";
import { oc as option } from "ts-optchain";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// Graphql
import { useQuery, ApolloClient, useApolloClient } from "@apollo/client";
import { GET_USER } from "queries/user-queries";
import { UserPrivate, Role } from 'typings/gqlTypes';
import LoadingBarSSR from "components/LoadingBarSSR";
import TestEmails from "pageComponents/Gov/TestEmails";
// SSR disable
import dynamic from "next/dynamic";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})



const TestEmailsSSR = (props: ReactProps) => {

  const { classes } = props;

  return (
    <AdminProfileWrapper>
      {({ data, loading, error }: AdminProfileProps) => {

        const user = option(data).user();
        const disabled = option(user).userRole() !== Role.PLATFORM_ADMIN;

        return (
          <div className={classes.govHomePageSSR}>
            {
              user && !disabled &&
              <TestEmails userEmail={user.email} />
            }
          </div>
        )
      }}
    </AdminProfileWrapper>
  )

}

interface ReactProps extends WithStyles<typeof styles> {
  user: UserPrivate;
  apolloClient: ApolloClient<any>;
}
interface QueryData {
  user: UserPrivate;
}
const styles = (theme: Theme) => createStyles({
  govHomePageSSR: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
})


////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

TestEmailsSSR.getInitialProps = async (ctx: Context) => {

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


export default withStyles(styles)( TestEmailsSSR );
