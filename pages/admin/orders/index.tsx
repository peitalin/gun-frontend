import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerProfileDashboard/styles";
import clsx from "clsx";
// Components
import Loading from "components/Loading";
import LoadingBarSSR from "components/LoadingBarSSR";
import Typography from "@material-ui/core/Typography";
import OrderSalesHistory from "pageComponents/SellerProfileDashboard/OrderSalesHistory";
// next
// SSR disable
import dynamic from "next/dynamic";
import { SellerProfileProps } from "layout/GetUser/SellerProfileWrapper";
const SellerProfileWrapper = dynamic(() => import("layout/GetUser/SellerProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";



const MyOrderSalesHistoryPage = (props: ReactProps) => {
  // state
  const {
    classes
  } = props;

  return (
    <>
      <MetaHeadersPage
        title="Orders - Seller Dashboard - Relay.shop"
        robots="noindex"
      />
      <SellerProfileWrapper>
      {({ data, loading, error }: SellerProfileProps) => {
        return (
          <div className={classes.contentContainer}>
            <OrderSalesHistory />
          </div>
        )
      }}
      </SellerProfileWrapper>
    </>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}


export default withStyles(styles)( MyOrderSalesHistoryPage );


