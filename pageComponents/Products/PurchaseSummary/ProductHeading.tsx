import * as React from "react";
import { oc as option } from "ts-optchain";
// GraphQL
import { Product, ProductVariant } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";




const ProductHeading = (props: ReactProps) => {

  const { classes, product, chosenVariant } = props;

  return (
    <ErrorBounds>
      <div className={classes.greyBorder}>
        <Typography variant="subtitle1" className={classes.productTitle}>
          {option(product).name()}
        </Typography>
      </div>
      <Typography variant="body1" className={classes.tagline}>
        {option(product).tagline()}
      </Typography>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  chosenVariant: ProductVariant;
}

const styles = (theme: Theme) => createStyles({
  greyBorder: {
    padding: "0.25rem 0rem",
    // borderBottom: '2px solid #eaeaea',
  },
  productTitle: {
    fontSize: '1.1rem',
    lineHeight: "1.4rem",
    fontWeight: 600,
  },
  tagline: {
    color: Colors.darkerGrey,
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