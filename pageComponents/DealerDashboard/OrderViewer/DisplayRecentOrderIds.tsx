import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Typings
import {
  ID,
  Transactions,
} from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";



const DisplayRecentOrderIds = (props: DisplayRecentOrderIdProps) => {
  const { classes, recentTx, setOrderId } = props;
  return (
    <div className={classes.recentOrders}>
      <div className={classes.recentOrdersInner}>
        <Typography className={classes.heading} variant="subtitle2">
          Recent Orders:
        </Typography>
        {
          recentTx
          .filter((tx: Transactions) => !tx.id.startsWith('re'))
          .map(tx => {
            return (
              <div key={tx.id}
                className={classes.recentOrderId}
                onClick={() => setOrderId(tx.orderId)}
              >
                {tx.orderId}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

interface DisplayRecentOrderIdProps extends WithStyles<typeof styles> {
  recentTx: Transactions[];
  setOrderId(id: ID): void;
}


const styles = (theme: Theme) => createStyles({
  recentOrders: {
    marginTop: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'start',
  },
  recentOrdersInner: {
    maxWidth: 400,
  },
  recentOrderId: {
    fontFamily: "courier",
    fontWeight: 600,
    cursor: 'pointer',
    color: theme.colors.uniswapLighterGrey,
    "&:hover": {
      color: theme.colors.blue,
    },
    margin: '0.1rem',
  },
  heading: {
    marginBottom: '0.25rem',
  },
});


export default withStyles(styles)( DisplayRecentOrderIds );



