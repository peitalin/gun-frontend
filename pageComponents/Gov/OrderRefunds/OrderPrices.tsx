import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius, Colors } from "layout/AppTheme";
// Typings
import {
  Orders,
  ID,
  PaymentProcessor,
  PayeeType,
  Order_Snapshots,
} from "typings/gqlTypes";
// import {
//   MakeRefundParams,
//   RefundReason,
//   RefundOrderItem,
// } from "typings";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Loading from "components/Loading";
// helpers
import dayjs from 'dayjs';
import currency from "currency.js";
// validation
import { FormikProps } from 'formik';
const c = (s) => currency(s/100, { formatWithSymbol: true }).format()
const asTime = (d: Date) => dayjs(d).format("DD-MM-YYYY HH:mm A")
import { splitPlatformFee } from "utils/prices";



const OrderPrices = (props: ReactProps & FormikProps<FormikFields>) => {


  const { classes, order, ...fprops } = props;
  const tx = option(order).currentSnapshot.transaction();

  // // order details
  const osnap = option(order).currentSnapshot();
  const total = order.total;
  // const subtotal = option(osnap).subtotal(0);
  // const paymentProcessingFee = option(osnap).paymentProcessingFee(0);
  // const taxes = option(osnap).taxes(0);

  // Formik props
  const {
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = fprops;

  // let refundOrderIds = option(values).refundOrderIds([]);
  let totalItem = order.payoutItems
    .filter(p => p.amount > 0) // only positive items are order itme purchases
    .reduce((acc, pitem) => {
      return acc
        + pitem.amount
        + pitem.paymentProcessingFee
    }, 0)

  let totalItemRefund = order.payoutItems
    .filter(p => p.amount < 0) // only negative items are refunds
    .reduce((acc, pitem) => {
      return acc
        + pitem.amount
        + pitem.paymentProcessingFee
    }, 0)

  let totalPaymentFees = order.payoutItems
    .reduce((acc, pitem) => {
      return acc + pitem.paymentProcessingFee
    }, 0)

  let totalTaxes = order.payoutItems
    .filter(p => p.payoutStatus !== "REFUNDING") // only positive are taxes
    .reduce((acc, pitem) => {
      return acc + pitem.taxes
    }, 0)

  let refundedTaxes = order.payoutItems
    .filter(p => p.payoutStatus === "REFUNDING") // only positive are taxes
    .reduce((acc, pitem) => {
      return acc - pitem.taxes
    }, 0)

  console.log("totalItemRefund: ", totalItemRefund)
  console.log("payoutItems: ", order.payoutItems)

  return (
    <div className={classes.root}>
      <div className={classes.maxWidth}>
        <OrderTitleRow classes={classes}
          fieldName={"Line Item"}
          addLess={"+/-"}
          fieldAmount={"Amount Left"}
          fieldRefunded={"Refunded"}
          fieldRefund={"Refunding"}
        />
        <div className={classes.flexCol}>
          <OrderPriceRow classes={classes}
            fieldName={"Item"}
            addLess={""}
            fieldAmount={totalItem}
            fieldRefunded={totalItemRefund}
            fieldRefund={""}
          />
          <OrderPriceRow classes={classes}
            fieldName={"Inc. Payment Fees"}
            addLess={""}
            fieldAmount={totalPaymentFees}
            fieldRefunded={""}
            fieldRefund={totalPaymentFees}
          />
          <OrderPriceRow classes={classes}
            fieldName={"Taxes"}
            addLess={""}
            fieldAmount={totalTaxes}
            fieldRefunded={refundedTaxes}
            fieldRefund={""}
          />
          <OrderPriceRow classes={classes}
            fieldName={"Total"}
            addLess={""}
            fieldAmount={total}
            fieldRefunded={totalItemRefund + refundedTaxes}
            fieldRefund={""}
          />
        </div>
      </div>
    </div>
  )
}


const OrderRow = ({
  classes, isHeader, isSubtotal,
  fieldName,
  addLess,
  fieldAmount,
  fieldRefunded,
  fieldRefund,
  ...props
}) => {
  return (
    <div className={clsx(
        isHeader && classes.orderTitleRow,
        isSubtotal && classes.orderSubtitleRow,
        (!isHeader && !isSubtotal) ? classes.orderRow : null,
      )}
      style={props.style}
    >
      <div className={clsx(classes.orderColMedium, classes.textEnd)}>
        <Typography variant="subtitle2" className={classes.orderCellText}>
          {fieldName}
        </Typography>
      </div>
      <div className={clsx(classes.orderColTiny, classes.textCenter)}>
        <Typography variant="subtitle2" className={classes.orderCellText}>
          {addLess}
        </Typography>
      </div>
      <div className={clsx(classes.orderColSmall, classes.textEnd)}>
        <Typography variant="subtitle2" className={classes.orderCellText}>
          { isHeader ? fieldAmount : c(fieldAmount) }
        </Typography>
      </div>
      <div className={clsx(classes.orderColTiny, classes.textEnd)}>
        <Typography variant="subtitle2"
          className={clsx(
            classes.orderCellText,
            classes.orderCellRefundText
          )}
        >
          { isHeader ? fieldRefunded : c(fieldRefunded) }
        </Typography>
      </div>
      <div className={clsx(classes.orderColSmall, classes.textEnd)}>
        <Typography variant="subtitle2"
          className={clsx(
            classes.orderCellText,
            classes.orderCellRefundText
          )}
        >
          { isHeader ? fieldRefund : c(fieldRefund) }
        </Typography>
      </div>
    </div>
  )
}

const OrderTitleRow = ({
  classes, fieldName, addLess, fieldAmount, fieldRefunded, fieldRefund,
  ...props
}) => {
  return (
    <OrderRow
      classes={classes}
      style={props.style}
      isHeader={true}
      isSubtotal={false}
      fieldName={fieldName}
      addLess={addLess}
      fieldAmount={fieldAmount}
      fieldRefunded={fieldRefunded}
      fieldRefund={fieldRefund}
    />
  )
}
const OrderPriceRow = ({
  classes, fieldName, addLess, fieldAmount, fieldRefunded, fieldRefund,
  ...props
}) => {
  return (
    <OrderRow
      classes={classes}
      style={props.style}
      isHeader={false}
      isSubtotal={false}
      fieldName={fieldName}
      addLess={addLess}
      fieldAmount={fieldAmount}
      fieldRefunded={fieldRefunded}
      fieldRefund={fieldRefund}
    />
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  order: Orders
}
interface FormikFields {
  // orderId: ID;
  // refundOrderIds: string[],
  // chargeId: ID;
  // paymentIntentId: ID;
  // taxes: number;
  // // reason: RefundReason;
  // reasonDetail: string;
  // paypalInvoiceNumber: string;
  // paymentProcessor: PaymentProcessor,
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  orderHeader: {
    textAlign: 'center',
    color: Colors.black,
    textTransform: 'capitalize',
  },
  orderTitleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    background: fade(Colors.lightPurple, 0.1),
    border: `1px solid ${fade(Colors.purple, 0.5)}`,
    // borderRadius: `${BorderRadius}px`,
  },
  orderSubtitleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    background: fade(Colors.lightPurple, 0.1),
    border: `1px solid ${fade(Colors.purple, 0.0)}`,
    borderRadius: `${BorderRadius}px`,
    "&:hover": {
      background: fade(Colors.lightPurple, 0.2),
    }
  },
  orderRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    // borderRadius: `${BorderRadius}px`,
    borderBottom: `1px solid ${theme.colors.uniswapLightestGrey}`,
    borderLeft: `1px solid ${theme.colors.uniswapLightestGrey}`,
    borderRight: `1px solid ${theme.colors.uniswapLightestGrey}`,
    transition: theme.transitions.create(['border'], {
      easing: theme.transitions.easing.easeIn,
      duration: "100ms",
    }),
    margin: "0rem 0rem",
    "&:hover": {
      background: fade(Colors.lightPurple, 0.1),
    }
  },
  orderCellText: {
    textAlign: 'start',
    color: theme.colors.uniswapLightestGrey,
    textTransform: 'capitalize',
  },
  orderCellRefundText: {
    textAlign: 'start',
    color: Colors.secondary,
    textTransform: 'capitalize',
  },
  orderColMedium: {
    textAlign: 'start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '30%',
    marginRight: '0.5rem',
    padding: '0.5rem',
  },
  orderColSmall: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '20%',
    marginRight: '0.5rem',
    padding: '0.5rem',
  },
  orderColTiny: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '10%',
    marginRight: '0.5rem',
    padding: '0.5rem',
  },
  textStart: {
    alignItems: 'flex-start',
  },
  textCenter: {
    alignItems: 'center',
  },
  textEnd: {
    alignItems: 'flex-end',
  },
  maxWidth: {
    maxWidth: '500px',
    width: '100%',
  },
});

export default withStyles(styles)( OrderPrices );



