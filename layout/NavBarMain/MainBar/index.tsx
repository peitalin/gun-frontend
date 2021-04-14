import * as React from "react";
import { oc as option } from "ts-optchain";
// Redux
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { Actions } from 'reduxStore/actions';
// Styles
import clsx from 'clsx';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "../styles";
import { Colors } from "layout/AppTheme";
// Modals
import { goToModalConnect } from "utils/modals";
import { useDispatch, useSelector } from "react-redux";
// Router
import Link from "next/link";
import { useRouter, NextRouter } from "next/router";
import Hidden from 'components/HiddenFix';
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// DesktopMainBars
import DesktopMainBarXl from "./DesktopMainBarXl";
import DesktopMainBarLg from "./DesktopMainBarLg";
import DesktopMainBarMd from "./DesktopMainBarMd";
import DesktopMainBarSm from "./DesktopMainBarSm";
import MobileMainBarXs from "./MobileMainBarXs";



const MainBar = (props: ReactProps) => {

  const { classes } = props;
  const router = useRouter()

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const {
    darkMode,
    loggedIn,
  } = useSelector<GrandReduxState, ReduxProps>(state => ({
    darkMode: state?.reduxLogin?.darkMode,
    loggedIn: !!state?.reduxLogin?.user?.id,
  }));
  // console.log("router.pathname: ", router.pathname)

  const color = isMainPages(router)
    ? Colors.cream
    : darkMode === 'dark'
      ? Colors.slateGrey
      : Colors.black

  const endRoute = router.pathname.split('/').pop();

  const navBarProps = {
    classes,
    endRoute,
    loggedIn,
    isDarkMode: darkMode === 'dark',
    color,
  };

  let isHomePage = isMainPages(router)

  return (
    <nav className={
      isHomePage
      ? clsx(
          classes.baseBarHomePage,
          smDown
            ? classes.baseBarDitherSm
            : classes.baseBarDither
        )
      : clsx(
          classes.baseBarDashboard,
          classes.baseBarBorderBottom
        )
    }>

      {/* MOBILE */}
      <Hidden className={classes.width100} mdUp implementation="css">
        <MobileMainBarXs
          // Dither
          mobileMenuOpen={props.mobileMenuOpen}
          setMobileMenuOpen={props.setMobileMenuOpen}
          {...navBarProps}
        />
      </Hidden>

      {/* Desktop */}
      <Hidden className={classes.width100} lgDown implementation="css">
        <DesktopMainBarXl
          {...navBarProps}
        />
      </Hidden>
      <Hidden className={classes.width100} only={["xs", "sm", "md", "xl"]} implementation="css">
        <DesktopMainBarLg
          {...navBarProps}
        />
      </Hidden>
      <Hidden className={classes.width100} only={["xs", "sm", "lg", "xl"]} implementation="css">
        <DesktopMainBarMd
          mobileMenuOpen={props.mobileMenuOpen}
          setMobileMenuOpen={props.setMobileMenuOpen}
          {...navBarProps}
        />
      </Hidden>
      {/* <Hidden className={classes.width100} only={["xs", "md", "lg", "xl"]} implementation="css"> <DesktopMainBarSm
          mobileMenuOpen={props.mobileMenuOpen}
          setMobileMenuOpen={props.setMobileMenuOpen}
          {...navBarProps}
        />
      </Hidden> */}

    </nav>
  );
};



export const isMainPages = (router: NextRouter) => {
  if (router.pathname === '/') {
    return true
  }
  if (router.pathname === '/sell') {
    return true
  }
  if (router.pathname === '/start') {
    return true
  }
  return false
}

interface ReactProps extends WithStyles<typeof styles> {
  mobileMenuOpen: boolean;
  setMobileMenuOpen(f: (s: boolean) => boolean): void;
}

interface ReduxProps {
  loggedIn: boolean;
  darkMode: "dark"|"light";
}


export default withStyles(styles)( MainBar );
