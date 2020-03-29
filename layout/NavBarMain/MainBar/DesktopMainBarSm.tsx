import React from "react";
import { oc as option } from "ts-optchain";
// Redux
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { Actions } from 'reduxStore/actions';
// Styles
import clsx from 'clsx';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "../styles";
// Components
import Login from "layout/Login";
import Logo from "components/Icons/Logo";
import Badge from '@material-ui/core/Badge';
import SearchbarMobile from "layout/NavBarMain/SearchbarMobile";
// MUI
import UserMenu from "layout/NavBarMain/UserMenu";
import UserMenuMobile from "layout/NavBarMain/UserMenuMobile";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';
// Modals
import { goToModalConnect } from "utils/modals";
import { useDispatch, useSelector } from "react-redux";
// Router
import { useRouter } from "next/router";
// Router
import Link from "next/link";
import { asCurrency as c } from "utils/prices";



const DesktopMainBarSm = (props: ReactProps & DesktopMainBarProps) => {

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

  const goToProductCreate = () => {
    router.push('/create-product')
  }

  const goToMyWishlist = () => {
    router.push('/my-list')
  }

  const goToMyDownloads = () => {
    router.push('/my-downloads')
  }


  return (
    <div className={clsx(classes.baseBarInner, classes.flexStart)}>
      <div style={{ flexGrow: 1 }}></div>

      <Link href="/">
        <a className={classes.logo}>
          <Logo color={color} disableLogo={true}/>
        </a>
      </Link>

      <div className={
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
          className={clsx(
            classes.navbarButton,
            endRoute === 'create-product' ? classes.navbarButtonSelected : null,
          )}
          variant="text"
          color="primary"
          onClick={() => goToProductCreate()}
        >
          <span className={
            endRoute === 'create-product' ? classes.selectedRouteText : null
          }>
            Sell
          </span>
        </Button>

        {
          loggedIn
          ? <Button
              className={classes.navbarButton}
              variant={"text"}
              color="primary"
              onClick={goToMyDownloads}
            >
              <div>
                <span className={
                  endRoute === 'my-downloads' ? classes.selectedRouteText : null
                }>
                    Downloads
                </span>
              </div>
            </Button>
          : <div className={classes.myDownloadsLogin}>
              <Login
                loginTitle={"Downloads"}
                buttonProps={{ color: "primary" }}
              />
            </div>
          }

        <Button
          className={classes.navbarButton}
          variant="text"
          color="primary"
          onClick={() => goToModal.checkout()}
        >
          <Badge
            badgeContent={cartCount}
            classes={{ colorSecondary: classes.badge }}
            color="secondary"
          >
            <ShoppingCartIcon className={classes.icons}/>
          </Badge>
        </Button>

        <div className={classes.navbarButton}>
          <UserMenu loggedIn={loggedIn} />
          {
            !loggedIn &&
            <Login/>
          }
        </div>
      </div>

      <div style={{ flexGrow: 1 }}></div>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  mobileMenuOpen: boolean;
  setMobileMenuOpen(f: (s: boolean) => boolean): void;
}
interface DesktopMainBarProps extends WithStyles<typeof styles> {
  endRoute: string;
  cartCount: number;
  loggedIn: boolean;
  color: string;
  subtotal: number;
}
interface MobileMainBarProps extends DesktopMainBarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen(f: (s: boolean) => boolean): void;
}

interface ReduxProps {
  loggedIn: boolean;
  cartCount: number;
  subtotal: number;
}


export default withStyles(styles)( DesktopMainBarSm );
