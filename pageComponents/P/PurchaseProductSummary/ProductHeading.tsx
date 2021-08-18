import React from "react";
// GraphQL
import { Product, Product_Variants, ListingType } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";




const ProductHeading = (props: ReactProps) => {

  const { classes, product, featuredVariant } = props;

  return (
    <ErrorBounds className={classes.headingRoot}>
      <div className={classes.greyBorder}>
        <Typography variant="subtitle1" className={classes.productTitle}>
          {
            product.listingType === ListingType.CLASSIFIED
            ? "Classified Ad"
            : "Escrow Checkout"
          }
          {/* {product?.currentSnapshot?.title} */}
        </Typography>
      </div>
      <Typography variant="body1" className={classes.subInfo}>
        {product?.currentSnapshot?.make}
      </Typography>
      <Typography variant="body1" className={classes.subInfo}>
        {product?.currentSnapshot?.model}
      </Typography>
      <Typography variant="body1" className={classes.subInfo}>
        {product?.currentSnapshot?.serialNumber}
      </Typography>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  featuredVariant: Product_Variants;
}

const styles = (theme: Theme) => createStyles({
  headingRoot: {
  },
  greyBorder: {
    padding: "0.25rem 0rem",
    // borderBottom: '2px solid #eaeaea',
  },
  productTitle: {
    fontSize: '1.25rem',
    lineHeight: "1.5rem",
    fontWeight: 700,
    color: isThemeDark(theme)
      ? Colors.uniswapLightGrey
      : Colors.slateGreyBlack,
    // marginBottom: '0.5rem',
  },
  subInfo: {
    color: isThemeDark(theme)
      ? Colors.uniswapLighterGrey
      : Colors.slateGreyLightBlack,
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  ratings: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingsCount: {
    marginLeft: "0.25rem",
  },
  variant: {
    color: Colors.purple,
  }
});

export default withStyles(styles)(ProductHeading);