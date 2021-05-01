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

////////// SSR ///////////
interface Context extends NextPageContext {
  apolloClient: ApolloClient<object>;
}

// interface QData {
//   getCompleteOrderIdsGroupedByDay: OrdersGroupedByDay[]
// }
// interface QVar {
//   before: Date
//   after: Date
// }


// PayoutsCompleteListPage.getInitialProps = async (ctx: Context) => {

//   const { data } = await serverApolloClient(ctx).query<QData, QVar>({
//     query: GET_COMPLETE_ORDER_IDS_GROUPED_BY_DAY,
//     variables: { },
//   })
//   let initialOrderIdsGroupedByDay = data.getCompleteOrderIdsGroupedByDay;
//   console.log('initialOrderIdsGroupedByDay SSR: ', initialOrderIdsGroupedByDay);

//   return {
//     orderIdsGroupedByDay: initialOrderIdsGroupedByDay,
//   };
// }

export default withStyles(styles)( PayoutsCompleteListPage );





