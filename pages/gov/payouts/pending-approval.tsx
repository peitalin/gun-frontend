import React from "react";
import { oc as option } from "ts-optchain";
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
import PayoutsPendingApprovals from "pageComponents/Gov/PayoutsPendingApprovals";



const PendingApprovalsPage: NextPage<ReactProps> = (props) => {
  return (
    <AdminProfileWrapper
      disablePadding
      disableAdminBorder
    >
      {({ data, loading, error }: AdminProfileProps) => {
        return (
          <div className={props.classes.GovApprovalsRoot}>
            <PayoutsPendingApprovals
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

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

PendingApprovalsPage.getInitialProps = async (ctx: Context) => {

  // Will trigger this getInitialProps when requesting route /pages/ProductGallery
  // otherwise initialProps may be fed via /pages/index.tsx's getInitialProps
  const aClient = serverApolloClient(ctx);
  const emptyConnection = { pageInfo: {}, edges: [] };

  try {

    // const req3 = aClient.query({
    //   query: GET_LIMITED_RELEASE_PRODUCTS,
    //   variables: {
    //     query: {
    //       count: 5,
    //       cursor: null,
    //       pageBackwards: false,
    //       sortAscending: false,
    //     }
    //   }
    // });

    return {
      classes: undefined,
    } as any;

  } catch(e) {
    return {
      classes: undefined,
    };
  }
}


export default withStyles(styles)( PendingApprovalsPage );






