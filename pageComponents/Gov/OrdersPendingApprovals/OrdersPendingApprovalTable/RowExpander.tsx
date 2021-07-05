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

import { OrdersConnection } from "typings/gqlTypes";
import {
  GET_ORDERS_CREATED_CONNECTION,
  GET_ORDERS_PENDING_APPROVAL_CONNECTION,
  GET_ORDERS_ADMIN_APPROVED_CONNECTION,
} from "queries/orders-admin-queries";
// router
import Link from "next/link";
import Typography from "@material-ui/core/Typography";
// Snackbar
import { useSnackbar } from "notistack";

import { formatDateTime } from "utils/dates";
import { asCurrency as c } from 'utils/prices';

// graphql
import { UserPrivate, OrderStatus, OrderAdmin } from "typings/gqlTypes";
import { useApolloClient, useMutation } from "@apollo/client";
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

  const row = createDataForPendingApprovalTable({
    id: order.id,
    total: order.total,
    internationalFee: order.internationalFee,
    createdAt: order.createdAt,
    sellerStore: order.sellerStore,
    buyer: order.buyer,
    buyerLicense: order.buyerLicense,
    sellerLicense: order.product.sellerLicense,
    currentOrderSnapshot: order.currentSnapshot,
    orderSnapshots: order.orderSnapshots,
    product: order.product,
    payoutId: order?.payoutItems?.[0]?.payoutId,
    payoutStatus: order?.payoutItems?.[0]?.payoutStatus,
    paymentIntentStatus: order?.paymentIntent?.status,
    paymentIntentId: order?.paymentIntent?.id,
  })

  const [open, setOpen] = React.useState(initialOpen);

  const client = useApolloClient()

  // const cacheData = client.cache.readQuery({
  //   query: GET_ORDERS_PENDING_APPROVAL_CONNECTION,
  //   variables: props.variables.ordersPendingApproval,
  // });
  // console.log("CACHE DATA: ", cacheData)

  return (
    <>
      <RowExpanderTitle
        index={index}
        open={open}
        setOpen={setOpen}
      >
        <div className={classes.flexItemTiny}>
          <Typography variant="body2" className={classes.rowText}>
            {row.id}
          </Typography>
        </div>
        <div className={classes.flexItemSlim}>
          <Typography variant="body2" className={classes.rowText}>
            {formatDateTime(row.createdAt)}
          </Typography>
        </div>
        <div className={classes.flexItemTiny}>
          <Typography variant="body2" className={classes.rowText}>
            {c(row.total + row.internationalFee)}
          </Typography>
        </div>
        <div className={classes.flexItemSlim}>
          <Typography variant="body2" className={classes.rowText}>
          {
            row.orderStatus.startsWith("CONFIRMED")
              ? row.orderStatus.slice(0, 17)
              : row.orderStatus
          }
          </Typography>
        </div>
        <div className={classes.flexItemSlim}>
          <Typography variant="body2" className={classes.rowText}>
            {row?.sellerStore?.user?.email}
          </Typography>
        </div>
      </RowExpanderTitle>

      <RowExpanderHidden open={open} index={index}>
        <div className={classes.marginBox}>
          <InfoBuyerSellerDealer
            buyer={row?.buyer}
            buyerLicense={row?.buyerLicense}
            sellerStore={row?.sellerStore}
            sellerLicense={row?.sellerLicense}
            dealer={row?.dealer}
            paymentIntentStatus={row?.paymentIntentStatus}
            paymentIntentId={row?.paymentIntentId}
            total={row.total}
            internationalFee={row.internationalFee}
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
              handleMutationUpdate={
                (cache, { data }) => {

                  let newOrder = data?.approveForm10?.order

                  if (newOrder) {

                    interface QData {
                      getOrdersPendingApprovalConnectionAdmin?: OrdersConnection
                    }

                    let vars = props.variables

                    const cacheData = cache.readQuery<QData, any>({
                      query: GET_ORDERS_PENDING_APPROVAL_CONNECTION,
                      variables: vars.ordersPendingApproval,
                    });
                    console.log("CACHE DATA: ", cacheData)

                    // only update apollo cache if cache exists
                    // otherwise no-cache fetch policy shouldn't try update cache
                    if (cacheData) {
                      let ordersConnection = cacheData?.getOrdersPendingApprovalConnectionAdmin
                      console.log("ordersConnection: ", ordersConnection)
                      let newEdges = (ordersConnection?.edges ?? [])
                          .filter(edge => edge?.node?.id !== newOrder?.id)
                      // console.log("newEdges: ", newEdges)

                      cache.writeQuery({
                        query: GET_ORDERS_PENDING_APPROVAL_CONNECTION,
                        variables: vars.ordersPendingApproval,
                        data: {
                          getOrdersPendingApprovalConnectionAdmin: {
                            ...ordersConnection,
                            // remove approved order from the "pending approval" list
                            edges: newEdges,
                            totalCount: (ordersConnection?.edges?.length ?? 1) - 1,
                          }
                        },
                      });
                      // console.log("CACHE AFTER: ", cache)
                    }

                  }
                }
              }
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
  variables: {
    ordersCreated: {
      query: {
        limit: number
        offset: number
      }
    }
    ordersPendingApproval: {
      query: {
        limit: number
        offset: number
      }
    }
    ordersAdminApproved: {
      query: {
        limit: number
        offset: number
      }
    }
  }
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
    overflow: 'hidden',
    fontSize: '0.825rem',
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