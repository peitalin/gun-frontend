import React from "react";
import clsx from "classnames";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import {
  User,
} from "typings/gqlTypes";
// Components
import OrdersExpiringTable from "./OrdersExpiringTable";




const OrdersExpiringList: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={clsx(classes.spaceBetween)}>
        <OrdersExpiringTable
          admin={props.admin}
        />
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  admin: User
}



const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: '1rem',
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
});


export default withStyles(styles)( OrdersExpiringList );