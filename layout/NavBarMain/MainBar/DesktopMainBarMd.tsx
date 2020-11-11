import React from "react";
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
import Button from "@material-ui/core/Button";
// Modals
import { goToModalConnect } from "utils/modals";
import { useDispatch, useSelector } from "react-redux";
// Router
import Link from "next/link";
import { useRouter } from "next/router";
import { asCurrency as c } from "utils/prices";
import { isMainPages } from "."



const DesktopMainBarMd = (props: ReactProps & DesktopMainBarProps) => {

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
    router.push('/sell')
  }

  let isHomePage = isMainPages(router)

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
            <Logo color={color} disableLogo={true}/>
          </a>
        </Link>
      </div>

      <div style={{ flexGrow: 1 }}></div>


      <div className={clsx(
        classes.mainBarInner,
        hide ? "displayNone" : "fadeIn"
      )}>
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
            }>
              Sell
            </span>
          </div>
        </Button>

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


        <div className={classes.navbarButton}>
          <UserMenu loggedIn={loggedIn} />
          {
            !loggedIn &&
            <Login/>
          }
        </div>
      </div>

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


export default withStyles(styles)( DesktopMainBarMd );
