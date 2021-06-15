import React from "react";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerDashboard/styles";
import clsx from "clsx";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import OrdersExpiringList from "pageComponents/Gov/OrdersExpiringList";
// next
// SSR disable
import dynamic from "next/dynamic";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})


const OrdersExpiringListPage = (props: ReactProps) => {
  // state
  const {
    classes
  } = props;

  return (
    <AdminProfileWrapper
      disablePadding
      disableAdminBorder
    >
      {({ data, loading, error }: AdminProfileProps) => {
        return (
          <div className={classes.contentContainer}>
            <OrdersExpiringList
              admin={data.user}
            />
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

export default withStyles(styles)( OrdersExpiringListPage );


