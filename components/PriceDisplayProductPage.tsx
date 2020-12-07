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
    hidePriceWas = false,
    hideSavings = false,
    soldOutStatus = SoldOutStatus.AVAILABLE,
  } = props;

  const actualPrice = props.price;
  const basePrice = props.priceWas;

  const price = currency(actualPrice/100, { formatWithSymbol: true })
  const priceWas = currency(basePrice/100, { formatWithSymbol: true })
  const savings = (actualPrice >= basePrice)
    ?  currency(0, { formatWithSymbol: true })
    :  currency((basePrice - actualPrice)/100, { formatWithSymbol: true })

  const savingsPercent = Math.round((basePrice - actualPrice)/basePrice * 100);

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
              {price.format()}
            </Typography>
            {
              basePrice &&
              !hidePriceWas &&
              (basePrice > actualPrice) &&
              <Typography className={classes.priceWas} variant="body1">
                {priceWas.format()}
              </Typography>
            }
            {
              basePrice &&
              !hideSavings &&
              (basePrice > actualPrice) &&
              <Typography className={classes.priceSavings} variant="body1">
                {
                  props.pastTense
                    ? `You saved ${savings.format()} (${savingsPercent}%)`
                    : `You save ${savings.format()} (${savingsPercent}%)`
                }
              </Typography>
            }
          </div>
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
  priceWas: number;
  countDownStyle?: any;
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
  countDownTag: {
    display: 'flex',
    // backgroundColor: Colors.lightestGrey,
    // backgroundColor: Colors.charcoal,
    // padding: '0.2rem 0.5rem',
    borderRadius: '2px',
    minWidth: '145px',
    // border: `1px solid ${Colors.charcoal}`,
    // border: `1px solid ${Colors.lightestGrey}`,
  },
  innerContainerSpreadEnd: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
  finalCountDown: {
    color: Colors.charcoal,
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  timeUrgent: {
    color: Colors.green,
    // color: Colors.backgroundColor,
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  time: {
    color: Colors.green,
    // color: Colors.backgroundColor,
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  quantityText: {
    fontWeight: 600,
    color: Colors.grey,
    fontSize: "0.8rem",
  },
});

export default withStyles(styles)( PriceDisplayProductPage );
