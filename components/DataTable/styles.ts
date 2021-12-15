
import { lighten, Theme } from '@mui/material/styles';


import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';


export const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableSection: {
    padding: '0.5rem 1.5rem 1rem 1.5rem',
  },
  totalAmountBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  totalAmountSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalAmountSpace: {
    width: '1rem',
  },
  totalAmount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
})