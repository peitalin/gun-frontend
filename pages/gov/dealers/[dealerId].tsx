import React from "react";
// SSR
import { NextPage, NextPageContext } from 'next';
import { serverApolloClient } from "utils/apollo";
import { ApolloClient } from "@apollo/client";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/DealerDashboard/styles";
import clsx from "clsx";
// Typings
import { Dealer } from "typings/gqlTypes";
// Components
import Loading from "components/Loading";
import LoadingBarSSR from "components/LoadingBarSSR";
// next
// SSR disable
import dynamic from "next/dynamic";
const EditDealerProfile = dynamic(
  () => import("pageComponents/DealerDashboard/EditDealerProfile"), {
    loading: () => <Loading />,
    ssr: false,
  }
)
import { SEARCH_DEALER_AS_ADMIN } from "queries/dealers-queries";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import { useRouter } from "next/router";




const EditDealerGov = (props: ReactProps) => {

  // state
  const {
    classes,
    initialDealer,
  } = props;
  const router = useRouter();

  let dealerId = router.query.dealerId;

  return (
    <>
      <MetaHeadersPage
        title="Edit Dealer Profile - gunmarketplace.com.au"
        robots="noindex"
      />
      <AdminProfileWrapper>
      {({ data, loading, error }: AdminProfileProps) => {
        return (
          <div className={classes.contentContainer}>
            {
              initialDealer &&
              <EditDealerProfile
                dealer={initialDealer}
                editAsAdmin={true}
              />
            }
          </div>
        );
      }}
      </AdminProfileWrapper>
    </>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  initialDealer: Dealer;
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<any>;
}

interface QData {
  searchDealerAsAdmin: Dealer
}
interface QVar {
  dealerIdOrLicenseNumber: string
}

EditDealerGov.getInitialProps = async (ctx: Context) => {

  const dealerId: string = ctx.query.dealerId as any;
  // console.log('getInitialProps ctx: ', ctx.query);
  console.log('getInitialProps dealerId: ', dealerId);

  if (!dealerId) {
    return {
      initialDealer: null,
      classes: null,
    };
  }

  const { data } = await serverApolloClient(ctx).query<QData, QVar>({
    query: SEARCH_DEALER_AS_ADMIN,
    variables: {
      dealerIdOrLicenseNumber: dealerId,
    },
  })

  let initialDealer = data.searchDealerAsAdmin;
  console.log('searchDealer SSR: ', initialDealer);

  return {
      initialDealer: initialDealer,
      classes: null,
  };

}

export default withStyles(styles)( EditDealerGov );

