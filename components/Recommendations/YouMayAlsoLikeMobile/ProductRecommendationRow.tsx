import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
// Router
import Link from "next/link";
// Typings
import { Product, SoldOutStatus } from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Material UI
import Button from "@mui/material/Button";
import ProductPreviewThumb from "components/ProductPreviewThumb";
import Typography from "@mui/material/Typography";
import PriceDisplayMobileRecommendation from "components/PriceDisplayMobileRecommendation";
// helpers
import { trimTitle } from "utils/strings";



const ProductRecommendationRow = (props: ReactProps) => {

  const {
    classes,
    product,
    index,
    setIndex,
  } = props;

  const featuredVariant = product?.featuredVariant;
  const price = featuredVariant?.price;
  const soldOutStatus = product?.soldOutStatus;

  return (
    <ErrorBounds className={clsx(
      classes.recRowRoot,
      classes.flexRowWithBorder,
    )}>
      <div className={classes.flexRow}
        onClick={() => {
          setIndex(0) // reset featuredPreview carousel index
        }}
      >
        <div className={classes.flexCol}>
        {
          product?.featuredVariant?.previewItems?.[0]
          ? <ProductPreviewThumb
              previewItem={product.featuredVariant.previewItems[0]}
              height={80}
              width={128}
              className={classes.previewCard}
            />
          : <ProductPreviewThumb
              previewItem={undefined}
              height={80}
              width={128}
              className={classes.previewCard}
            />
        }
        </div>

        <div className={classes.flexCol}>
          <Typography
            className={clsx(
              classes.category,
              !product?.category?.name ? "pulse" : null
            )}
            variant="body1"
            component="div"
          >
            {product?.category?.name ?? ""}
          </Typography>
          <Typography
            className={clsx(
              classes.title,
              !product?.currentSnapshot?.title ? "pulse" : null
            )}
            variant="body1"
            component="div"
          >
            {trimTitle(product?.currentSnapshot?.title, 48)}
          </Typography>

          <div className={clsx(
            classes.priceAbsoluteBottom,
            !price ? "pulse" : null
          )}>
            {
              price
              ? <PriceDisplayMobileRecommendation
                  price={price}
                  soldOutStatus={soldOutStatus}
                  isSuspended={product?.isSuspended}
                />
              : <span style={{ color: Colors.grey }}></span>
            }
          </div>
        </div>

      </div>
    </ErrorBounds>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  index: number;
  setIndex(a?: any): void;
}

const styles = (theme: Theme) => createStyles({
  recRowRoot: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 90,
    // boxShadow: '-1px 1px 1px -1px rgba(22,22,22,0.1)',
    borderRadius: '4px',
    paddingRight: '0.5rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
  },
  flexRowWithBorder: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginRight: '0rem',
    // backgroundColor: Colors.foregroundColor,
    // opacity: 1,
    // "&:hover": {
    //   backgroundColor: Colors.slateGrey,
    //   // opacity: 0.8,
    //   transition: theme.transitions.create(['opacity', 'backgroundColor'], {
    //     easing: theme.transitions.easing.easeIn,
    //     duration: '100ms',j
    //   })
    // },
  },
  previewCard: {
    marginRight: '0.5rem',
  },
  marginLeft: {
    marginLeft: "1rem",
  },
  category: {
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: '.65rem',
    color: theme.colors.uniswapLighterGrey,
    marginTop: '0.2rem',
    marginBottom: '0.2rem',
    lineHeight: '1rem',
  },
  title: {
    fontWeight: 500,
    color: theme.colors.uniswapLightGrey,
    marginBottom: '0.2rem',
    fontSize: '0.875rem',
    lineHeight: '1rem',
  },
  priceAbsoluteBottom: {
    // position: "relative",
    // position: "absolute",
    width: 'calc(100%)',
  },
});



export default withStyles(styles)(ProductRecommendationRow);
