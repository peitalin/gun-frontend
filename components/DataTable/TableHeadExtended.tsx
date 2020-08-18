import React from 'react';
import clsx from 'clsx';
// Table
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
// Typings
import { Connection } from "typings/gqlTypes";
// Paginator hooks
import usePaginateQueryHook from "components/Paginators/usePaginatePagedQueryHook";
const usePaginateQuery = usePaginateQueryHook();
import { useStyles } from "./styles";



const EnhancedTableHead = (props) => {

  const classes = useStyles({})

  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    disableItemSelection = false,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  const { columnNames } = props;

  return (
    <TableHead>
      <TableRow>
        {
          disableItemSelection
          ? <TableCell style={{ padding: '0.5rem' }}/>
          : <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all items' }}
              />
            </TableCell>
        }
        {columnNames.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


export default EnhancedTableHead;