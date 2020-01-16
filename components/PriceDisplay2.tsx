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
import { Price, PriceDetails } from "typings/gqlTypes";
import CountdownBadge from "./CountdownBadge";
// money
import currency from "currency.js";



const PriceDisplay2 = (props: ReactProps) => {

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
              !hidePriceWas &&
              <Typography className={classes.priceWas} variant="body1">
                {priceWas.format()}
              </Typography>
            }
          </div>
          {
            props.quantityAvailable &&
            <div className={classes.innerContainerSpreadEnd}>
              <Typography className={classes.quantityText} variant="body1">
                {`${props.quantityAvailable} available`}
              </Typography>
            </div>
          }
        </div>
        {
          !hideSavings &&
          <div className={classes.innerContainerSpread}>
            <Typography className={classes.priceSavings} variant="body1">
              {
                props.pastTense
                ? `You saved ${savings.format()}`
                : `You save ${savings.format()}${remainingText}`
              }
            </Typography>
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
    alignItems: 'flex-end',
    marginBottom: '0.25rem',
    marginTop: '0.25rem',
  },
  innerContainerSpreadCountdown: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  countDownTag: {
    display: 'flex',
    backgroundColor: Colors.lightestGrey,
    // backgroundColor: Colors.charcoal,
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
  price: {
    marginRight: '0.5rem',
    fontSize: "0.9rem",
    fontWeight: 600,
    color: Colors.green,
  },
  priceWas: {
    textDecoration: "line-through",
    fontSize: "0.8rem",
    color: fade("#7C858E", 0.5), // grey
  },
  priceSavings: {
    marginRight: '0.5rem',
    color: Colors.grey,
    fontSize: "0.75rem",
  },
  finalCountDown: {
    color: Colors.grey,
    fontSize: "0.75rem",
    fontWeight: 600,
  },
  timeUrgent: {
    color: Colors.green,
    // color: Colors.backgroundColor,
    fontSize: "0.75rem",
  },
  time: {
    color: Colors.green,
    // color: Colors.backgroundColor,
    fontSize: "0.75rem",
    fontWeight: 600,
  },
  quantityText: {
    color: Colors.grey,
    fontSize: "0.75rem",
    fontWeight: 600,
    marginRight: "0rem",
  },
});

export default withStyles(styles)( PriceDisplay2 );
