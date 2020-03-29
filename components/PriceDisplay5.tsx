import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
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



const PriceDisplay5 = (props: ReactProps) => {

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
    :  currency((basePrice - actualPrice)/100, { formatWithSymbol: true })

  const savingsPercent = Math.round((basePrice - actualPrice)/basePrice * 100);

  const expiresAt = findSoonestDiscountExpiry(props.priceDetails);
  const remainingText = props.quantityAvailable ? ` - ${props.quantityAvailable} left` : ""


  if (isSoldOut) {
    return (
      <Typography className={classes.price} variant="body1">
        SOLD OUT
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
              <Typography className={classes.priceWas} variant="body1">
                {priceWas.format()}
              </Typography>
            }
            {
              basePrice &&
              !hideSavings &&
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
        {
          expiresAt &&
          <div className={classes.innerContainerSpreadCountdown}>
            <div className={classes.countDownTag}>
              <Typography className={classes.finalCountDown} variant="body1">
                Sale ends in &nbsp;
              </Typography>
              <CountdownBadge
                className={classes.time}
                endDate={expiresAt}
                style={props.countDownStyle}
              />
            </div>
          </div>
        }
        {
          props.quantityAvailable &&
          <div className={classes.innerContainerSpreadCountdown}>
              <div className={classes.innerContainerSpreadEnd}>
                <Typography className={classes.quantityText} variant="body1">
                  {`${props.quantityAvailable} available`}
                </Typography>
              </div>
          </div>
        }
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
    fontSize: "0.9rem",
    fontWeight: 600,
    color: Colors.green
  },
  priceWas: {
    textDecoration: "line-through",
    fontSize: "0.7rem",
    color: fade("#7C858E", 0.5), // grey
    fontWeight: 600,
    // color: fade(Colors.secondaryBright, 0.5),
  },
  priceSavings: {
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    color: Colors.green,
    fontSize: "0.8rem",
    fontWeight: 600,
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
    color: Colors.charcoal,
    fontSize: "0.8rem",
  },
});

export default withStyles(styles)( PriceDisplay5 );
