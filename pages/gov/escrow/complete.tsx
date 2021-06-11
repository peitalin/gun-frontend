import React from "react";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerDashboard/styles";
import clsx from "clsx";
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient, useQuery } from "@apollo/client";
import { serverApolloClient } from "utils/apollo";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import PayoutsCompleteList from "pageComponents/Gov/PayoutsCompleteList";
import {
  OrdersGroupedByDay,
} from "typings/gqlTypes";
// SSR disable
import dynamic from "next/dynamic";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})




const PayoutsCompleteListPage = (props: ReactProps) => {
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
            <PayoutsCompleteList
              admin={data.user}
              // orderIdsGroupedByDay={orderIdsGroupedByDay}
            />
          </div>
        )
      }}
    </AdminProfileWrapper>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  // orderIdsGroupedByDay: OrdersGroupedByDay[]
}

export default withStyles(styles)( PayoutsCompleteListPage );





