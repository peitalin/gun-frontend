import React from "react";
// Styles
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
  fade
} from "@material-ui/core/styles";
import { BorderRadius, Colors } from "layout/AppTheme";
import { Orders, OrderStatus } from "typings/gqlTypes";
// Material UI
import Row from "./Row";
// formatters
import dayjs from "dayjs";
import currency from "currency.js";
import Loading from "components/Loading";
import { formatDate } from "utils/dates";



const OrderSummary = (props: ReactProps) => {
  const { classes, order } = props;
  const c = s => currency(s / 100, { formatWithSymbol: true }).format();

  if (!order) {
    return <Loading inline loading={!order} />;
  } else {
    return (
      <div className={classes.root}>
        <Row fieldName={"Order ID:"} fieldValue={order?.id} />
        <Row
          fieldName={"OrderSnapshot ID:"}
          fieldValue={order?.currentSnapshot?.id}
        />
        <Row
          fieldName={"User:"}
          fieldValue={
            `${order?.buyer?.firstName} ${order?.buyer?.lastName} – ${order?.buyer?.email}`
          }
        />
        <Row fieldName={"Created At:"} fieldValue={formatDate(order?.createdAt)} />
        <Row
          fieldName={"Order Status:"}
          fieldValue={`${orderStatusHumanFriendly(order)} (${
            order?.currentSnapshot?.orderStatus
          })`}
        />
        <Row
          fieldName={"Westpac Payout ID:"}
          fieldValue={order?.payoutItems?.[0]?.payoutId}
        />
      </div>
    );
  }
};

const orderStatusHumanFriendly = (order: Orders): string => {
  switch (order?.currentSnapshot?.orderStatus) {
    case OrderStatus.CREATED:
      return "Order created";
    case OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED:
      return "Escrow funds authorized, form10 upload required";
    case OrderStatus.FAILED:
      return "Failed";
    case OrderStatus.REFUNDED:
      return "Refunded";
    case OrderStatus.FORM_10_SUBMITTED:
      return "Form10 submitted, approval required";
    case OrderStatus.FORM_10_REVISE_AND_RESUBMIT:
      return "Form10 rejected, resubmission needed";
    case OrderStatus.ADMIN_APPROVED:
      return "Admin approved";
    case OrderStatus.COMPLETE:
      return "Order complete and paid out";
    default:
      return "Unexpected order status";
  }
  return "";
};

interface ReactProps extends WithStyles<typeof styles> {
  order: Orders;
}

const styles = (theme: Theme) => createStyles({
  root: {
    width: "100%"
  },
});

export default withStyles(styles)(OrderSummary);
