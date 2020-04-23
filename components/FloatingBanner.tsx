import React from "react";
import {oc as option} from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import { NavBarHeight, CategoryBarHeightMobile, CategoryBarHeight } from "layout/NavBarMain/styles";
import clsx from "clsx";
// mui
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import Tick from "components/Icons/Tick";
import Portal from "@material-ui/core/Portal";
import { useRouter } from "next/router";



const FloatingBanner = (props: ReactProps) => {

  const {
    displaySuccess,
    setDisplaySuccess,
    classes,
    redirectRoute = '/seller',
    mdDown = false,
  } = props;

  const router = useRouter();

  return (
    <Portal>
      <div className={
        mdDown
          ? classes.purchaseSuccessBackgroundSm
          : classes.purchaseSuccessBackground
      }>
        <Typography variant="subtitle1"
          className={classes.purchaseSuccessText}
        >
          <Tick className={classes.tick}
            size={30}
            color={Colors.cream}
            outerCircleColor={Colors.cream}
            innerCircleColor={Colors.green}
          />
          {
            displaySuccess === "product" &&
            <span>Congratulations! Your product was created.</span>
          }
          {
            displaySuccess === "store" &&
            <span>Congratulations! Your store was created.</span>
          }
        </Typography>
        <IconButton
          style={{ marginLeft: '0.5rem' }}
          size="small"
          onClick={() => {
            setDisplaySuccess(undefined)
            router.push(redirectRoute)
          }}
        >
          <ClearIcon />
        </IconButton>
      </div>
    </Portal>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  displaySuccess: string,
  setDisplaySuccess(a?: any): void;
  mdDown?: boolean;
  redirectRoute?: string;
}



export const styles = (theme: Theme) => createStyles({
  purchaseSuccessText: {
    color: Colors.cream,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  purchaseSuccessBackground: {
    width: '100%',
    background: Colors.green,
    position: 'absolute',
    display: 'flex',
    top: NavBarHeight - 5,
    height: '6rem',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  purchaseSuccessBackgroundSm: {
    width: '100%',
    background: Colors.green,
    position: 'absolute',
    display: 'flex',
    paddingLeft: "1rem",
    top: NavBarHeight - CategoryBarHeight + CategoryBarHeightMobile - 5,
    height: '6rem',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tick: {
    marginRight: '0.5rem',
  },
});


export default withStyles(styles)( FloatingBanner );


