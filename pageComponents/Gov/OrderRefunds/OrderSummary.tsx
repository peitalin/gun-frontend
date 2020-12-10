import * as React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
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
import Typography from "@material-ui/core/Typography";
import Row from "./Row";
// formatters
import dayjs from "dayjs";
import currency from "currency.js";
import Loading from "components/Loading";

const OrderSummary = (props: ReactProps) => {
  const { classes, order } = props;
  const c = s => currency(s / 100, { formatWithSymbol: true }).format();
  const asTime = (d: Date) => dayjs(d).format("DD-MM-YYYY HH:mm A");

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
        <Row fieldName={"Created At:"} fieldValue={asTime(order?.createdAt)} />
        <Row fieldName={"Updated At:"} fieldValue={asTime(order?.updatedAt)} />
        <Row
          fieldName={"Order Status:"}
          fieldValue={`${orderStatusHumanFriendly(order)} (${
            order?.currentSnapshot?.orderStatus
          })`}
        />

        <Row
          fieldName={"Processor:"}
          fieldValue={order?.currentSnapshot?.transaction?.paymentProcessor}
        />
      </div>
    );
  }
};

const orderStatusHumanFriendly = (order: Orders): string => {
  switch (order?.currentSnapshot?.orderStatus) {
    case OrderStatus.CREATED:
      return "Unfinished";
    case OrderStatus.CONFIRMED_PAYMENT_FORM_10_REQUIRED:
      return "Deposit confirmed, form10 upload required";
    case OrderStatus.FAILED:
      return "Failed";
    case OrderStatus.REFUNDED:
      return "Refunded";
    case OrderStatus.FORM_10_SUBMITTED:
      return "Form10 submitted, approval required";
    case OrderStatus.FORM_10_REVISE_AND_RESUBMIT:
      return "Form10 rejected, resubmission";
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

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    orderTitleRow: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 40,
      marginBottom: "0.25rem",
      background: fade(Colors.lightPurple, 0.1),
      "&:hover": {
        background: fade(Colors.lightPurple, 0.2)
      }
    },
    orderHeader: {
      textAlign: "center",
      color: Colors.black
    },
    orderCol: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      flexGrow: 1,
      padding: "0.5rem",
      color: Colors.purple
    },
    smallCol: {
      flexBasis: "25%",
      alignItems: "flex-end",
      borderRadius: `${BorderRadius}px 0px 0px ${BorderRadius}`
      // border: `1px solid ${fade(Colors.purple, 0.5)}`,
    },
    largeCol: {
      flexBasis: "75%",
      alignItems: "flex-start",
      paddingRight: "1rem",
      borderRadius: `0px ${BorderRadius}px ${BorderRadius} 0px`
      // borderTop: `1px solid ${fade(Colors.purple, 0.5)}`,
      // borderBottom: `1px solid ${fade(Colors.purple, 0.5)}`,
      // borderRight: `1px solid ${fade(Colors.purple, 0.5)}`,
    }
  });

export default withStyles(styles)(OrderSummary);
