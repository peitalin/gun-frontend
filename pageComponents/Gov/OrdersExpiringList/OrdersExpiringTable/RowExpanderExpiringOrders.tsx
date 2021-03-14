import React from 'react';
import clsx from 'clsx';
import { Colors, BoxShadows } from 'layout/AppTheme';
import { fade, lighten, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import { createDataForExpiringTable } from "./createData";

import Button from "@material-ui/core/Button";
import ButtonLoading from "components/ButtonLoading";
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Form10PreviewCard from "pageComponents/MyOrders/Form10FileUploader/Form10PreviewCard";
import RowExpanderTitle from "components/Gov/RowExpander/RowExpanderTitle";
import RowExpanderHidden from "components/Gov/RowExpander/RowExpanderHidden";
import ApprovalButtons from "components/Gov/RowExpander/ApprovalButtons";
import EscrowHistoryTable from "components/Gov/RowExpander/EscrowHistoryTable";
import InfoBuyerSellerDealer from "components/Gov/RowExpander/InfoBuyerSellerDealer";

// router
import Link from "next/link";

import { formatDate } from "utils/dates";
import currency from 'currency.js';

// graphql
import { UserPrivate, OrderStatus, OrderAdmin, OrderMutationResponse } from "typings/gqlTypes";
import { useMutation, useApolloClient } from "@apollo/client";
import { DocumentNode } from "graphql";
import {
  APPROVE_FORM_10,
  REVISE_AND_RESUBMIT_FORM_10,
} from "queries/orders-mutations";
import {
  CANCEL_ORDER_AND_PAYMENT,
} from "queries/refunds-mutations";
import {
  getDateWithOffset,
  get7DaysFromDate,
  getCountdownForExpiry,
} from "utils/dates";
import { canBeCancelled } from "pageComponents/Gov/OrderViewer/cancelHelpers";
import { useSnackbar } from "notistack";




const RowExpanderExpiringOrders = (props: RowExpanderProps) => {

  const {
    order,
    admin,
    index,
    initialOpen = false,
    showApprovalButtons = true,
    classes,
  } = props;

  const row = createDataForExpiringTable({
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

  const [approveForm10, approveForm10Response] = useMutation<MutData, MutVar>(
    APPROVE_FORM_10,
    {
      refetchQueries: props.refetchQueriesParams,
      awaitRefetchQueries: true,
    }
  );

  const [reviseAndResubmit, reviseAndResubmitResponse] = useMutation<MutData, MutVar>(
    REVISE_AND_RESUBMIT_FORM_10,
    {
      refetchQueries: props.refetchQueriesParams,
      awaitRefetchQueries: true,
    },
  );


  const aClient = useApolloClient();
  const snackbar = useSnackbar();

  const [loading, setLoading] = React.useState(false);
  const [markAbandoned, setMarkAbandoned] = React.useState(true);
  const [open, setOpen] = React.useState(initialOpen);
  const [openImage, setOpenImage] = React.useState(false);


  const makeCancelledPayment = async({ orderId, markProductAbandoned }: {
    orderId: string,
    markProductAbandoned: boolean,
  }) => {
    console.log("cancelling orderId:", orderId);
    setLoading(true)
    const { errors, data } = await aClient.mutate<MutData3, MutVar3>({
      mutation: CANCEL_ORDER_AND_PAYMENT,
      variables: {
        orderId: orderId,
        markProductAbandoned: markProductAbandoned,
      }
    });
    setLoading(false)
    console.log("payment cancel response:", data);
    alert(JSON.stringify({ CANCELLED: data }));
    // data.refundOrder.order
    if (errors) {
      snackbar.enqueueSnackbar(
        `Payment authorization cancel failed with msg: ${errors}`,
        { variant: "error" }
      )
    }
    return data;
  }


  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()


  let canOrderBeCancelled = canBeCancelled(row.orderStatus)
  // console.log("createdAt: ", new Date(row.createdAt))
  let expiryDate = get7DaysFromDate(new Date(row.createdAt))
  let countDown = getCountdownForExpiry({
    expiryDate: expiryDate
  })

  return (
    <>
      <RowExpanderTitle
        index={index}
        open={open}
        setOpen={setOpen}
      >
        <div className={classes.flexItemTiny}>{row.id}</div>
        <div className={classes.flexItemSlim}>{formatDate(row.createdAt)}</div>
        <div className={classes.flexItemSlim}>{countDown}</div>
        <div className={classes.flexItemTiny}>{c(row.total)}</div>
        <div className={classes.flexItemSlim}>
          {
            row.orderStatus?.length > 22
            ? row.orderStatus.slice(0, 22) + '..'
            : row.orderStatus
          }
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

          {
            props.order?.id &&
            <Form10PreviewCard
              order={props.order}
              inDealerDashboard={false}
              inAdminDashboard={true}
              onMouseDown={() => {
                snackbar.enqueueSnackbar(
                  `Waiting for seller to upload receipt`,
                  { variant: "info" }
                )
              }}
            />
          }


          <div className={classes.buttonContainer}>
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

            {
              showApprovalButtons &&
              <ApprovalButtons
                orderId={props.order?.id}
                orderStatus={row?.orderStatus}
                refetchQueriesParams={props.refetchQueriesParams}
              />
            }
          </div>

          <div className={classes.buttonContainer}>
            <ButtonLoading
              variant="outlined"
              className={classes.cancelButton}
              onClick={() => {
                makeCancelledPayment({
                  orderId: row.id,
                  markProductAbandoned: markAbandoned,
                })
              }}
              loadingIconColor={Colors.red}
              replaceTextWhenLoading={true}
              loading={loading}
              disabled={!canOrderBeCancelled}
              color="secondary"
              style={{
                width: '240px',
                height: '36px',
              }}
            >
              {
                canOrderBeCancelled
                ? "Cancel Order and Payment"
                : "Cannot cancel"
              }
            </ButtonLoading>
            <FormControlLabel
              control={
                <Checkbox
                  checked={markAbandoned}
                  onChange={() => {
                    setMarkAbandoned(s => !s)
                  }}
                  name="markAbandonded"
                />
              }
              label="Also mark product ABANDONED"
            />
          </div>
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

interface MutData {
}
interface MutVar {
  orderId: string; // row.id => order.id
}

interface MutData3 {
  cancelOrderAndPayment: OrderMutationResponse;
}
interface MutVar3 {
  orderId: string;
  markProductAbandoned?: boolean;
}


const styles = (theme: Theme) => createStyles({
  marginBox: {
    margin: "1rem 1rem 2rem 1rem",
  },
  viewOrderButton: {
    margin: "0.5rem 0rem",
    marginBottom: "1rem",
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
  cancelButton: {
    height: '36px',
    border: `1px solid ${Colors.red}`,
    color: Colors.red,
    "&:hover": {
      backgroundColor: fade(Colors.red, 0.8),
      border: `1px solid ${Colors.darkerRed}`,
      color: Colors.cream,
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});



export default withStyles(styles)( RowExpanderExpiringOrders );