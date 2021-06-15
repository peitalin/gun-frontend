import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';

import Typography from "@material-ui/core/Typography";
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

        const user = data?.user;
        const disabled = user?.userRole !== Role.PLATFORM_ADMIN;

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
}

const styles = (theme: Theme) => createStyles({
  govHomePageSSR: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
})

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default withStyles(styles)( TestEmailsSSR );
