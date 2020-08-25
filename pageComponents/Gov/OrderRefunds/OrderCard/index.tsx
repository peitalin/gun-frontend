import * as React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import {
  Orders, OrderStatus,
  PayeeType,
  ID, PaymentProcessor,
  PayoutStatus,
} from "typings/gqlTypes";
// import {
//   MakeRefundParams,
//   RefundReason,
//   RefundOrderItem,
//   RefundPayoutItem,
//   PayoutSplit
// } from "typings";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Material UI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Loading from "components/Loading";
// Components
import ProductPreviewCardRow from "components/ProductPreviewCardRow";
import OrderDetailsModal from "./OrderDetailsModal";
// helpers
import { Colors } from "layout/AppTheme";
import currency from "currency.js";
const c = (s) => currency(s/100, { formatWithSymbol: true }).format()
// validation
import { FormikProps } from 'formik';
import { splitPlatformFee } from "utils/prices";




const OrderCard = (props: ReactProps & FormikProps<FormikFields>) => {

  const { classes, order, total, subtotal, ...fprops } = props;
  const product = option(order).product();
  // const priceDetails = option(orderItem).priceDetails();

  const [showOrderDetails, setShowOrderDetails] = React.useState(false);

  const [refundOrderId, setRefundOrderId] = React.useState<ID>(
    option(order).id(),
  );


  // item price
  const actualPriceStr = c(option(order).total(0))
  // const {
  //   sellerPayment,
  //   platformFee,
  //   affiliateFee
  // } = splitPlatformFee(option(priceDetails).actualPrice(0));


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


  const findItemInFormikRefundItems = (orderItemId: ID): [ID, number] => {
    // Find state.refundItem in formik.values.refundItems
    let rItemIndex = values.refundOrderItemIds.findIndex(oid =>
      oid === orderItemId
    );
    // -1 if not found
    if (rItemIndex >= 0) {
      let rItem = values.refundOrderItemIds[rItemIndex];
      return [rItem, rItemIndex]
    } else {
      return [null, rItemIndex]
    }
  }

  const isItemInFormikRefundItems = (orderItemId: ID): boolean => {
    let [rItem, rItemIndex] = findItemInFormikRefundItems(orderItemId)
    return !!rItem
  }

  const updatedFormikRefundOrderItems = (oid: ID): ID[] => {
    let [rItemId, rItemIndex] = findItemInFormikRefundItems(oid)
    // if exists, either update item amounts + disableStatus, or remove from formik
    console.log("rItemId update: ", rItemId)
    if (rItemId) {
      // remove item if clicked item exists in refundOrderItemId array
      return [
        ...values.refundOrderItemIds.slice(0, rItemIndex),
        ...values.refundOrderItemIds.slice(rItemIndex + 1)
      ]
    } else {
      // otherwise append state.refundItem to formik.values.refundItems
      return [
        ...values.refundOrderItemIds,
        oid
      ]
    }
  }

  const handleUpdateRefundItem = (
    orderId: ID,
  ) => {
    // create a new refundOrderItemId
    setRefundOrderId(orderId);
    let newFormikRefundOrderItemIds = updatedFormikRefundOrderItems(orderId)
    fprops.setFieldValue("refundOrderItemIds", newFormikRefundOrderItemIds)
  }

  const isRefunded = option(order).currentSnapshot.orderStatus() === OrderStatus.REFUNDED;
  const isPaid = false
  // const isPaid = option(orderItem).payoutItems[0].payoutStatus() !== PayoutStatus.UNPAID;
  // if payoutStatus is not UNPAID. Refund not allowed in any state other than "UNPAID"

  // data not exists
  const dataNeExists = !option(product).store.id()
    || !order.id

  if (dataNeExists) {
    return <Loading inline loading={dataNeExists}/>
  }

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.flexRowWithBorder,
      (isRefunded || isPaid) ? classes.refundedGrayscale : null,
    )}>
      <div className={classes.orderItemsContainer}>

        <div className={classes.flexCol}>
        {
          option(product).currentSnapshot.currentVariants[0].previewItems[0]() &&
          <ProductPreviewCardRow
            previewItem={product.currentSnapshot.currentVariants[0].previewItems[0]}
          />
        }
        </div>

        <div className={classes.flexCol}>
          <div className={classes.flexCol}>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldName} variant="subtitle1">
                Title:
              </Typography>
              <Typography className={classes.name} variant="subtitle1">
                {product.currentSnapshot.title}
              </Typography>
            </div>
            {/* <div className={classes.flexRow}>
              <Typography className={classes.fieldName} variant="subtitle1">
                Variant:
              </Typography>
              <Typography className={classes.name} variant="body1">
                {product.chosenVariant.variantName}
              </Typography>
            </div> */}
            <div className={classes.flexRow}>
              <Typography className={classes.fieldName} variant="subtitle1">
                StoreId:
              </Typography>
              <Typography className={classes.name} variant="subtitle1">
                {option(product).store.id()}
              </Typography>
            </div>
          </div>

          <div className={classes.flexCol}>

            <div className={classes.flexRow}>
            <Button
              className={classes.orderDetailsButton}
              variant={"outlined"}
              color={"primary"}
              disabled={!order}
              onClick={() => setShowOrderDetails(true)}
            >
              <Typography
                className={classes.orderDetailsButtonText}
                variant={"body2"}
                gutterBottom
              >
                Order Details
              </Typography>
            </Button>
            </div>

            <FormGroup row className={classes.flexRow}>
              <FormControlLabel
                // className={classes.flexItem}
                disabled={isRefunded || isPaid}
                control={
                  <Checkbox
                    checked={isItemInFormikRefundItems(order.id)}
                    onChange={() => {
                      // add to list of refundOrderItemIds if not already in it
                      handleUpdateRefundItem(order.id)
                    }}
                    value="Special"
                    color="primary"
                  />
                }
                label={
                  <div>
                    {"Add item to refund total: "}
                    <span className={classes.actualPrice}>{actualPriceStr}</span>
                  </div>
                }
              />
            </FormGroup>
          </div>
        </div>

        <OrderDetailsModal
          order={order}
          displayModal={showOrderDetails}
          closeModal={() => setShowOrderDetails(false)}
        />

      </div>
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  order: Orders;
  total: number;
  subtotal: number;
}
interface FormikFields {
  orderId: ID;
  refundOrderItemIds: ID[],
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
    flexDirection: 'row',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flexRowWithBorder: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '1rem',
    marginRight: '0rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #f2f2f2',
  },
  orderItemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  marginLeft: {
    marginLeft: "1rem",
  },
  name: {
    fontWeight: 500,
    color: "#484848",
  },
  fieldName: {
    fontWeight: 400,
    width: '55px',
    color: Colors.purple,
  },
  addItemToRefund: {
    minWidth: '120px',
    marginRight: '.5rem',
    backgroundColor: "#EDF0F2",
    border: '1px solid #EDF0F2',
    "&:hover": {
      border: '1px solid #eaeaea',
    }
  },
  orderDetailsButton: {
    marginTop: '1rem',
    marginBottom: '0.5rem',
    minWidth: '120px',
    maxWidth: '150px',
    border: '1px solid #dadada',
    "&:hover": {
      border: '1px solid #aaaaaa',
    }
  },
  downloadButtonIcon: {
    color: "#484848",
    fontSize: '0.9rem',
    marginRight: '0.1rem',
  },
  downloadButtonText: {
    fontSize: '0.7rem',
    color: "#484848",
    fontWeight: 500,
  },
  orderDetailsButtonText: {
    fontSize: '0.7rem',
    color: "#888",
    fontWeight: 500,
  },
  actualPrice: {
    color: Colors.secondary,
  },
  refundedGrayscale: {
    filter: 'grayscale(1)',
  },
  refundedBlur: {
    filter: "blur(1px)",
  },
});

export default withStyles(styles)(OrderCard);
