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
import Logo from "components/Icons/Logo";
import Badge from '@material-ui/core/Badge';
// MUI
import MobileMenuDropdown from "layout/NavBarMain/MobileMenuDropdown";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchbarMobile from "layout/NavBarMain/SearchbarMobile";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Login from "layout/Login";
// Modals
import { goToModalConnect } from "utils/modals";
import { useDispatch, useSelector } from "react-redux";
// Router
import Link from "next/link";
import { useRouter } from "next/router";
import { navbarRoutes } from "./navbarRoutes";



const MobileMainBar = (props: MobileMainBarProps) => {

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

  return (
    <div className={classes.baseBarInnerMobile}>

      <div className={clsx(
        "fadeIn",
        hide ? classes.mainBarInnerHide : classes.mainBarInner,
      )}>
        <div className={classes.navbarButtonMobile}>
          <MobileMenuDropdown
            loggedIn={loggedIn}
            mobileMenuOpen={props.mobileMenuOpen}
            setMobileMenuOpen={props.setMobileMenuOpen}
          />
        </div>
      </div>


      <div className={clsx(
        "fadeIn",
        hide ? classes.mainBarInnerHide : classes.mainBarInner,
      )}>
        <Button
          className={clsx(
            classes.navbarButtonMobile,
            endRoute === 'sell' ? classes.navbarButtonSelected : null,
          )}
          variant="text"
          color="primary"
          onClick={() => {
            router.push(navbarRoutes.sell)
            props.setMobileMenuOpen(s => false)
          }}
        >
          <span className={clsx(
            classes.buttonText,
            endRoute === 'sell' ? classes.selectedRouteText : null
          )}>
            Sell
          </span>
        </Button>
      </div>

      {
        !hide &&
        <Link href="/">
          <a className={clsx(
              classes.logoMobile,
              !hide && "fadeIn"
            )}
            onClick={() => {
              props.setMobileMenuOpen(s => false)
            }}
          >
            <Logo fillColor={color}/>
          </a>
        </Link>
      }

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
        "fadeIn",
        hide ? classes.mainBarInnerHide : classes.mainBarInner,
      )}>
        {
          loggedIn
          ? <Button
              className={classes.navbarButton}
              variant={"text"}
              color="primary"
              onClick={() => {
                router.push(navbarRoutes.admin)
                props.setMobileMenuOpen(s => false)
              }}
            >
              <div>
                <span className={
                  endRoute === '/admin/products' ? classes.selectedRouteText : null
                }>
                  Store
                </span>
              </div>
              {/* <StorefrontIcon className={classes.icons}/> */}
            </Button>
          : <div className={classes.buttonMarginRight}>
              <Login
                buttonText={"Store"}
                titleLogin={"Login to continue"}
                buttonProps={{
                  color: "primary",
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
}
interface MobileMainBarProps extends ReactProps {
  endRoute: string;
  loggedIn: boolean;
  color: string;
  numUnclaimedOrders?: number;
}


export default withStyles(styles)( MobileMainBar );
