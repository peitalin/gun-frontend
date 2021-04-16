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
import { DealerProfileProps } from "layout/GetUser/DealerProfileWrapper";
const DealerProfileWrapper = dynamic(() => import("layout/GetUser/DealerProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";




const EditDealerHomePage = (props: ReactProps) => {

  // state
  const { classes } = props;

  return (
    <>
      <MetaHeadersPage
        title="Edit Dealer Profile - gunmarketplace.com.au"
        robots="noindex"
      />
      <DealerProfileWrapper>
      {({ data, loading, error }: DealerProfileProps) => {
        return (
          <div className={classes.contentContainer}>
            {
              data?.user?.dealer &&
              <EditDealerProfile user={data?.user}/>
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

export default withStyles(styles)( EditDealerHomePage );


