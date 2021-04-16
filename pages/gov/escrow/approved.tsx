import React from "react";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerDashboard/styles";
import clsx from "clsx";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import ApprovedPayoutsList from "pageComponents/Gov/PayoutsApprovedList";
// next
// SSR disable
import dynamic from "next/dynamic";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})



const ApprovedPayoutsListPage = (props: ReactProps) => {
  // state
  const {
    classes
  } = props;

  return (
    <AdminProfileWrapper
      disablePadding
      disableAdminBorder
    >
      {({ data, loading }: AdminProfileProps) => {
        return (
          <div className={classes.contentContainer}>
            <ApprovedPayoutsList
              admin={data?.user}
            />
          </div>
        )
      }}
    </AdminProfileWrapper>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}

export default withStyles(styles)( ApprovedPayoutsListPage );


