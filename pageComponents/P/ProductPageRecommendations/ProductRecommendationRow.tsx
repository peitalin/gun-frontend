import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "reduxStore/actions";
// Router
import Link from "next/link";
// Typings
import { Product } from "typings/gqlTypes";
// Utils
import ErrorBounds from "components/ErrorBounds";
// Material UI
import Button from "@material-ui/core/Button";
import ProductPreviewCardRow from "components/ProductPreviewCardRow";
import Typography from "@material-ui/core/Typography";
import PriceDisplay4 from "components/PriceDisplay4";
// helpers
import { trimTitle } from "utils/strings";



const ProductRecommendationRow = (props: ReactProps) => {

  const {
    classes,
    product,
    index,
    setIndex,
  } = props;

  const featuredVariant = option(product).currentVariants[0]();

  const isSoldOut = option(featuredVariant).isSoldOut();

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
          option(featuredVariant).previewItems[0]()
          ? <ProductPreviewCardRow
              previewItem={featuredVariant.previewItems[0]}
              height={90}
              width={135}
              className={classes.previewCard}
            />
          : <ProductPreviewCardRow
              previewItem={undefined}
              height={90}
              width={135}
              className={classes.previewCard}
            />
        }
        </div>

        <div className={classes.flexCol}>
          <Typography
            className={clsx(
              classes.category,
              !option(product).category.name() ? "pulse" : null
            )}
            variant="body1"
            component="div"
          >
            {option(product).category.name("")}
          </Typography>
          <Typography
            className={clsx(
              classes.title,
              !option(product).currentSnapshot.title() ? "pulse" : null
            )}
            variant="body1"
            component="div"
          >
            {trimTitle(option(product).currentSnapshot.title(), 48)}
          </Typography>

          <div className={clsx(
            classes.priceAbsoluteBottom,
          )}>
            {
              option(featuredVariant).price()
              ? <PriceDisplay4
                  price={featuredVariant.price}
                  priceWas={featuredVariant.priceWas}
                  hideSavings={true}
                  quantityAvailable={undefined}
                  isSoldOut={isSoldOut}
                  countDownStyle={{ }}
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
    backgroundColor: Colors.foregroundColor,
    "&:hover": {
      backgroundColor: Colors.lightestGrey,
      transition: theme.transitions.create(['border', 'backgroundColor'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
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
    color: "#888",
    marginTop: '0.2rem',
    marginBottom: '0.2rem',
    lineHeight: '1rem',
  },
  title: {
    fontWeight: 500,
    color: "#444",
    marginBottom: '0.2rem',
    fontSize: '0.875rem',
    lineHeight: '1rem',
  },
  name: {
    fontWeight: 1,
    color: "#484848",
  },
  tagline: {
    fontWeight: 400,
    color: "#888888",
  },
  priceAbsoluteBottom: {
    // position: "relative",
    // position: "absolute",
    width: 'calc(100%)',
  },
});



export default withStyles(styles)(ProductRecommendationRow);
