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
import { isMainPages } from "."



const DesktopMainBarSm = (props: ReactProps & DesktopMainBarProps) => {

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

  let isHomePage = isMainPages(router)

  return (
    <div className={
      isHomePage
        ? clsx(classes.baseBarInnerHomePage)
        : clsx(classes.baseBarInnerDashboard)
    }>

      <div style={{ flexBasis: '1rem', minWidth: '0.5rem' }}></div>

      <Link href="/">
        <a className={classes.buttonLink}>
          <Logo fillColor={color} disableLogo={true}/>
        </a>
      </Link>

      <div style={{ flexGrow: 1 }}></div>

      {/* <div className={
        !hide ? "fadeIn" : null
      }>
        <SearchbarMobile
          color={color}
          mobileMenuOpen={props.mobileMenuOpen}
          setMobileMenuOpen={props.setMobileMenuOpen}
          setHideMenuItems={setHide}
        />
      </div> */}

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
          <span className={
            endRoute === 'sell' ? classes.selectedRouteText : null
          } style={{ color: color }}>
            Sell
          </span>
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


        <div className={classes.navbarButton}>
          <UserMenu loggedIn={loggedIn} color={color} />
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
}


export default withStyles(styles)( DesktopMainBarSm );
