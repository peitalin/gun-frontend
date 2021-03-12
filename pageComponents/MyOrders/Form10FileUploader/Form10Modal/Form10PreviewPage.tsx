import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius, BoxShadows } from "layout/AppTheme";
// TYpings
import { OrderStatus, Order } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// MUI
import Typography from "@material-ui/core/Typography";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
// theme
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const OrderDetailsPage: React.FC<ReactProps> = (props) => {

  const { classes, order } = props;

  const product = order.product;
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'))

  // const priceSelect = centsToDollarSelector(price);
  // const priceWasSelect = centsToDollarSelector(priceWas);

  let form10FileId = order?.currentSnapshot?.form10File?.id;
  let form10Url = `https://storage.googleapis.com/develop-gunmarketplace-files/${form10FileId}`

  return (
    <ErrorBounds className={clsx(
      xsDown ? classes.rootMobile : classes.root,
      "fadeInFast",
    )}>

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

      <div className={classes.flexRowWrap}>

        <embed src={form10Url}
          width="100%"
          height="100%"
        />
      </div>

    </ErrorBounds>
  );
}


interface ReactProps extends WithStyles<typeof styles> {
  order: Order;
  closeModal?(): void;
}

const styles = (theme: Theme) => createStyles({
  root: {
    padding: '2rem',
    width: '100%',
    height: '100%',
  },
  rootMobile: {
    padding: '1rem',
    paddingTop: '2rem',
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
    width: '100%',
    height: '100%',
  },
  closeIcon: {
    background: theme.palette.type === 'dark'
      ? Colors.uniswapGrey
      : Colors.slateGreyDarker,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? Colors.uniswapMediumGrey
        : Colors.slateGreyDarkest,
    },
  },
  closeIconButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: '0.5rem',
    top: '0.5rem',
  },
});

export default withStyles(styles)( OrderDetailsPage );