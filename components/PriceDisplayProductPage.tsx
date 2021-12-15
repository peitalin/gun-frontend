import React from "react";
import { SoldOutStatus } from "typings/gqlTypes";
// Styles
import { withStyles, createStyles, WithStyles, Theme, alpha } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
// money
import currency from "currency.js";
import { convertSoldOutStatus } from "utils/strings";



const PriceDisplayProductPage = (props: ReactProps) => {

  const {
    classes,
    internationalFee = 0,
    soldOutStatus = SoldOutStatus.AVAILABLE,
  } = props;

  const actualPrice = props.price ?? 0;
  const basePrice = props.priceWas;
  const price = currency(actualPrice/100, { formatWithSymbol: false })
  const intFees = currency(internationalFee/100, { formatWithSymbol: false })


  if (soldOutStatus !== SoldOutStatus.AVAILABLE) {
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
              {`${price.format()} AUD`}
            </Typography>
            {
              (internationalFee > 0) &&
              <Typography className={classes.internationalFees} variant="body1">
                {`+ ${intFees.format()} AUD fees`}
              </Typography>
            }
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
  internationalFee?: number;
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
    color: alpha(Colors.darkGrey, 0.5), // grey
    fontWeight: 500,
    // color: alpha(Colors.secondaryBright, 0.5),
  },
  priceSavings: {
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    color: Colors.green,
    fontSize: "0.875rem",
    fontWeight: 500,
  },
  internationalFees: {
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    color: Colors.lighterRed,
    fontSize: "0.875rem",
    fontWeight: 500,
  },
});

export default withStyles(styles)( PriceDisplayProductPage );
