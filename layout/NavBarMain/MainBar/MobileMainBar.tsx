import React from "react";
// Styles
import clsx from 'clsx';
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import { styles } from "../styles";
import { Colors } from "layout/AppTheme";
// Components
import Logo from "components/Icons/Logo";
// MUI
import MobileMenuDropdown from "layout/NavBarMain/MobileMenuDropdown";
import Button from "@mui/material/Button";
// import SearchbarNavbarMobile from "layout/NavBarMain/SearchbarNavbarMobile";
import Login from "layout/Login";
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import { UserPrivate } from "typings/gqlTypes"
// Modals
import { useDispatch, useSelector } from "react-redux";
// Router
import Link from "next/link";
import { useRouter } from "next/router";
import { navbarRoutes } from "./navbarRoutes";


const MobileMainBar = (props: MobileMainBarProps) => {

  const {
    classes,
    endRoute,
    user,
    color,
    isDashboardPage,
  } = props;

  const router = useRouter()
  const [hide, setHide] = React.useState(false)

  return (
    <div className={classes.baseBarInnerMobile}>

      <div className={classes.blurBackgroundMobile}/>

      <div className={clsx(
        classes.mobileNavbarLeftButton,
        "fadeIn",
        hide ? classes.mainBarInnerHide : classes.mainBarInner,
      )}>
        <MobileMenuDropdown
          className={classes.navbarButtonMobile}
          color={color}
          isDashboardPage={isDashboardPage}
          mobileMenuOpen={props.mobileMenuOpen}
          setMobileMenuOpen={props.setMobileMenuOpen}
        />
      </div>


      {/* <div className={clsx(
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
          )}
            style={{ color: color }}
          >
            Sell
          </span>
        </Button>
      </div> */}

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

      {/* <div style={{ marginLeft: '0.5rem' }} className={
        !hide ? "fadeIn" : null
      }>
        <SearchbarNavbarMobile
          color={color}
          // inside icon when searchbar opens
          expandedIconColor={
            (
              (isStartPage || isMainPage) && !props.isDarkMode
            ) ? Colors.black : color
          }
          mobileMenuOpen={props.mobileMenuOpen}
          setMobileMenuOpen={props.setMobileMenuOpen}
          setHideMenuItems={setHide}
        />
      </div> */}


      <div className={clsx(
        classes.mobileNavbarRightButton,
        "fadeIn",
        hide ? classes.mainBarInnerHide : classes.mainBarInner,
      )}>
        {
          user
          ? <Button
              className={classes.navbarButton}
              variant={"text"}
              color="primary"
              onClick={() => {
                router.push(navbarRoutes.savedSearches)
                props.setMobileMenuOpen(s => false)
              }}
            >
              <div className={classes.flexCenter}>
                <span className={
                    // endRoute === '/admin/products'
                    endRoute === '/saved-searches'
                      ? classes.selectedRouteText
                      : null
                  }
                  style={{ color: color, fontWeight: 500 }}
                >
                  Saved
                </span>
                <SearchIcon style={{
                  fill: color,
                  marginTop: "0.1rem",
                  height: 20,
                }}/>
              </div>
            </Button>
          : <div className={classes.buttonMarginRight}>
              <Login
                className={classes.navbarButtonMobile}
                buttonText={
                  <div className={classes.flexCenter}>
                    <span className={
                        // endRoute === '/admin/products'
                        endRoute === '/saved-searches'
                          ? classes.selectedRouteText
                          : null
                      }
                      style={{ color: color, fontWeight: 500 }}
                    >
                      Saved
                    </span>
                    <SearchIcon style={{
                      fill: color,
                      marginTop: "0.1rem",
                      height: 20,
                    }}/>
                  </div>
                }
                titleLogin={"Login to continue"}
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
}
interface MobileMainBarProps extends ReactProps {
  endRoute: string;
  user: UserPrivate
  color: string;
  numUnclaimedOrders?: number;
  isDarkMode: boolean;
  // navbar
  isDashboardPage: boolean
}


export default withStyles(styles)( MobileMainBar );
