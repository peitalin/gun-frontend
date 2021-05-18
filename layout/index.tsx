import React from 'react';
import clsx from "clsx";
import Header from "./Header";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Components
import NavBarMain from "./NavBarMain";
import { NavBarHeight } from "layout/NavBarMain/styles";
import Footer from "./Footer";
import GetUser from "./GetUser";
import GlobalModals from "./GlobalModals";
// Typings
import { UserPrivate } from "typings/gqlTypes";
import ErrorBounds from "components/ErrorBounds";
import { Colors, Gradients } from "layout/AppTheme";
//
import SellersSideRoutesMenu from "pageComponents/SellerDashboard/SellersSideRoutesMenu";
import SellerDashboardMobileMenu from "pageComponents/SellerDashboard/SellerDashboardMobileMenu";
//
import GovSideRoutesMenu from "pageComponents/Gov/GovSideRoutesMenu";
import GovDashboardMobileMenu from "pageComponents/Gov/GovDashboardMobileMenu";

import DealersSideRoutesMenu from "pageComponents/DealerDashboard/DealersSideRoutesMenu";
import DealerDashboardMobileMenu from "pageComponents/DealerDashboard/DealerDashboardMobileMenu";

import HelpSideRoutesMenu from "pageComponents/Help/HelpSideRoutesMenu";
import HelpDashboardMobileMenu from "pageComponents/Help/HelpDashboardMobileMenu";
// Router
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import StripeProvider from "layout/StripeProvider";
import { NewsBarHeight, MainBarHeightDashboard } from "./NavBarMain/styles";





const Layout: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const router = useRouter();
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  );

  const isSellerRoute = !!router.pathname.includes('/admin')
    && !!user?.store?.id

  const isGovernanceRoute = !!router.pathname.startsWith('/gov')

  const isDealerRoute = !!router.pathname.startsWith('/dealers')

  const isHelpRoute = !!router.pathname.startsWith('/help')

  //////////// Render Layout

  const renderLayout = () => {
    if (isSellerRoute) {

      if (!lgDown) {
        // desktop size
        return (
          <ErrorBounds className={classes.flexJustify}>
            <div className={clsx(classes.dashboardContainer, "fadeIn")}>
              <div className={classes.minWidth240}>
                <SellersSideRoutesMenu user={user} />
              </div>
              <div className={classes.flex75}>
                {props.children}
              </div>
            </div>
          </ErrorBounds>
        )
      } else {
        // mobile size
        return (
          <ErrorBounds className={clsx(classes.dashboardContainer, "fadeIn")}>
            <div className={classes.dashboardInnerContainerMobile}>
              {
                // mobile, seller dashboard menu
                lgDown &&
                <SellerDashboardMobileMenu storePrivate={user.store} />
              }
              {props.children}
            </div>
          </ErrorBounds>
        )
      }

    } else if (isGovernanceRoute) {

      if (!lgDown) {
        // desktop size
        return (
          <ErrorBounds className={classes.flexJustify}>
            <div className={clsx(classes.dashboardContainer, "fadeIn")}>
              <div className={classes.minWidth240}>
                <GovSideRoutesMenu user={user} />
              </div>
              <div className={classes.flex75}>
                {props.children}
              </div>
            </div>
          </ErrorBounds>
        )
      } else {
        // mobile size
        return (
          <ErrorBounds className={clsx(classes.dashboardContainer, "fadeIn")}>
            <div className={classes.dashboardInnerContainerMobile}>
              {
                // mobile, dashboard menu
                lgDown && <GovDashboardMobileMenu />
              }
              {props.children}
            </div>
          </ErrorBounds>
        )
      }

    } else if (isDealerRoute) {

      if (!lgDown) {
        // desktop size
        return (
          <ErrorBounds className={classes.flexJustify}>
            <div className={clsx(classes.dashboardContainer, "fadeIn")}>
              <div className={classes.minWidth240}>
                <DealersSideRoutesMenu user={user} />
              </div>
              <div className={classes.flex75}>
                {props.children}
              </div>
            </div>
          </ErrorBounds>
        )
      } else {
        // mobile size
        return (
          <ErrorBounds className={clsx(classes.dashboardContainer, "fadeIn")}>
            <div className={classes.dashboardInnerContainerMobile}>
              {
                // mobile, seller dashboard menu
                lgDown && <DealerDashboardMobileMenu user={user} />
              }
              {props.children}
            </div>
          </ErrorBounds>
        )
      }

    } else if (isHelpRoute) {

      if (!lgDown) {
        // desktop size
        return (
          <ErrorBounds className={classes.flexJustify}>
            <div className={clsx(classes.dashboardContainer, "fadeIn")}>
              <div className={classes.minWidth240}>
                <HelpSideRoutesMenu/>
              </div>
              <div className={classes.flex75}>
                {props.children}
              </div>
            </div>
          </ErrorBounds>
        )
      } else {
        // mobile size
        return (
          <ErrorBounds className={clsx(classes.dashboardContainer, "fadeIn")}>
            <div className={classes.dashboardInnerContainerMobile}>
              {
                // mobile, help dashboard menu
                lgDown && <HelpDashboardMobileMenu />
              }
              {props.children}
            </div>
          </ErrorBounds>
        )
      }

    } else {
      // return normal layout
      return <>{props.children}</>
    }
  }


  let showChatWoot = (
    router.pathname === "/"
    || router.pathname.startsWith("/p/")
    || router.pathname === "/sell"
    || router.pathname === "/orders"
  ) ? true : false

  let needsNavbarPadding = router.pathname !== "/"
    && router.pathname !== "/start"
    && router.pathname !== "/sell"

  // console.log("showChatWood: ", showChatWoot)

  return (
    <StripeProvider>
      <Header
        showChatwoot={showChatWoot}
      />
      <NavBarMain/>
      <GetUser/>
      <GlobalModals/>
      <PageContainer
        classes={props.classes}
        needsNavbarPadding={needsNavbarPadding}
      >
        { renderLayout() }
      </PageContainer>
      <Footer/>
    </StripeProvider>
  )
};


