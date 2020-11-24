import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import {
  Orders
} from "typings/gqlTypes";
// Utils Components
import MenuItem from "@material-ui/core/MenuItem";
// Material UI
import Typography from "@material-ui/core/Typography";
// Media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// snackbar
import { useSnackbar, ProviderContext } from "notistack";
// Copy and tooltip for ids when on mobile
import Tooltip from '@material-ui/core/Tooltip';
import copy from "clipboard-copy";
import currency from 'currency.js';



const PayoutOrderRow = (props: ReactProps) => {

  const {
    classes,
    order,
  } = props;

  const snackbar = useSnackbar();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()

  const formatBsb = (a: string): string => {
    if (!a) {
      return ""
    }
    return a.slice(0,3) + '-' + a.slice(3)
  }

  const formatAccountNumber = (a: string): string => {
    if (!a) {
      return ""
    }
    return a.slice(0,2) + '-' + a.slice(2,5) + '-' + a.slice(5)
  }

  let orderId = option(order).id();
  let totalAmount = c(option(order).total(0));

  return (
    <MenuItem
      className={clsx(classes.flexRow, classes.customerItem)}
      onClick={() => {
        copy(order.id)
        snackbar.enqueueSnackbar(
          `Copied ${order.id}`,
          { variant: "info" }
        )
      }}
    >
      <div className={classes.flexItem}>
        <Typography variant="body2" className={classes.id}>
          {orderId}
        </Typography>
      </div>
      <div className={classes.flexItem}>
        <Typography variant="body2" className={classes.id}>
          {totalAmount}
        </Typography>
      </div>
      <Tooltip title={"Email"}>
        <div className={classes.flexItemWide}>
          <Typography variant="body2" className={classes.id}>
            {order?.seller?.user?.email}
          </Typography>
        </div>
      </Tooltip>
      <Tooltip title={"BSB"}>
        <div className={classes.flexItem}>
          <Typography variant="body2" className={classes.id}>
            {formatBsb(order?.seller?.user?.payoutMethod?.bsb)}
          </Typography>
        </div>
      </Tooltip>
      <Tooltip title={"Account Number"}>
        <div className={classes.flexItemWide}>
          <Typography variant="body2" className={classes.id}>
            {formatAccountNumber(order?.seller?.user?.payoutMethod?.accountNumber)}
          </Typography>
        </div>
      </Tooltip>
      <Tooltip title={"Account Name"}>
        <div className={classes.flexItem}>
          <Typography variant="body2" className={classes.id}>
            {order?.seller?.user?.payoutMethod?.accountName}
          </Typography>
        </div>
      </Tooltip>
    </MenuItem>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  order: Orders
}

const styles = (theme: Theme) => createStyles({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  flexItemWidest: {
    flexGrow: 1,
    flexBasis: "25%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingRight: '0.5rem',
  },
  flexItemWide: {
    flexBasis: "15%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'flex-start',
    paddingRight: '0.5rem',
    flexGrow: 1,
  },
  flexItem: {
    flexGrow: 1,
    flexBasis: "8%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingRight: '0.5rem',
  },
  title: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  customerItem: {
    borderBottom: `1px solid ${theme.colors.uniswapNavy}`,
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    minHeight: 50,
  },
  customerName: {
    color: Colors.charcoal,
    fontWeight: 600,
    whiteSpace: 'pre-wrap',
    overflow: 'hidden',
    width: '100%',
    textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    // overflow: 'scroll',
    // maxWidth: 200,
    // width: '30vw', // 20vw, max 150px
  },
  id: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    // maxWidth: 150,
    width: '100%', // 20vw, max 150px
    // need to set width in VW for ellipsis
  },
});

export default withStyles(styles)( PayoutOrderRow );



