import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
// SSR
import { NextPage, NextPageContext } from 'next';
// GraphQL
import { serverApolloClient } from "utils/apollo";
import { useApolloClient, ApolloClient } from "@apollo/client";
import LoadingBarSSR from "components/LoadingBarSSR";
// SSR disable
import dynamic from "next/dynamic";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
import OrdersPendingApprovals from "pageComponents/Gov/OrdersPendingApprovals";



const PendingApprovalsPage: NextPage<ReactProps> = (props) => {
  return (
    <AdminProfileWrapper
      disablePadding
      disableAdminBorder
    >
      {({ data, loading, error }: AdminProfileProps) => {
        return (
          <div className={props.classes.GovApprovalsRoot}>
            <OrdersPendingApprovals
              admin={data.user}
            />
          </div>
        )
      }}
    </AdminProfileWrapper>
  )
}


const styles = (theme: Theme) => createStyles({
  GovApprovalsRoot: {
    marginTop: '2rem',
  },
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
}

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default withStyles(styles)( PendingApprovalsPage );






