import React from "react";
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
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
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
    loggedIn,
  } = useSelector<GrandReduxState, ReduxProps>(state => ({
    loggedIn: !!state?.reduxLogin?.user?.id,
  }));
  // console.log("router.pathname: ", router.pathname)

  const isDarkMode = theme.palette.type === 'dark'

  const color = isMainPages(router)
    ? Colors.cream
    : isDarkMode
      ? Colors.slateGrey
      : Colors.black

  const endRoute = router.pathname.split('/').pop();

  const navBarProps = {
    classes,
    endRoute,
    loggedIn,
    isDarkMode,
    color,
  };

  let isMainPages2 = isMainPages(router)
  let isStartPage2 = isStartPage(router)

  return (
    <MainBarSSRWrapper
      classes={classes}
      mainPage={isMainPages2}
      startPage={isStartPage2}
      // for special fatter navbar on these routes
    >

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

    </MainBarSSRWrapper>
  );
};


const MainBarSSRWrapper: React.FC<MainBarSSRWrapperProps> = (props) => {

  let { classes } = props;

  return (
    <>
      <ShowOnMobileOrDesktopSSR desktop>
        <nav className={
          props.mainPage
          ? clsx( classes.baseBarHomePage, classes.baseBarDither)
          : props.startPage
            ? clsx( classes.baseBarHomePage, classes.baseBarDitherNone)
            : clsx( classes.baseBarDashboard, classes.baseBarBorderBottom)
        }>
          {props.children}
        </nav>
      </ShowOnMobileOrDesktopSSR>
      <ShowOnMobileOrDesktopSSR mobile>
        <nav className={
          props.mainPage
          ? clsx( classes.baseBarHomePage, classes.baseBarDitherSm)
          : props.startPage
            ? clsx( classes.baseBarHomePage, classes.baseBarDitherNoneSm)
            : clsx( classes.baseBarDashboard, classes.baseBarBorderBottom)
        }>
          {props.children}
        </nav>
      </ShowOnMobileOrDesktopSSR>
    </>
  );
};

export const isMainPages = (router: NextRouter) => {
  if (router.pathname === '/') {
    return true
  }
  if (router.pathname === '/sell') {
    return true
  }
  // if (router.pathname === '/start') {
  //   return true
  // }
  return false
}
export const isStartPage = (router: NextRouter) => {
  if (router.pathname === '/start') {
    return true
  }
  return false
}



interface ReactProps extends WithStyles<typeof styles> {
  mobileMenuOpen: boolean;
  setMobileMenuOpen(f: (s: boolean) => boolean): void;
}
interface MainBarSSRWrapperProps extends WithStyles<typeof styles> {
  mainPage: boolean
  startPage: boolean
}

interface ReduxProps {
  loggedIn: boolean;
}


export default withStyles(styles)( MainBar );
