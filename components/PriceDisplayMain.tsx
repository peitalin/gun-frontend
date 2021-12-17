import React from "react";
import clsx from "clsx";
import { SoldOutStatus } from "typings/gqlTypes";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius, Colors, Gradients, isThemeDark } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
// money
import currency from "currency.js";
import { convertSoldOutStatus } from "utils/strings";


const PriceDisplayMain = (props: ReactProps) => {

  const {
    classes,
    soldOutStatus = SoldOutStatus.AVAILABLE,
  } = props;

  const {
    priceWas,
    price,
  } = props;

  const priceDisplay = currency(price/100, { formatWithSymbol: true })


  if (
    soldOutStatus === SoldOutStatus.ABANDONED ||
    soldOutStatus === SoldOutStatus.RESERVED ||
    soldOutStatus === SoldOutStatus.SOLD_OUT
  ) {
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
  } else if (
    soldOutStatus &&
    soldOutStatus !== SoldOutStatus.AVAILABLE
  ) {
    // external products with arbitrary soldOutStatus / soldText
    return (
      <div className={classes.priceOuterContainer}>
        <div className={classes.innerContainerSpread}>
          <div className={classes.priceInnerContainer}>
            <Typography className={classes.price} variant="body1">
              {priceDisplay.format()}
            </Typography>
            <div className={classes.soldTag}>
              Sold
            </div>
          </div>
        </div>
      </div>
    )
  } else if (props.isSuspended) {
    return (
      <div className={classes.priceOuterContainer}>
        <div className={classes.innerContainerSpread}>
          <div className={classes.priceInnerContainer}>
            <Typography className={classes.price} variant="body1">
              Suspended
            </Typography>
          </div>
        </div>
      </div>
    )
  }
  // else if SoldOutStatus.AVAILABLE

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
  isSuspended: boolean;
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
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    position: "relative",
  },
  innerContainerSpread: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '0.25rem',
    marginTop: '0.25rem',
  },
  price: {
    marginRight: '0.5rem',
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.2, // needed to aligned price, priceWas, quantity
    // color: Colors.gradientUniswapBlue1,
    color: isThemeDark(theme)
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
  soldTag: {
    fontSize: "0.8rem",
    fontWeight: 600,
    position: "absolute",
    right: '-1rem',
    top: '-0.5rem',
    padding: '0.1rem 0.2rem',
    borderRadius: BorderRadius,
    border: `2px solid ${Colors.lightRed}`,
    textTransform: "uppercase",
    color: Colors.lightRed,
    background: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey,
    transform: "rotate(20deg)",
  },
});

export default withStyles(styles)( PriceDisplayMain );
