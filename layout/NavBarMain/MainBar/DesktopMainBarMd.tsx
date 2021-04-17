import React from "react";
// Styles
import clsx from 'clsx';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "../styles";
import { Colors } from "layout/AppTheme";
// Components
import Login from "layout/Login";
import Logo from "components/Icons/Logo";
import Badge from '@material-ui/core/Badge';
import SearchbarMobile from "layout/NavBarMain/SearchbarMobile";
// MUI
import UserMenu from "layout/NavBarMain/UserMenu";
import Button from "@material-ui/core/Button";
// Modals
import { goToModalConnect } from "utils/modals";
import { useDispatch, useSelector } from "react-redux";
// Router
import Link from "next/link";
import { useRouter } from "next/router";
import { asCurrency as c } from "utils/prices";
import { isMainPagesFn, isStartPageFn } from "."
import ToggleDarkMode from "layout/NavBarMain/ToggleDarkMode";



const DesktopMainBarMd = (props: ReactProps) => {

  const {
    classes,
    endRoute,
    loggedIn,
    color,
  } = props;

  const dispatch = useDispatch();
  const goToModal = goToModalConnect(dispatch);
  const router = useRouter()

  const [hide, setHide] = React.useState(false)

  const goToProductCreate = () => {
    router.push('/sell')
  }

  let isHomePage = isMainPagesFn(router)
  let isStartPage = isStartPageFn(router)

  return (
    <div className={
      isHomePage
        ? clsx(classes.baseBarInnerHomePage, classes.flexStart)
        : clsx(classes.baseBarInnerDashboard, classes.flexStart)
    }>

      <div style={{ flexBasis: '1rem', minWidth: '0.5rem' }}></div>

      <div className={!hide ? "fadeIn" : "hidden"}>
        <Link href="/">
          <a className={classes.buttonLink}>
            <Logo fillColor={color}
              disableLogo={true}
            />
          </a>
        </Link>
      </div>

      <div style={{ flexGrow: 1 }}></div>


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
                    color="primary"
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


interface ReactProps extends WithStyles<typeof styles> {
  mobileMenuOpen: boolean;
  setMobileMenuOpen(f: (s: boolean) => boolean): void;
  isDarkMode: boolean;
  endRoute: string;
  loggedIn: boolean;
  color: string;
}


export default withStyles(styles)( DesktopMainBarMd );
