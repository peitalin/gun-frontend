import React from "react";
// Styles
import clsx from 'clsx';
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import { styles } from "../styles";
import { Colors } from "layout/AppTheme";
// Modals
import { useDispatch, useSelector } from "react-redux";
import { UserPrivate } from "typings/gqlTypes"
// Router
import { useRouter, NextRouter } from "next/router";
import Hidden from 'components/HiddenFix';
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
// media query
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
// DesktopMainBars
import DesktopMainBar from "./DesktopMainBar";
import MobileMainBar from "./MobileMainBar";
import { useScrollYPosition } from "utils/hooks";
import { Y_SCROLL_NAVBAR_SHOW } from "../constants";




const MainBar = (props: ReactProps) => {

  const { classes, user } = props;
  const router = useRouter()

  const theme = useTheme();

  const isDarkMode = theme.palette.mode === 'dark'

  let color = isDarkMode
    ? Colors.slateGrey
    : Colors.black

  const endRoute = router.pathname.split('/').pop();

  const navBarProps = {
    classes,
    endRoute,
    isDarkMode,
    color,
  };

  return (
    <MainBarSSRWrapper
      classes={classes}
      isMainPage={props.isMainPage}
      isStartPage={props.isStartPage}
      isSellPage={props.isSellPage}
      isFeaturedPage={props.isFeaturedPage}
      isMobile={props.isMobile}
      // for special fatter navbar on these routes
    >

      {/* MOBILE */}
      <Hidden className={classes.width100} xlUp implementation="css">
        <MobileMainBar
          mobileMenuOpen={props.mobileMenuOpen}
          setMobileMenuOpen={props.setMobileMenuOpen}
          isDashboardPage={props.isDashboardPage}
          user={user}
          {...navBarProps}
        />
      </Hidden>

      {/* Desktop */}
      <Hidden className={classes.width100} only={["xs", "sm", "md", "lg"]} implementation="css">
        <DesktopMainBar
          isMainPage={props.isMainPage}
          isStartPage={props.isStartPage}
          isSellPage={props.isSellPage}
          isFeaturedPage={props.isFeaturedPage}
          user={user}
          {...navBarProps}
        />
      </Hidden>

    </MainBarSSRWrapper>
  );
};


const MainBarSSRWrapper: React.FC<MainBarSSRWrapperProps> = (props) => {

  let { classes } = props;

  const [priorY, setPriorY] = React.useState(0)
  const [hideBar, setHideBar] = React.useState(
    (props.isStartPage || props.isFeaturedPage)
    // hide navbar initially on these pages
  )

  let y = useScrollYPosition(0)
  // console.log('y', y)

  React.useEffect(() => {
    if (
      y < priorY
    ) {
      // scrolling up, show navbar
      setHideBar(false)
    } else if (y > Y_SCROLL_NAVBAR_SHOW) {
      // scrolling down, hide navbar
      setHideBar(true)
    }
    setPriorY(y)
  }, [y])

  return (
    <>
      <ShowOnMobileOrDesktopSSR desktop>
        <nav className={
          props.isMainPage || props.isStartPage || props.isFeaturedPage
          ? clsx(
              classes.baseBarHomePage,
              hideBar && classes.baseBarHidden,
            )
          : clsx(classes.baseBarDashboard)
        }>
          {props.children}
        </nav>
      </ShowOnMobileOrDesktopSSR>
      <ShowOnMobileOrDesktopSSR mobile>
        <nav className={
          (props.isMainPage || (props.isStartPage && props.isMobile))
          ? clsx(classes.baseBarHomePage, classes.baseBarPaddingMobile)
          : props.isStartPage || props.isFeaturedPage
            ? clsx(classes.baseBarHomePage)
            : clsx(classes.baseBarDashboard)
        }>
          {props.children}
        </nav>
      </ShowOnMobileOrDesktopSSR>
    </>
  );
};

export const isMainPageFn = (router: NextRouter) => {
  if (router.pathname === '/') {
    return true
  }
  if (router.pathname === '/trending') {
    return true
  }
  return false
}
export const isSellPageFn = (router: NextRouter) => {
  if (router.pathname === '/sell') {
    return true
  }
  return false
}
export const isStartPageFn = (router: NextRouter) => {
  if (router.pathname === '/start') {
    return true
  }
  if (router.pathname === '/qr1') {
    return true
  }
  return false
}
export const isFeaturedPageFn = (router: NextRouter) => {
  if (router.pathname.startsWith('/f/')) {
    return true
  }
  return false
}
export const isDashboardPageFn = (router: NextRouter) => {
  if (router.pathname.startsWith('/admin')) {
    return true
  }
  if (router.pathname.startsWith('/dealer')) {
    return true
  }
  if (router.pathname.startsWith('/gov')) {
    return true
  }
  return false
}



interface ReactProps extends WithStyles<typeof styles> {
  mobileMenuOpen: boolean;
  setMobileMenuOpen(f: (s: boolean) => boolean): void;
  user: UserPrivate
  isMainPage: boolean
  isStartPage: boolean
  isSellPage: boolean
  isFeaturedPage: boolean
  isDashboardPage: boolean
  isMobile: boolean
}
interface MainBarSSRWrapperProps extends WithStyles<typeof styles> {
  isMainPage: boolean
  isStartPage: boolean
  isSellPage: boolean
  isFeaturedPage: boolean
  isMobile: boolean
}


export default withStyles(styles)( MainBar );
