import React from 'react';
import clsx from 'clsx';
import { Colors, BoxShadows } from 'layout/AppTheme';
import { fade, lighten, createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { oc as option } from "ts-optchain";

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { createData } from "./createData";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import ButtonLoading from "components/ButtonLoading";
import Tooltip from '@material-ui/core/Tooltip';

import Collapse from '@material-ui/core/Collapse';
import TableHead from '@material-ui/core/TableHead';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { formatDate } from "utils/dates";
import currency from 'currency.js';

// graphql
import { User, OrderStatus, OrderMutationResponse } from "typings/gqlTypes";
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



const RowExpander = (props: RowExpanderProps) => {

  const {
    row,
    admin,
    index,
    initialOpen = false,
    showApprovalButtons = true,
    classes,
  } = props;

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

  let form10 = option(row).form10();
  let form10Exists = !!option(form10).original.url();

  let isEvenRow = index % 2 === 0

  let phoneNumber = !!row?.seller?.user?.phoneNumber?.number
    ? `${row?.seller?.user?.phoneNumber?.countryCode} ${row?.seller?.user?.phoneNumber?.number}`
    : "NA"

  let canOrderBeCancelled = canBeCancelled(row.orderStatus)

  console.log("createdAt: ", new Date(row.createdAt))
  let expiryDate = get7DaysFromDate(new Date(row.createdAt))

  let countDown = getCountdownForExpiry({
    expiryDate: expiryDate
  })

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
        <div className={classes.flexItemSlim}>{countDown}</div>
        <div className={classes.flexItemTiny}>{c(row.total)}</div>
        <div className={classes.flexItemSlim}>
          {
            row.orderStatus?.length > 22
            ? row.orderStatus.slice(0, 22) + '..'
            : row.orderStatus
          }
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

              <div className={classes.sellerDetailsBox}>
                <Typography variant="h6" component="div">
                  Seller Details
                </Typography>
                <div className={classes.sellerDetailsRow}>
                  <Typography className={classes.sellerDetailsHeader} variant="body1">
                    Email:
                  </Typography>
                  <Typography className={classes.sellerDetailsInfo} variant="body1">
                    {row?.seller?.user?.email}
                  </Typography>
                </div>
                <div className={classes.sellerDetailsRow}>
                  <Typography className={classes.sellerDetailsHeader} variant="body1">
                    Phone:
                  </Typography>
                  <Typography className={classes.sellerDetailsInfo} variant="body1">
                    {phoneNumber}
                  </Typography>
                </div>
              </div>

              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              {
                form10Exists &&
                <Dialog
                  open={openImage}
                  onClose={() => setOpenImage(false)}
                  // fullWidth={true}
                  // fullScreen={true}
                  scroll={'body'}
                >
                  <CardMedia
                    component="img"
                    classes={{
                      media: classes.cardMediaWide
                    }}
                    onClick={() => setOpenImage(false)}
                    image={row?.form10?.original?.url}
                  />
                </Dialog>
              }

              <div className={classes.buttonContainer}>

                <Button
                  variant="outlined"
                  className={classes.form10Button}
                  disabled={!form10Exists}
                  onClick={() => setOpenImage(true)}
                >
                  {
                    form10Exists
                    ? "Show Form 10"
                    : "Waiting on Form 10"
                  }
                </Button>

                <ButtonLoading
                  variant="outlined"
                  className={classes.cancelButton}
                  onClick={() => {
                    makeCancelledPayment({
                      orderId: row.id,
                      markProductAbandoned: markAbandoned,
                    })
                  }}
                  loadingIconColor={Colors.blue}
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
                {/* <Typography className={classes.cancelButtonCaption} variant="caption">
                  This will cancel the order and payment hold
                </Typography> */}

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
  row: ReturnType<typeof createData>
  admin: User
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
  adminApproverId: string;
}
interface MutData3 {
  cancelOrderAndPayment: OrderMutationResponse;
}
interface MutVar3 {
  orderId: string;
  markProductAbandoned?: boolean;
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
  cancelButton: {
    height: '36px',
  },
  cancelButtonCaption: {
    width: 240,
    marginTop: "0.25rem",
    textAlign: "center",
    color: theme.colors.uniswapLighterGrey,
  },
  uncancelButton: {
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
      ? Colors.slateGreyDarkest
      : Colors.charcoal,
    "&:hover": {
      backgroundColor: Colors.slateGreyDarker,
      color: Colors.black,
    },
  },
  backEven: {
    backgroundColor: Colors.slateGrey,
    color: theme.palette.type === 'dark'
      ? Colors.slateGreyDarkest
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
  sellerDetailsBox: {
    marginBottom: '1rem',
  },
  sellerDetailsRow: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
  },
  sellerDetailsHeader: {
    width: '60px',
    fontWeight: 400,
    fontSize: "14px",
  },
  sellerDetailsInfo: {
    fontWeight: 400,
    fontSize: "14px",
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});



export default withStyles(styles)( RowExpander );