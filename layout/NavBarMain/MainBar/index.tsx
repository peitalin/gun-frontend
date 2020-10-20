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
// Components
import Login from "layout/Login";
import Logo from "components/Icons/Logo";
import Badge from '@material-ui/core/Badge';
import Searchbar from "layout/NavBarMain/Searchbar";
// MUI
import UserMenu from "layout/NavBarMain/UserMenu";
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
  const color = Colors.uniswapLighterGrey;

  const {
    cartCount,
    subtotal,
    loggedIn,
  } = useSelector<GrandReduxState, ReduxProps>(state => ({
    // cart: state.reduxCart.cart,
    // cartCount: state.reduxCart.cart.items.length,
    // subtotal: state.reduxCart.cart.subtotal,
    cartCount: 0,
    subtotal: 0,
    loggedIn: option(state).reduxLogin.user.id(),
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
  loggedIn: boolean;
  cartCount: number;
  subtotal: number;
}


export default withStyles(styles)( MainBar );
