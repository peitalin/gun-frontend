import React from 'react';
import clsx from 'clsx';
import { Colors, BoxShadows, BorderRadius } from 'layout/AppTheme';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import { createDataForPayoutsCompletedTable } from "./createData";
import Button from "@material-ui/core/Button";

import RowExpanderTitle from "components/Gov/RowExpander/RowExpanderTitle";
import RowExpanderHidden from "components/Gov/RowExpander/RowExpanderHidden";
import EscrowHistoryTable from "components/Gov/RowExpander/EscrowHistoryTable";
import InfoPayoutItems from "components/Gov/RowExpander/InfoPayoutItems";

// router
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
// Snackbar
import { useSnackbar } from "notistack";

import { formatDateTime } from "utils/dates";
import currency from 'currency.js';

// graphql
import { UserPrivate, PayeeType, OrderAdmin } from "typings/gqlTypes";
import { useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";





const RowExpander = (props: RowExpanderProps) => {

  const {
    order,
    admin,
    index,
    initialOpen = false,
    classes,
  } = props;

  const snackbar = useSnackbar();

  const row = createDataForPayoutsCompletedTable({
    id: order.id,
    total: order.total,
    internationalFee: order?.internationalFee,
    createdAt: order?.currentSnapshot?.createdAt,
    // NOTE this date is different to other dashboard tables
    sellerStore: order.sellerStore,
    buyer: order.buyer,
    currentOrderSnapshot: order.currentSnapshot,
    orderSnapshots: order.orderSnapshots,
    product: order.product,
    payoutId: order?.payoutItems?.[0]?.payoutId,
    payoutStatus: order?.payoutItems?.[0]?.payoutStatus,
    paymentIntentStatus: order?.paymentIntent?.status,
    paymentIntentId: order?.paymentIntent?.id,
    payoutItems: order?.payoutItems ?? [],
  })

  let payoutMethod = order?.sellerStore?.user?.payoutMethod
  let bsb = payoutMethod?.bsb
  let accountNumber = payoutMethod?.accountNumber
  let accountName = payoutMethod?.accountName

  const [open, setOpen] = React.useState(initialOpen);

  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()

  let payoutSeller = order?.payoutItems?.find(p => p.payeeType === PayeeType.STORE)
  let payoutPlatform = order?.payoutItems?.find(p => p.payeeType === PayeeType.PLATFORM)
  let sellerPayment = payoutSeller.amount

  return (
    <>
      <RowExpanderTitle
        index={index}
        open={open}
        setOpen={setOpen}
      >
        <div className={clsx(classes.flexItem, classes.flexItemMaxWidth120)}>
          <Typography variant="body2" className={classes.rowText}>
            {row.id}
          </Typography>
        </div>
        <div className={classes.flexItem}>
          <Typography variant="body2" className={classes.rowText}>
            {formatDateTime(row.createdAt)}
          </Typography>
        </div>
        <div className={clsx(classes.flexItem, classes.flexItemMaxWidth120)}>
          <Typography variant="body2" className={classes.rowText}>
            {c(sellerPayment)}
          </Typography>
        </div>
        <div className={classes.flexItem}>
          <Typography variant="body2" className={classes.rowText}>
            {row?.sellerStore?.user?.email}
          </Typography>
        </div>
        <div className={classes.flexItem}>
          <Typography variant="body2" className={classes.rowText}>
            {accountName}
          </Typography>
        </div>
      </RowExpanderTitle>

      <RowExpanderHidden open={open} index={index}>
        <div className={classes.marginBox}>

          <InfoPayoutItems
            sellerStore={row?.sellerStore}
            paymentIntentStatus={row?.paymentIntentStatus}
            paymentIntentId={row?.paymentIntentId}
            payoutItems={row?.payoutItems}
          />

          <Link href={`/gov/orders?orderId=${row.id}`}>
            <a>
              <Button
                variant="outlined"
                className={classes.viewOrderButton}
              >
                View Order
              </Button>
            </a>
          </Link>
        </div>
        <EscrowHistoryTable
          escrowHistory={row?.history}
        />
      </RowExpanderHidden>
    </>
  );
}


interface RowExpanderProps extends WithStyles<typeof styles> {
  order: OrderAdmin;
  admin: UserPrivate
  index?: number
  refetchQueriesParams?: {
    query: DocumentNode,
    variables?: {
      query?: any
      limit?: number
      offset?: number
    },
  }[];
  initialOpen?: boolean;
}


const styles = (theme: Theme) => createStyles({
  marginBox: {
    margin: "1rem 1rem 2rem 1rem",
  },
  viewOrderButton: {
    margin: "0.5rem 0rem",
  },
  flexItemWide: {
    flexBasis: "15%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'flex-start',
    paddingRight: '0.5rem',
    flexGrow: 1,
  },
  flexItem: {
    flexGrow: 0.5,
    flexBasis: "15%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingRight: '0.5rem',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  flexItemMaxWidth120: {
    maxWidth: 120,
  },
  rowText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '0.825rem',
  },
  form10RowContainer: {
    display: 'flex',
    // prevent form10 card from being 100% width of row
  },
});



export default withStyles(styles)( RowExpander );