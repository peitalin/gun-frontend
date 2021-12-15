import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors } from "layout/AppTheme";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// MUI
import Typography from "@mui/material/Typography";
// Components
import { Order } from "typings/gqlTypes";
import Link from "next/link";



const DisplayOrderId: React.FC<ReactProps> = (props) => {

  const { classes, order } = props;
  const product = order.product;

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
          {
            !!product?.sellerLicense?.id &&
            <div className={classes.flexItem1}>
              <Typography variant="subtitle2" className={classes.subHeading}>
                Seller License
              </Typography>
              <Link
                href="/s/[storeId]"
                as={`/s/${product?.store?.id}`}
              >
                <a>
                  <Typography className={classes.storeName} variant="body2">
                    {product.sellerLicense.licenseNumber}
                  </Typography>
                </a>
              </Link>
            </div>
          }
        </div>
      </div>

    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  order: Order;
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
  storeName: {
    fontWeight: 500,
    color: theme.palette.mode === 'dark'
      ? theme.colors.uniswapLighterGrey
      : theme.colors.uniswapDarkNavy,
    marginBottom: "0.25rem",
    "&:hover": {
      color: Colors.lightBlue,
    },
  },
});

export default withStyles(styles)( DisplayOrderId );