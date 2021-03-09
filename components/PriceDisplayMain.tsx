import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { SoldOutStatus } from "typings/gqlTypes";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// Utils Components
import { Price } from "typings/gqlTypes";
import CountdownBadge from "./CountdownBadge";
// money
import currency from "currency.js";
import { convertSoldOutStatus } from "utils/strings";


const PriceDisplayMain = (props: ReactProps) => {

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


  if (soldOutStatus !== SoldOutStatus.AVAILABLE) {
    return (
      <div className={classes.priceOuterContainer}>
        <div className={classes.innerContainerSpread}>
          <div className={classes.priceInnerContainer}>
            <Typography className={classes.price} variant="body1">
              {convertSoldOutStatus(soldOutStatus)}
            </Typography>
          </div>
        </div>
      </div>
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
  pastTense?: boolean;
  hideSavings?: boolean;
  hidePriceWas?: boolean;
  quantityAvailable?: number | null;
  soldOutStatus?: string;
  price: number;
  priceWas?: number;
  countDownStyle?: any;
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
    marginBottom: '0.25rem',
    marginTop: '0.25rem',
  },
  innerContainerSpreadCountdown: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    height: '24px',
  },
  countDownTag: {
    display: 'flex',
    // backgroundColor: Colors.lightestGrey,
    backgroundColor: fade(Colors.green, 0.2),
    padding: '0.2rem 0.5rem',
    borderRadius: '2px',
    // border: `1px solid ${Colors.charcoal}`,
    // border: `1px solid ${Colors.lightestGrey}`,
  },
  innerContainerSpreadEnd: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  height18: {
    height: 18,
  },
  price: {
    marginRight: '0.5rem',
    fontSize: "1.125rem",
    fontWeight: 500,
    lineHeight: 1.2, // needed to aligned price, priceWas, quantity
    // color: Colors.gradientUniswapBlue1,
    color: theme.palette.type === 'dark'
      ? Colors.secondaryBright
      : Colors.secondaryBright,
    // background: Gradients.gradientUniswapFluro.background,
    // webkitBackgroundClip: 'text',
    // webkitTextFillColor: 'transparent',
  },
  priceWas: {
    textDecoration: "line-through",
    fontSize: "1rem",
    color: Colors.darkGrey, // grey
  },
  priceSavings: {
    marginRight: '0.5rem',
    color: Colors.grey,
    fontSize: "0.875rem",
  },
  finalCountDown: {
    color: Colors.grey,
    // color: Colors.green,
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  timeUrgent: {
    color: Colors.green,
    // color: Colors.backgroundColor,
    fontSize: "0.875rem",
  },
  time: {
    color: Colors.green,
    // color: Colors.backgroundColor,
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  quantityText: {
    color: Colors.darkGrey,
    fontSize: "0.875rem",
    fontWeight: 500,
    marginRight: "0rem",
  },
});

export default withStyles(styles)( PriceDisplayMain );
