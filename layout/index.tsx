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
// Stripe
import StripeProvider from "layout/StripeProvider";
import ErrorBounds from "components/ErrorBounds";
import { Colors } from "layout/AppTheme";
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

  return (
    <StripeProvider>
      <Header/>
      <NavBarMain/>
      <GetUser/>
      <Modals/>
      <PageContainer classes={props.classes}>
      <>{props.children}</>
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

export default withStyles(styles)( Layout );


