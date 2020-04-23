import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { OrderItem, ProductSale, PayeeType } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import SnackBarA from "components/Snackbars/SnackbarA";
import MenuItem from "@material-ui/core/MenuItem";
// Material UI
import Typography from "@material-ui/core/Typography";
import Router from "next/router";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// format
import { asCurrency as c } from "utils/prices";
import { showDateAndTime, showDate, showTime } from "utils/dates";





const ProductSaleDetails = (props: ReactProps) => {

  const { classes } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  const { productSale } = props;
  const { orderItem } = productSale;

  let storePayoutItem = option(productSale).payoutItems([])
                          .filter(p => p.payeeType === PayeeType.STORE)

  let actualAmount = storePayoutItem.length > 0
    ? c(storePayoutItem[0].amount)
    : c(0)

  return (
    <ErrorBounds className={clsx(
      classes.root,
      xsDown && classes.rootMobile,
    )}>
      <Typography className={classes.title} variant="h3">
        Sales Details
      </Typography>
      {
        option(orderItem).product() &&
        <div className={classes.flexCol}>
          <Row classes={classes}
            label={"Date"}
            value={showDateAndTime(orderItem.createdAt)}
          />
          <Row classes={classes}
            label={"Total Earnings"}
            value={actualAmount}
          />
          <Row classes={classes}
            label={"Status"}
            value={orderItem.orderStatus}
          />
          <Row classes={classes}
            label={"Order ID"}
            value={orderItem.orderId}
          />

          <div className={clsx(classes.flexRow, classes.row)}>
            <div className={classes.flexItemSlim}>
              <Typography variant="body1" className={classes.label}>
                {"Product"}
              </Typography>
            </div>
            <div className={classes.flexItemWide}
              style={{ justifyContent: "flex-start" }}
            >
              <Typography variant="body1" className={classes.value}>
                {orderItem.product.name}
              </Typography>
              {
                (orderItem.product.chosenVariant.variantName !== "Regular License") &&
                <Typography variant="body1" className={classes.value}>
                  {orderItem.product.chosenVariant.variantName}
                </Typography>
              }
            </div>
          </div>
          <Row classes={classes}
            label={"Quantity"}
            value={orderItem.quantity}
          />
        </div>
      }
    </ErrorBounds>
  );
}


interface RowProps extends WithStyles<typeof styles> {
  label: string;
  value: any;
}


const Row = (props: RowProps) => {
  const {
    classes,
    label,
    value,
  } = props;
  return (
    <div className={clsx(classes.flexRow, classes.row)}>
      <div className={classes.flexItemSlim}>
        <Typography variant="body1" className={classes.label}>
          {label}
        </Typography>
      </div>
      <div className={classes.flexItemWide}>
        <Typography variant="body1" className={classes.value}>
          {value}
        </Typography>
      </div>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  productSale: ProductSale;
}


const styles = (theme: Theme) => createStyles({
  root: {
    padding: '4rem 2rem 2rem 2rem',
    borderRadius: '4px',
    // border: '1px solid #eaeaea',
    backgroundColor: Colors.foregroundColor,
    boxShadow: '0px 1px 1px 0 #e6ebf1',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'calc(100vh - 90px - 120px)',
  },
  rootMobile: {
    padding: '0.5rem',
    paddingTop: '2rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  flexItemWide: {
    flexBasis: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: 'flex-start',
    paddingRight: '0.5rem',
    flexGrow: 1,
  },
  flexItemSlim: {
    flexGrow: 1,
    flexBasis: "20%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: 'flex-start',
    paddingRight: '0.5rem',
  },
  row: {
    margin: '0.5rem',
  },
  title: {
    marginBottom: '2rem',
  },
  label: {
    color: Colors.charcoal,
    fontWeight: 600,
  },
  value: {
    color: Colors.charcoal,
    fontWeight: 500,
  },
});


export default withStyles(styles)( ProductSaleDetails );



