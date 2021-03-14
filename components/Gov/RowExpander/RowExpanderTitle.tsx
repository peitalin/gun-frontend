import React from 'react';
import clsx from 'clsx';
import { Colors, BoxShadows } from 'layout/AppTheme';
import { fade, lighten, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// Snackbar
import { useSnackbar } from "notistack";
// router
import Link from "next/link";
import { formatDate } from "utils/dates";
import currency from 'currency.js';



const RowExpanderTitle: React.FC<ReactProps> = (props) => {

  const {
    index,
    open,
    setOpen,
    classes,
  } = props;

  let isEvenRow = index % 2 === 0

  return (
    <div className={clsx(
      classes.rowExpanderRoot,
      open && isEvenRow && classes.backgroundGrey,
      open && !isEvenRow && classes.backgroundGrey2,
    )}>
      <div>
        <IconButton aria-label="expand row"
          size="medium"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </div>
      {props.children}
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  index: number
  open: boolean;
  setOpen(a: boolean): void;
}


const styles = (theme: Theme) => createStyles({
  rowExpanderRoot: {
    width: "100%",
    display: "flex",
    color: theme.palette.type === "dark"
      ? theme.colors.uniswapLightestGrey
      : theme.colors.uniswapDarkNavy,
    flexDirection: "row",
    backgroundColor: theme.palette.type === 'dark'
      ? lighten(Colors.uniswapGreyNavy, 0.01)
      : lighten(Colors.slateGrey, 0.01),
    '& > *': {
      borderBottom: 'unset',
    },
  },
  backgroundGrey: {
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDark,
  },
  backgroundGrey2: {
    backgroundColor: theme.palette.type === 'dark'
      ? fade(Colors.uniswapGrey, 0.7)
      : Colors.slateGreyDarker,
  },
});



export default withStyles(styles)( RowExpanderTitle );