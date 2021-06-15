import React from "react";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerDashboard/styles";
import clsx from "clsx";
// Components
import PublishedProductsList from "pageComponents/SellerDashboard/PublishedProductsList";
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

  return (
    <>
      <MetaHeadersPage
        title="Products - Seller Dashboard"
        robots="noindex"
      />
      <SellerProfileWrapper>
        {({ data, loading, error }: SellerProfileProps) => {
          return (
            <div className={classes.contentContainer}>
              <PublishedProductsList
                store={data?.user?.store}
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

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default withStyles(styles)( PublishedProductsPage );