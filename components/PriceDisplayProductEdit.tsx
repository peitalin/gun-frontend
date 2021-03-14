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



const PriceDisplayProductEdit = (props: ReactProps) => {

  const {
    classes,
    price,
    soldOutStatus = SoldOutStatus.AVAILABLE,
  } = props;

  const priceDisplay = currency(price/100, { formatWithSymbol: true })


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
    marginBottom: '0.5rem',
    marginTop: '0.25rem',
  },
  price: {
    marginRight: '0.5rem',
    fontSize: "1rem",
    fontWeight: 500,
    color: Colors.green,
    lineHeight: 1.2, // needed to aligned price, priceWas, quantity
    // color: Colors.charcoal,
  },
  priceWas: {
    textDecoration: "line-through",
    fontSize: "1rem",
    color: Colors.darkGrey, // grey
  },
});

export default withStyles(styles)( PriceDisplayProductEdit );
