import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// Utils Components
import { Price, PriceDetails } from "typings/gqlTypes";
import CountdownBadge from "./CountdownBadge";
// money
import currency from "currency.js";
import { findSoonestDiscountExpiry } from "utils/prices";



const PriceDisplay6 = (props: ReactProps) => {

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
    :  currency((actualPrice - basePrice)/100, { formatWithSymbol: true })

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
        <div className={clsx(classes.innerContainerSpread, classes.flexWrap)}>
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
          <div className={clsx(classes.innerContainerSpread, classes.flexWrap)}>
            {
              expiresAt &&
              <div className={classes.dealEndsContainer}>
                <Typography className={classes.finalCountDown} variant="body2">
                  Deal ends in
                </Typography>
                <CountdownBadge
                  className={classes.time}
                  endDate={expiresAt}
                />
              </div>
            }
            {
              props.quantityAvailable &&
              expiresAt &&
              <div className={classes.innerContainerSpreadEnd}>
                <Typography className={classes.quantityText} variant="body1">
                  {` – `}
                </Typography>
              </div>
            }
            {
              props.quantityAvailable &&
              <div className={classes.innerContainerSpreadEnd}>
                <Typography className={classes.quantityText} variant="body1">
                  {`${props.quantityAvailable} available`}
                </Typography>
              </div>
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
    marginRight: '2rem',
  },
  innerContainerSpread: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  price: {
    marginRight: '0.5rem',
    fontSize: "0.8rem",
    fontWeight: 600,
    color: Colors.green,
  },
  priceWas: {
    textDecoration: "line-through",
    color: fade("#7C858E", 0.5), // grey
    fontSize: '0.7rem',
    marginRight: '0.5rem',
    // color: fade(Colors.secondaryBright, 0.5),
  },
  priceSavings: {
    marginRight: '0.5rem',
    color: Colors.green,
    fontSize: "0.8rem",
  },
  finalCountDown: {
    color: Colors.grey,
    fontSize: "0.8rem",
    fontWeight: 600,
    lineHeight: '1rem',
    marginRight: '0.25rem',
  },
  time: {
    color: fade(Colors.secondaryBright, 0.8),
    fontSize: "0.8rem",
    lineHeight: '1rem',
    fontWeight: 600,
  },
  innerContainerSpreadEnd: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  quantityText: {
    color: Colors.grey,
    fontSize: "0.7rem",
    fontWeight: 600,
    margin: "0rem 0.25rem",
    marginLeft: "0.5rem",
  },
  dealEndsContainer: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 145,
  },
});

export default withStyles(styles)( PriceDisplay6 );
