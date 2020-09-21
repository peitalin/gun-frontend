import React from 'react';
import clsx from 'clsx';
import { Colors, BoxShadows } from 'layout/AppTheme';
import { makeStyles, fade, lighten } from '@material-ui/core/styles';
import { oc as option } from "ts-optchain";
// table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { createData } from "./createData";

import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import ButtonLoading from "components/ButtonLoading";
import TextInput from "components/Fields/TextInput2"

import Collapse from '@material-ui/core/Collapse';
import TableHead from '@material-ui/core/TableHead';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import dayjs from 'dayjs';
import currency from 'currency.js';

// graphql
import { User, OrderStatus, Orders } from "typings/gqlTypes";
import { useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";
import { APPROVE_FORM_10, MARK_PAYOUT_AS_PAID } from "queries/orders-mutations";





const RowExpander = (props: RowExpanderProps) => {

  const {
    row,
    admin,
    index,
  } = props;


  const [approveForm10, { data, loading, error }] = useMutation<MutData, MutVar>(
    APPROVE_FORM_10,
    {
      refetchQueries: props.refetchQueriesParams
    }
  );

  const [
    markPayoutsAsPaid,
    markPayoutsAsPaidResponse
  ] = useMutation<MutData2, MutVar2>(
    MARK_PAYOUT_AS_PAID,
    {
      refetchQueries: props.refetchQueriesParams
    },
  );

  const [open, setOpen] = React.useState(false);
  const [openImage, setOpenImage] = React.useState(false);
  const [payoutId, setPayoutId] = React.useState(undefined);

  const classes = useRowStyles();

  const asTime = (d: Date) => dayjs(d).format("YYYY-MM-DD HH:mm:ss")
  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()

  let form10 = option(row).form10();
  let form10Exists = !!option(form10).original.url();

  let readyForApproval = row.orderStatus === OrderStatus.FORM_10_SUBMITTED
  let alreadyApproved = (row.orderStatus as string) === OrderStatus.ADMIN_APPROVED

  let isEvenRow = index % 2 === 0

  return (
    <>
      <TableRow className={clsx(
        classes.rowExpanderRoot,
        open && isEvenRow && classes.backgroundGrey,
        open && !isEvenRow && classes.backgroundGrey2,
      )}>
        <TableCell>
          <IconButton aria-label="expand row"
            size="medium"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{asTime(row.createdAt)}</TableCell>
        <TableCell align="right">{c(row.total)}</TableCell>
        <TableCell align="right">{row.orderStatus}</TableCell>
        <TableCell align="right">{option(row).seller.user.email()}</TableCell>
      </TableRow>
      <TableRow className={clsx(
        classes.hiddenRowRoot,
        open && isEvenRow && classes.backgroundGrey,
        open && !isEvenRow && classes.backgroundGrey2,
      )}>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>

            <div className={classes.marginBox}>
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
                    image={option(row).form10.original.url()}
                  />
                </Dialog>
              }
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
                className={classes.approveButton}
                onClick={() => {
                  approveForm10({
                    variables: {
                      orderId: row.id, // row.id => order.id
                      adminApproverId: admin.id, // row.id => order.id
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
                  height: 'unset',
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
              <div className={classes.addPayoutIdBox}>
                <TextInput
                  placeholder={"Enter Westpac payout ID"}
                  value={payoutId}
                  onChange={(e) => setPayoutId(e.target.value)}
                  inputProps={{
                    root: {
                      width: '90%',
                    },
                    style: {
                      width: '100%',
                      height: "19px",
                      borderRadius: "4px 0 0 4px",
                      borderRight: 'none',
                    }
                  }}
                />
                <ButtonLoading
                  variant="outlined"
                  className={classes.approveButton}
                  onClick={() => {
                    markPayoutsAsPaid({
                      variables: {
                        orderIds: [row.id],
                        payoutId: payoutId,
                      }
                    })
                  }}
                  loadingIconColor={Colors.blue}
                  replaceTextWhenLoading={true}
                  loading={markPayoutsAsPaidResponse.loading}
                  // disabled={!readyForApproval}
                  color="secondary"
                  style={{
                    width: '200px',
                    height: '36px',
                  }}
                >
                  Mark Payout Paid
                </ButtonLoading>
                </div>
              {`Payout ID: ${row.payoutId}`}
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
                          {asTime(historyRow.date)}
                        </div>
                        <div className={classes.bodyCell2}>
                          {historyRow.approverEmail}
                        </div>
                        <div className={classes.bodyCell3}>
                          {historyRow.orderStatus}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>

          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}


interface RowExpanderProps {
  row: ReturnType<typeof createData>
  admin: User
  index?: number
  refetchQueriesParams?: {
    query: DocumentNode,
    variables: {
      limit: number
      offset: number
    },
  }[];
}

interface MutData {
}
interface MutVar {
  orderId: string; // row.id => order.id
  adminApproverId: string;
}
interface MutData2 {
  orders: Orders[]
}
interface MutVar2 {
  orderIds: string[];
  payoutId: string;
}

const useRowStyles = makeStyles({
  rowExpanderRoot: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  hiddenRowRoot: {
  },
  backgroundGrey: {
    backgroundColor: Colors.slateGrey,
  },
  backgroundGrey2: {
    backgroundColor: fade(Colors.slateGrey, 0.7),
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
    backgroundColor: Colors.foregroundColor,
  },
  approveButton: {
    margin: "0.5rem 0.5rem 0.5rem 0.5rem",
    backgroundColor: Colors.foregroundColor,
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
    // backgroundColor: Colors.slateGreyDark,
    backgroundColor: Colors.slateGreyDarker,
    boxShadow: BoxShadows.shadow1.boxShadow,
    // borderBottom: `1px solid ${Colors.slateGreyDarker}`,
  },
  headerCell1: {
    flexBasis: '25%',
    flexGrow: 1,
    padding: '0.25rem 0.5rem',
    fontWeight: 600,
  },
  headerCell2: {
    flexBasis: '30%',
    flexGrow: 1,
    padding: '0.25rem 0.5rem',
    fontWeight: 600,
  },
  headerCell3: {
    flexBasis: '45%',
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: '0.25rem 0.5rem',
    fontWeight: 600,
  },
  bodyRow: {
    display: "flex",
    flexDirection: "row",
  },
  bodyCell1: {
    flexBasis: '25%',
    flexGrow: 1,
    padding: '0.25rem 0.5rem 0.25rem 0.5rem',
  },
  bodyCell2: {
    flexBasis: '30%',
    flexGrow: 1,
    padding: '0.25rem 0.5rem 0.25rem 0.5rem',
  },
  bodyCell3: {
    flexBasis: '45%',
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: '0.25rem 0.5rem 0.25rem 0.5rem',
  },
  backOdd: {
    backgroundColor: Colors.slateGreyDark,
    color: Colors.slateGreyDarkest,
    "&:hover": {
      backgroundColor: Colors.slateGreyDarker,
      color: Colors.black,
    },
  },
  backEven: {
    backgroundColor: Colors.slateGrey,
    color: Colors.slateGreyDarkest,
    "&:hover": {
      backgroundColor: Colors.slateGreyDarker,
      color: Colors.black,
    },
  },
  addPayoutIdBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});



export default RowExpander;