import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";

// redux
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { useSelector, useDispatch } from "react-redux";

// Utils Components
import Tick from "components/Icons/Tick";
// MUI
import Typography from "@material-ui/core/Typography";
// Subcomponents
import { UserPrivate } from "typings/gqlTypes";
import IconButtonCancel from "components/IconButtonCancel";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
export const MY_DOWNLOADS_PAGINATION_COUNT = 10;
import Link from "next/link";



const CovidBanner = (props) => {

  const {
    classes,
  } = props;

  const [showCovidBanner, setShowCovidBanner] = React.useState(true);

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))

  const isDarkMode = useSelector<GrandReduxState, boolean>(
    s => s.reduxLogin.darkMode === 'dark'
  );

  const colorBg = isDarkMode
    ? Gradients.gradientUniswapFluro.color1
    : Gradients.gradientUniswapBlueGreen.color1

  if (!showCovidBanner) {
    return <div></div>
  }

  return (
    <div
      className={clsx(
        smDown ? classes.padding05 : classes.padding2,
        classes.cookiesAgreementRoot,
        !showCovidBanner && classes.hideBanner
      )}
      style={{
        background: isDarkMode
          ? Gradients.gradientUniswapFluro.background
          : Gradients.gradientUniswapBlueGreen.background,
        position: "relative",
        zIndex: 1,
      }}
    >
      {
        (smDown && showCovidBanner) &&
        <Typography variant="subtitle1"
          className={clsx(
            smDown ? classes.maxWidthSm : classes.maxWidthLg,
            classes.purchaseSuccessText
          )}
        >
          <Tick className={classes.tick}
            size={30}
            color={Colors.cream}
            outerCircleColor={Colors.cream}
            innerCircleColor={colorBg}
          />
          <span>
            We're currently in beta testing. Please join our Discord
            for more updates on our launch.
            <Link href={"https://discord.gg/umAdYtsa9v"}>
              <a style={{ textDecoration: 'underline', color: Colors.white }}>here.</a>
            </Link>
          </span>
        </Typography>
      }
      {
        (!smDown && showCovidBanner) &&
        <Typography variant="subtitle1"
          className={clsx(
            smDown ? classes.maxWidthSm : classes.maxWidthLg,
            classes.purchaseSuccessText
          )}
        >
          <Tick
            className={classes.tick}
            size={30}
            color={Colors.cream}
            outerCircleColor={Colors.cream}
            innerCircleColor={colorBg}
          />
          <span>
            We're currently in beta testing. Please join our Discord
            for more updates on our launch.
            <Link href={"https://discord.gg/umAdYtsa9v"}>
              <a style={{ textDecoration: 'underline', color: Colors.white }}>here.</a>
            </Link>
          </span>
        </Typography>
      }
      {
        showCovidBanner &&
        <IconButtonCancel
          onClick={() => setShowCovidBanner(false)}
        />
      }
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  covid?: boolean;
}

const styles = (theme: Theme) => createStyles({
  cookiesAgreementRoot: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
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
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: "400ms",
    }),
  },
  padding2: {
    padding: '2rem',
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.sharp,
      duration: "400ms",
    }),
  },
  padding05: {
    padding: '0.75rem',
    transition: theme.transitions.create('padding', {
      easing: theme.transitions.easing.sharp,
      duration: "400ms",
    }),
  },
  maxWidthSm: {
    maxWidth: '340px',
    lineHeight: '1.33rem',
  },
  maxWidthLg: {
    maxWidth: '460px',
    lineHeight: '1.33rem',
  },
  tick: {
    marginRight: '0.5rem',
  },
  hideBanner: {
    padding: 0,
    height: 0,
    transition: theme.transitions.create(['height', 'padding'], {
      easing: theme.transitions.easing.sharp,
      duration: "400ms",
    }),
  }
});


export default withStyles(styles)(CovidBanner);