const PageContainer: React.FC<PageContainerProps> = (props) => {
  return (
    <div className={clsx(
      props.classes.pageOuterContainer,
      props.needsNavbarPadding && props.classes.navbarPaddingTop,
    )}>
      <div className={props.classes.pageInnerContainer}>
        {props.children}
      </div>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  // user: UserPrivate;
}
interface PageContainerProps extends WithStyles<typeof styles> {
  needsNavbarPadding: boolean
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  dashboardInnerContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: '3rem', // account for dropdown mobileMenu bar
  },
  pageOuterContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: '320px',
    minHeight: `calc(100vh - 140px)`,
    // background: theme.gradients.gradientUniswapDark.background,
    background: theme.palette.type === "dark"
      ? theme.gradients.gradientUniswapDark.background
      : theme.gradients.gradientGrey3.background,
    // offset 140px for navbar
  },
  navbarPaddingTop: {
    paddingTop: MainBarHeightDashboard,
  },
  pageInnerContainer: {
    position: 'relative',
    minHeight: `calc(100vh - ${NavBarHeight}px)`,
    // offset for navbar
    maxWidth: '100%',
    // marginBottom: "4rem",
  },
  flexJustify: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
  },
  dashboardContainer: {
    position: 'relative',
    minHeight: `calc(100vh - ${NavBarHeight}px)`,
    maxWidth: 1200,
    width: '100%',
    opacity: 1,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    // background: Gradients.gradientUniswapDark.background,
  },
  minWidth240: {
    width: 240,
  },
  flex75: {
    width: 'calc(100% - 240px)',
    flexGrow: 1,
  },
});

export default withStyles(styles)( Layout );


