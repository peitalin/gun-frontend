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
// SSR disable
import dynamic from "next/dynamic";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})



const GovRoot = (props: ReactProps) => {

  const { classes } = props;

  return (
    <AdminProfileWrapper>
      {({ data, loading, error }: AdminProfileProps) => {

        const user = option(data).user();
        const disabled = option(user).userRole() !== Role.PLATFORM_ADMIN;

        return (
          <div className={classes.govHomePageSSR}>
            {
              !user &&
              <div className={classes.homeHeading}>
                <Typography variant="h4">
                  Please login
                </Typography>
              </div>
            }
            {
              user && disabled &&
              <div className={classes.homeHeading}>
                <Typography variant="h4">
                  Access denied
                </Typography>
              </div>
            }
            {
              user && !disabled &&
              <div className={classes.homeHeading}>
                <Typography variant="h4" gutterBottom>
                  {`Logged in as PLATFORM_ADMIN:`}
                </Typography>
                <Typography variant="h4">
                  {user.email}
                </Typography>
              </div>
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
  homeHeading: {
    paddingTop: '4rem',
    padding: '1rem',
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


export default withStyles(styles)( GovRoot );
