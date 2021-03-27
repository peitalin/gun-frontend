import React from "react";
// styles
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Typings
import { Order } from "typings/gqlTypes";
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
import DescriptionLoading from "components/ProductCardResponsive/DescriptionLoading";



const OrderRowBuyers: React.FC<ReactProps> = (props) => {

  const {
    classes,
    loading,
    order,
  } = props;

  const product = order?.product;

  // const theme = useTheme();
  // const mdDown = useMediaQuery(theme.breakpoints.down("md"))

  const previewItem = getFeaturedPreviewFromProduct(product)

  const orderCancelled =
    order?.currentSnapshot?.orderStatus === OrderStatus.REFUNDED ||
    order?.currentSnapshot?.orderStatus === OrderStatus.CANCELLED

  return (
    <ErrorBounds className={classes.orderRowBuyersRoot}>
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
              <ProductPreviewCardRow
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
  orderRowBuyersRoot: {
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
