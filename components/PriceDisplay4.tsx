import React from "react";
import clsx from "clsx";
import { SoldOutStatus } from "typings/gqlTypes";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
// money
import currency from "currency.js";
import { convertSoldOutStatus } from "utils/strings";



const PriceDisplay4 = (props: ReactProps) => {

  const {
    classes,
    soldOutStatus = SoldOutStatus.AVAILABLE,
  } = props;

  const {
    priceWas,
    price,
  } = props;

  const priceDisplay = currency(price/100, { formatWithSymbol: true })
  // const priceWasDisplay = currency(priceWas/100, { formatWithSymbol: true })

  // const savings = (price >= priceWas)
  //   ?  currency(0, { formatWithSymbol: true })
  //   :  currency((price - priceWas)/100, { formatWithSymbol: true })


  if (soldOutStatus !== SoldOutStatus.AVAILABLE) {
    return (
      <Typography className={classes.price} variant="body1">
        {convertSoldOutStatus(soldOutStatus)}
      </Typography>
    )
  }

  return (
    <div className={classes.priceOuterContainer}>
      <>
        <div className={classes.innerContainerSpread}>
          <div className={classes.priceInnerContainer}>
            <Typography className={classes.price} variant="body1">
              {priceDisplay.format()}
            </Typography>
          </div>
        </div>
      </>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  soldOutStatus?: string;
  price: number;
  priceWas?: number;
}


const styles = (theme: Theme) => createStyles({
  priceOuterContainer: {
    bottom: '0.25rem',
    width: '100%',
  },
  priceInnerContainer: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  innerContainerSpread: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  soldOut: {
    marginRight: '0.5rem',
    fontSize: "0.7rem",
    fontWeight: 600,
    color: Colors.secondary,
  },
  price: {
    marginRight: '0.5rem',
    fontSize: "0.875rem",
    fontWeight: 500,
    color: Colors.green,
    // color: Colors.charcoal,
  },
  priceWas: {
    textDecoration: "line-through",
    fontSize: "0.65rem",
    color: fade("#7C858E", 0.5), // grey
    // color: fade(Colors.secondaryBright, 0.5),
  },
});

export default withStyles(styles)( PriceDisplay4 );
