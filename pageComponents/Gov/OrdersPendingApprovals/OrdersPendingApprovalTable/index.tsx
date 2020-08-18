import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// SSR
import { NextPage, NextPageContext } from 'next';
import { useApolloClient } from "@apollo/client";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// MUI
import Typography from "@material-ui/core/Typography";
// Typings
import {
  PayoutItem,
  PageBasedConnection,
  PayoutItemsPagedConnection,
  UserPrivate,
  OrdersConnection,
  Order,
  User,
  Orders,
  OrderStatus,
} from "typings/gqlTypes";
import {
  GET_ORDERS_CREATED_CONNECTION,
  GET_ORDERS_PENDING_APPROVAL_CONNECTION,
  GET_ORDERS_ADMIN_APPROVED_CONNECTION,
} from "queries/orders-queries";
// Pagination
import { ConnectionQueryProps } from "components/Paginators/usePaginatePagedQueryHook";
import ErrorDisplay from "components/Error";
import LoadingBar from "components/LoadingBar";
// formatters
import dayjs from 'dayjs';
import currency from "currency.js";
// DataTable
import DataTableOrdersPending from "pageComponents/Gov/OrdersPendingApprovals/OrdersPendingApprovalTable/DataTableOrdersPending";
// graphl
import { useMutation, useQuery, useSubscription } from "@apollo/client";





