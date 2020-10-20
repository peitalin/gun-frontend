import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerProfileDashboard/styles";
import clsx from "clsx";
// Typings
import { Payout, StorePrivate, ID } from "typings/gqlTypes";
// Components
import Loading from "components/Loading";
import LoadingBarSSR from "components/LoadingBarSSR";
//router
import { useRouter } from "next/router";
import Redirect from "pageComponents/Redirect";
// Graphql
import { GET_PAYOUT_BY_ID } from "queries/payouts-queries";
// pagination
import { useQuery } from "@apollo/client";
import PayoutDetails from "pageComponents/SellerProfileDashboard/PayoutHistory/PayoutDetails"
import dynamic from "next/dynamic";
import { SellerProfileProps } from "layout/GetUser/SellerProfileWrapper";
const SellerProfileWrapper = dynamic(() => import("layout/GetUser/SellerProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";


const PayoutIdPage = (props: ReactProps) => {
  // state
  const { classes } = props;
  const router = useRouter();

  const { data, loading, error } = useQuery<QueryData, QueryVar>(
    GET_PAYOUT_BY_ID, {
    variables: {
      payoutId: router.query.payoutId as string
    },
    ssr: true,
  })

  return (
    <>
      <MetaHeadersPage
        title="Payout Details - Seller Dashboard - Relay.shop"
        robots="noindex"
      />
      <SellerProfileWrapper>
      {(dataUser: SellerProfileProps) => {
        if (loading) {
          return <Loading fixed loading={loading} delay={"200ms"}/>
        } else if (error) {
          return (
            <Redirect
              message={"Payout data could not be retrieved. Redirecting to payouts..."}
              redirectCondition={!!error}
              redirectDelay={1000}
              redirectRoute={"/admin/payouts"}
            />
          )
        } else {
          return (
            <div className={classes.contentContainer}>
              {
                data &&
                data.getPayoutById &&
                <PayoutDetails
                  payout={data.getPayoutById}
                />
              }
              { loading && <Loading fixed/> }
            </div>
          )
        }

      }}
      </SellerProfileWrapper>
    </>
  )

}

interface ReactProps extends WithStyles<typeof styles> {
}
interface QueryData {
  getPayoutById: Payout
}
interface QueryVar {
  payoutId: ID
}

export default withStyles(styles)( PayoutIdPage );


