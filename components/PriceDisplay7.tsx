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



const PriceDisplay7 = (props: ReactProps) => {

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
  const priceWasDisplay = currency(priceWas/100, { formatWithSymbol: true })

  const savings = (price >= priceWas)
    ?  currency(0, { formatWithSymbol: true })
    :  currency((price - priceWas)/100, { formatWithSymbol: true })


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
            {
              !hidePriceWas &&
              (price > priceWas) &&
              <Typography className={classes.priceWas} variant="body1">
                {priceWasDisplay.format()}
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
        {/* {
          !hideSavings &&
          (basePrice > actualPrice) &&
          <div className={clsx(classes.innerContainerSpread)}>
            <Typography className={classes.priceSavings} variant="body1">
              {
                props.pastTense
                ? `You saved ${savings.format()}`
                : `You save ${savings.format()}${remainingText}`
              }
            </Typography>
          </div>
        } */}
        {/* {
          expiresAt &&
          expiresAt.getSeconds &&
          expiresAt.getSeconds() > 0 &&
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
        } */}
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
    marginBottom: '0.5rem',
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
    // backgroundColor: fade(Colors.green, 0.2),
    backgroundColor: fade(Colors.blue, 0.2),
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
  priceSavings: {
    marginRight: '0.5rem',
    color: Colors.grey,
    fontSize: "0.875rem",
  },
  finalCountDown: {
    // color: Colors.grey,
    color: Colors.green,
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

export default withStyles(styles)( PriceDisplay7 );
