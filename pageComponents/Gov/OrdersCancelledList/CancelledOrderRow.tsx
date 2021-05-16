import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import {
  OrderAdmin
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
import { useRouter } from "next/router"
import { formatDateTime } from "utils/dates";


const CancelledOrderRow = (props: ReactProps) => {

  const {
    classes,
    order,
  } = props;

  const snackbar = useSnackbar();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const router = useRouter();

  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()

  let orderId = order?.id;
  let totalAmount = c(order?.total ?? 0);

  return (
    <MenuItem
      className={clsx(classes.flexRow, classes.customerItem)}
      onClick={() => {
        snackbar.enqueueSnackbar(
          `Navigating to ${order.id}`,
          { variant: "info" }
        )
        router.push(`/gov/orders?orderId=${order.id}`)
      }}
    >
      <Tooltip title={`Go to order ${order.id}`}>
        <div className={classes.flexItem}>
          <Typography variant="body2" className={classes.id}>
            {orderId}
          </Typography>
        </div>
      </Tooltip>
      <div className={classes.flexItemWide}>
        <Typography variant="body2" className={classes.id}>
          {formatDateTime(order?.currentSnapshot?.createdAt)}
        </Typography>
      </div>
      <div className={classes.flexItem}>
        <Typography variant="body2" className={classes.id}>
          {totalAmount}
        </Typography>
      </div>
      <Tooltip title={order?.sellerStore?.user?.email}>
        <div className={classes.flexItemWide}>
          <Typography variant="body2" className={classes.id}>
            {order?.sellerStore?.user?.email}
          </Typography>
        </div>
      </Tooltip>

      <div className={classes.flexItem}>
        <Typography variant="body2" className={classes.id}>
          {order?.currentSnapshot?.orderStatus}
        </Typography>
      </div>
      <Tooltip title={order?.sellerStore?.user?.payoutMethod?.accountName}>
        <div className={classes.flexItem}>
          <Typography variant="body2" className={classes.id}>
            {order?.sellerStore?.user?.payoutMethod?.accountName}
          </Typography>
        </div>
      </Tooltip>
    </MenuItem>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  order: OrderAdmin
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
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
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
    borderBottom: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapNavy}`
      : `1px solid ${Colors.slateGreyDark}`,
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

export default withStyles(styles)( CancelledOrderRow );



