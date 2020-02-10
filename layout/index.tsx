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
// Stripe
import StripeAsyncProvider from "components/StripeAsyncProvider";
import ErrorBounds from "components/ErrorBounds";
import { Colors } from "layout/AppTheme";
// import SideRoutesMenu from "pageComponents/SellerProfileDashboard/SideRoutesMenu";
// import SellerDashboardMenu from "pageComponents/SellerProfileDashboard/SellerDashboardMenu";
// Router
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { AuthInterface } from "pageComponents/Auth0";
// media query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";




const LayoutIfBrowser: React.FC<ReactProps> = (props) => {
  return (
    <ErrorBounds className="async-provider">
      <Layout classes={props.classes} auth={props.auth}>
        {
          option(props).auth() &&
          <>
            <div style={{ height: '100px', width: '10px' }}></div>
            <button onClick={() => {
              props.auth.login()
              props.auth.handleAuthentication()
              console.log("logging in...")
              console.log(localStorage)
            }}>
              login auth0
            </button>
            <button onClick={() => {
              console.log("logging out...", props.auth)
              props.auth.logout()
              console.log(localStorage)
            }}>
              logout auth0
            </button>
          </>
        }
        {props.children}
      </Layout>
    </ErrorBounds>
  )
  // if (process.browser) {
  //   return (
  //     <StripeAsyncProvider>
  //       <Layout classes={props.classes}>
  //         {props.children}
  //       </Layout>
  //     </StripeAsyncProvider>
  //   )
  // } else {
  //   // wrap in an extra <div> to match <div> in StripeAsyncProvider above
  //   return (
  //     <ErrorBounds className="async-provider">
  //       <Layout classes={props.classes}>
  //         {props.children}
  //       </Layout>
  //     </ErrorBounds>
  //   )
  // }
}


const Layout: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const router = useRouter();
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  );

  const renderLayout = () => {

    if (!router.pathname.includes('/seller')) {
      // return normal layout
      return <>{props.children}</>
    }

    if (router.pathname.includes('/seller') && option(user).store()) {
      if (!lgDown) {
        // desktop size
        return (
          <ErrorBounds className={classes.flexJustify}>
            <div className={clsx(classes.pageContainer, "fadeIn")}>
              {/* <SideRoutesMenu storePrivate={user.store} /> */}
              {props.children}
            </div>
          </ErrorBounds>
        )
      } else {
        // mobile size
        return (
          <ErrorBounds className={clsx(
            "fadeIn",
            classes.pageContainer,
          )}>
            <div className={classes.rootMobile}>
              {/* <SellerDashboardMenu storePrivate={user.store} /> */}
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

  return (
    <div>
      <Header/>
      <NavBarMain/>
      {/* <GetUser/> */}
      <Modals/>
      <PageContainer classes={props.classes}>
        { renderLayout() }
      </PageContainer>
      <Footer/>
    </div>
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
  auth: AuthInterface;
}
interface PageContainerProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  rootMobile: {
    display: 'flex',
    flexDirection: 'row',
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
  pageContainer: {
    minHeight: `calc(100vh - ${NavBarHeight}px)`,
    maxWidth: 1000,
    width: '100%',
    opacity: 1,
    position: 'relative',
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
});

export default withStyles(styles)( LayoutIfBrowser );


