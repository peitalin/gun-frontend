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
import { isMainPages } from "."


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
  const router = useRouter()

  let isHomePage = isMainPages(router)

  return (
    <div className={
      isHomePage
        ? classes.baseBarInnerHomePage
        : classes.baseBarInnerDashboard
    }>

      <div style={{ flexBasis: '0.5rem' }}></div>

      <Link href="/">
        <a className={classes.buttonLinkLogo}>
          <Logo color={color}/>
        </a>
      </Link>

      <div style={{ flexGrow: 1}}/>

      <Link href="/sell">
        <a className={classes.buttonLink}>
          <Button
              className={classes.navbarButton}
              variant={"text"}
              color="primary"
            >
              <div>
                <span className={
                  endRoute === 'sell' ? classes.selectedRouteText : null
                }>
                  Sell
                </span>
              </div>
            </Button>
        </a>
      </Link>

      {
        loggedIn
        ? <Link href="/admin/orders">
            <a className={classes.buttonLink}>
              <Button
                  className={classes.navbarButton}
                  variant={"text"}
                  color="primary"
                >
                  <div>
                    <span className={
                      endRoute === '/admin/orders' ? classes.selectedRouteText : null
                    }>
                      Orders
                    </span>
                  </div>
                </Button>
            </a>
          </Link>
        : <div className={classes.buttonMarginRight}>
            <Login
              buttonText={"Orders"}
              titleLogin={"Login to continue"}
              buttonProps={{
                color: "primary",
              }}
            />
          </div>
      }

      {
        loggedIn
        ? <Link href="/admin/offers">
            <a className={classes.buttonLink}>
              <Button
                  className={classes.navbarButton}
                  variant={"text"}
                  color="primary"
                >
                  <div>
                    <span className={
                      endRoute === '/admin/offers' ? classes.selectedRouteText : null
                    }>
                      Offers
                    </span>
                  </div>
                </Button>
            </a>
          </Link>
        : <div className={classes.buttonMarginRight}>
            <Login
              buttonText={"Offers"}
              titleLogin={"Login to continue"}
              buttonProps={{
                color: "primary",
              }}
            />
          </div>
      }

      {/* <Button
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
      </Button> */}

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
