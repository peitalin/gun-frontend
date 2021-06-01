import React from 'react';
import clsx from 'clsx';
import { Colors, BoxShadows } from 'layout/AppTheme';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import ButtonLoading from "components/ButtonLoading";

// Snackbar
import { useSnackbar } from "notistack";
// graphql
import { OrderStatus, OrderAdmin } from "typings/gqlTypes";
import { useMutation, ApolloCache } from "@apollo/client";
import { DocumentNode } from "graphql";
import {
  APPROVE_FORM_10,
  UNAPPROVE_FORM_10,
  REVISE_AND_RESUBMIT_FORM_10,
} from "queries/orders-mutations";



const ApprovalButtons = (props: ReactProps) => {

  const {
    orderId,
    orderStatus,
    classes,
  } = props;

  const snackbar = useSnackbar();

  const [approveForm10, { data, loading, error }] = useMutation<MutData, MutVar>(
    APPROVE_FORM_10, {
    update: props.handleMutationUpdate,
    onCompleted: (data) => {
      snackbar.enqueueSnackbar(
        `Order ${data?.approveForm10?.order?.id} approved`,
        { variant: 'success' }
      )
    },
    onError: (err) => {
      snackbar.enqueueSnackbar(
        `${err?.graphQLErrors?.[0]?.message}`,
        { variant: 'error' }
      )
    },
    refetchQueries: props.refetchQueriesParams,
    awaitRefetchQueries: true,
  });

  const [reviseAndResubmit, reviseAndResubmitResponse] = useMutation<MutData, MutVar>(
    REVISE_AND_RESUBMIT_FORM_10, {
    update: props.handleMutationUpdate,
    refetchQueries: props.refetchQueriesParams,
    onCompleted: (data) => {
      snackbar.enqueueSnackbar(
        `Order ${data?.approveForm10?.order?.id} rejected`,
        { variant: 'warning' }
      )
    },
    onError: (err) => {
      snackbar.enqueueSnackbar(
        `${err?.graphQLErrors?.[0]?.message}`,
        { variant: 'error' }
      )
    },
    awaitRefetchQueries: true,
  });

  let readyForApproval = orderStatus === OrderStatus.FORM_10_SUBMITTED
  let alreadyApproved = orderStatus === OrderStatus.ADMIN_APPROVED

  return (
    <>
      <ButtonLoading
        variant="outlined"
        className={classes.approveButton}
        onClick={() => {
          approveForm10({
            variables: {
              orderId: orderId, // row.id => order.id
            }
          })
        }}
        loadingIconColor={Colors.blue}
        replaceTextWhenLoading={true}
        loading={loading}
        disabled={!readyForApproval}
        color="secondary"
        style={{
          width: '160px',
          height: '36px',
        }}
      >
        {
          readyForApproval
          ? "Approve Form 10"
          : alreadyApproved
            ? "Approved"
            : "Awaiting Seller"
        }
      </ButtonLoading>
      <ButtonLoading
        variant="outlined"
        className={classes.unapproveButton}
        onClick={() => {
          reviseAndResubmit({
            variables: {
              orderId: orderId, // row.id => order.id
            }
          })
        }}
        loadingIconColor={Colors.red}
        replaceTextWhenLoading={true}
        loading={reviseAndResubmitResponse.loading}
        disabled={!readyForApproval}
        color="secondary"
        style={{
          width: '150px',
          height: '36px',
        }}
      >
        Reject Form 10
      </ButtonLoading>
    </>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  orderId: string;
  orderStatus: string;
  refetchQueriesParams: {
    query: DocumentNode,
    variables?: {
      query?: any
      limit?: number
      offset?: number
    },
  }[];
  handleMutationUpdate?(
    cache: ApolloCache<MutData>,
    response: { data: MutData },
  ): void
}

interface MutData {
  approveForm10?: { order: OrderAdmin }
  reviseAndResubmitForm10?: { order: OrderAdmin }
}
interface MutVar {
  orderId: string; // row.id => order.id
}

const styles = (theme: Theme) => createStyles({
  approveButton: {
    height: '36px',
    margin: "0.5rem 0.5rem 0.5rem 0.5rem",
    background: "transparent",
    "&:hover": {
      backgroundColor: Colors.ultramarineBlueLight,
      border: `1px solid ${Colors.ultramarineBlueDark}`,
      color: Colors.cream,
    },
  },
  unapproveButton: {
    height: '36px',
    margin: "0.5rem 0.5rem 0.5rem 0rem",
    border: `1px solid ${Colors.red}`,
    background: "transparent",
    color: Colors.red,
    "&:hover": {
      backgroundColor: Colors.red,
      border: `1px solid ${Colors.darkerRed}`,
      color: Colors.cream,
    },
  },
});



export default withStyles(styles)( ApprovalButtons );