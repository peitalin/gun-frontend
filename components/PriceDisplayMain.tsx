import React from "react";
import clsx from "clsx";
import { SoldOutStatus } from "typings/gqlTypes";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";
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
  if (props.isSuspended) {
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
  price: {
    marginRight: '0.5rem',
    fontSize: "1rem",
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
});

export default withStyles(styles)( PriceDisplayMain );
