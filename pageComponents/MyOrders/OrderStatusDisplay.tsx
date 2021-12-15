import React from "react";
import { useState, useEffect, useCallback } from "react";

import clsx from "clsx";
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors } from "layout/AppTheme";
// Typings
import { Order, OrderStatus } from "typings/gqlTypes";
// Material UI
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Components
import ErrorBounds from "components/ErrorBounds";
// media query
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useApolloClient } from "@apollo/client";






const OrderStatusDisplay: React.FC<ReactProps> = (props) => {

  const { classes, order } = props;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <div className={classes.root}>

      <ErrorBounds className={clsx(
        classes.flexCol,
        smDown ? classes.flexWrap : null,
      )}>
        <div className={clsx(
          classes.flexRowInner,
          props.orderCancelled ? classes.borderOrderCancelled : classes.borderOrderSuccess,
        )}>
          <div className={classes.flexItemOrderStatusTranslation}>
            <Typography variant="subtitle2" className={classes.orderStatusText}>
              <b>Status:</b> &nbsp;
              {translateOrderStatus(order?.currentSnapshot?.orderStatus)}
            </Typography>
          </div>
        </div>
      </ErrorBounds>


    </div>
  )
}


const translateOrderStatus = (o: string): string => {
  if (o === OrderStatus.CREATED) {
    return "Order created, pending payment."
  }
  if (o === OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED) {
    return "Payment received, pending seller action."
  }
  if (o === OrderStatus.CANCELLED) {
    return "Payment was cancelled and refunding due to seller inaction."
  }
  if (o === OrderStatus.FAILED) {
    return "Payment failed. Order reverted."
  }
  if (o === OrderStatus.REFUNDED) {
    return "Order refunded."
  }
  if (o === OrderStatus.FORM_10_SUBMITTED) {
    return "Form 10 Submitted, pending approval."
  }
  if (o === OrderStatus.FORM_10_REVISE_AND_RESUBMIT) {
    return "Form 10 Rejected, resubmit a copy."
  }
  if (o === OrderStatus.ADMIN_APPROVED) {
    return "Admin approved payout."
  }
  if (o === OrderStatus.COMPLETE) {
    return "Order complete."
  } else {
    return ""
  }
  // CREATED = 'CREATED',
  // CONFIRMED_PAYMENT_FORM_10_REQUIRED = 'CONFIRMED_PAYMENT_FORM_10_REQUIRED',
  // FAILED = 'FAILED',
  // REFUNDED = 'REFUNDED',
  // /** step 2, seller delivers product */
  // FORM_10_SUBMITTED = 'FORM_10_SUBMITTED',
  // /** step 3, admin checks and approves uploaded form10 */
  // ADMIN_APPROVED = 'ADMIN_APPROVED',
  // /** step 4, payout completed, westpac transaction ID inputted */
  // COMPLETE = 'COMPLETE'
}


interface ReactProps extends WithStyles<typeof styles> {
  order: Order;
  orderCancelled: boolean;
}

const styles = (theme: Theme) => createStyles({
  root: {
    // background: Colors.cream,
    width: "100%",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
  },
  borderOrderSuccess: {
    borderLeft: `4px solid ${Colors.blue}`,
  },
  borderOrderCancelled: {
    borderLeft: `4px solid ${Colors.red}`,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  flexRowInner: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '0.5rem',
  },
  flexItemOrderStatus: {
    flexGrow: 1,
    flexBasis: '40%',
    marginRight: '2rem',
    color: Colors.grey,
    fontWeight: 600,
  },
  flexItemOrderStatusTranslation: {
    flexGrow: 1,
    flexBasis: '40%',
    color: Colors.grey,
  },
  flexItemMed: {
    flexGrow: 1,
    flexBasis: '20%',
    marginRight: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  orderStatusText: {
    fontSize: "0.875rem",
    lineHeight: '1rem',
  },
  orderStatusText2: {
    fontSize: "0.875rem",
    color: Colors.grey,
    minWidth: 70,
    marginRight: '1rem',
  },
});


export default withStyles(styles)( OrderStatusDisplay );
