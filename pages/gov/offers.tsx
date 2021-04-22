import React from "react";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerDashboard/styles";
import clsx from "clsx";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
// next
// SSR disable
import dynamic from "next/dynamic";
import { UserProfileProps } from "layout/GetUser/UserProfileWrapper";
const UserProfileWrapper = dynamic(() => import("layout/GetUser/UserProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
import BiddingRoom from "pageComponents/BiddingRoom";


const OffersBuyerPage = (props: ReactProps) => {

  // state
  const { classes } = props;

  return (
    <>
      <MetaHeadersPage
        title="Offers - View your bids - gunmarketplace.com.au"
        robots="noindex"
      />
      <UserProfileWrapper>
      {({ data, loading, error }: UserProfileProps) => {
        return (
          <div className={classes.contentContainer}>
            {
              data && data.user && data.user.store &&
              <BiddingRoom asModal={false} />
            }
          </div>
        );
      }}
      </UserProfileWrapper>
    </>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
}

export default withStyles(styles)( OffersBuyerPage );


