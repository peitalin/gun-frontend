import React from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
// table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// Typings
import { Connection } from "typings/gqlTypes";
// Subcomponents
import { useStyles } from "./styles";
import TableHeadExtended from "./TableHeadExtended";
import TableToolbarExtended from "./TableToolbarExtended";





const DataTable: React.FC<DataTableProps> = (props) => {

  const classes = useStyles({});
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Incoming props
  const {
    rows,
    columnNames,
    title,
    disableToolbar = false,
    disableTableHead = false,
    disableItemSelection = false,
  } = props;

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const stableSort = (array, cmp): DataTableRow[] => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  const getSorting = (order, orderBy) => {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    if (page > newPage) {
      console.log("backwards")
      if (props.getPrevPage) {
        props.getPrevPage()
      }
    } else {
      console.log("forwards")
      if (props.getNextPage) {
        props.getNextPage()
      }
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    let count = parseInt(event.target.value, 10);
    if (props.setCount) {
      // console.log("count", count)
      props.setCount(count)
    }
    setRowsPerPage(count);
    setPage(0);
  };

  const handleChangeDense = event => {
    setDense(event.target.checked);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>

        {
          !disableToolbar &&
          <TableToolbarExtended
            title={title}
            numSelected={selected.length}
          />
        }

        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            {
              !disableTableHead &&
              <TableHeadExtended
                classes={classes}
                numSelected={selected.length}
                columnNames={columnNames}
                title={title}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                disableItemSelection={disableItemSelection}
              />
            }
            <TableBody>
              {
                stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover={false}
                      onClick={
                        !disableItemSelection
                          ? event => handleClick(event, row.name)
                          : () => {}
                      }
                      // role="checkbox"
                      aria-checked={isItemSelected && !disableItemSelection}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected && !disableItemSelection}
                    >
                      {
                        disableItemSelection
                        ? <TableCell style={{ padding: '0.5rem' }}/>
                        : <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </TableCell>
                      }
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      {
                        Object.keys(row)
                        .filter(cellkey => cellkey !== "name")
                        .map(cellkey => {
                          return (
                            <TableCell
                              key={cellkey}
                              align="right"
                            >
                              {row[cellkey]}
                            </TableCell>
                          )
                        })
                      }
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          // count={rows.length}
          count={props.totalCount || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

        <div className={classes.tableSection}>
          {
            props.totalAmount &&
            <div className={classes.totalAmountSection}>
              <div className={classes.totalAmountBox}>
                <div className={classes.totalAmount}>
                  <Typography color={"primary"} variant="h6" gutterBottom>
                    Total Amount
                  </Typography>
                  <div className={classes.totalAmountSpace}/>
                  <Typography color={"primary"} variant="h6" gutterBottom>
                    {props.totalAmount}
                  </Typography>
                </div>
                {
                  props.totalFees &&
                  <div className={classes.totalAmount}>
                    <Typography color={"primary"} variant="h6" gutterBottom>
                      Total Fees
                    </Typography>
                    <div className={classes.totalAmountSpace}/>
                    <Typography color={"primary"} variant="h6" gutterBottom>
                      {props.totalFees}
                    </Typography>
                  </div>
                }
              </div>
            </div>
          }
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
          {props.children && props.children}
        </div>
      </Paper>
    </div>
  );
}

interface DataTableRow {
  name: string;
  [key: string]: any;
}

interface DataTableProps {
  rows: DataTableRow[];
  columnNames: {
    id: string;
    numeric: boolean;
    disablePadding?: boolean;
    label: string;
  }[];
  title: string;
  totalAmount?: string;
  totalFees?: string;
  totalCount?: number;
  disableToolbar?: boolean;
  disableTableHead?: boolean;
  disableItemSelection?: boolean;
  setCount?(count: number): void;
  getNextPage?(): void;
  getPrevPage?(): void;
}



export default DataTable;