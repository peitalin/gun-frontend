import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import {
  UserPrivate,
} from "typings/gqlTypes";
// Components
import OrdersExpiringTable from "./OrdersExpiringTable";




const OrdersExpiringList: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.spaceBetween}>
        <OrdersExpiringTable
          admin={props.admin}
        />
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  admin: UserPrivate
}



const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: '1rem',
    padding: '0rem 1rem 2rem 1rem',
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
});


export default withStyles(styles)( OrdersExpiringList );