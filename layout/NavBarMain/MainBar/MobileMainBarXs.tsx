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
import Logo from "components/Icons/Logo";
import Badge from '@material-ui/core/Badge';
// MUI
import UserMenuMobile from "layout/NavBarMain/UserMenuMobile";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchbarMobile from "layout/NavBarMain/SearchbarMobile";
// Modals
import { goToModalConnect } from "utils/modals";
import { useDispatch, useSelector } from "react-redux";
// Router
import Link from "next/link";
import { useRouter } from "next/router";



const MobileMainBar = (props: MobileMainBarProps) => {

  const {
    classes,
    endRoute,
    cartCount,
    loggedIn,
    color,
    subtotal,
  } = props;

  const dispatch = useDispatch();
  const goToModal = goToModalConnect(dispatch);
  const router = useRouter()
  const [hide, setHide] = React.useState(false)

  return (
    <div className={classes.baseBarInnerMobile}>

      <div className={clsx(
        classes.mainBarInner,
        hide ? "displayNone" : "fadeIn"
      )}>
        <div className={classes.navbarButtonMobile}>
          <UserMenuMobile
            loggedIn={loggedIn}
            mobileMenuOpen={props.mobileMenuOpen}
            setMobileMenuOpen={props.setMobileMenuOpen}
          />
        </div>
      </div>


      <div className={clsx(
        classes.mainBarInner,
        hide ? "displayNone" : "fadeIn"
      )}>
        <Button
          className={clsx(
            classes.navbarButtonMobile,
            endRoute === 'create-product' ? classes.navbarButtonSelected : null,
          )}
          variant="text"
          color="primary"
          onClick={() => router.push('/create-product')}
        >
          <span className={
            endRoute === 'create-product' ? classes.selectedRouteText : null
          }>
            Sell
          </span>
        </Button>

        <Link href="/">
          <a className={classes.logoMobile}>
            <Logo color={color}/>
          </a>
        </Link>
      </div>


      <div style={{ marginLeft: '0.5rem' }} className={
        !hide ? "fadeIn" : null
      }>
        <SearchbarMobile
          color={color}
          mobileMenuOpen={props.mobileMenuOpen}
          setMobileMenuOpen={props.setMobileMenuOpen}
          setHideMenuItems={setHide}
        />
      </div>

      <div className={clsx(
        classes.mainBarInner,
        hide ? "displayNone" : "fadeIn"
      )}>
        <Button
          className={classes.navbarButtonMobile}
          variant="text"
          color="primary"
          onClick={() => {
            router.push("/checkout")
          }}
        >
          <Badge
            badgeContent={cartCount}
            classes={{ colorSecondary: classes.badge }}
            color="secondary"
          >
            <ShoppingCartIcon className={classes.icons}/>
          </Badge>
        </Button>
      </div>
    </div>
  )
}


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
  cart: Cart;
  loggedIn: boolean;
  cartCount: number;
  subtotal: number;
}


export default withStyles(styles)( MobileMainBar );
