import * as React from "react";
import { oc as option } from "ts-optchain";
import { FunctionComponent } from "react";
import clsx from "clsx";
// SSR
import { NextPage, NextPageContext } from 'next';
import { useApolloClient } from "@apollo/client";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// MUI
import Typography from "@material-ui/core/Typography";

import {
  Transaction,
  TransactionsConnection,
} from "typings/gqlTypes";
import {
  GET_TRANSACTIONS_IN_PERIOD_ADMIN,
} from "queries/payout_items-queries";
// Paginator hooks
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
// Pagination
import { ConnectionQueryProps } from "components/Paginators/usePaginatePagedQueryHook";
import PaginateButtons from "components/Paginators/PaginateButtons";
import ErrorDisplay from "components/Error";
// formatters
import dayjs from 'dayjs';
import currency from "currency.js";
// DataTable
import DataTable from "components/DataTable";


function createData(name, cell2, cell3, cell4, cell5, cell6) {
  return {
    name,
    cell2,
    cell3,
    cell4,
    cell5,
    cell6,
  };
}



const TransactionsTable: NextPage<ReactProps> = (props) => {

  const { classes } = props;
  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()
  const asTime = (d: Date) => dayjs(d).format("YYYY-MM-DD HH:mm:ss")
  const [count, setCount] = React.useState(10);

  const {
    month,
    year
  } = props;

  const columnNames = [
    { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'created-at', numeric: false, disablePadding: false, label: 'Created at' },
    { id: 'subtotal', numeric: true, disablePadding: false, label: 'Subtotal' },
    { id: 'payment fees', numeric: true, disablePadding: false, label: 'Payment Fees' },
    { id: 'payment-processor', numeric: true, disablePadding: false, label: 'Processor' },
    { id: 'buyer', numeric: false, disablePadding: false, label: 'Buyer' },
  ];

  const {
    loading,
    error,
    data,
    refetch,
    getNextPage,
    getPrevPage,
    connectionQuery,
  } = usePaginateQueryHook<QueryData, QueryVar, Transaction>({
    query: GET_TRANSACTIONS_IN_PERIOD_ADMIN,
    sortAscending: false,
    variables: {
      month: month,
      year: year,
      payoutStatus: null,
      // payoutStatus: PayoutStatus.UNPAID,
    },
    count: count,
    connectionSelector: (data: QueryData) => [
      option(data).getTransactionsInPeriodAdmin(),
      'getTransactionsInPeriodAdmin',
    ]
  });

  const initialConnectionState: TransactionsConnection = {
    edges: [],
    pageInfo: {
      endCursor: null,
      isLastPage: false,
    },
    totalCount: 0,
    totalAmount: 0,
  };

  // accumulate connection results as you scroll down.
  const [
    accumConnection,
    setAccumConnection
  ] = React.useState(initialConnectionState);

  const connection = option(data).getTransactionsInPeriodAdmin();

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

  // tunnel refetch up for other tables to refetch transactions
  React.useEffect(() => {
    props.setRefetchTransactions(refetch)
  }, [refetch])

  const [payoutsToSend, setPayoutsToSend] = React.useState([]);
  const transactions = option(accumConnection).edges([]);

  if (transactions || loading) {
    return (
      <main className={classes.root}>
        <DataTable
          title={"Transactions"}
          columnNames={columnNames}
          disableItemSelection={true}
          rows={
            transactions.map(({ node }) => {
              return createData(
                node.id,
                asTime(node.createdAt),
                c(node.subtotal),
                node.paymentProcessingFee,
                node.paymentProcessor,
                option(node).order.buyer.email(),
              )
            })
          }
          getNextPage={() => getNextPage()}
          getPrevPage={() => getPrevPage()}
          setCount={setCount}
          totalAmount={
            c(option(data).getTransactionsInPeriodAdmin.totalAmount())
          }
          totalFees={
            c(option(data).getTransactionsInPeriodAdmin.totalFees()) || "NA"
          }
          totalCount={
            option(data).getTransactionsInPeriodAdmin.totalCount(0)
          }
        />
      </main>
    )
  } else {
    return <ErrorDisplay title={"Transactions error"} error={error} />
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  month: number;
  year: number;
  setRefetchTransactions(s?: any): void;
  refetchAll(): void;
}
interface QueryVar {
  connectionQuery: ConnectionQueryProps;
}
interface QueryData {
  getTransactionsInPeriodAdmin: TransactionsConnection
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

TransactionsTable.getInitialProps = async (ctx: Context) => {
  return {
    month: 10,
    year: 2019,
    classes: undefined as any,
    setRefetchTransactions: undefined,
    refetchAll: undefined,
  }
}

export default withStyles(styles)( TransactionsTable );
