import React from 'react';
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import Header from "./Header";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Components
import NavBarMain from "./NavBarMain";
import { NavBarHeight } from "layout/NavBarMain/styles";
import Footer from "./Footer";
import GetUser from "./GetUser";
import Modals from "./Modals";
// Typings
import { UserPrivate } from "typings/gqlTypes";
import ErrorBounds from "components/ErrorBounds";
import { Colors, Gradients } from "layout/AppTheme";
//
import SellersSideRoutesMenu from "pageComponents/SellerDashboard/SellersSideRoutesMenu";
import SellerDashboardMenu from "pageComponents/SellerDashboard/SellerDashboardMenu";
//
import GovSideRoutesMenu from "pageComponents/Gov/GovSideRoutesMenu";
import DealersSideRoutesMenu from "pageComponents/DealerDashboard/DealersSideRoutesMenu";
// Router
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import StripeProvider from "layout/StripeProvider";




const Layout: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const router = useRouter();
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  );

  const isSellerRoute = !!router.pathname.includes('/admin')
    && !!option(user).store.id()

  const isGovernanceRoute = !!router.pathname.startsWith('/gov')

  const isDealerRoute = !!router.pathname.startsWith('/dealers')

  //////////// Render Layout

  const renderLayout = () => {
    if (isSellerRoute) {
      if (!lgDown) {
        // desktop size
        return (
          <ErrorBounds className={classes.flexJustify}>
            <div className={clsx(classes.sellerPageContainer, "fadeIn")}>
              <div className={classes.minWidth240}>
                <SellersSideRoutesMenu
                  user={user}
                />
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
          <ErrorBounds className={clsx(classes.sellerPageContainer, "fadeIn")}>
            <div className={classes.rootMobileSellerDashboard}>
              {
                // mobile, seller dashboard menu
                isSellerRoute &&
                lgDown &&
                <SellerDashboardMenu storePrivate={user.store} />
              }
              {props.children}
            </div>
          </ErrorBounds>
        )
      }
    } else if (isGovernanceRoute) {
      return (
        <ErrorBounds className={classes.flexJustify}>
          <div className={clsx(classes.govPageContainer, "fadeIn")}>
            <div className={classes.minWidth240}>
              <GovSideRoutesMenu />
            </div>
            <div className={classes.flex75}>
              {props.children}
            </div>
          </div>
        </ErrorBounds>
      )
    } else if (isDealerRoute) {
      return (
        <ErrorBounds className={classes.flexJustify}>
          <div className={clsx(classes.govPageContainer, "fadeIn")}>
            <div className={classes.minWidth240}>
              <DealersSideRoutesMenu />
            </div>
            <div className={classes.flex75}>
              {props.children}
            </div>
          </div>
        </ErrorBounds>
      )
    } else {
      // return normal layout
      return <>{props.children}</>
    }
  }

  return (
    <StripeProvider>
      <Header/>
      <NavBarMain />
      <GetUser/>
      <Modals/>
      <PageContainer classes={props.classes}>
        { renderLayout() }
      </PageContainer>
      <Footer>
        {/* <BreadcrumbRoutes dark/> */}
      </Footer>
    </StripeProvider>
  )
};


const PageContainer: React.FC<PageContainerProps> = (props) => {
  return (
    <div className={props.classes.pageOuterContainer}>
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
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  rootMobileSellerDashboard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
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
  pageInnerContainer: {
    minHeight: `calc(100vh - ${NavBarHeight}px)`,
    // offset for navbar
    maxWidth: '100%',
    marginBottom: "4rem",
  },
  flexJustify: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
  },
  sellerPageContainer: {
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
  govPageContainer: {
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


