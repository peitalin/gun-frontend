import * as React from "react";
import { oc as option } from "ts-optchain";
import clsx from "classnames";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// MUI
import Typography from "@material-ui/core/Typography";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import Layout from "layout";

import {
  PayoutItem,
  PayoutStatus,
  Connection, ConnectionQuery, Edge,
  StoreSales,
  Payout,
  ID,
  Transactions,
  User,
} from "typings/gqlTypes";
// Graphql
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import {
  GET_PAYOUTS_IN_PERIOD_ADMIN,
} from "queries/payouts-queries";
import {
  CREATE_PAYOUTS,
  APPROVE_PAYOUTS,
} from "queries/payouts-mutations";
import Loading from 'components/Loading';
import SnackBarA from "components/Snackbars/SnackbarA";
// Components
import OrdersPendingApprovalTable from "./OrdersPendingApprovalTable";
// formatters
import dayjs from 'dayjs';
import currency from "currency.js";





const OrdersPendingApprovals: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const c = (s) => currency(s/100, { formatWithSymbol: true }).format()
  const asTime = (d: Date) => dayjs(d).format("YYYY-MM-DD")

  const d = new Date();
  // get current month + year
  const [month, setMonth] = React.useState<any>(d.getMonth());
  const [year, setYear] = React.useState<any>(d.getUTCFullYear());

  const [isLoading, setIsLoading] = React.useState(false);


  return (
    <div className={classes.root}>
      <div className={clsx(classes.spaceBetween)}>

        <OrdersPendingApprovalTable
          month={month}
          year={year}
          admin={props.admin}
        />

        <Loading fixed loading={isLoading} delay={'200ms'}/>

      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  admin: User
}

interface MutationData {
  createPayouts: Payout[];
}
interface MutationVar {
  month: number;
  year: number;
  query?: ConnectionQuery;
}

interface MutationData2 {
  approvePayouts: {
    approvedPayouts: Payout[];
    payoutsAlreadyApproved: Payout[];
  }
}
interface MutationVar2 {
  payoutIds: ID[];
  query?: ConnectionQuery;
}



const styles = (theme: Theme) => createStyles({
  root: {
    // padding: '4rem 2rem 2rem 2rem',
    marginBottom: '1rem',
    // borderRadius: '2px',
    // border: '1px solid #eaeaea',
    // backgroundColor: Colors.foregroundColor,
    // boxShadow: '0px 1px 1px 0 #e6ebf1',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '0.5rem',
  },
  flexRowStart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '0.5rem',
  },
  flexItem: {
    flexGrow: 0.5,
    flexBasis: "33%",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  link: {
    fontFamily: '"Helvetica Neue",Arial,sans-serif',
    fontSize: "0.8rem",
    color: "#2484FF",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  width100: {
    width: '100%',
  },
  dateInputContainer: {
    margin: '1rem',
    maxWidth: 600,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
  },
  monthSelect: {
    padding: '1rem',
  },
  yearSelect: {
    padding: '1rem',
  },
  createPayoutsButton: {
    height: 40,
  },
});


export default withStyles(styles)( OrdersPendingApprovals );