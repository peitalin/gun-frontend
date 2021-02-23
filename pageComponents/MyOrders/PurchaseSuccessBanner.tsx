import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";

// redux
import { useSelector, useDispatch } from "react-redux";

// Utils Components
import Tick from "components/Icons/Tick";
// MUI
import Typography from "@material-ui/core/Typography";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
export const MY_DOWNLOADS_PAGINATION_COUNT = 10;
// Next
import dynamic from "next/dynamic";
// router
import { useRouter } from "next/router";
// Analytics
import { useAnalytics } from "utils/analytics";



const PurchaseSuccessBanner = (props) => {

  const {
    classes,
  } = props;

  // const claimOrders = useSelector<GrandReduxState, Order[]>(
  //   s => s.reduxPayment.claimOrders
  // );

  const dispatch = useDispatch();

  // const clearOrder = () => {
  //   dispatch(Actions.reduxPayment.RESET_CLAIM_ORDERS())
  // };

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))


  return (
    <div className={clsx(
      smDown ? classes.padding05 : classes.padding2,
      classes.purchaseSuccessBackground,
    )}>
      {
        smDown
        ? <Typography variant="subtitle1"
            className={clsx(
              smDown ? classes.maxWidthSm : classes.maxWidthLg,
              classes.purchaseSuccessText
            )}
          >
            <Tick className={classes.tick}
              size={30}
              color={Colors.cream}
              outerCircleColor={Colors.cream}
              innerCircleColor={Colors.green}
            />
            Congratulations!
            You can now download your files below.
          </Typography>
        : <Typography variant="subtitle1"
            className={clsx(
              smDown ? classes.maxWidthSm : classes.maxWidthLg,
              classes.purchaseSuccessText
            )}
          >
            <Tick className={classes.tick}
              size={30}
              color={Colors.cream}
              outerCircleColor={Colors.cream}
              innerCircleColor={Colors.green}
            />
            Congratulations! Your purchase was successful.
            You can now download your files below.
          </Typography>
      }
      <IconButton
        // onClick={clearOrder}
        className={classes.clearButton}
        classes={{
          root: classes.iconButtonRoot
        }}
      >
        <ClearIcon classes={{
          root: classes.iconButtonSvg
        }}/>
      </IconButton>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  title: {
    marginBottom: '2rem',
    marginTop: '2rem',
  },
  purchaseSuccessText: {
    color: Colors.cream,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  padding2: {
    padding: '2rem',
  },
  padding05: {
    padding: '0.75rem',
  },
  maxWidthSm: {
    maxWidth: '340px',
    lineHeight: '1.33rem',
  },
  maxWidthLg: {
    maxWidth: '460px',
    lineHeight: '1.33rem',
  },
  purchaseSuccessBackground: {
    width: '100%',
    background: Colors.green,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tick: {
    marginRight: '0.5rem',
  },
  clearButton: {
    position: "absolute",
    right: "1rem",
  },
  iconButtonRoot: {
    "&:hover": {
      backgroundColor: "rgba(250, 250, 250, 0.14)",
    }
  },
  iconButtonSvg: {
    fill: "#fafafa",
  },
});


export default withStyles(styles)(PurchaseSuccessBanner);
