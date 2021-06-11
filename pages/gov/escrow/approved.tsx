import React from "react";
// Styles
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "pageComponents/SellerDashboard/styles";
import clsx from "clsx";
// SSR
import { NextPage, NextPageContext } from 'next';
import { ApolloClient } from "@apollo/client";
import { serverApolloClient } from "utils/apollo";
// Components
import LoadingBarSSR from "components/LoadingBarSSR";
import PayoutsApprovedList from "pageComponents/Gov/PayoutsApprovedList";
import {
  OrdersGroupedByDay,
} from "typings/gqlTypes";
import {
  GET_ADMIN_APPROVED_ORDER_IDS_GROUPED_BY_DAY,
  GET_ORDERS_ADMIN_APPROVED_BY_IDS_CONNECTION,
} from "queries/orders-admin-queries";
// next
// SSR disable
import dynamic from "next/dynamic";
import { AdminProfileProps } from "layout/GetUser/AdminProfileWrapper";
const AdminProfileWrapper = dynamic(() => import("layout/GetUser/AdminProfileWrapper"), {
  loading: () => <LoadingBarSSR/>,
  ssr: false,
})



const PayoutsApprovedListPage = (props: ReactProps) => {
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
            <PayoutsApprovedList
              admin={data?.user}
              orderIdsGroupedByDay={props.orderIdsGroupedByDay}
            />
          </div>
        )
      }}
    </AdminProfileWrapper>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  orderIdsGroupedByDay: OrdersGroupedByDay[]
}

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<object>;
}

interface QData {
  getAdminApprovedOrderIdsGroupedByDay: OrdersGroupedByDay[]
}
interface QVar {
}


export async function getServerSideProps(ctx: Context) {

  const { data } = await serverApolloClient(ctx).query<QData, QVar>({
    query: GET_ADMIN_APPROVED_ORDER_IDS_GROUPED_BY_DAY,
    variables: { },
  })
  let initialOrderIdsGroupedByDay = data?.getAdminApprovedOrderIdsGroupedByDay;
  console.log('initialOrderIdsGroupedByDay SSR: ', initialOrderIdsGroupedByDay);

  return {
    props: {
      orderIdsGroupedByDay: initialOrderIdsGroupedByDay,
    }
  };
}

export default withStyles(styles)( PayoutsApprovedListPage );


