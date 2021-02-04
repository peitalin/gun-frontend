import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius, Colors } from "layout/AppTheme";
// Typings
import {
  Orders,
  PayeeType,
} from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
// helpers
import { formatDate } from "utils/dates";
import currency from "currency.js";
// validation
import { FormikProps } from 'formik';


const c = (s) => {
  if (!s) { return "" }
  return currency(s/100, { formatWithSymbol: true }).format()
}


const OrderPriceBreakdown = (props: ReactProps & FormikProps<FormikFields>) => {

  const { classes, order, ...fprops } = props;

  // // order details
  // const tx = option(order).currentSnapshot.transaction();

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


  let totalItemCaptured = order.payoutItems
    .filter(p => p.payoutStatus === "UNPAID") // only positive are taxes
    .reduce((acc, pitem) => {
      return acc
        + pitem.amount
        + pitem.paymentProcessingFee
    }, 0)

  let totalItemPlatformCaptured = order.payoutItems
    .filter(p => p.payoutStatus === "UNPAID") // only positive are taxes
    .filter(p => p.payeeType === PayeeType.PLATFORM)
    .reduce((acc, pitem) => {
      return acc
        + pitem.amount
    }, 0)

  let totalItemSellerCaptured = order.payoutItems
    .filter(p => p.payoutStatus === "UNPAID") // only positive are taxes
    .filter(p => p.payeeType === PayeeType.STORE)
    .reduce((acc, pitem) => {
      return acc
        + pitem.amount
    }, 0)

  let totalPaymentFeesCaptured = order.payoutItems
    .filter(p => p.payoutStatus === "UNPAID") // only positive are taxes
    .reduce((acc, pitem) => {
      return acc + pitem.paymentProcessingFee
    }, 0)

  let totalTaxesCaptured = order.payoutItems
    .filter(p => p.payoutStatus === "UNPAID") // only positive are taxes
    .reduce((acc, pitem) => {
      return acc + pitem.taxes
    }, 0)

  let totalItemPaid = order.payoutItems
    .filter(p => p.payoutStatus === "PAID") // only positive are taxes
    .reduce((acc, pitem) => {
      return acc
        + pitem.amount
        + pitem.paymentProcessingFee
    }, 0)

  let totalItemPlatformPaid = order.payoutItems
    .filter(p => p.payoutStatus === "PAID") // only positive are taxes
    .filter(p => p.payeeType === PayeeType.PLATFORM)
    .reduce((acc, pitem) => {
      return acc
        + pitem.amount
        + pitem.paymentProcessingFee
    }, 0)

  let totalItemSellerPaid = order.payoutItems
    .filter(p => p.payoutStatus === "PAID") // only positive are taxes
    .filter(p => p.payeeType === PayeeType.STORE)
    .reduce((acc, pitem) => {
      return acc
        + pitem.amount
        + pitem.paymentProcessingFee
    }, 0)

  let totalPaymentFeesPaid = order.payoutItems
    .filter(p => p.payoutStatus === "PAID") // only positive are taxes
    .reduce((acc, pitem) => {
      return acc + pitem.paymentProcessingFee
    }, 0)

  let totalTaxesPaid = order.payoutItems
    .filter(p => p.payoutStatus === "PAID") // only positive are taxes
    .reduce((acc, pitem) => {
      return acc + pitem.taxes
    }, 0)

  let totalCaptured = totalItemCaptured + totalTaxesCaptured + totalPaymentFeesCaptured
  let totalPaid = totalItemPaid + totalTaxesPaid + totalPaymentFeesPaid

  console.log("order.payoutItems: ", order.payoutItems)

  return (
    <div className={classes.root}>
      <div className={classes.maxWidth}>
        <OrderTitleRow classes={classes}
          fieldName={""}
          addLess={"+/-"}
          fieldAmount={"Amount Held"}
          fieldCaptured={"Captured"}
          fieldPaid={"Paid Out"}
        />
        <div className={classes.flexCol}>
          <OrderPriceRow classes={classes}
            fieldName={"Item"}
            addLess={""}
            fieldAmount={""}
            fieldCaptured={totalItemCaptured}
            fieldPaid={totalItemPaid}
          />
          <OrderPriceRow classes={classes}
            fieldName={"Seller Payment"}
            addLess={""}
            fieldAmount={""}
            fieldCaptured={totalItemSellerCaptured}
            fieldPaid={totalItemSellerPaid}
          />
          <OrderPriceRow classes={classes}
            fieldName={"Platform Fee"}
            addLess={""}
            fieldAmount={""}
            fieldCaptured={totalItemPlatformCaptured}
            fieldPaid={totalItemPlatformPaid}
          />
          <OrderPriceRow classes={classes}
            fieldName={"Payment Fees"}
            addLess={""}
            fieldAmount={""}
            fieldCaptured={totalPaymentFeesCaptured}
            fieldPaid={totalPaymentFeesPaid}
          />
          <OrderPriceRow classes={classes}
            fieldName={"Taxes"}
            addLess={""}
            fieldAmount={""}
            fieldCaptured={totalTaxesCaptured}
            fieldPaid={totalTaxesPaid}
          />
          <OrderPriceRow classes={classes}
            fieldName={"Total"}
            addLess={""}
            fieldAmount={order.total}
            fieldCaptured={totalCaptured}
            fieldPaid={totalPaid}
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
  fieldCaptured,
  fieldPaid,
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
      <div className={clsx(classes.orderColMedium, classes.textEnd)}>
        <Typography variant="subtitle2" className={classes.orderCellText}>
          { isHeader ? fieldAmount : c(fieldAmount) }
        </Typography>
      </div>
      <div className={clsx(classes.orderColSmall, classes.textEnd)}>
        <Typography variant="subtitle2"
          className={clsx(
            classes.orderCellText,
            classes.orderCellRefundText
          )}
        >
          { isHeader ? fieldCaptured : c(fieldCaptured) }
        </Typography>
      </div>
      <div className={clsx(classes.orderColSmall, classes.textEnd)}>
        <Typography variant="subtitle2"
          className={clsx(
            classes.orderCellText,
            classes.orderCellRefundText
          )}
        >
          { isHeader ? fieldPaid : c(fieldPaid) }
        </Typography>
      </div>
    </div>
  )
}

const OrderTitleRow = ({
  classes, fieldName, addLess, fieldAmount, fieldCaptured, fieldPaid,
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
      fieldCaptured={fieldCaptured}
      fieldPaid={fieldPaid}
    />
  )
}
const OrderPriceRow = ({
  classes, fieldName, addLess, fieldAmount, fieldCaptured, fieldPaid,
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
      fieldCaptured={fieldCaptured}
      fieldPaid={fieldPaid}
    />
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  order: Orders
}
interface FormikFields {
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
    // flexBasis: '30%',
    width: 140,
    marginRight: '0.5rem',
    padding: '0.5rem',
  },
  orderColSmall: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // flexBasis: '20%',
    width: 120,
    marginRight: '0.5rem',
    padding: '0.5rem',
  },
  orderColTiny: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // flexBasis: '10%',
    width: 100,
    marginRight: '0.5rem',
    padding: '0.5rem',
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

export default withStyles(styles)( OrderPriceBreakdown );



