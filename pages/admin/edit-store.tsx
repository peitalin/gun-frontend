import React from "react";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerDashboard/styles";
import clsx from "clsx";
// Typings
import { StorePrivate } from "typings/gqlTypes";
// Components
import Loading from "components/Loading";
import LoadingBarSSR from "components/LoadingBarSSR";
// next
// SSR disable
import dynamic from "next/dynamic";
const EditSellerProfile = dynamic(
  () => import("pageComponents/SellerDashboard/EditSellerProfile"), {
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




const EditStoreAdminPage = (props: ReactProps) => {

  // state
  const { classes } = props;

  return (
    <>
      <MetaHeadersPage
        title="Edit Store - gunmarketplace.com.au"
        robots="noindex"
      />
      <SellerProfileWrapper>
        {({ data, loading, error }: SellerProfileProps) => {
          return (
            <div className={classes.contentContainer}>
              {
                data && data.user && data.user.store &&
                <EditSellerProfile asModal={false} />
              }
            </div>
          );
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

export default withStyles(styles)( EditStoreAdminPage );


