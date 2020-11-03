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
// Modals
import { goToModalConnect } from "utils/modals";
import { useDispatch, useSelector } from "react-redux";
// Router
import Link from "next/link";
import { useRouter } from "next/router";
import Hidden from 'components/HiddenFix';
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
  const color = Colors.uniswapLighterGrey;

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

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
      lgDown ? classes.baseBarBorderBottom : classes.baseBarBoxShadow
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
