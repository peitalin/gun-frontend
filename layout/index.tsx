import React from 'react';
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import Header from "./Header";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Components
import NavBarMain from "./NavBarMain";
import { NavBarHeight } from "layout/NavBarMain/styles";
import Loading from "components/Loading";
import Footer from "./Footer";
import GetUser from "./GetUser";
import Modals from "./Modals";
// Typings
import { UserPrivate } from "typings/gqlTypes";
import ErrorBounds from "components/ErrorBounds";
import { Colors } from "layout/AppTheme";
//
import SideRoutesMenu from "pageComponents/SellerProfileDashboard/SideRoutesMenu";
import SellerDashboardMenu from "pageComponents/SellerProfileDashboard/SellerDashboardMenu";
//
import GovSideRoutesMenu from "pageComponents/Gov/GovSideRoutesMenu";
// Router
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";




const Layout: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const router = useRouter();
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  );

  const isSellerRoute = !!router.pathname.includes('/seller')
    && !!option(user).store.id()

  const isGovRoute = !!router.pathname.includes('/gov')

  //////////// Render Layout

  const renderLayout = () => {
    if (isSellerRoute) {
      if (!lgDown) {
        // desktop size
        return (
          <ErrorBounds className={classes.flexJustify}>
            <div className={clsx(classes.sellerPageContainer, "fadeIn")}>
              <div className={classes.minWidth240}>
                <SideRoutesMenu storePrivate={user.store} />
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
    } else if (isGovRoute) {
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
    } else {
      // return normal layout
      return <>{props.children}</>
    }
  }

  return (
    <>
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
    </>
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
    justifyContent: 'center',
    width: '100%',
  },
  pageOuterContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: '320px',
    minHeight: `calc(100vh - 140px)`,
    // offset 140px for navbar
  },
  pageInnerContainer: {
    minHeight: `calc(100vh - ${NavBarHeight}px)`,
    // offset for navbar
    maxWidth: '100%',
  },
  flexJustify: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
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


