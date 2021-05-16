import React from 'react';
import clsx from 'clsx';
import { Colors, BoxShadows } from 'layout/AppTheme';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import currency from 'currency.js';

// graphql
import { UserPrivate, StorePrivate, Dealers, Users } from "typings/gqlTypes";




const InfoBuyerSellerDealer = (props: ReactProps) => {

  const {
    sellerStore,
    buyer,
    dealer,
    // order,
    classes,
    hideOrderDetails = false,
  } = props;


  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()

  let sellerPhoneNumber = !!sellerStore?.user?.phoneNumber?.number
    ? `${sellerStore?.user?.phoneNumber?.countryCode} ${sellerStore?.user?.phoneNumber?.number}`
    : "-"

  let buyerPhoneNumber = !!buyer?.phoneNumber?.number
    ? `${buyer?.phoneNumber?.countryCode} ${sellerStore?.user?.phoneNumber?.number}`
    : "-"

  let dealerUser = dealer.user;

  let dealerPhoneNumber = !!dealerUser?.phoneNumber?.number
    ? `${dealerUser?.phoneNumber?.countryCode} ${dealerUser?.phoneNumber?.number}`
    : "-"

  // let buyerLicense = order

  return (
    <>
      <div className={classes.userDetailsBox}>
        <Typography variant="h6" component="div">
          Seller Details
        </Typography>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            Name:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {`${sellerStore?.user?.firstName} ${sellerStore?.user?.lastName}`}
          </Typography>
        </div>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            License Number:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {sellerStore?.user?.defaultLicense?.licenseNumber}
          </Typography>
        </div>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            State:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {sellerStore?.user?.defaultLicense?.licenseState}
          </Typography>
        </div>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            Phone:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {sellerPhoneNumber}
          </Typography>
        </div>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            Email:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {sellerStore?.user?.email}
          </Typography>
        </div>
      </div>

      <div className={classes.userDetailsBox}>
        <Typography variant="h6" component="div">
          Buyer Details
        </Typography>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            Name:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {`${buyer?.firstName} ${buyer?.lastName}`}
          </Typography>
        </div>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            License Number:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {buyer?.defaultLicense?.licenseNumber}
          </Typography>
        </div>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            State:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {buyer?.defaultLicense?.licenseState}
          </Typography>
        </div>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            Phone:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {buyerPhoneNumber}
          </Typography>
        </div>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            Email:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {buyer?.email ?? "-"}
          </Typography>
        </div>
      </div>

      <div className={classes.userDetailsBox}>
        <Typography variant="h6" component="div">
          Transferring Dealer Details
        </Typography>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            Name:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {`${dealer?.name}`}
          </Typography>
        </div>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            Dealer License:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {dealer?.licenseNumber}
          </Typography>
        </div>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            State:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {dealer?.state}
          </Typography>
        </div>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            Phone:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {dealerPhoneNumber}
          </Typography>
        </div>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            Email:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {dealerUser?.email ?? "-"}
          </Typography>
        </div>
      </div>

      {
        !hideOrderDetails &&
        <>
          <Typography variant="h6" gutterBottom component="div">
            Order Details
          </Typography>
          <div className={classes.userDetailsRow}>
            <Typography className={classes.orderDetailsHeader} variant="body1">
              Stripe Payment Intent Status:
            </Typography>
            <Typography className={classes.orderDetailsInfo} variant="body1">
              {props.paymentIntentStatus}
            </Typography>
          </div>
          <div className={classes.userDetailsRow}>
            <Typography className={classes.orderDetailsHeader} variant="body1">
              Stripe Payment Intent ID:
            </Typography>
            <Typography className={classes.orderDetailsInfoBottom} variant="body1">
              {props.paymentIntentId}
            </Typography>
          </div>
        </>
      }

    </>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  dealer: Dealers
  sellerStore: StorePrivate
  buyer: UserPrivate
  paymentIntentStatus: string
  paymentIntentId: string
  hideOrderDetails?: boolean
}


const styles = (theme: Theme) => createStyles({
  marginBox: {
    margin: "1rem 1rem 2rem 1rem",
  },
  userDetailsBox: {
    marginBottom: '1rem',
  },
  userDetailsRow: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
  },
  userDetailsHeader: {
    width: '114px',
    fontWeight: 400,
    fontSize: "14px",
  },
  userDetailsInfo: {
    fontWeight: 400,
    fontSize: "14px",
  },
  orderDetailsHeader: {
    width: '200px',
    fontWeight: 400,
    fontSize: "14px",
  },
  orderDetailsInfo: {
    fontWeight: 500,
    color: Colors.secondary,
    fontSize: "14px",
  },
  orderDetailsInfoBottom: {
    fontSize: "12px",
    marginBottom: '1.5rem',
  },
});



export default withStyles(styles)( InfoBuyerSellerDealer );