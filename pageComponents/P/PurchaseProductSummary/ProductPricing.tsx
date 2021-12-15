import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// Utils Components
import ErrorBounds from "components/ErrorBounds";
import { Product, Product_Variants, Bids } from "typings/gqlTypes";
import PriceDisplayProductPage from "components/PriceDisplayProductPage";
import Typography from "@mui/material/Typography";
import { initialProductCreateState } from "reduxStore/product_create-reducer";



const ProductPricing = (props: ReactProps) => {

  const {
    classes,
    internationalFeeDisplay = 0,
    initialPurchasePrice,
  } = props;

  return (
    <ErrorBounds>
      <div className={clsx(
        classes.flexCol,
        classes.marginProductPricing,
      )}>
        {
          initialPurchasePrice !== undefined &&
          <PriceDisplayProductPage
            price={initialPurchasePrice}
            soldOutStatus={props.soldOutStatus}
            isSuspended={props.isSuspended}
            internationalFee={internationalFeeDisplay}
          />
        }
      </div>
    </ErrorBounds>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  soldOutStatus: string;
  isSuspended: boolean;
  internationalFeeDisplay: number
  initialPurchasePrice: number
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