const OrdersPendingApprovalTable: NextPage<ReactProps> = (props) => {

  const {
    classes,
    month = 10,
    year = 2019,
    // setRefetchPayoutItems: undefined,
    // refetchAll: undefined,
  } = props;

  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()
  const asTime = (d: Date) => dayjs(d).format("YYYY-MM-DD HH:mm:ss")
  const [count, setCount] = React.useState(10);

  const [ordersC_Limit, setOrdersC_Limit] = React.useState(10);
  const [ordersC_Offset, setOrdersC_Offset] = React.useState(0);

  const [ordersPA_Limit, setOrdersPA_Limit] = React.useState(10);
  const [ordersPA_Offset, setOrdersPA_Offset] = React.useState(0);

  const [ordersAA_Limit, setOrdersAA_Limit] = React.useState(10);
  const [ordersAA_Offset, setOrdersAA_Offset] = React.useState(0);


  const _ordersCreated = useQuery<QueryData, QueryVar>(
    GET_ORDERS_CREATED_CONNECTION , {
      variables: {
        limit: ordersC_Limit,
        offset: ordersC_Offset,
      },
      fetchPolicy: "network-only",
    }
  );

  const _ordersPendingApproval = useQuery<QueryData, QueryVar>(
    GET_ORDERS_PENDING_APPROVAL_CONNECTION , {
      variables: {
        limit: ordersPA_Limit,
        offset: ordersPA_Offset,
      },
      fetchPolicy: "network-only",
    }
  );

  const _ordersAdminApproved = useQuery<QueryData, QueryVar>(
    GET_ORDERS_ADMIN_APPROVED_CONNECTION , {
      variables: {
        limit: ordersAA_Limit,
        offset: ordersAA_Offset,
      },
      fetchPolicy: "network-only",
    }
  );

  let refetchQueriesParams = [
    {
      query: GET_ORDERS_CREATED_CONNECTION,
      variables: {
        limit: ordersC_Limit,
        offset: ordersC_Offset,
      },
    },
    {
      query: GET_ORDERS_PENDING_APPROVAL_CONNECTION,
      variables: {
        limit: ordersPA_Limit,
        offset: ordersPA_Offset,
      },
    },
    {
      query: GET_ORDERS_ADMIN_APPROVED_CONNECTION ,
      variables: {
        limit: ordersAA_Limit,
        offset: ordersAA_Offset,
      },
    },

  ]

  // const initialConnectionState: PayoutItemsPagedConnection = {
  //   edges: [],
  //   pageInfo: {
  //     isLastPage: false,
  //     pageNumber: 1,
  //     totalPages: 1,
  //   },
  //   totalCount: 0,
  //   totalAmount: 0,
  // };

  // // accumulate connection results as you scroll down.
  // const [
  //   accumConnection,
  //   setAccumConnection
  // ] = React.useState(initialConnectionState);

  // const connection = option(data).getOrdersPendingApprovalConnectionAdmin();
  // const orders = option(connection).edges([]);

  const ordersCreated = option(_ordersCreated).data.orders([])
    .filter(o => o.orderSnapshots.length)

  const ordersPendingApproval = option(_ordersPendingApproval).data.orders([])
    .filter(o => o.orderSnapshots.length)

  const ordersAdminApproved = option(_ordersAdminApproved).data.orders([])
    .filter(o => o.orderSnapshots.length)


  console.log("refetch queries params", refetchQueriesParams)

  // React.useEffect(() => {
  //   if (option(connection).edges()) {

  //     let updatedEdges = [
  //       ...accumConnection.edges,
  //       ...connection.edges.filter(e =>
  //         !accumConnection.edges.find(s => s.node.id === e.node.id)
  //       )
  //     ];

  //     setAccumConnection(s => {
  //       return {
  //         ...connection,
  //         edges: updatedEdges
  //       }
  //     })
  //   }
  // }, [option(connection).edges()])

  // // reset accumulated results if month or year changes
  // React.useEffect(() => {
  //   if (option(connection).edges()) {

  //     let newEdges = [
  //       ...connection.edges.filter(e =>
  //         !accumConnection.edges.find(s => s.node.id === e.node.id)
  //       )
  //     ];

  //     setAccumConnection(s => {
  //       return {
  //         ...connection,
  //         edges: newEdges
  //       }
  //     })
  //   }
  // }, [month, year])

  // // tunnel refetch up for other tabsl to refetch payout items
  // React.useEffect(() => {
  //   props.setRefetchPayoutItems(refetch)
  // }, [refetch])

  if (_ordersAdminApproved.loading || _ordersPendingApproval.loading) {
    return (
      <LoadingBar
        absoluteTop
        color={Colors.magenta}
        height={4}
        width={'100vw'}
        loading={true}
      />
    )
  } else if (_ordersPendingApproval && _ordersAdminApproved) {
    return (
      <main className={classes.root}>
        <Typography color={"primary"} variant="h4" gutterBottom>
          Created Orders
        </Typography>
        <DataTableOrdersPending
          admin={props.admin}
          rows={ordersCreated as any[]}
          getNextPage={() => {
            // getPage(connectionQuery.page.pageNumber + 1)
          }}
          getPrevPage={() => {
            // getPage(connectionQuery.page.pageNumber - 1)
          }}
          // getPage={(pageNumber: number) => getPage(pageNumber)}
          setCount={setCount}
          totalCount={0}
        />

        <Typography color={"primary"} variant="h4" gutterBottom>
          Orders Pending Approval
        </Typography>
        <DataTableOrdersPending
          admin={props.admin}
          rows={ordersPendingApproval as any[]}
          getNextPage={() => {
            // getPage(connectionQuery.page.pageNumber + 1)
          }}
          getPrevPage={() => {
            // getPage(connectionQuery.page.pageNumber - 1)
          }}
          // getPage={(pageNumber: number) => getPage(pageNumber)}
          setCount={setCount}
          totalCount={0}
          refetchQueriesParams={refetchQueriesParams}
        />
        <Typography color={"primary"} variant="h4" gutterBottom>
          Admin Approved Orders
        </Typography>
        <DataTableOrdersPending
          admin={props.admin}
          rows={ordersAdminApproved as any[]}
          getNextPage={() => {
            // getPage(connectionQuery.page.pageNumber + 1)
          }}
          getPrevPage={() => {
            // getPage(connectionQuery.page.pageNumber - 1)
          }}
          // getPage={(pageNumber: number) => getPage(pageNumber)}
          setCount={setCount}
          totalCount={0}
        />
      </main>
    )
  } else {
    return <ErrorDisplay title={"Order Connections error"} />
  }
}


interface ReactProps extends WithStyles<typeof styles> {
  month?: number;
  year?: number;
  admin: User;
}

interface QueryData {
  // getOrdersPendingApprovalConnectionAdmin: OrdersConnection
  orders: Orders[]
}
interface QueryVar {
}


const styles = (theme: Theme) => createStyles({
  root: {
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '0.5rem',
  },
  flexRowStart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '0.5rem',
  },
  flexItem: {
    flexGrow: 0.5,
    flexBasis: "33%",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  link: {
    fontSize: "0.8rem",
    color: "#2484FF",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  width100: {
    width: '100%',
  },
  dateInputContainer: {
    margin: '1rem',
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
  },
  monthSelect: {
    padding: '1rem',
  },
  yearSelect: {
    padding: '1rem',
  },
  createPayoutsButton: {
    height: 40,
  },
});

export default withStyles(styles)( OrdersPendingApprovalTable );
