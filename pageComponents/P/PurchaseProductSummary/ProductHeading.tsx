import * as React from "react";
import { oc as option } from "ts-optchain";
// GraphQL
import { Product, Product_Variants } from "typings/gqlTypes";
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
    <ErrorBounds className={classes.headingRoot}>
      <div className={classes.greyBorder}>
        <Typography variant="subtitle1" className={classes.productTitle}>
          {option(product).currentSnapshot.title()}
        </Typography>
      </div>
      <Typography variant="body1" className={classes.tagline}>
        {option(product).currentSnapshot.model()}
      </Typography>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  chosenVariant: Product_Variants;
}

const styles = (theme: Theme) => createStyles({
  headingRoot: {
    marginBottom: '0.5rem'
  },
  greyBorder: {
    padding: "0.25rem 0rem",
    // borderBottom: '2px solid #eaeaea',
  },
  productTitle: {
    fontSize: '1.25rem',
    lineHeight: "1.75rem",
    fontWeight: 700,
    marginBottom: '0.5rem',
  },
  tagline: {
    color: Colors.darkerGrey,
    fontSize: '1rem',
    fontWeight: 400,
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