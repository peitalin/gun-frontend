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


const OrderStatusStepper: React.FC<ReactProps> = (props) => {

  const { classes, order } = props;

  const stepsLabels = getSteps();

  const orderStatus = order?.currentSnapshot?.orderStatus

  const activeStep = getActiveStepFromOrderStatus(orderStatus)

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Order Status
      </Typography>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
      >
        {
          stepsLabels.map(label => (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    root: classes.stepperGrey,
                    active: classes.stepperBlue,
                    completed: classes.stepperBlue,
                  }
                }}
              >
                {label}
              </StepLabel>
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
    'Seller disposed item, pending admin confirmation.',
    'Admin confirms transfer, firearm is ready for collection.',
    'Order is complete, payout is on the way.',
  ];
}

function getActiveStepFromOrderStatus(orderStatus: string) {
  switch (orderStatus) {
    case OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED:
      return 0
    case OrderStatus.FORM_10_SUBMITTED:
      return 1
    case OrderStatus.FORM_10_REVISE_AND_RESUBMIT:
      return 1
    case OrderStatus.ADMIN_APPROVED:
      return 3
    case OrderStatus.COMPLETE:
      return 4
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
  stepperGrey: {
    fill: theme.palette.type === 'dark'
      ? `${Colors.uniswapMediumGrey} !important`
      : `${Colors.slateGreyDarker} !important`,
  },
  stepperBlue: {
    fill: theme.palette.type === 'dark'
      ? `${Colors.cream} !important`
      : `${Colors.blue} !important`,
  },
  title: {
    margiBottom: '0.5rem',
    textAlign: "center",
  },
});

export default withStyles(styles)( OrderStatusStepper );