import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerProfileDashboard/styles";
import clsx from "clsx";
// Components
import Loading from "components/Loading";
import LoadingBarSSR from "components/LoadingBarSSR";
// next
// disable SSR
import dynamic from "next/dynamic";
const ManagePromoCodes = dynamic(
  () => import("pageComponents/SellerProfileDashboard/ManagePromoCodes"), {
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



const ManagePromoCodesPage = (props: ReactProps) => {
  // state
  const {
    classes
  } = props;

  return (
    <>
      <MetaHeadersPage
        title="Manage Promo Codes - Relay.shop"
        robots="noindex"
      />
      <SellerProfileWrapper>
      {({ data, loading, error }: SellerProfileProps) => {
        return (
          <div className={classes.contentContainer}>
            <ManagePromoCodes/>
          </div>
        )
      }}
      </SellerProfileWrapper>
    </>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}

export default withStyles(styles)( ManagePromoCodesPage );


