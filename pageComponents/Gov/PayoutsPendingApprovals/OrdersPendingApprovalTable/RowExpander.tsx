import React from 'react';
import clsx from 'clsx';
import { Colors, BoxShadows, BorderRadius } from 'layout/AppTheme';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import { createDataForPendingApprovalTable } from "./createData";
import Button from "@material-ui/core/Button";

import Form10PreviewCard from "pageComponents/MyOrders/Form10FileUploader/Form10PreviewCard";
import RowExpanderTitle from "components/Gov/RowExpander/RowExpanderTitle";
import RowExpanderHidden from "components/Gov/RowExpander/RowExpanderHidden";
import ApprovalButtons from "components/Gov/RowExpander/ApprovalButtons";
import EscrowHistoryTable from "components/Gov/RowExpander/EscrowHistoryTable";
import InfoBuyerSellerDealer from "components/Gov/RowExpander/InfoBuyerSellerDealer";

// router
import Link from "next/link";
// Snackbar
import { useSnackbar } from "notistack";

import { formatDate } from "utils/dates";
import currency from 'currency.js';

// graphql
import { UserPrivate, OrderStatus, OrderAdmin } from "typings/gqlTypes";
import { useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";
import {
  APPROVE_FORM_10,
  UNAPPROVE_FORM_10,
  REVISE_AND_RESUBMIT_FORM_10,
} from "queries/orders-mutations";





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

  const row = createDataForPendingApprovalTable({
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

  const [approveForm10, { data, loading, error }] = useMutation<MutData, MutVar>(
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

  const [open, setOpen] = React.useState(initialOpen);
  const [openImage, setOpenImage] = React.useState(false);

  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()

  let form10 = row?.form10;
  let form10Exists = !!form10;

  let readyForApproval = row.orderStatus === OrderStatus.FORM_10_SUBMITTED
  let alreadyApproved = (row.orderStatus as string) === OrderStatus.ADMIN_APPROVED

  let isEvenRow = index % 2 === 0

  let sellerPhoneNumber = !!row?.sellerStore?.user?.phoneNumber?.number
    ? `${row?.sellerStore?.user?.phoneNumber?.countryCode} ${row?.sellerStore?.user?.phoneNumber?.number}`
    : "-"

  let buyerPhoneNumber = !!row?.buyer?.phoneNumber?.number
    ? `${row?.buyer?.phoneNumber?.countryCode} ${row?.sellerStore?.user?.phoneNumber?.number}`
    : "-"

  let dealer = row?.product?.currentSnapshot?.dealer;

  let dealerPhoneNumber = !!dealer?.user?.phoneNumber?.number
    ? `${dealer?.user?.phoneNumber?.countryCode} ${dealer?.user?.phoneNumber?.number}`
    : "-"
  // console.log("admin: ", admin)

  return (
    <>
      <RowExpanderTitle
        index={index}
        open={open}
        setOpen={setOpen}
      >
        <div className={classes.flexItemTiny}>{row.id}</div>
        <div className={classes.flexItemSlim}>{formatDate(row.createdAt)}</div>
        <div className={classes.flexItemTiny}>{c(row.total)}</div>
        <div className={classes.flexItemSlim}>
          {
            row.orderStatus?.length > 22
            ? row.orderStatus.slice(0, 22) + '..'
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

          {
            props.order?.id &&
            <div className={classes.form10RowContainer}>
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
            </div>
          }

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

const styles = (theme: Theme) => createStyles({
  marginBox: {
    margin: "1rem 1rem 2rem 1rem",
  },
  viewOrderButton: {
    margin: "0.5rem 0rem",
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
  form10RowContainer: {
    display: 'flex',
    // prevent form10 card from being 100% width of row
  },
});



export default withStyles(styles)( RowExpander );