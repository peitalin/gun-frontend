import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// TYpings
import { OrderStatus, Order } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// MUI
import Typography from "@mui/material/Typography";
// Icons
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
// Components
import DisplayOrderReceipt from "./DisplayOrderReceipt";
import DisplayOrderId from "./DisplayOrderId";
import OrderStatusStepper from "./OrderStatusStepper";
import OrderStatusStepperCancelled from "./OrderStatusStepperCancelled";
import OrderProductPreview from "./OrderProductPreview";
// theme
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";



const OrderDetailsPage: React.FC<ReactProps> = (props) => {

  const { classes, order } = props;

  const product = order.product;
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <ErrorBounds className={clsx(
      mdDown ? classes.rootMobile : classes.root,
      "fadeInFast",
    )}>

      {
        !props.disableTitle &&
        <div className={classes.closeIconButtonContainer}>
          {
            props.closeModal &&
            <IconButton
              className={classes.closeIcon}
              onClick={props.closeModal}
              size={"medium"}
            >
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
          <div className={classes.orderItemsContainer}>
            <DisplayOrderId order={props.order} />
          </div>
        </div>
      </div>

      {
        props.orderCancelled
        ? <OrderStatusStepperCancelled
            order={props.order}
          />
        : <OrderStatusStepper
            order={props.order}
          />
      }

    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  order: Order;
  orderCancelled: boolean;
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
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
    padding: '1rem',
    marginBottom: "0.5rem",
    borderRadius: BorderRadius,
    backgroundColor: theme.palette.mode === 'dark'
      ? theme.colors.uniswapMediumNavy
      : theme.colors.slateGrey,
    border: theme.palette.mode === 'dark'
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDarker}`,
  },
  closeIcon: {
    background: theme.palette.mode === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDarker,
    "&:hover": {
      background: theme.palette.mode === 'dark'
        ? Colors.uniswapMediumGrey
        : Colors.slateGreyDarkest,
    },
  },
  closeIconButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: '1rem',
    top: '1rem',
  },
});

export default withStyles(styles)( OrderDetailsPage );