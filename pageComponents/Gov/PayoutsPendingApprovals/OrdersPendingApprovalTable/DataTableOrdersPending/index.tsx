import React from 'react';
import clsx from 'clsx';
import { Colors } from 'layout/AppTheme';
import { lighten, makeStyles } from '@material-ui/core/styles';
// table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import RowExpander from "./RowExpander";
// Typings
import { ConnectionOffsetQuery, Orders, User } from "typings/gqlTypes";
// Subcomponents
import { useStyles } from "./styles";
import { createData } from "./createData";
import { DocumentNode } from "graphql";





const DataTableOrdersPending = (
  props: DataTableProps<Orders> & {
    admin: User
    children?: React.ReactNode
  }
) => {

  const classes = useStyles({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Incoming props
  const {
    rows,
    admin,
  } = props;


  const handleChangePage = (event, newPage) => {
    if (page > newPage) {
      if (props.getPrevPage) {
        props.getPrevPage()
      }
    } else {
      if (props.getNextPage) {
        props.getNextPage()
      }
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    let count = parseInt(event.target.value, 10);
    if (props.setCount) {
      props.setCount(count)
    }
    setRowsPerPage(count);
    setPage(0);
  };

  console.log("tableName: ", props.tableName)
  console.log("refetchQueriesParams: ", props.refetchQueriesParams)

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align="left">Order ID</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Seller</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  (rows?.length > 0) &&
                  rows.map((order, index) => {

                    console.log("order: ", order.payoutItems)

                    const row2 = createData({
                      id: order.id,
                      total: order.total,
                      createdAt: order.createdAt,
                      seller: order.seller as any,
                      buyer: order.buyer,
                      currentOrderSnapshot: order.currentSnapshot,
                      orderSnapshots: order.orderSnapshots,
                      product: order.product,
                      payoutId: order?.payoutItems?.[0]?.payoutId,
                      payoutStatus: order?.payoutItems?.[0]?.payoutStatus,
                    })

                    return (
                      <RowExpander
                        key={order.id}
                        row={row2}
                        admin={admin}
                        index={index}
                        refetchQueriesParams={props.refetchQueriesParams}
                      />
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.totalCount || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{ 'aria-label': 'previous page' }}
          nextIconButtonProps={{ 'aria-label': 'next page' }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

        <div className={classes.tableSection}>
          {props.children}
        </div>
      </Paper>
    </div>
  );
}


interface DataTableProps<T> {
  rows: T[];
  tableName?: string;
  totalCount?: number;
  setCount?(count: number): void;
  getNextPage?(): void;
  getPrevPage?(): void;
  refetchQueriesParams?: {
    query: DocumentNode,
    variables?: {
      query?: any,
      limit?: number
      offset?: number
    },
  }[];
}

export default DataTableOrdersPending;









