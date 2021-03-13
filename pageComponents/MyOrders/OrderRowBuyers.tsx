import React from "react";
import { useState, useEffect } from "react";
import { oc as option } from "ts-optchain";
// styles
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Typings
import { Product, Order, Products, ID  } from "typings/gqlTypes";
// Material UI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// Components
import ErrorBounds from "components/ErrorBounds";
import ProductPreviewCardRow from "components/ProductPreviewCardRow";
import OrderDetailsModal from "./OrderDetailsModal";
import OrderStatusDisplay from "./OrderStatusDisplay";
// mediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Typings
import { OrderStatus } from "typings/gqlTypes";
import { getFeaturedPreviewFromProduct } from "utils/images";



const OrderRowBuyers: React.FC<ReactProps> = (props) => {

  const { classes, order } = props;
  const { product } = order;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))

  const previewItem = getFeaturedPreviewFromProduct(product)

  const orderCancelled =
    order?.currentSnapshot?.orderStatus === OrderStatus.REFUNDED ||
    order?.currentSnapshot?.orderStatus === OrderStatus.CANCELLED

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.flexRow,
    )}>

      {
        !props.loading &&
        <div className={clsx(
          classes.flexCol,
          (!order && !product) ? "pulse" : null,
        )}>
          <ProductPreviewCardRow
            previewItem={previewItem}
            height={55}
            width={88}
          />
          <div className={classes.detailsContainer}>
            <Typography className={classes.name} variant="body2">
              {product?.currentSnapshot?.title}
            </Typography>
            <Typography className={classes.tagline} variant="body2">
              {product?.currentSnapshot?.model}
            </Typography>
            <OrderStatusDisplay
              order={order}
              orderCancelled={orderCancelled}
            />
            <div className={classes.flexRowFlexEnd}>
              <OrderDetailsModal
                order={order}
                orderCancelled={orderCancelled}
              />
            </div>
          </div>
        </div>
      }
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  order: Order;
  loading?: boolean;
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: '1rem',
    borderRadius: BorderRadius,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    boxShadow: theme.palette.type === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    border: theme.palette.type === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDark}`,
    marginBottom: '0.5rem',
    height: 220,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  flexRowFlexEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  detailsContainer: {
    marginTop: '0.5rem',
  },
  name: {
    fontWeight: 600,
    fontSize: '1rem',
    color: theme.colors.uniswapLightestGrey,
    marginBottom: "0.25rem",
  },
  tagline: {
    fontWeight: 600,
    color: theme.colors.uniswapLighterGrey,
    marginBottom: "0.25rem",
  },
});


export default withStyles(styles)( OrderRowBuyers );
