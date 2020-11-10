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
  Orders,
  User,
  OrderStatus,
  ConnectionOffsetQuery
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
import DataTableOrdersPending from "pageComponents/Gov/PayoutsPendingApprovals/OrdersPendingApprovalTable/DataTableOrdersPending";
// graphl
import { useMutation, useQuery, useSubscription } from "@apollo/client";




const OrdersPendingApprovalTable: NextPage<ReactProps> = (props) => {

  //
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

  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const [ordersC, setOrdersC] = React.useState({
    limit: itemsPerPage,
    offset: 0,
  });

  const [ordersPA, setOrdersPA] = React.useState({
    limit: itemsPerPage,
    offset: 0,
  });

  const [ordersAA, setOrdersAA] = React.useState({
    limit: itemsPerPage,
    offset: 0,
  });


  const _ordersCreated = useQuery<QueryData, QueryVar>(
    GET_ORDERS_CREATED_CONNECTION , {
      variables: {
        query: {
          limit: ordersC.limit,
          offset: ordersC.offset,
        }
      },
      // fetchPolicy: "network-only",
    }
  );

  const _ordersPendingApproval = useQuery<QueryData, QueryVar>(
    GET_ORDERS_PENDING_APPROVAL_CONNECTION , {
      variables: {
        query: {
          limit: ordersPA.limit,
          offset: ordersPA.offset,
        }
      },
      // fetchPolicy: "network-only",
    }
  );

  const _ordersAdminApproved = useQuery<QueryData, QueryVar>(
    GET_ORDERS_ADMIN_APPROVED_CONNECTION , {
      variables: {
        query: {
          limit: ordersAA.limit,
          offset: ordersAA.offset,
        }
      },
      // fetchPolicy: "network-only",
    }
  );

  let refetchQueriesParams = [
    {
      query: GET_ORDERS_CREATED_CONNECTION,
      variables: {
        query: {
          limit: ordersC.limit,
          offset: ordersC.offset,
        }
      },
    },
    {
      query: GET_ORDERS_PENDING_APPROVAL_CONNECTION,
      variables: {
        query: {
          limit: ordersPA.limit,
          offset: ordersPA.offset,
        }
      },
    },
    {
      query: GET_ORDERS_ADMIN_APPROVED_CONNECTION ,
      variables: {
        query: {
          limit: ordersAA.limit,
          offset: ordersAA.offset,
        }
      },
    },
  ]


  const ordersCreated = option(_ordersCreated).data.getOrdersCreatedConnectionAdmin
    .edges([])
    .map(edge => edge.node)

  const ordersPendingApproval = option(_ordersPendingApproval).data.getOrdersPendingApprovalConnectionAdmin
    .edges([])
    .map(edge => edge.node)

  const ordersAdminApproved = option(_ordersAdminApproved).data.getOrdersAdminApprovedConnection
    .edges([])
    .map(edge => edge.node)


  console.log("orders", ordersAdminApproved)


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
        <Typography variant="h4" className={classes.subtitle1}>
          Created Orders
        </Typography>
        <DataTableOrdersPending
          admin={props.admin}
          rows={ordersCreated}
          getNextPage={() => {
            // getPage(connectionQuery.page.pageNumber + 1)
            setOrdersC(s => ({
              limit: s.limit,
              offset: s.offset + itemsPerPage,
            }))
          }}
          getPrevPage={() => {
            setOrdersC(s => ({
              limit: s.limit,
              offset: s.offset - itemsPerPage,
            }))
          }}
          // getPage={(pageNumber: number) => getPage(pageNumber)}
          setCount={setCount}
          totalCount={0}
        />

        <Typography variant="h4" className={classes.subtitle1}>
          Orders Pending Approval
        </Typography>
        <DataTableOrdersPending
          admin={props.admin}
          rows={ordersPendingApproval}
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
        <Typography variant="h4" className={classes.subtitle1}>
          Admin Approved Orders
        </Typography>
        <DataTableOrdersPending
          admin={props.admin}
          rows={ordersAdminApproved}
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
  getOrdersCreatedConnectionAdmin?: OrdersConnection
  getOrdersPendingApprovalConnectionAdmin?: OrdersConnection
  getOrdersAdminApprovedConnection?: OrdersConnection
}
interface QueryVar {
  query?: ConnectionOffsetQuery
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
  subtitle1: {
    color: Colors.uniswapLightGrey,
    marginTop: '2rem',
    marginBottom: '0.5rem',
  },
});

export default withStyles(styles)( OrdersPendingApprovalTable );
