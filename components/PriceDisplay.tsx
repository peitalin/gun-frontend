import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// Utils Components
// import { Price, PriceDetails } from "typings/gqlTypes";
type Price = number;
type PriceDetails = any;
import CountdownBadge from "./CountdownBadge";
// money
import currency from "currency.js";
import { findSoonestDiscountExpiry } from "utils/prices";



const PriceDisplay = (props: ReactProps) => {

  const {
    classes,
    hidePriceWas = false,
    hideSavings = false,
    isSoldOut = false,
  } = props;

  const {
    actualPrice,
    basePrice,
  } = props.priceDetails;

  const price = currency(actualPrice/100, { formatWithSymbol: true })
  const priceWas = currency(basePrice/100, { formatWithSymbol: true })
  const savings = (actualPrice >= basePrice)
    ?  currency(0, { formatWithSymbol: true })
    :  currency(Math.abs(actualPrice - basePrice)/100, { formatWithSymbol: true })

  const expiresAt = findSoonestDiscountExpiry(props.priceDetails);
  const remainingText = props.quantityAvailable ? ` - ${props.quantityAvailable} left` : ""

  if (isSoldOut) {
    return (
      <Typography className={classes.price} variant="body2">
        SOLD OUT
      </Typography>
    )
  }

  return (
    <div className={classes.priceOuterContainer}>
      <>
        <div className={classes.innerContainerSpread}>
          <div className={classes.priceInnerContainer}>
            <Typography className={classes.price} variant="body2">
              {price.format()}
            </Typography>
            {
              !hidePriceWas &&
              <Typography className={classes.priceWas} variant="body2">
                {priceWas.format()}
              </Typography>
            }
          </div>
          {
            expiresAt &&
            <Typography className={classes.finalCountDown} variant="body2">
              Sale ends in
            </Typography>
          }
        </div>
        <div className={classes.innerContainerSpread}>
          {
            !hideSavings &&
            <Typography className={classes.priceSavings} variant="body2">
              {
                props.pastTense
                ? `You saved ${savings.format()}`
                : `You save ${savings.format()}${remainingText}`
              }
            </Typography>
          }
          {
            expiresAt &&
            <CountdownBadge
              className={classes.time}
              endDate={expiresAt}
            />
          }
        </div>
      </>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  pastTense?: boolean;
  hideSavings?: boolean;
  hidePriceWas?: boolean;
  quantityAvailable?: number | null;
  isSoldOut?: boolean;
  priceDetails: PriceDetails;
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
  price: {
    marginRight: '0.5rem',
    fontSize: "0.8rem",
    fontWeight: 600,
    color: Colors.green,
  },
  priceWas: {
    textDecoration: "line-through",
    fontSize: "0.8rem",
    color: fade("#7C858E", 0.5), // grey
    // color: fade(Colors.secondaryBright, 0.5),
  },
  priceSavings: {
    marginRight: '0.5rem',
    color: Colors.green,
    fontSize: "0.8rem",
  },
  finalCountDown: {
    color: fade(Colors.secondaryBright, 0.8),
    fontSize: "0.8rem",
    fontWeight: 600,
    lineHeight: '1rem',
  },
  time: {
    color: Colors.secondary,
    fontSize: "0.8rem",
    lineHeight: '1rem',
    fontWeight: 600,
  },
});

export default withStyles(styles)( PriceDisplay );
