import React from 'react';
import clsx from 'clsx';
import { Colors, BoxShadows } from 'layout/AppTheme';
import { Theme } from '@mui/material/styles';

import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';

import Typography from '@mui/material/Typography';
import currency from 'currency.js';

// graphql
import { PayeeType, StorePrivate, Payout_Items } from "typings/gqlTypes";




const InfoPayoutItems = (props: ReactProps) => {

  const {
    sellerStore,
    classes,
  } = props;


  const c = (s) => {
    if (c === undefined) {
      return ""
    }
    return currency(s/100, { formatWithSymbol: true }).format()
  }

  let sellerPhoneNumber = !!sellerStore?.user?.phoneNumber?.number
    ? `${sellerStore?.user?.phoneNumber?.countryCode} ${sellerStore?.user?.phoneNumber?.number}`
    : "-"

  let payoutSeller = props.payoutItems.find(p => p.payeeType === PayeeType.STORE)
  let payoutPlatform = props.payoutItems.find(p => p.payeeType === PayeeType.PLATFORM)
  // console.log("payotuItems: ", props.payoutItems)
  let totalAmount = payoutSeller.amount
    + payoutPlatform.amount
    + payoutSeller.paymentProcessingFee
    + payoutPlatform.paymentProcessingFee

  const formatBsb = (a: string): string => {
    if (!a) { return "" }
    return a.slice(0,3) + '-' + a.slice(3)
  }

  const formatAccountNumber = (a: string): string => {
    if (!a) { return "" }
    return a.slice(0,4) + '-' + a.slice(4)
  }

  let payoutMethod = sellerStore?.user?.payoutMethod
  let bsb = formatBsb(payoutMethod?.bsb)
  let accountNumber = formatAccountNumber(payoutMethod?.accountNumber)
  let accountName = payoutMethod?.accountName

  return (
    <>
      <div className={classes.userDetailsBox}>
        <Typography variant="h6" component="div">
          Seller Bank Details
        </Typography>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            Email:
          </Typography>
          <Typography className={classes.userDetailsInfo} variant="body1">
            {sellerStore?.user?.email}
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
            BSB:
          </Typography>
          <Typography className={classes.detailsInfoBold} variant="body1">
            {bsb}
          </Typography>
        </div>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            Account Number:
          </Typography>
          <Typography className={classes.detailsInfoBold} variant="body1">
            {accountNumber}
          </Typography>
        </div>
        <div className={classes.userDetailsRow}>
          <Typography className={classes.userDetailsHeader} variant="body1">
            Account Name:
          </Typography>
          <Typography className={classes.detailsInfoBold} variant="body1">
            {accountName}
          </Typography>
        </div>
      </div>

      <Typography variant="h6" gutterBottom component="div">
        Payout Breakdown
      </Typography>
      <div className={classes.userDetailsRow}>
        <Typography className={classes.orderDetailsHeader} variant="body1">
          Seller Earnings
        </Typography>
        <Typography className={classes.detailsInfoBold} variant="body1">
          {c(payoutSeller.amount)}
        </Typography>
      </div>
      <div className={classes.userDetailsRow}>
        <Typography className={classes.orderDetailsHeader} variant="body1">
          Platform Fee
        </Typography>
        <Typography className={classes.detailsInfoBold} variant="body1">
          {c(payoutPlatform.amount)}
        </Typography>
      </div>
      <div className={classes.userDetailsRow}>
        <Typography className={classes.orderDetailsHeader} variant="body1">
          Stripe Fee
        </Typography>
        <Typography className={classes.detailsInfoBold} variant="body1">
          {`${c(payoutSeller.paymentProcessingFee)} + ${c(payoutPlatform.paymentProcessingFee)}`}
        </Typography>
      </div>
      <div className={classes.userDetailsRow}>
        <Typography className={classes.orderDetailsHeader} variant="body1">
          Total
        </Typography>
        <Typography className={classes.detailsInfoBoldBottom} variant="body1">
          {c(totalAmount)}
        </Typography>
      </div>
    </>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  sellerStore: StorePrivate
  paymentIntentStatus: string
  paymentIntentId: string
  payoutItems: Payout_Items[]
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
    width: '140px',
    fontWeight: 400,
    fontSize: "14px",
  },
  userDetailsInfo: {
    fontWeight: 400,
    fontSize: "14px",
  },
  orderDetailsHeader: {
    width: '140px',
    fontWeight: 400,
    fontSize: "14px",
  },
  detailsInfoBold: {
    fontWeight: 400,
    color: Colors.secondary,
    fontSize: "14px",
  },
  detailsInfoBoldBottom: {
    fontWeight: 500,
    color: Colors.secondary,
    fontSize: "14px",
    marginBottom: '1.5rem',
  },
});



export default withStyles(styles)( InfoPayoutItems );