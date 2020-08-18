import * as React from "react";
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
// Paginator hooks
import usePaginatePagedQueryHook from "components/Paginators/usePaginatePagedQueryHook";
const usePaginatePagedQuery = usePaginatePagedQueryHook();
// Typings
import {
  PayoutItem,
  PageBasedConnection,
  PayoutItemsPagedConnection,
} from "typings/gqlTypes";
import {
  GET_PAYOUT_ITEMS_IN_PERIOD_ADMIN_PAGED,
} from "queries/payout_items-queries";
// Pagination
import { ConnectionQueryProps } from "components/Paginators/usePaginatePagedQueryHook";
import ErrorDisplay from "components/Error";
// formatters
import dayjs from 'dayjs';
import currency from "currency.js";
// DataTable
import DataTable from "components/DataTable";


function createData(name, cell2, cell3, cell4, cell5, cell6, cell7) {
  return {
    name,
    cell2,
    cell3,
    cell4,
    cell5,
    cell6,
    cell7,
  };
}



const PayoutItemsTable: NextPage<ReactProps> = (props) => {

  const { classes } = props;
  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()
  const asTime = (d: Date) => dayjs(d).format("YYYY-MM-DD HH:mm:ss")
  const [count, setCount] = React.useState(10);

  const {
    month,
    year
  } = props;

  const {
    loading,
    error,
    data,
    refetch,
    getPage,
    connectionQuery,
  } = usePaginatePagedQuery<QueryData, QueryVar, PayoutItem>({
    query: GET_PAYOUT_ITEMS_IN_PERIOD_ADMIN_PAGED,
    sortAscending: false,
    variables: {
      month: month,
      year: year,
      payoutStatus: null,
      // payoutStatus: PayoutStatus.UNPAID,
    },
    count: count,
    connectionSelector: (data: QueryData) => [
      option(data).getPayoutItemsInPeriodAdminPaged(),
      'getPayoutItemsInPeriodAdminPaged',
    ]
  });

  const initialConnectionState: PayoutItemsPagedConnection = {
    edges: [],
    pageInfo: {
      isLastPage: false,
      pageNumber: 1,
      totalPages: 1,
    },
    totalCount: 0,
    totalAmount: 0,
  };

  // accumulate connection results as you scroll down.
  const [
    accumConnection,
    setAccumConnection
  ] = React.useState(initialConnectionState);


  const connection = option(data).getPayoutItemsInPeriodAdminPaged();

  React.useEffect(() => {
    if (option(connection).edges()) {

      let updatedEdges = [
        ...accumConnection.edges,
        ...connection.edges.filter(e =>
          !accumConnection.edges.find(s => s.node.id === e.node.id)
        )
      ];

      setAccumConnection(s => {
        return {
          ...connection,
          edges: updatedEdges
        }
      })
    }
  }, [option(connection).edges()])

  // reset accumulated results if month or year changes
  React.useEffect(() => {
    if (option(connection).edges()) {

      let newEdges = [
        ...connection.edges.filter(e =>
          !accumConnection.edges.find(s => s.node.id === e.node.id)
        )
      ];

      setAccumConnection(s => {
        return {
          ...connection,
          edges: newEdges
        }
      })
    }
  }, [month, year])

  // tunnel refetch up for other tabsl to refetch payout items
  React.useEffect(() => {
    props.setRefetchPayoutItems(refetch)
  }, [refetch])


  const columnNames = [
    { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'created', numeric: false, disablePadding: false, label: 'Created' },
    { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
    { id: 'payment-fees', numeric: true, disablePadding: false, label: 'Payment Fees' },
    { id: 'payout-status', numeric: true, disablePadding: false, label: 'Status' },
    { id: 'payee-type', numeric: true, disablePadding: false, label: 'Payee Type' },
    { id: 'payout-method', numeric: true, disablePadding: false, label: 'Payout Email' },
  ];

  const payoutItems = option(accumConnection).edges([]);


  if (payoutItems || loading) {
    return (
      <main className={classes.root}>
        <DataTable
          title={"Payout Items"}
          columnNames={columnNames}
          disableItemSelection={true}
          rows={
            payoutItems.map(({ node }) => {
              return createData(
                node.id,
                asTime(node.createdAt),
                c(node.amount),
                c(node.paymentProcessingFee),
                node.payoutStatus,
                node.payeeType,
                option(node).store.user.payoutMethod.payoutEmail("NA"),
              )
            })
          }
          getNextPage={() => {
            getPage(connectionQuery.page.pageNumber + 1)
          }}
          getPrevPage={() => {
            getPage(connectionQuery.page.pageNumber - 1)
          }}
          // getPage={(pageNumber: number) => getPage(pageNumber)}
          setCount={setCount}
          totalAmount={
            c(option(data).getPayoutItemsInPeriodAdminPaged.totalAmount())
          }
          totalFees={
            c(option(data).getPayoutItemsInPeriodAdminPaged.totalFees()) || "NA"
          }
          totalCount={
            option(data).getPayoutItemsInPeriodAdminPaged.totalCount(0)
          }
        />
      </main>
    )
  } else {
    return <ErrorDisplay title={"PayoutItems error"} error={error} />
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  month: number;
  year: number;
  setRefetchPayoutItems(s?: any): void;
  refetchAll(): void;
}
interface PaginateProps {
  data: QueryData;
  error: any;
  loading: boolean;
  refetch(): void;
}
interface QueryVar {
  connectionQuery: ConnectionQueryProps;
}
interface QueryData {
  getPayoutItemsInPeriodAdminPaged: PayoutItemsPagedConnection
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
    fontFamily: '"Segoe UI","Helvetica Neue",Arial,sans-serif',
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

////////// SSR ///////////
interface Context extends NextPageContext {
}

PayoutItemsTable.getInitialProps = async (ctx: Context) => {
  return {
    month: 10,
    year: 2019,
    classes: undefined as any,
    setRefetchPayoutItems: undefined,
    refetchAll: undefined,
  }
}

export default withStyles(styles)( PayoutItemsTable );
