import React from "react";
import clsx from "clsx";
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



const PriceDisplay = (props: ReactProps) => {

  const {
    classes,
    hidePriceWas = false,
    hideSavings = false,
    soldOutStatus = SoldOutStatus.AVAILABLE,
  } = props;

  const {
    priceWas,
    price,
  } = props;

  const priceDisplay = currency(price/100, { formatWithSymbol: true })
  const priceWasDisplay = currency(priceWas/100, { formatWithSymbol: true })

  const savings = (price >= priceWas)
    ?  currency(0, { formatWithSymbol: true })
    :  currency((price - priceWas)/100, { formatWithSymbol: true })


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
            {
              !hidePriceWas &&
              (price > priceWas) &&
              <Typography className={classes.priceWas} variant="body1">
                {priceWasDisplay.format()}
              </Typography>
            }
          </div>
          {/* {
            expiresAt &&
            expiresAt.getSeconds &&
            expiresAt.getSeconds() > 0 &&
            <Typography className={classes.finalCountDown} variant="body2">
              Sale ends in
            </Typography>
          } */}
        </div>
        <div className={classes.innerContainerSpread}>
          {/* {
            !hideSavings &&
            (basePrice > actualPrice) &&
            <Typography className={classes.priceSavings} variant="body2">
              {
                props.pastTense
                ? `You saved ${savings.format()}`
                : `You save ${savings.format()}${remainingText}`
              }
            </Typography>
          } */}
          {/* {
            expiresAt &&
            expiresAt.getSeconds &&
            expiresAt.getSeconds() > 0 &&
            <CountdownBadge
              className={classes.time}
              endDate={expiresAt}
            />
          } */}
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
    color: fade(Colors.green, 0.8),
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
