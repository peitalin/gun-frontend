import React from "react";
import clsx from "classnames";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import {
  User,
} from "typings/gqlTypes";
// Graphql
import Loading from 'components/Loading';
// Components
import OrdersPendingApprovalTable from "./OrdersPendingApprovalTable";
// formatters
import dayjs from 'dayjs';
import currency from "currency.js";





const OrdersPendingApprovals: React.FC<ReactProps> = (props) => {

  const { classes } = props;

  const d = new Date();
  // get current month + year
  const [month, setMonth] = React.useState<any>(d.getMonth() + 1);
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



const styles = (theme: Theme) => createStyles({
  root: {
    // padding: '4rem 2rem 2rem 2rem',
    marginBottom: '1rem',
    // borderRadius: '2px',
    // border: '1px solid #eaeaea',
    // backgroundColor: Colors.foregroundColor,
    // boxShadow: '0px 1px 1px 0 #e6ebf1',
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
});


export default withStyles(styles)( OrdersPendingApprovals );