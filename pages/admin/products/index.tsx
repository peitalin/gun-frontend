import React from "react";
import {oc as option} from "ts-optchain";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerProfileDashboard/styles";
import clsx from "clsx";
// Components
import PublishedProductsList from "pageComponents/SellerProfileDashboard/PublishedProductsList";
import LoadingBarSSR from "components/LoadingBarSSR";
// SSR disable
import dynamic from "next/dynamic";
import { SellerProfileProps } from "layout/GetUser/SellerProfileWrapper";
const SellerProfileWrapper = dynamic(() => import("layout/GetUser/SellerProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";





const PublishedProductsPage = (props: ReactProps) => {

  const {
    classes
  } = props;

  // return <LoadingBarSSR/>

  return (
    <>
      <MetaHeadersPage
        title="Products - Seller Dashboard - Relay.shop"
        robots="noindex"
      />
      <SellerProfileWrapper>
      {({ data, loading, error }: SellerProfileProps) => {
        return (
          <div className={classes.contentContainer}>
            <PublishedProductsList
              store={option(data).user.store()}
            />
          </div>
        )
      }}
      </SellerProfileWrapper>
    </>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}

export default withStyles(styles)( PublishedProductsPage );