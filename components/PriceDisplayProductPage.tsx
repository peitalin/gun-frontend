import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { SoldOutStatus } from "typings/gqlTypes";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// Utils Components
import { Price } from "typings/gqlTypes";
import CountdownBadge from "./CountdownBadge";
// money
import currency from "currency.js";
import { convertSoldOutStatus } from "utils/strings";



const PriceDisplayProductPage = (props: ReactProps) => {

  const {
    classes,
    soldOutStatus = SoldOutStatus.AVAILABLE,
  } = props;

  const actualPrice = props.price ?? 0;
  const basePrice = props.priceWas;

  const price = currency(actualPrice/100, { formatWithSymbol: false })
  // const priceWas = currency(basePrice/100, { formatWithSymbol: true })
  // const savings = (actualPrice >= basePrice)
  //   ?  currency(0, { formatWithSymbol: true })
  //   :  currency((basePrice - actualPrice)/100, { formatWithSymbol: true })

  // const savingsPercent = Math.round((basePrice - actualPrice)/basePrice * 100);

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
              {`${price.format()} AUD`}
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
    minWidth: 290,
  },
  priceInnerContainer: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  innerContainerSpread: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  innerContainerSpreadCountdown: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  price: {
    marginRight: '0.5rem',
    fontSize: "1.5rem",
    fontWeight: 600,
    color: Colors.green
  },
  priceWas: {
    textDecoration: "line-through",
    fontSize: "0.875rem",
    color: fade(Colors.darkGrey, 0.5), // grey
    fontWeight: 500,
    // color: fade(Colors.secondaryBright, 0.5),
  },
  priceSavings: {
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    color: Colors.green,
    fontSize: "0.875rem",
    fontWeight: 500,
  },
});

export default withStyles(styles)( PriceDisplayProductPage );
