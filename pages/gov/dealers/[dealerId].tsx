import React from "react";
// SSR
import { NextPage, NextPageContext } from 'next';
import { serverApolloClient } from "utils/apollo";
import { ApolloClient, useQuery } from "@apollo/client";
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
  } = props;
  const router = useRouter();

  let dealerId = router.query.dealerId as string;

  const { data } = useQuery<QData, QVar>(
    SEARCH_DEALER_AS_ADMIN, {
    variables: {
      dealerIdOrLicenseNumber: dealerId,
    },
  })
  let initialDealer = data.searchDealerAsAdmin;
  console.log('searchDealer SSR: ', initialDealer);

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
}

interface QData {
  searchDealerAsAdmin: Dealer
}
interface QVar {
  dealerIdOrLicenseNumber: string
}


export default withStyles(styles)( EditDealerGov );

