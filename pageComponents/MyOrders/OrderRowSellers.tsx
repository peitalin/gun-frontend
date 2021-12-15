import React from "react";
// styles
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Typings
import { Order } from "typings/gqlTypes";
// Material UI
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// Components
import ErrorBounds from "components/ErrorBounds";
import ProductPreviewThumb from "components/ProductPreviewThumb";
import OrderDetailsModal from "./OrderDetailsModal";
// File requests
import Link from "next/link";
// mediaQuery
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Form10FileUploader from "./Form10FileUploader";

import OrderStatusDisplay from "./OrderStatusDisplay";
// import { getStoreIdOrSlug } from "utils/links";
import { OrderStatus } from "typings/gqlTypes";
import { getFeaturedPreviewFromProduct } from "utils/images";
import DescriptionLoading from "components/NewsItemCardResponsive/DescriptionLoading";



const OrderRowSellers: React.FC<ReactProps> = (props) => {

  const {
    classes,
    loading,
    order
  } = props;

  const product = order?.product;

  // const theme = useTheme();
  // const mdDown = useMediaQuery(theme.breakpoints.down("md"))

  const previewItem = getFeaturedPreviewFromProduct(product)

  const orderCancelled =
    order?.currentSnapshot?.orderStatus === OrderStatus.REFUNDED ||
    order?.currentSnapshot?.orderStatus === OrderStatus.CANCELLED

  return (
    <ErrorBounds className={classes.orderRowSellersRoot}>
      <div className={classes.flexRow}>
        {
          loading
          ? <DescriptionLoading
              isMobile={true} // mobile style product row cards
              style={{
                flexBasis: '50%'
              }}
              height={'100%'}
            />
          : <div className={clsx(classes.flexColItem, classes.minWidth150)}>
              <ProductPreviewThumb
                previewItem={previewItem}
                height={55}
                width={88}
              />
              <div className={clsx(classes.detailsContainer, "fadeIn")}>
                <Typography className={classes.name} variant="body2">
                  {product?.currentSnapshot?.title ?? ""}
                </Typography>
                <Typography className={classes.tagline} variant="body2">
                  {product?.currentSnapshot?.model ?? ""}
                </Typography>
                {
                  !loading &&
                  <OrderStatusDisplay
                    order={order}
                    orderCancelled={orderCancelled}
                  />
                }
              </div>
            </div>
        }

        {
          !loading &&
          <div className={clsx(classes.flexColItem)}>
            <div className={classes.flexRowFlexEnd}>
              <Form10FileUploader
                order={order}
              />
            </div>
            <div className={classes.flexRowFlexEnd}>
              <OrderDetailsModal
                order={order}
                orderCancelled={orderCancelled}
              />
            </div>
          </div>
        }
      </div>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  order: Order;
  loading?: boolean;
}

const styles = (theme: Theme) => createStyles({
  orderRowSellersRoot: {
    display: 'flex',
    flexDirection: 'row',
    padding: '1rem',
    borderRadius: BorderRadius,
    backgroundColor: theme.palette.mode === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    boxShadow: theme.palette.mode === 'dark'
      ? BoxShadows.shadow1.boxShadow
      : 'unset',
    border: theme.palette.mode === 'dark'
      ? `unset`
      : `1px solid ${Colors.slateGreyDark}`,
    marginBottom: '0.5rem',
    minHeight: 220,
    width: '100%',
  },
  minWidth150: {
    minWidth: '150px',
  },
  flexColItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    flexBasis: "50%",
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    flexWrap: "wrap",
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
  storeName: {
    fontWeight: 600,
    color: theme.colors.uniswapLighterGrey,
    marginBottom: "0.25rem",
    "&:hover": {
      color: Colors.lightBlue,
    },
  },
});



export default withStyles(styles)( OrderRowSellers );
