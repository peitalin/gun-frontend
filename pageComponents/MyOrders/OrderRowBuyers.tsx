import React from "react";
import { useState, useEffect } from "react";
import { oc as option } from "ts-optchain";
// styles
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Typings
import { Product, Orders, Products, ID  } from "typings/gqlTypes";
// Material UI
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// Components
import ErrorBounds from "components/ErrorBounds";
import ProductPreviewCardRow from "components/ProductPreviewCardRow";
import OrderDetailsModal from "./OrderDetailsModal";
// File requests
import Link from "next/link";
// mediaQuery
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Form10Upload from "./Form10Upload";
import OrderStatus from "./OrderStatus";
import { getFeaturedPreviewFromProduct } from "utils/images";



const OrderRowBuyers: React.FC<ReactProps> = (props) => {

  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const { classes, order } = props;
  const { product } = order;

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))

  // console.log("!!porduct: ",product)
  const previewItem = getFeaturedPreviewFromProduct(product)

  return (
    <ErrorBounds className={clsx(
      classes.root,
      classes.flexRowWithBorder,
    )}>

      <div className={clsx(
        classes.flexRow,
        (!order && !product) ? "pulse" : null,
      )}>
        <div className={classes.flexCol}>
          <ProductPreviewCardRow
            previewItem={previewItem}
            height={55}
            width={88}
          />
        </div>

        <div className={clsx(
          classes.flexRow,
          classes.width100,
          classes.marginLeft,
        )}>
          <div className={clsx(
            classes.flexCol,
            classes.orderInfoContainer,
            'fadeIn'
          )}>
            <Typography className={classes.name} variant="body2">
              {option(product).currentSnapshot.title("")}
            </Typography>
            <Typography className={classes.tagline} variant="body2">
              {option(product).currentSnapshot.model("")}
            </Typography>
            {
              option(product).store.id() &&
              <Link
                href="/s/[storeId]"
                as={`/s/${option(product).store.id()}`}
              >
                <a>
                  <Typography className={classes.storeName} variant="body2">
                    {option(product).store.name()}
                  </Typography>
                </a>
              </Link>
            }
            <OrderStatus order={order} />
          </div>

          <div className={clsx(classes.flexColEnd, 'fadeIn')}>

            <div className={classes.flexRowFlexEnd}>
              <OrderDetailsModal
                order={order}
              />
            </div>
          </div>

        </div>
      </div>
    </ErrorBounds>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  order: Orders;
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    padding: '1rem',
    borderRadius: BorderRadius,
    backgroundColor: Colors.foregroundColor,
    boxShadow: BoxShadows.shadow1.boxShadow,
    // "&:hover": {
    //   boxShadow: BoxShadows.shadowLight.boxShadow,
    // },
  },
  width100: {
    width: '100%',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  flexColEnd: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  flexRowOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    margin: "0.5rem",
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  flexRowWithBorder: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '0.5rem',
    marginRight: '0rem',
    minHeight: "105px",
    // borderBottom: `1px solid ${Colors.lightGrey}`,
  },
  flexRowFlexEnd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  marginLeft: {
    marginLeft: "0.5rem",
  },
  orderInfoContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
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
  variant: {
    fontWeight: 600,
    color: theme.colors.uniswapGrey,
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
  fileCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: "1rem",
    padding: '0.5rem',
    minHeight: 62,
  },
  downloadsBorder: {
    border: `1px solid ${Colors.lightGrey}`,
    borderRadius: "4px",
  },
  orderDetailsButton: {
    height: '38px',
    minWidth: '150px',
    border: `1px solid ${Colors.grey}`,
    "&:hover": {
      border: '1px solid #aaaaaa',
    }
  },
  orderDetailsButtonText: {
    fontSize: '0.875rem',
    color: Colors.darkGrey,
    fontWeight: 500,
  },
  refundedGrayBlur: {
    filter: 'grayscale(1) blur(0.75px)',
  },
  refundedGrayscale: {
    filter: 'grayscale(1)',
  },
});


export default withStyles(styles)( OrderRowBuyers );
