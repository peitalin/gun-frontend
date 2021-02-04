import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import {
  Orders, OrderStatus,
  ID,
  Products,
  Product_Variants,
} from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Material UI
import Typography from "@material-ui/core/Typography";
import Loading from "components/Loading";
// Components
import ProductPreviewCardRow from "components/ProductPreviewCardRow";
// helpers
import { Colors } from "layout/AppTheme";
// validation
import { FormikProps } from 'formik';
import { getFeaturedPreviewFromProduct } from "utils/images";




const ProductCard = (props: ReactProps & FormikProps<FormikFields>) => {

  const {
    classes,
    order,
    total,
    subtotal,
    ...fprops
  } = props;

  const product: Products & { featuredVariant?: Product_Variants } = option(order).product();

  const isRefunded = order?.currentSnapshot?.orderStatus === OrderStatus.REFUNDED;
  const isCancelled = order?.currentSnapshot?.orderStatus === OrderStatus.CANCELLED;
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
  let countryCode = order?.product?.store?.user?.phoneNumber?.countryCode;
  let phoneNumber = order?.product?.store?.user?.phoneNumber?.number;
  let phoneNumberFull = !!phoneNumber
    ? `${countryCode} ${phoneNumber}`
    : "NA"

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

            <Typography className={classes.fieldTitle} variant="subtitle1">
              Product
            </Typography>

            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Title:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {product.currentSnapshot.title}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Product ID:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {product.id}
              </Typography>
            </div>

            <Typography className={classes.fieldTitle} variant="subtitle1">
              Store
            </Typography>

            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                StoreId:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {product?.store?.id}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Store Name:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {order.product.store.name}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Store User Email:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {order.product.store.user.email}
              </Typography>
            </div>
            <div className={classes.flexRow}>
              <Typography className={classes.fieldKey} variant="subtitle1">
                Store User Phone:
              </Typography>
              <Typography className={classes.fieldInfo} variant="subtitle1">
                {phoneNumberFull}
              </Typography>
            </div>

          </div>
        </div>

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
  markProductAbandoned: boolean;
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
    paddingLeft: '0.5rem',
  },
  flexRowWithBorder: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: '0rem',
  },
  orderItemsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  fieldTitle: {
    fontWeight: 500,
    fontSize: '1rem',
    color: theme.colors.uniswapLightestGrey,
    marginBottom: "0.5rem",
    marginTop: "0.5rem",
  },
  fieldKey: {
    fontWeight: 400,
    fontSize: '0.9rem',
    width: '150px',
    color: theme.colors.uniswapLightestGrey,
    marginBottom: "0.5rem",
  },
  fieldInfo: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: theme.colors.uniswapLighterGrey,
    marginBottom: "0.5rem",
  },
  refundedGrayscale: {
    filter: 'grayscale(1)',
  },
  marginRight1: {
    marginRight: '1rem',
  },
});

export default withStyles(styles)(ProductCard);
