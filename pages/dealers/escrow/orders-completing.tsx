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
import { DealerProfileProps } from "layout/GetUser/DealerProfileWrapper";
const DealerProfileWrapper = dynamic(() => import("layout/GetUser/DealerProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
import CompletingOrders from "pageComponents/DealerDashboard/CompletingOrders";



const DealerCompletingOrders: NextPage<ReactProps> = (props) => {
  return (
    <DealerProfileWrapper
      disablePadding
      disableDealerBorder
    >
      {({ data, loading, error }: DealerProfileProps) => {
        return (
          <CompletingOrders
            dealer={data.user}
          />
        )
      }}
    </DealerProfileWrapper>
  )
}


const styles = (theme: Theme) => createStyles({
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
}

export const getStaticProps = async (context) => {
  return { props: { } };
};


export default withStyles(styles)( DealerCompletingOrders );






