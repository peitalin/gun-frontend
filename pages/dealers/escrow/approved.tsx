import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerProfileDashboard/styles";
import clsx from "clsx";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import ApprovedPayoutsList from "pageComponents/Gov/PayoutsApprovedList";
// next
// SSR disable
import dynamic from "next/dynamic";
import { DealerProfileProps } from "layout/GetUser/DealerProfileWrapper";
const DealerProfileWrapper = dynamic(() => import("layout/GetUser/DealerProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})



const DealerApprovedPayoutsListPage = (props: ReactProps) => {
  // state
  const {
    classes
  } = props;

  return (
    <DealerProfileWrapper
      disablePadding
      disableDealerBorder
    >
      {(spp: DealerProfileProps) => {
        return (
          <div className={classes.contentContainer}>
            <ApprovedPayoutsList />
          </div>
        )
      }}
    </DealerProfileWrapper>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}

export default withStyles(styles)( DealerApprovedPayoutsListPage );


