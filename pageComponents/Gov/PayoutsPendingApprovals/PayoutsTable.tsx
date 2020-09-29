import * as React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// SSR
import { NextPage, NextPageContext } from 'next';
import { useApolloClient } from "@apollo/client";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// MUI
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

import {
  Payout,
  PayoutStatus,
  Connection,
  ConnectionQuery,
  Edge,
  ID,
  PayoutsConnection,
  PayoutEdge,
} from "typings/gqlTypes";
import {
  GET_PAYOUTS_IN_PERIOD_ADMIN,
} from "queries/payouts-queries";
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



const PayoutsTable: NextPage<ReactProps> = (props) => {

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
    { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
    { id: 'payout-email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'payout-status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'payout-date', numeric: false, disablePadding: false, label: 'Payout Date' },
  ];

  const {
    loading,
    error,
    data,
    refetch,
    getNextPage,
    getPrevPage,
    connectionQuery,
  } = usePaginateQueryHook<QueryData, QueryVar, Payout>({
    query: GET_PAYOUTS_IN_PERIOD_ADMIN,
    sortAscending: false,
    variables: {
      month: month,
      year: year,
      payoutStatus: null,
      // payoutStatus: PayoutStatus.UNPAID,
    },
    count: count,
    connectionSelector: (data: QueryData) => [
      option(data).getPayoutsInPeriodAdmin(),
      'getPayoutsInPeriodAdmin',
    ]
  });

  const initialConnectionState: PayoutsConnection = {
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

  const connection = option(data).getPayoutsInPeriodAdmin();

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

      props.setSelectApprovePayouts(updatedEdges)
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

      props.setSelectApprovePayouts(newEdges)
    }
  }, [month, year])

  // tunnel refetch up for other tabsl to refetch payouts
  React.useEffect(() => {
    props.setRefetchPayouts(refetch)
  }, [refetch])

  const payouts = option(accumConnection).edges([]);

  if (payouts || loading) {
    return (
      <main className={classes.root}>
        <DataTable
          title={"Payouts"}
          disableItemSelection={true}
          columnNames={columnNames}
          rows={
            payouts.map(({ node }) => {
              return createData(
                node.id,
                asTime(node.createdAt),
                c(node.amount),
                node.payoutEmail,
                node.payoutStatus,
                asTime(node.payoutDate),
              )
            })
          }
          getNextPage={() => getNextPage()}
          getPrevPage={() => getPrevPage()}
          setCount={setCount}
          totalAmount={
            c(option(data).getPayoutsInPeriodAdmin.totalAmount())
          }
          totalCount={
            option(data).getPayoutsInPeriodAdmin.totalCount(0)
          }
        >
          {(props as React.PropsWithChildren<ReactProps>).children}
        </DataTable>
      </main>
    )
  } else {
    return <ErrorDisplay title={"Payouts error"} error={error} />
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  month: number;
  year: number;
  setSelectApprovePayouts?(payouts: PayoutEdge[]): void;
  setRefetchPayouts(s?: any): void;
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
  getPayoutsInPeriodAdmin: PayoutsConnection
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

PayoutsTable.getInitialProps = async (ctx: Context) => {
  return {
    month: 10,
    year: 2019,
    classes: undefined as any,
    setSelectApprovePayouts: undefined as any,
    setRefetchPayouts: undefined,
    refetchAll: undefined,
  }
}

export default withStyles(styles)( PayoutsTable );
