import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerProfileDashboard/styles";
import clsx from "clsx";
// Typings
import { PayoutsConnection, Payout, StorePrivate } from "typings/gqlTypes";
// Components
import Loading from "components/Loading";
import LoadingBarSSR from "components/LoadingBarSSR";
// Graphql
import { GET_PAYOUTS_BY_STORE } from "queries/payouts-queries";
// pagination
import PaginateButtons from "components/Paginators/PaginateButtons";
import Typography from "@material-ui/core/Typography";
// next
// SSR disable
import dynamic from "next/dynamic";
const PayoutHistory = dynamic(
  () => import("pageComponents/SellerProfileDashboard/PayoutHistory"), {
    loading: () => <Loading />,
    ssr: false,
  }
)
import { SellerProfileProps } from "layout/GetUser/SellerProfileWrapper";
const SellerProfileWrapper = dynamic(() => import("layout/GetUser/SellerProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";



const PayoutsPage = (props: ReactProps) => {
  // state
  const { classes } = props;

  return (
    <>
      <MetaHeadersPage
        title="Payouts - Seller Dashboard  - Relay.shop"
        robots="noindex"
      />
      <SellerProfileWrapper>
      {({ data, loading, error }: SellerProfileProps) => {
        return (
          <div className={classes.contentContainer}>
            <PaginateButtons<QueryData, QueryVar, Payout>
              query={GET_PAYOUTS_BY_STORE}
              variables={{
                storeId: data.user.store.id
              }}
              count={24}
              sortAscending={false}
              connectionSelector={(data: QueryData) => [
                option(data).getPayouts(),
                'getPayouts',
              ]}
              ssr={true}
            >
              {({ loading, data, error }: PaginateProps) => {
                if (loading) {
                  return <Loading loading={loading} fixed />
                } else if (option(data).getPayouts()) {
                  return (
                    <PayoutHistory payoutsConnection={ data.getPayouts }/>
                  )
                } else {
                  return (
                    <div className={classes.root}>
                      <Typography variant="h3">
                        No Payout data
                      </Typography>
                    </div>
                  )
                }
              }}
            </PaginateButtons>
          </div>
        );
      }}
      </SellerProfileWrapper>
    </>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}
interface PaginateProps {
  data: QueryData;
  error: any;
  loading: boolean;
  refetch: any;
}
interface QueryData {
  getPayouts: PayoutsConnection
}
interface QueryVar {
}

export default withStyles(styles)( PayoutsPage );


