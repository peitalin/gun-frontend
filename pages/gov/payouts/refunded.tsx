import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerProfileDashboard/styles";
import clsx from "clsx";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import OrdersRefundedList from "pageComponents/Gov/OrdersRefundedList";
// next
// SSR disable
import dynamic from "next/dynamic";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})



const PayoutsCompletedListPage = (props: ReactProps) => {
  // state
  const {
    classes
  } = props;

  return (
    <AdminProfileWrapper
      disablePadding
      disableAdminBorder
    >
      {(spp: AdminProfileProps) => {
        return (
          <div className={classes.contentContainer}>
            <OrdersRefundedList />
          </div>
        )
      }}
    </AdminProfileWrapper>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}

export default withStyles(styles)( PayoutsCompletedListPage );


