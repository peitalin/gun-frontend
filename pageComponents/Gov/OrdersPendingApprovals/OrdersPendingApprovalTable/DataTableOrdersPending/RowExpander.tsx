import React from 'react';
import clsx from 'clsx';
import { Colors } from 'layout/AppTheme';
import { makeStyles, fade } from '@material-ui/core/styles';
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

import Collapse from '@material-ui/core/Collapse';
import TableHead from '@material-ui/core/TableHead';
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import dayjs from 'dayjs';
import currency from 'currency.js';
import { customAlphabet } from 'nanoid'
const ID_ALPHABET = "123456789bcdfghjklmnpqrstvwxyz";
const ID_LENGTH = 8;
const nanoid = customAlphabet(ID_ALPHABET, ID_LENGTH)

// graphql
import { User, OrderStatus } from "typings/gqlTypes";
import { useMutation } from "@apollo/client";
import { DocumentNode } from "graphql";
import { APPROVE_FORM_10 } from "queries/orders-mutations";
import {
  GET_ORDERS_CREATED_CONNECTION,
  GET_ORDERS_PENDING_APPROVAL_CONNECTION,
  GET_ORDERS_ADMIN_APPROVED_CONNECTION,
} from "queries/orders-queries";





const RowExpander = (props: RowExpanderProps) => {

  const {
    row,
    admin,
    index,
  } = props;


  const [
    approveForm10,
    { data, loading, error }
  ] = useMutation<MutData, MutVar>(
    APPROVE_FORM_10, {
      refetchQueries: props.refetchQueriesParams
    }
  );

  const [open, setOpen] = React.useState(false);
  const [openImage, setOpenImage] = React.useState(false);

  const classes = useRowStyles();

  const asTime = (d: Date) => dayjs(d).format("YYYY-MM-DD HH:mm:ss")
  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()

  let form10 = option(row).form10();
  let form10Exists = !!option(form10).original.url();

  let readyForApproval = row.orderStatus === OrderStatus.FORM_10_SUBMITTED
  let alreadyApproved = (row.orderStatus as string) === OrderStatus.ADMIN_APPROVED
    || (row.orderStatus as string) === OrderStatus.ADMIN_APPROVED

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
        <TableCell align="right">{row.seller.email}</TableCell>
      </TableRow>
      <TableRow className={clsx(
        classes.hiddenRowRoot,
        open && isEvenRow && classes.backgroundGrey,
        open && !isEvenRow && classes.backgroundGrey2,
      )}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
            </div>


            <div className={classes.marginBox}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Actioned By</TableCell>
                    <TableCell align="right">Order Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {
                  row.history.map((historyRow, i) =>  {
                    return (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {asTime(historyRow.date)}
                        </TableCell>
                        <TableCell>{historyRow.approverEmail}</TableCell>
                        <TableCell align="right">{historyRow.orderStatus}</TableCell>
                      </TableRow>
                    )
                  })
                }
                </TableBody>
              </Table>
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
    margin: "1rem 0rem 2rem 0rem",
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
});



export default RowExpander;