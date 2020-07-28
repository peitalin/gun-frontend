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
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import { Order } from "typings/gqlTypes";
// Components
import DisplayOrderReceipt from "./DisplayOrderReceipt";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import OrderProductPreview from "./OrderProductPreview";
import { OrderItem } from "typings/gqlTypes";



const OrderDetailsPage: React.FC<ReactProps> = (props) => {

  const { classes, order } = props;
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))

  // const priceSelect = centsToDollarSelector(price);
  // const priceWasSelect = centsToDollarSelector(priceWas);

  return (
    <ErrorBounds className={clsx(
      xsDown ? classes.rootMobile : classes.root,
      "fadeInFast",
    )}>

      {
        !props.disableTitle &&
        <div className={clsx(
          classes.flexRow,
          classes.orderTitle,
          classes.spaceBetween
        )}>
          <Typography color={"primary"} variant={'h4'}>
            Order Details
          </Typography>
          {
            props.closeModal &&
            <IconButton onClick={props.closeModal}>
              <ClearIcon/>
            </IconButton>
          }
        </div>
      }

      <div className={classes.flexRowWrap}>
        <div className={classes.flexCol440}>
          <DisplayOrderReceipt order={props.order} />
        </div>
        <div className={classes.flexCol440}>
          <div className={classes.orderItemsContainer}>
            <OrderProductPreview product={order.product}/>
          </div>
        </div>
      </div>

    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  order: Order;
  closeModal?(): void;
  disableTitle?: boolean;
}

const styles = (theme: Theme) => createStyles({
  root: {
    padding: '2rem',
  },
  rootMobile: {
    padding: '1rem',
    paddingTop: '2rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexCol440: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: '50%',
    maxWidth: 440,
    minWidth: 330,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexRowWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  orderItemsContainer: {
    marginLeft: '0.5rem',
    padding: '1rem',
    boxShadow: "0px 3px 8px -4px rgba(22,22,22,0.2)",
    // border: '1px solid #eaeaea',
    borderRadius: "4px",
    marginBottom: "0.5rem",
    backgroundColor: '#FCFCFE',
  },
  orderTitle: {
    marginBottom: '2rem',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
});

export default withStyles(styles)( OrderDetailsPage );