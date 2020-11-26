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
  Products,
  Product_Preview_Items,
  Product_Variants,
} from "typings/gqlTypes";
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
import { getFeaturedPreviewFromProduct } from "utils/images";




const OrderCard = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    order,
    total,
    subtotal,
    ...fprops
  } = props;

  const product: Products & { featuredVariant?: Product_Variants } = option(order).product();
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

  // console.log("OOOOOO: ", order)

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

  let featuredPreview = getFeaturedPreviewFromProduct(product)

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.flexRowWithBorder,
      (isRefunded || isPaid) ? classes.refundedGrayscale : null,
    )}>
      <div className={classes.orderItemsContainer}>

        <div className={clsx(classes.flexCol, classes.marginRight1)}>
          {
            !!featuredPreview &&
            <ProductPreviewCardRow
              previewItem={featuredPreview}
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
              >
                Order Details
              </Typography>
            </Button>
            </div>

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
  reason: string;
  reasonDetails: string;
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
    fontSize: '1rem',
    fontWeight: 500,
    color: theme.colors.uniswapLighterGrey,
    marginBottom: "0.5rem",
  },
  fieldName: {
    fontWeight: 400,
    fontSize: '1rem',
    width: '80px',
    color: theme.colors.uniswapLightestGrey,
    marginBottom: "0.5rem",
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
  orderDetailsButtonText: {
    fontSize: '0.7rem',
    color: "#888",
    fontWeight: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actualPrice: {
    color: Colors.secondary,
  },
  refundedGrayscale: {
    filter: 'grayscale(1)',
  },
  marginRight1: {
    marginRight: '1rem',
  },
});

export default withStyles(styles)(OrderCard);
