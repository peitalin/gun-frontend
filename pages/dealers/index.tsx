import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/DealerProfileDashboard/styles";
import clsx from "clsx";
// Typings
import { StorePrivate } from "typings/gqlTypes";
// Components
import Loading from "components/Loading";
import LoadingBarSSR from "components/LoadingBarSSR";
// next
// SSR disable
import dynamic from "next/dynamic";
const EditDealerProfile = dynamic(
  () => import("pageComponents/DealerProfileDashboard/EditDealerProfile"), {
    loading: () => <Loading />,
    ssr: false,
  }
)
import { DealerProfileProps } from "layout/GetUser/DealerProfileWrapper";
const DealerProfileWrapper = dynamic(() => import("layout/GetUser/DealerProfileWrapper"), {
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
      <DealerProfileWrapper>
      {({ data, loading, error }: DealerProfileProps) => {
        return (
          <div className={classes.contentContainer}>
            {
              data && data.user && data.user.store &&
              <>
                DEALER DASBOARD
                <EditDealerProfile/>
              </>
            }
          </div>
        );
      }}
      </DealerProfileWrapper>
    </>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}

export default withStyles(styles)( EditStoreAdminPage );


