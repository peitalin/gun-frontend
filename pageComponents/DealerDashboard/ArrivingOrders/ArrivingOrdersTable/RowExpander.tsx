import React from 'react';
import clsx from 'clsx';
import { Colors, BoxShadows } from 'layout/AppTheme';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import { createDataForArrivingOrdersTable } from "./createData";

import Form10PreviewCard from "pageComponents/MyOrders/Form10FileUploader/Form10PreviewCard";
import RowExpanderTitle from "components/Gov/RowExpander/RowExpanderTitle";
import RowExpanderHidden from "components/Gov/RowExpander/RowExpanderHidden";
import ApprovalButtons from "components/Gov/RowExpander/ApprovalButtons";
import EscrowHistoryTable from "components/Gov/RowExpander/EscrowHistoryTable";
import InfoBuyerSellerDealer from "components/Gov/RowExpander/InfoBuyerSellerDealer";

// Snackbar
import { useSnackbar } from "notistack";

import { formatDate } from "utils/dates";
import currency from 'currency.js';

// graphql
import { UserPrivate, OrderStatus, OrderAdmin } from "typings/gqlTypes";
import { useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";




const RowExpander = (props: RowExpanderProps) => {

  const {
    order,
    admin,
    index,
    initialOpen = false,
    showApprovalButtons = true,
    classes,
  } = props;

  const snackbar = useSnackbar();

  const row = createDataForArrivingOrdersTable({
    id: order.id,
    total: order.total,
    createdAt: order.createdAt,
    sellerStore: order.sellerStore,
    buyer: order.buyer,
    currentOrderSnapshot: order.currentSnapshot,
    orderSnapshots: order.orderSnapshots,
    product: order.product,
    payoutId: order?.payoutItems?.[0]?.payoutId,
    payoutStatus: order?.payoutItems?.[0]?.payoutStatus,
    paymentIntentStatus: order?.paymentIntent?.status,
    paymentIntentId: order?.paymentIntent?.id,
  })

  const [open, setOpen] = React.useState(initialOpen);

  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()

  let form10 = row?.form10;

  return (
    <>
      <RowExpanderTitle
        index={index}
        open={open}
        setOpen={setOpen}
      >
        <div className={classes.flexItemTiny}> {row.id} </div>
        <div className={classes.flexItemSlim}> {formatDate(row.createdAt)} </div>
        <div className={classes.flexItemTiny}> {c(row.total)} </div>
        <div className={classes.flexItemSlim}>
          {
            row.orderStatus?.length > 17
            ? row.orderStatus.slice(0, 17) + '...'
            : row.orderStatus
          }
        </div>
        <div className={classes.flexItemSlim}>
          {row?.sellerStore?.user?.email}
        </div>
      </RowExpanderTitle>

      <RowExpanderHidden open={open} index={index}>

        <div className={classes.marginBox}>
          <InfoBuyerSellerDealer
            buyer={row?.buyer}
            sellerStore={row?.sellerStore}
            dealer={row?.dealer}
            paymentIntentStatus={row?.paymentIntentStatus}
            paymentIntentId={row?.paymentIntentId}
          />

          <Typography className={classes.generateForm10Text}
            variant="h6" gutterBottom component="div">
            Generate Form-10 for Seller
          </Typography>
          {
            props.order?.id &&
            <Form10PreviewCard
              order={props.order}
              inDealerDashboard={true}
              inAdminDashboard={false}
              onMouseDown={() => {
                snackbar.enqueueSnackbar(
                  `Generating Form-10`, { variant: "info" })

                setTimeout(() => {
                  snackbar.enqueueSnackbar(
                    `Not implemented yet`, { variant: "success" })
                }, 500)
              }}
            />
          }

          {
            showApprovalButtons &&
            <ApprovalButtons
              orderId={props.order?.id}
              orderStatus={row?.orderStatus}
              refetchQueriesParams={props.refetchQueriesParams}
            />
          }
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
  showApprovalButtons?: boolean;
}


const styles = (theme: Theme) => createStyles({
  marginBox: {
    margin: "1rem 1rem 2rem 1rem",
  },
  viewOrderButton: {
    margin: "0.5rem 0rem",
    marginLeft: "0.5rem",
  },
  flexItemSlim: {
    flexBasis: "5%",
    flexGrow: 1,
    minWidth: 40,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: 'center',
    paddingRight: '0.5rem',
    marginRight: '0.5rem',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '0.825rem',
  },
  flexItemTiny: {
    flexBasis: "10%",
    minWidth: 60,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: 'center',
    paddingRight: '0.5rem',
    marginRight: '0.5rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontSize: '0.825rem',
  },
  generateForm10Text: {
  },
});



export default withStyles(styles)( RowExpander );