import React from "react";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/DealerDashboard/styles";
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
  () => import("pageComponents/DealerDashboard/EditDealerProfile"), {
    loading: () => <Loading />,
    ssr: false,
  }
)
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";




const CreateDealerHomepage = (props: ReactProps) => {

  // state
  const { classes } = props;

  return (
    <>
      <MetaHeadersPage
        title="Create Dealer Profile - gunmarketplace.com.au"
        robots="noindex"
      />
      <AdminProfileWrapper>
      {({ data, loading, error }: AdminProfileProps) => {
        return (
          <div className={classes.contentContainer}>
            <EditDealerProfile user={data?.user}/>
          </div>
        );
      }}
      </AdminProfileWrapper>
    </>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}

export default withStyles(styles)( CreateDealerHomepage );


