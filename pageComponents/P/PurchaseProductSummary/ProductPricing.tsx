import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import { Product, Product_Variants, Bids } from "typings/gqlTypes";
import PriceDisplayProductPage from "components/PriceDisplayProductPage";
import Typography from "@material-ui/core/Typography";



const ProductPricing = (props: ReactProps) => {

  const { classes } = props;
  const purchasePrice = props.selectedBid?.offerPrice ||
          props?.featuredVariant?.price

  return (
    <ErrorBounds>
      <div className={clsx(
        classes.flexCol,
        classes.marginProductPricing,
      )}>
        {
          purchasePrice !== undefined &&
          <PriceDisplayProductPage
            price={purchasePrice}
            // priceWas={props?.featuredVariant?.priceWas}
            soldOutStatus={props.soldOutStatus}
            isSuspended={props.isSuspended}
          />
        }
      </div>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  featuredVariant: Product_Variants;
  soldOutStatus: string;
  isSuspended: boolean;
  selectedBid?: Bids
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
  marginProductPricing: {
    marginBottom: '0.5rem',
    marginTop: '0.5rem',
  },
});

export default withStyles(styles)( ProductPricing );
