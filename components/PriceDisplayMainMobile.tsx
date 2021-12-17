import React from "react";
import clsx from "clsx";
import { SoldOutStatus } from "typings/gqlTypes";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// money
import currency from "currency.js";
import { convertSoldOutStatus } from "utils/strings";



const PriceDisplayMainMobile = (props: ReactProps) => {

  const {
    classes,
    soldOutStatus = SoldOutStatus.AVAILABLE,
  } = props;

  const {
    priceWas,
    price,
  } = props;

  const priceDisplay = price > 0
    ? currency(price/100, { formatWithSymbol: true })?.format()
    : "NA"

  // const priceWasDisplay = currency(priceWas/100, { formatWithSymbol: true })
  // const savings = (price >= priceWas)
  //   ?  currency(0, { formatWithSymbol: true })
  //   :  currency((price - priceWas)/100, { formatWithSymbol: true })


  if (
    soldOutStatus === SoldOutStatus.ABANDONED
    || soldOutStatus === SoldOutStatus.RESERVED
    || soldOutStatus === SoldOutStatus.SOLD_OUT
  ) {
    return (
      <Typography className={classes.price} variant="body1">
        {convertSoldOutStatus(soldOutStatus)}
      </Typography>
    )
  }

  if (props.isSuspended) {
    return (
      <Typography className={classes.price} variant="body1">
        Suspended
      </Typography>
    )
  }


  return (
    <div className={classes.priceOuterContainer}>
      <>
        <div className={classes.innerContainerSpread}>
          <div className={classes.priceInnerContainer}>
            <Typography className={classes.price} variant="body1">
              {priceDisplay}
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
  },
  price: {
    marginRight: '0.5rem',
    fontSize: "0.875rem",
    fontWeight: 600,
    // color: Colors.green,
    color: Colors.blue,
  },
  priceWas: {
    textDecoration: "line-through",
    fontSize: "0.75rem",
    color: Colors.darkGrey, // grey
  },
});

export default withStyles(styles)( PriceDisplayMainMobile );
