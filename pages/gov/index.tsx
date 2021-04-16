import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';

import Typography from "@material-ui/core/Typography";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius, BoxShadows, Colors } from "layout/AppTheme";
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

        const user = data?.user;
        const disabled = user?.userRole !== Role.PLATFORM_ADMIN;

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
    justifyContent: "flex-start",
    alignItems: "center",
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.darkWhite,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    border: theme.palette.type === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDarker}`,
    borderRadius: BorderRadius,
    minHeight: '80vh',
  },
  homeHeading: {
    paddingTop: '8rem',
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
