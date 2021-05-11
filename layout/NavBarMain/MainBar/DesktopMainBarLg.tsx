import React from "react";
// typings
// Styles
import clsx from 'clsx';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "../styles";
import { Colors } from "layout/AppTheme";
// Components
import Login from "layout/Login";
import Logo from "components/Icons/Logo";
import Badge from '@material-ui/core/Badge';
import SearchbarNavbarDesktop from "layout/NavBarMain/SearchbarNavbarDesktop";
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
import { isMainPagesFn, isStartPageFn } from "."
import ToggleDarkMode from "layout/NavBarMain/ToggleDarkMode";



const DesktopMainBarLg = (props: DesktopMainBarProps) => {

  const {
    classes,
    endRoute,
    loggedIn,
    color,
  } = props;

  const dispatch = useDispatch();
  const router = useRouter()
  const [hide, setHide] = React.useState(false)

  const goToProductCreate = () => {
    router.push('/sell')
  }

  const goToMyWatchlist = () => {
    router.push('/my-list')
  }

  let isHomePage = isMainPagesFn(router)
  let isStartPage = isStartPageFn(router)

  return (
    <div className={
      isHomePage
        ? classes.baseBarInnerHomePage
        : classes.baseBarInnerDashboard
    }>

      <div style={{ flexBasis: '0.5rem' }}></div>

      <Link href="/">
        <a className={classes.buttonLinkLogo}>
          <Logo fillColor={
            // override logo color for desktop /start page
            (isStartPage && !props.isDarkMode) ? Colors.black : color
          }/>
        </a>
      </Link>

      <div style={{ flexGrow: 1 }}/>

      <div className={clsx(
        classes.mainBarInner,
        hide ? "displayNone" : "fadeIn"
      )}>

        <ToggleDarkMode/>

        <Button
          className={clsx(
            classes.navbarButton,
            endRoute === 'sell' ? classes.navbarButtonSelected : null,
          )}
          variant="text"
          color="primary"
          onClick={() => goToProductCreate()}
        >
          <div className={classes.flexItem}>
            <span className={
              endRoute === 'sell' ? classes.selectedRouteText : null
            } style={{ color: color }}>
              Sell
            </span>
          </div>
        </Button>

        {
          loggedIn
          ? <Link href="/orders">
              <a className={classes.buttonLink}>
                <Button
                    className={classes.navbarButton}
                    variant={"text"}
                  >
                    <div>
                      <span className={
                        endRoute === '/orders' ? classes.selectedRouteText : null
                      } style={{ color: color }}>
                        Orders
                      </span>
                    </div>
                  </Button>
              </a>
            </Link>
          : <div className={classes.marginRight}>
              <Login
                className={classes.navbarButton}
                buttonText={"Orders"}
                titleLogin={"Login to continue"}
                buttonProps={{
                  style: { color: color }
                }}
              />
            </div>
        }


        {
          loggedIn
          ? <UserMenu className={classes.navbarButton} color={color} />
          : <div className={classes.marginRight}>
              <Login
                className={classes.navbarButton}
                buttonProps={{
                  style: { color: color }
                }}
              />
            </div>
        }

      </div>

    </div>
  )
}

interface DesktopMainBarProps extends WithStyles<typeof styles> {
  endRoute: string;
  loggedIn: boolean;
  color: string;
  isDarkMode: boolean;
}

export default withStyles(styles)( DesktopMainBarLg );
