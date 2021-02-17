import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import { Product, Product_Variants } from "typings/gqlTypes";
import PriceDisplayProductPage from "components/PriceDisplayProductPage";
import Typography from "@material-ui/core/Typography";



const ProductPricing = (props: ReactProps) => {

  const { classes } = props;

  return (
    <ErrorBounds>
      <div className={clsx(
        classes.flexCol,
        classes.marginBottom1,
        classes.marginTopHalf,
      )}>
        {
          option(props).featuredVariant.price() &&
          <PriceDisplayProductPage
            price={option(props).featuredVariant.price()}
            priceWas={option(props).featuredVariant.priceWas()}
            soldOutStatus={option(props).soldOutStatus()}
          />
        }
      </div>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  featuredVariant: Product_Variants;
  soldOutStatus: string;
}

const styles = (theme: Theme) => createStyles({
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  marginTopHalf: {
    marginTop: '0.5rem',
  },
  marginBottom1: {
    marginBottom: '1rem',
  },
});

export default withStyles(styles)( ProductPricing );
