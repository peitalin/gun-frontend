import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { UserPrivate, OrderStatus, StoreSalesHistoryConnection, PayeeType } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import Loading from "components/Loading";
import SnackBarA from "components/Snackbars/SnackbarA";
import MenuItem from "@material-ui/core/MenuItem";
// Material UI
import Typography from "@material-ui/core/Typography";
import { asCurrency as c } from "utils/prices";
import { showDate, showTime } from "utils/dates";
import Router from "next/router";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";




const SalesHistory = (props: ReactProps) => {

  const { classes } = props;
  const [displaySnack, setDisplaySnack] = React.useState(false);

  const { salesHistoryConnection } = props;
  const allSales = salesHistoryConnection.edges
    .filter(({ node }) => node.order.currentSnapshot.orderStatus === OrderStatus.COMPLETE)

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  console.log('allSales', allSales)

  return (
    <ErrorBounds className={clsx(
      classes.root,
      xsDown && classes.rootMobile,
    )}>
      <Typography className={classes.title} variant="h3">
        Orders
      </Typography>

      {
        allSales.length === 0 &&
        <div className={classes.flexCol}>
          <Typography variant="subtitle2">
            Your order history will appear here after your first sale
          </Typography>
        </div>
      }

      {
        (allSales.length > 0) &&
        <>
          <div className={classes.flexRowTitle}>
            <div className={classes.flexItemWide}>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Product
              </Typography>
            </div>
            {/* {
              !smDown &&
              <div className={classes.flexItemWide}>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  User
                </Typography>
              </div>
            } */}
            <div className={classes.flexItem}>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Date
              </Typography>
            </div>
            <div className={classes.flexItemSlim}>
              <Typography variant="subtitle1" className={classes.subtitle}>
                Net Earnings
              </Typography>
            </div>
          </div>
          {
            allSales.map(({ node: sale }) => {


              let storePayoutItem = option(sale).payoutItems([])
                  .filter(p => p.payeeType === PayeeType.STORE)

              let actualAmount = storePayoutItem.length > 0
                ? c(storePayoutItem[0].amount)
                : c(0)

              return (
                <MenuItem key={sale.order.id}
                  className={clsx(classes.flexRow, classes.salesItem)}
                  onClick={() => {
                    Router.push(
                      "/seller/sales/[orderId]",
                      `/seller/sales/${sale.order.id}`,
                    )
                  }}
                >
                  <div className={classes.flexItemWide}>
                    <Typography variant="body2" className={classes.salesItemName}>
                      {sale.order.product.currentSnapshot.title}
                    </Typography>
                  </div>
                  {/* {
                    !smDown &&
                    <div className={classes.flexItemWide}>
                      <Typography variant="body2" className={classes.email}>
                        {option(sale).user.email()}
                      </Typography>
                    </div>
                  } */}
                  <div className={clsx(classes.flexItem, classes.justifyCenter)}>
                    <Typography variant="body2" className={classes.dateText1}>
                      {showDate(sale.order.createdAt)}
                    </Typography>
                    <Typography variant="body2" className={classes.dateText2}>
                      {showTime(sale.order.createdAt)}
                    </Typography>
                  </div>
                  <div className={classes.flexItemSlim}>
                    <Typography variant="body2" className={classes.earningsText}>
                      {actualAmount}
                    </Typography>
                  </div>
                </MenuItem>
              )
            })
          }
        </>
      }


      <SnackBarA
        open={displaySnack}
        closeSnackbar={() => setDisplaySnack(false)}
        message={"Loading complete"}
        variant={"info"}
        autoHideDuration={1500}
      />
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  salesHistoryConnection: StoreSalesHistoryConnection;
}

const styles = (theme: Theme) => createStyles({
  root: {
    padding: '4rem 2rem 2rem 2rem',
    borderRadius: '4px',
    border: '1px solid #eaeaea',
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
  },
  flexRowTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    padding: '16px', // same padding as MenuItem 16px
    paddingBottom: '1rem',
    borderBottom: '1px solid #eaeaea',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  flexItemWide: {
    flexBasis: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'flex-start',
    paddingRight: '0.5rem',
    flexGrow: 1,
  },
  flexItem: {
    flexGrow: 1,
    flexBasis: "15%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingRight: '0.5rem',
  },
  flexItemSlim: {
    flexGrow: 1,
    flexBasis: "10%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingRight: '0.5rem',
  },
  justifyCenter: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  title: {
    marginBottom: '2rem',
  },
  salesItem: {
    borderBottom: '1px solid #eaeaea',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    minHeight: 50,
  },
  salesItemName: {
    color: Colors.charcoal,
    fontWeight: 600,
    whiteSpace: 'pre-wrap',
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    // overflow: 'scroll',
    // maxWidth: 200,
    // width: '30vw', // 20vw, max 150px
  },
  salesItemVariant: {
    color: Colors.grey,
    fontWeight: 500,
  },
  subtitleBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subtitle: {
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  email: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    maxWidth: 150,
    width: '20vw', // 20vw, max 150px
    // need to set width in VW for ellipsis
  },
  earningsText: {
    color: Colors.charcoal,
    fontWeight: 600,
  },
  dateText1: {
    color: Colors.charcoal,
    fontWeight: 600,
  },
  dateText2: {
    color: Colors.charcoal,
    fontWeight: 500,
  },
});

export default withStyles(styles)( SalesHistory );



