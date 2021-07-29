import React from "react";
// Redux
import { GrandReduxState } from 'reduxStore/grand-reducer';
// Styles
import clsx from 'clsx';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "../styles";
import { Colors } from "layout/AppTheme";
// Modals
import { useDispatch, useSelector } from "react-redux";
// Router
import { useRouter, NextRouter } from "next/router";
import Hidden from 'components/HiddenFix';
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// DesktopMainBars
import DesktopMainBar from "./DesktopMainBar";
import MobileMainBar from "./MobileMainBar";
import { useScrollYPosition } from "utils/hooks";
import { Y_SCROLL_NAVBAR_SHOW } from "../constants";




const MainBar = (props: ReactProps) => {

  const { classes } = props;
  const router = useRouter()

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const {
    loggedIn,
  } = useSelector<GrandReduxState, ReduxProps>(state => ({
    loggedIn: !!state?.reduxLogin?.user?.id,
  }));

  const isDarkMode = theme.palette.type === 'dark'

  let _isMainPage = isMainPageFn(router)
  let _isSellPage = isSellPageFn(router)
  let _isStartPage = isStartPageFn(router)
  let _isFeaturedPage = isFeaturedPageFn(router)
  let _isDashboardPage = isDashboardPageFn(router)

  let color = isDarkMode
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

  return (
    <MainBarSSRWrapper
      classes={classes}
      isMainPage={_isMainPage}
      isStartPage={_isStartPage}
      isSellPage={_isSellPage}
      isFeaturedPage={_isFeaturedPage}
      isDashboardPage={_isDashboardPage}
      isMobile={mdDown}
      // for special fatter navbar on these routes
    >

      {/* MOBILE */}
      <Hidden className={classes.width100} xlUp implementation="css">
        <MobileMainBar
          // Dither
          mobileMenuOpen={props.mobileMenuOpen}
          setMobileMenuOpen={props.setMobileMenuOpen}
          isMainPage={_isMainPage}
          isStartPage={_isStartPage}
          isSellPage={_isSellPage}
          isFeaturedPage={_isFeaturedPage}
          isDashboardPage={_isDashboardPage}
          {...navBarProps}
        />
      </Hidden>

      {/* Desktop */}
      <Hidden className={classes.width100} only={["xs", "sm", "md", "lg"]} implementation="css">
        <DesktopMainBar
          isMainPage={_isMainPage}
          isStartPage={_isStartPage}
          isSellPage={_isSellPage}
          isFeaturedPage={_isFeaturedPage}
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
}
interface MainBarSSRWrapperProps extends WithStyles<typeof styles> {
  isMainPage: boolean
  isStartPage: boolean
  isSellPage: boolean
  isFeaturedPage: boolean
  isDashboardPage: boolean
  isMobile: boolean
}

interface ReduxProps {
  loggedIn: boolean;
}


export default withStyles(styles)( MainBar );
