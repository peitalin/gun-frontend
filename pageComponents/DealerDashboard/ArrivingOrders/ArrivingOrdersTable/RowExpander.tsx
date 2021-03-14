import React from 'react';
import clsx from 'clsx';
import { Colors, BoxShadows } from 'layout/AppTheme';
import { fade, lighten, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { createDataForArrivingOrdersTable } from "./createData";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import ButtonLoading from "components/ButtonLoading";

import Collapse from '@material-ui/core/Collapse';
import TableHead from '@material-ui/core/TableHead';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Form10PreviewCard from "pageComponents/MyOrders/Form10FileUploader/Form10PreviewCard";

// Snackbar
import { useSnackbar } from "notistack";
// router
import Link from "next/link";

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
      <div className={clsx(
        classes.rowExpanderRoot,
        open && isEvenRow && classes.backgroundGrey,
        open && !isEvenRow && classes.backgroundGrey2,
      )}>
        <div>
          <IconButton aria-label="expand row"
            size="medium"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </div>
        <div className={classes.flexItemTiny}>
          {row.id}
        </div>
        <div className={classes.flexItemSlim}>{formatDate(row.createdAt)}</div>
        <div className={classes.flexItemTiny}>{c(row.total)}</div>
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
      </div>
      <div className={clsx(
        classes.hiddenRowRoot,
        open && isEvenRow && classes.backgroundGrey,
        open && !isEvenRow && classes.backgroundGrey2,
      )}>
        <div style={{ padding: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>

            <div className={classes.marginBox}>

              <div className={classes.userDetailsBox}>
                <Typography variant="h6" component="div">
                  Seller Details
                </Typography>
                <div className={classes.userDetailsRow}>
                  <Typography className={classes.userDetailsHeader} variant="body1">
                    Name:
                  </Typography>
                  <Typography className={classes.userDetailsInfo} variant="body1">
                    {`${row?.sellerStore?.user?.firstName} ${row?.sellerStore?.user?.lastName}`}
                  </Typography>
                </div>
                <div className={classes.userDetailsRow}>
                  <Typography className={classes.userDetailsHeader} variant="body1">
                    Email:
                  </Typography>
                  <Typography className={classes.userDetailsInfo} variant="body1">
                    {row?.sellerStore?.user?.email}
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
                    {`${row?.buyer?.firstName} ${row?.buyer?.lastName}`}
                  </Typography>
                </div>
                <div className={classes.userDetailsRow}>
                  <Typography className={classes.userDetailsHeader} variant="body1">
                    Email:
                  </Typography>
                  <Typography className={classes.userDetailsInfo} variant="body1">
                    {row?.buyer?.email ?? "-"}
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
                    Email:
                  </Typography>
                  <Typography className={classes.userDetailsInfo} variant="body1">
                    {dealer?.user?.email ?? "-"}
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
              </div>

              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <div className={classes.userDetailsRow}>
                <Typography className={classes.orderDetailsHeader} variant="body1">
                  Stripe Payment Intent Status:
                </Typography>
                <Typography className={classes.orderDetailsInfo} variant="body1">
                  {row?.paymentIntentStatus}
                </Typography>
              </div>
              <div className={classes.userDetailsRow}>
                <Typography className={classes.orderDetailsHeader} variant="body1">
                  Stripe Payment Intent ID:
                </Typography>
                <Typography className={classes.orderDetailsInfoBottom} variant="body1">
                  {row?.paymentIntentId}
                </Typography>
              </div>

              <div>
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
              </div>

              {
                showApprovalButtons &&
                <>
                  <ButtonLoading
                    variant="outlined"
                    className={classes.approveButton}
                    onClick={() => {
                      approveForm10({
                        variables: {
                          orderId: row.id, // row.id => order.id
                        }
                      })
                    }}
                    loadingIconColor={Colors.blue}
                    replaceTextWhenLoading={true}
                    loading={loading}
                    disabled={!readyForApproval}
                    color="secondary"
                    style={{
                      width: '150px',
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
                          orderId: row.id, // row.id => order.id
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
              }
            </div>


            <div className={classes.tTable} >
              <div>
                <div className={classes.headerRow}>
                  <div className={classes.headerCell1}>Date</div>
                  <div className={classes.headerCell2}>Actioned By</div>
                  <div className={classes.headerCell3}>Order Status</div>
                </div>
              </div>
              <div className={classes.scrollableTable}>
                {
                  row.history.map((historyRow, i) =>  {

                    return (
                      <div key={i} className={clsx(
                        classes.bodyRow,
                        (i % 2 === 0)
                          ? classes.backEven
                          : classes.backOdd,
                      )}>
                        <div className={classes.bodyCell1}>
                          {formatDate(historyRow.date)}
                        </div>
                        <div className={classes.bodyCell2}>
                          {historyRow.approverEmail}
                        </div>
                        <div className={classes.bodyCell3}>
                          {
                            historyRow.orderStatus
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>

          </Collapse>
        </div>
      </div>
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
  rowExpanderRoot: {
    width: "100%",
    display: "flex",
    color: theme.palette.type === "dark"
      ? theme.colors.uniswapLightestGrey
      : theme.colors.uniswapDarkNavy,
    flexDirection: "row",
    backgroundColor: theme.palette.type === 'dark'
      ? lighten(Colors.uniswapGreyNavy, 0.01)
      : lighten(Colors.slateGrey, 0.01),
    '& > *': {
      borderBottom: 'unset',
    },
  },
  hiddenRowRoot: {
    backgroundColor: theme.palette.type === 'dark'
      ? lighten(Colors.uniswapGreyNavy, 0.01)
      : lighten(Colors.slateGrey, 0.01),
  },
  backgroundGrey: {
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDark,
  },
  backgroundGrey2: {
    backgroundColor: theme.palette.type === 'dark'
      ? fade(Colors.uniswapGrey, 0.7)
      : Colors.slateGreyDarker,
  },
  marginBox: {
    margin: "1rem 1rem 2rem 1rem",
  },
  marginBox2: {
    margin: "1rem 1rem 0rem 1rem",
  },
  cardMediaWide: {
    objectFit: "scale-down",
    width: '100%',
    height: '100%',
  },
  form10Button: {
    margin: "0.5rem 0rem",
  },
  viewOrderButton: {
    margin: "0.5rem 0rem",
    marginLeft: "0.5rem",
  },
  approveButton: {
    height: '36px',
    margin: "0.5rem 0.5rem 0.5rem 0.5rem",
  },
  unapproveButton: {
    height: '36px',
    margin: "0.5rem 0.5rem 0.5rem 0rem",
    border: `1px solid ${Colors.red}`,
    color: Colors.red,
    "&:hover": {
      backgroundColor: Colors.pink,
      border: `1px solid ${Colors.darkerRed}`,
      color: Colors.cream,
    },
  },

  // scrollable table
  scrollableTable: {
    overflow: "scroll",
    maxHeight: 300,
  },
  tTable: {
    borderBottom: theme.palette.type === 'dark'
      ? `4px solid ${Colors.uniswapLightNavy}`
      : `4px solid ${Colors.slateGreyDarkest}`,
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.uniswapMediumGrey,
    color: Colors.cream,
    boxShadow: BoxShadows.shadow1.boxShadow,
  },
  headerCell1: {
    flexBasis: '25%',
    flexGrow: 1,
    padding: '0.25rem 0.5rem',
    fontWeight: 600,
    fontSize: '14px',
  },
  headerCell2: {
    flexBasis: '30%',
    flexGrow: 1,
    padding: '0.25rem 0.5rem',
    fontWeight: 600,
    fontSize: '14px',
  },
  headerCell3: {
    flexBasis: '45%',
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: '0.25rem 0.5rem',
    fontWeight: 600,
    fontSize: '14px',
  },
  bodyRow: {
    display: "flex",
    flexDirection: "row",
  },
  bodyCell1: {
    flexBasis: '25%',
    flexGrow: 1,
    padding: '0.25rem 0.5rem 0.25rem 0.5rem',
    fontSize: '0.825rem',
  },
  bodyCell2: {
    flexBasis: '30%',
    flexGrow: 1,
    padding: '0.25rem 0.5rem 0.25rem 0.5rem',
    fontSize: '0.825rem',
  },
  bodyCell3: {
    flexBasis: '45%',
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: '0.25rem 0.5rem 0.25rem 0.5rem',
    fontSize: '0.825rem',
  },
  backOdd: {
    backgroundColor: Colors.slateGreyDark,
    color: theme.palette.type === 'dark'
      ? Colors.charcoal
      : Colors.charcoal,
    "&:hover": {
      backgroundColor: Colors.slateGreyDarker,
      color: Colors.black,
    },
  },
  backEven: {
    backgroundColor: Colors.slateGrey,
    color: theme.palette.type === 'dark'
      ? Colors.charcoal
      : Colors.charcoal,
    "&:hover": {
      backgroundColor: Colors.slateGreyDarker,
      color: Colors.black,
    },
  },
  flexItemWide: {
    flexBasis: "30%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'flex-start',
    paddingRight: '0.5rem',
    marginRight: '0.5rem',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    flexGrow: 1,
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
  subtitle: {
    fontWeight: 600,
    fontSize: '0.825rem',
    textTransform: "capitalize",
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
    width: '70px',
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
  generateForm10Text: {
  },
});



export default withStyles(styles)( RowExpander );