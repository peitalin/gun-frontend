import React from 'react';
import clsx from 'clsx';
import {
  withStyles, WithStyles,
} from '@material-ui/core/styles';
import { styles } from "./styles";
// Table
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';



const EnhancedTableHead = (props: ReactProps) => {

  const {
    classes,
    columnNames,
  } = props

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

interface ReactProps extends WithStyles<typeof styles> {
  onSelectAllClick(event: any): void
  order?: 'desc' | 'asc'
  orderBy?: string
  numSelected: number
  rowCount: number
  onRequestSort(event, property): any
  disableItemSelection: boolean
  title?: string
  columnNames: Array<{
    id: string;
    numeric: boolean;
    disablePadding?: boolean;
    label: string;
  }>
}


export default withStyles(styles)(EnhancedTableHead);