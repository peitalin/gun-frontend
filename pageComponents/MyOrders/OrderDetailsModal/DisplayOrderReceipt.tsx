import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// MUI
import Typography from "@material-ui/core/Typography";
// Components
import { Orders } from "typings/gqlTypes";
// Icons
import LockIcon from "@material-ui/icons/Lock";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
// Components
import { asCurrency as c } from "utils/prices";
import Divider from "components/Divider";



const DisplayOrderReceipt: React.FC<ReactProps> = (props) => {

  const { classes, order } = props;

  // const fees = c(order.paymentProcessingFee);
  // const taxes = c(order.taxes);
  const total = c(order.total);

  // Get a modified cart subtotal so that it reflects the subtotal BEFORE discounts (cart is AFTER)
  // const subtotalBeforeDiscounts =
  //   order.currentSnapshot.subtotal +
  //   order.currentSnapshot.automaticSavings +
  //   order.currentSnapshot.promoCodeSavings;

  // const paymentMethod = option(order).currentSnapshot.transaction.paymentMethod();
  // const paymentMethodId = option(order).currentSnapshot.transaction.paymentMethodId();

  console.log("order", order)

  return (
    <ErrorBounds>
      <div className={classes.root}>

        <div className={classes.flexRow}>
          <Typography variant={"h4"} className={classes.title}>
            Order Summary
          </Typography>
        </div>

        <div className={classes.flexRow}>
          <div className={classes.flexItem1}>
            <Typography variant="body2" className={classes.lineItemText}>
              Total
            </Typography>
          </div>
          <div className={classes.flexItem2}>
            <Typography variant="body2" className={classes.priceDisplay}>
              {total}
            </Typography>
          </div>
        </div>

        <div className={classes.flexRow}>
          <div className={classes.flexItem1}>
            <Typography variant="body2" className={classes.lineItemText}>
              Processing fee (GST)
            </Typography>
          </div>
          <div className={classes.flexItem2}>
            {/* <Typography variant="body2" className={classes.priceDisplay}>
              {fees}
            </Typography> */}
          </div>
        </div>

        <div className={classes.flexRow}>
          <div className={classes.flexItem1}>
            <Typography variant="body2" className={classes.lineItemText}>
              Taxes
            </Typography>
          </div>
          <div className={classes.flexItem2}>
            {/* <Typography variant="body2" className={classes.priceDisplay}>
              {taxes}
            </Typography> */}
          </div>
        </div>

        <Divider style={{ margin: "0.5rem 0rem" }}/>

        <div className={classes.flexRow}>
          <div className={classes.flexItem1}>
            <Typography variant="body2" className={classes.totalPrice}>
              Total (USD)
            </Typography>
          </div>
          <div className={classes.flexItem2}>
            <Typography variant="body2" className={clsx(
              classes.totalPrice,
              classes.totalPriceNumber,
              classes.priceDisplay
            )}>
              {total}
            </Typography>
          </div>
        </div>


        <div className={classes.flexCol}>
          <div className={clsx(classes.childrenBox)}
          >
            {props.children}
          </div>
          <div className={classes.flexRowCenter}>
            <LockIcon className={classes.secureCheckoutIcon}/>
            <Typography variant="caption" className={classes.secureCheckout}>
              Processed with secure checkout
            </Typography>
          </div>
        </div>
      </div>
    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  order: Orders;
}

const styles = (theme: Theme) => createStyles({
  root: {
    padding: '1rem',
    marginBottom: "0.5rem",
    borderRadius: BorderRadius,
    backgroundColor: theme.colors.uniswapMediumNavy,
    boxShadow: BoxShadows.shadow1.boxShadow,
  },
  title: {
    marginBottom: '0.5rem',
  },
  lineItemText: {
    fontSize: '0.9rem',
    margin: '0.1rem 0rem',
  },
  totalPrice: {
    fontWeight: 600,
    fontSize: "0.9rem",
  },
  totalPriceNumber: {
    color: Colors.green,
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexCol400: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: '50%',
    maxWidth: 400,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flexItem1: {
    flexGrow: 0.75,
    flexBasis: '75%',
  },
  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
    alignItems: 'center',
    textAlign: 'center',
  },
  flexItem2: {
    flexGrow: 0.25,
    flexBasis: '25%',
    justifyContent: 'flex-end',
  },
  childrenBox: {
    minHeight: 65,
    height: 65,
    transition: theme.transitions.create('height', {
      // easing: theme.transitions.easing.sharp,
      easing: theme.transitions.easing.easeInOut,
      // easing: 'cubic-bezier(.85,-0.2,0,1.4)',
      duration: "200ms",
    }),
  },
  childrenBoxGrow: {
    height: 95,
    transition: theme.transitions.create('height', {
      // easing: 'cubic-bezier(.85,-0.2,0,1.4)',
      easing: theme.transitions.easing.easeInOut,
      duration: "200ms",
    }),
  },
  priceDisplay: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  subHeading: {
    fontWeight: 600,
    marginTop: '0.5rem',
  },
  orderTitle: {
    marginBottom: '2rem',
  },
  buyButton: {
    width: "100%",
    marginTop: '1rem',
    marginLeft: '1rem',
    marginRight: '1rem',
    marginBottom: '0.25rem',
  },
  secureCheckout: {
    color: "#bbbbbb",
  },
  secureCheckoutIcon: {
    color: "#bbbbbb",
    height: '0.8rem',
    width: '0.8rem',
    marginRight: "0.1rem",
  },
  container: {
    marginBottom: "0.5rem",
  },
  textField: {
    width: "100%",
  },
  promotionText: {
    color: Colors.mediumGrey,
  },
});

export default withStyles(styles)( DisplayOrderReceipt );