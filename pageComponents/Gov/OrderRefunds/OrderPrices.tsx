import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius, Colors } from "layout/AppTheme";
// Typings
import {
  Order,
  ID,
  PaymentProcessor,
  PayeeType,
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
  // const tx = option(order).currentSnapshot.transaction();

  // // order details
  // const osnap = option(order).currentSnapshot();
  // const total = option(osnap).total(0);
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

  let refundOrderItemIds = option(values).refundOrderItemIds([]);

  // let refundingOrderItems = order.items
  //   .filter(oitem => refundOrderItemIds.includes(oitem.id));

  // let totalRefund = refundingOrderItems
  //   .flatMap(oitem => [...oitem.payoutItems])
  //   .reduce((acc, pitem) => {
  //     return acc
  //       + pitem.amount
  //       + pitem.paymentProcessingFee
  //   }, 0)

  // let totalPaymentFees = refundingOrderItems
  //   .flatMap(oitem => [...oitem.payoutItems])
  //   .reduce((acc, pitem) => {
  //     return acc + pitem.paymentProcessingFee
  //   }, 0)


  // if (!osnap) {
  if (false) {
    return <Loading inline loading={!order}/>
  } else {
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
            {/* <OrderPriceRow classes={classes}
              fieldName={"Total"}
              addLess={"+"}
              fieldAmount={total}
              fieldRefunded={""}
              fieldRefund={totalRefund}
            />
            <OrderPriceRow classes={classes}
              fieldName={"Inc. Payment Fees"}
              addLess={"-"}
              fieldAmount={totalPaymentFees}
              fieldRefunded={""}
              fieldRefund={totalPaymentFees}
            />
            <OrderPriceRow classes={classes}
              fieldName={"Taxes"}
              addLess={"-"}
              fieldAmount={taxes}
              fieldRefunded={""}
              fieldRefund={option(values).taxes(0)}
            /> */}
            <LineBreak width={1} borderColor={fade(Colors.lightPurple,0.8)}/>
          </div>
        </div>
      </div>
    )
  }
}

const LineBreak = (props) => {
  const {
    width = 1,
    borderColor = Colors.purple,
  } = props;
  return (
    <div style={{
        width: '99.5%',
        border: `${width}px solid ${borderColor}`,
        marginTop: '0rem',
        marginBottom: '0rem',
      }}
    ></div>
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
      {/* <div className={clsx(classes.orderColTiny, classes.textEnd)}>
        <Typography variant="subtitle2"
          className={clsx(
            classes.orderCellText,
            classes.orderCellRefundText
          )}
        >
          { isHeader ? fieldRefunded : c(fieldRefunded) }
        </Typography>
      </div> */}
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
const OrderSubtitleRow = ({
  classes, fieldName, addLess, fieldAmount, fieldRefunded, fieldRefund,
  ...props
}) => {
  return (
    <OrderRow
      classes={classes}
      style={props.style}
      isHeader={false}
      isSubtotal={true}
      fieldName={fieldName}
      addLess={addLess}
      fieldAmount={fieldAmount}
      fieldRefunded={fieldRefunded}
      fieldRefund={fieldRefund}
    />
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  order: Order
}
interface FormikFields {
  orderId: ID;
  refundOrderItemIds: string[],
  chargeId: ID;
  paymentIntentId: ID;
  taxes: number;
  // reason: RefundReason;
  reasonDetail: string;
  paypalInvoiceNumber: string;
  paymentProcessor: PaymentProcessor,
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
    borderRadius: `${BorderRadius}px`,
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
    borderRadius: `${BorderRadius}px`,
    borderBottom: `1px solid ${Colors.lightestGrey}`,
    borderLeft: `1px solid ${Colors.lightestGrey}`,
    borderRight: `1px solid ${Colors.lightestGrey}`,
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
    color: Colors.black,
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



