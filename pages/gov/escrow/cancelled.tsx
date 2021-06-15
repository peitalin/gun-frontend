import React from "react";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerDashboard/styles";
import clsx from "clsx";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import OrdersCancelledList from "pageComponents/Gov/OrdersCancelledList";
// next
// SSR disable
import dynamic from "next/dynamic";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})



const PayoutsCancelledListPage = (props: ReactProps) => {
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
            <OrdersCancelledList />
          </div>
        )
      }}
    </AdminProfileWrapper>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
}

export const getStaticProps = async (context) => {
  return { props: { } };
};

export default withStyles(styles)( PayoutsCancelledListPage );


