import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Types
import { asCurrency as c } from "utils/prices";
import { Order, OrderStatus } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';


const OrderStatusStepperCancelled: React.FC<ReactProps> = (props) => {

  const { classes, order } = props;

  const stepsLabels = getSteps();

  const orderStatus = order?.currentSnapshot?.orderStatus

  const activeStep = getActiveStepFromOrderStatus(orderStatus)

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Order Status
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {
          stepsLabels.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))
        }
      </Stepper>
    </div>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  order: Order;
}


function getSteps() {
  return [
    'Payment received from buyer. Waiting for seller to dispose firearm.',
    'Order was cancelled and refunded',
  ];
}

function getActiveStepFromOrderStatus(orderStatus: string) {
  switch (orderStatus) {
    case OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED:
      return 0
    case OrderStatus.REFUNDED:
      return 1
    case OrderStatus.CANCELLED:
      return 1
    default:
      return 0
  }
}


const styles = (theme: Theme) => createStyles({
  root: {
    // boxShadow: "0px 3px 8px -4px rgba(22,22,22,0.2)",
    // border: '1px solid #eaeaea',
    borderRadius: "4px",
    marginBottom: "1rem",
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    margiBottom: '0.5rem',
    textAlign: "center",
  },
});

export default withStyles(styles)( OrderStatusStepperCancelled );