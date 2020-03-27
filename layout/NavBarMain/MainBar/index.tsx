import * as React from "react";
import { oc as option } from "ts-optchain";
// Redux
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { Actions } from 'reduxStore/actions';
import { Cart } from "typings/gqlTypes";
// Styles
import clsx from 'clsx';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "../styles";
// Components
import Login from "layout/Login";
import Logo from "components/Icons/Logo";
import Badge from '@material-ui/core/Badge';
import Searchbar from "layout/NavBarMain/Searchbar";
// MUI
import UserMenu from "layout/NavBarMain/UserMenu";
import UserMenuMobile from "layout/NavBarMain/UserMenuMobile";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';
import SearchbarMobile from "layout/NavBarMain/SearchbarMobile";
// Modals
import { goToModalConnect } from "utils/modals";
import { useDispatch, useSelector } from "react-redux";
// Router
import Link from "next/link";
import { useRouter } from "next/router";
import { asCurrency as c } from "utils/prices";
import Hidden from '@material-ui/core/Hidden';
// DesktopMainBars
import DesktopMainBarXl from "./DesktopMainBarXl";
import DesktopMainBarLg from "./DesktopMainBarLg";
import DesktopMainBarMd from "./DesktopMainBarMd";
import DesktopMainBarSm from "./DesktopMainBarSm";
import MobileMainBarXs from "./MobileMainBarXs";




const MainBar = (props: ReactProps) => {

  const { classes } = props;
  const router = useRouter()
  const color = "#242424";

  const {
    cart,
    cartCount,
    subtotal,
    loggedIn,
  } = useSelector<GrandReduxState, ReduxProps>(state => ({
    // cart: state.reduxCart.cart,
    // cartCount: state.reduxCart.cart.items.length,
    // subtotal: state.reduxCart.cart.subtotal,
    cart: undefined,
    cartCount: 0,
    subtotal: 0,
    loggedIn: state.reduxLogin.loggedIn,
  }));

  const endRoute = router.pathname.split('/').pop();

  const navBarProps = {
    classes,
    endRoute,
    cartCount,
    loggedIn,
    color,
    subtotal,
  };

  const signOut = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  const onSignIn2 = (googleUser) => {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  React.useEffect(() => {
    if (process.browser) {
      if (window && window.gapi) {
        window.gapi.signin2.render('g-signin2', {
          'scope': 'https://www.googleapis.com/auth/plus.login',
          'width': 200,
          'height': 50,
          'longtitle': true,
          'theme': 'dark',
          'onsuccess': onSignIn2
        });
      }
    }
  }, [])


  return (
    <nav className={clsx(
      classes.baseBar,
    )}>

      {/* MOBILE */}
      <Hidden smUp implementation="css">
        <MobileMainBarXs
          // Dither
          mobileMenuOpen={props.mobileMenuOpen}
          setMobileMenuOpen={props.setMobileMenuOpen}
          {...navBarProps}
        />
      </Hidden>

      {/* Desktop */}
      <Hidden lgDown implementation="css">
        <DesktopMainBarXl
          {...navBarProps}
        />
      </Hidden>
      <Hidden only={["xs", "sm", "md", "xl"]} implementation="css">
        <DesktopMainBarLg
          {...navBarProps}
        />
      </Hidden>
      <Hidden only={["xs", "sm", "lg", "xl"]} implementation="css">
        <DesktopMainBarMd
          mobileMenuOpen={props.mobileMenuOpen}
          setMobileMenuOpen={props.setMobileMenuOpen}
          {...navBarProps}
        />
      </Hidden>
      <Hidden only={["xs", "md", "lg", "xl"]} implementation="css">
        <DesktopMainBarSm
          mobileMenuOpen={props.mobileMenuOpen}
          setMobileMenuOpen={props.setMobileMenuOpen}
          {...navBarProps}
        />
      </Hidden>

      <div className="g-signin2"
        // data-onsuccess="onSignIn"
        // data-onsuccess={onSignIn2}
      />
      <a href="#" onClick={signOut}>Sign out</a>
      <a href="#" onClick={onSignIn2}>On Sign In</a>

    </nav>
  );
};




interface ReactProps extends WithStyles<typeof styles> {
  mobileMenuOpen: boolean;
  setMobileMenuOpen(f: (s: boolean) => boolean): void;
}
interface MobileMainBarProps extends ReactProps {
  endRoute: string;
  cartCount: number;
  loggedIn: boolean;
  color: string;
  subtotal: number;
}

interface ReduxProps {
  cart?: Cart;
  loggedIn: boolean;
  cartCount: number;
  subtotal: number;
}


export default withStyles(styles)( MainBar );
