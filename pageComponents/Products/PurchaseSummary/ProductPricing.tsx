import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import { Product, ProductVariant } from "typings/gqlTypes";
import PriceDisplay5 from "components/PriceDisplay5";
import Typography from "@material-ui/core/Typography";



const ProductPricing = (props: ReactProps) => {

  const { classes } = props;

  return (
    <ErrorBounds className={classes.marginBottom1}>
      <div className={clsx(
        classes.flexCol,
        classes.marginBottomHalf,
      )}>
        {
          option(props).chosenVariant.priceDetails() &&
          <PriceDisplay5
            priceDetails={option(props).chosenVariant.priceDetails()}
            quantityAvailable={option(props).chosenVariant.currentStockLevel.quantityAvailable()}
            isSoldOut={option(props).chosenVariant.isSoldOut()}
          />
        }
      </div>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  chosenVariant: ProductVariant;
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
  marginBottomHalf: {
    marginBottom: '0.5rem',
  },
  marginBottom1: {
    marginBottom: '1rem',
  },
});

export default withStyles(styles)( ProductPricing );
