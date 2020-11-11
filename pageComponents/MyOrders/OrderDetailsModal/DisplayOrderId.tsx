import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// MUI
import Typography from "@material-ui/core/Typography";
// Components
import { Orders } from "typings/gqlTypes";
// Icons
import LockIcon from "@material-ui/icons/Lock";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
// Components
import { asCurrency as c } from "utils/prices";
import Divider from "components/Divider";



const DisplayOrderId: React.FC<ReactProps> = (props) => {

  const { classes, order } = props;

  return (
    <ErrorBounds>

      <div className={classes.root}>
        <div className={classes.flexRow}>
          <div className={classes.flexItem1}>
            <Typography variant="subtitle2" className={classes.subHeading}>
              Order Date
            </Typography>
            <Typography variant="body1" className={classes.bodyText}>
              {new Date(order.createdAt).toDateString()}
            </Typography>
          </div>
          <div className={classes.flexItem1}>
            <Typography variant="subtitle2" className={classes.subHeading}>
              Order ID
            </Typography>
            <Typography variant="body1" className={classes.bodyText}>
              {order.id}
            </Typography>
          </div>
          <div className={classes.flexItem1}>
            <Typography variant="subtitle2" className={classes.subHeading}>
              Seller/Store
            </Typography>
            <Typography variant="body1" className={classes.bodyText}>
              {order?.product?.store?.user?.email ?? "NA"}
            </Typography>
          </div>
        </div>
      </div>

    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  order: Orders;
}

const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: "0.3rem",
  },
  title: {
    marginBottom: '0.5rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexCol400: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: '50%',
    maxWidth: 400,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  flexItem1: {
    flexGrow: 0.75,
    flexBasis: '75%',
  },
  subHeading: {
    fontWeight: 600,
    marginTop: '0.5rem',
  },
  bodyText: {
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
  },
});

export default withStyles(styles)( DisplayOrderId );