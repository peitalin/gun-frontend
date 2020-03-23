import React from "react";
import { oc as option } from "ts-optchain";
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
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';
// Modals
import { goToModalConnect } from "utils/modals";
import { useDispatch, useSelector } from "react-redux";
// Router
import Link from "next/link";
import { useRouter } from "next/router";
import { asCurrency as c } from "utils/prices";



const DesktopMainBarXl = (props: DesktopMainBarProps) => {

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
    <div className={classes.baseBarInner}>

      <div style={{ flexBasis: '0.5rem' }}></div>

      <div style={{ margin: '0rem 1rem' }}>
        <Link href="/">
          <a className={classes.logo}>
            <Logo color={color}/>
          </a>
        </Link>
      </div>

      <div style={{ marginRight: '1rem' }}>
        <Searchbar color={color}/>
      </div>

      <div style={{ flexGrow: 1}}/>

      <Button
        className={clsx(
          classes.navbarButton,
          endRoute === 'create-product' ? classes.navbarButtonSelected : null,
        )}
        variant="text"
        color="primary"
        onClick={() => goToProductCreate()}
      >
        <div className={classes.flexItem}>
          <CloudUploadIcon className={clsx(
            classes.iconsCloud,
            endRoute === 'create-product' ? classes.iconsSelected : null
          )}/>
          <span className={
            endRoute === 'create-product' ? classes.selectedRouteText : null
          }>
            Sell
          </span>
        </div>
      </Button>


      {
        loggedIn
        ? <Button
            className={classes.navbarButton}
            variant={"text"}
            color="primary"
            onClick={goToMyWishlist}
          >
            <div>
              <span className={
                endRoute === 'my-list' ? classes.selectedRouteText : null
              }>
                Wishlist
              </span>
            </div>
          </Button>
        : <div className={classes.myDownloadsLogin}>
            <Login
              loginTitle={"Wishlist"}
              buttonProps={{ color: "primary" }}
            />
          </div>
        }

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
        <span className={classes.cartText}>
          {c(subtotal)}
        </span>
      </Button>

      <div className={classes.navbarButton}>
        <UserMenu loggedIn={loggedIn} />
        {
          !loggedIn &&
          <Login/>
        }
      </div>
    </div>
  )
}

interface DesktopMainBarProps extends WithStyles<typeof styles> {
  endRoute: string;
  cartCount: number;
  loggedIn: boolean;
  color: string;
  subtotal: number;
}

export default withStyles(styles)( DesktopMainBarXl );
