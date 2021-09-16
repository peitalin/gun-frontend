import React from "react";
// Styles
import clsx from 'clsx';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "../styles";
import { Colors, isThemeDark } from "layout/AppTheme";
// Components
import Login from "layout/Login";
import Logo from "components/Icons/Logo";
// MUI
import UserMenu from "layout/NavBarMain/UserMenu";
import NotificationsMenu from "layout/NavBarMain/NotificationsMenu";
import Button from "@material-ui/core/Button";
// Router
import Link from "next/link";
import ToggleDarkMode from "layout/NavBarMain/ToggleDarkMode";
// import Tooltip from '@material-ui/core/Tooltip';
import CategoryBar from "../CategoryBar";
import TriangleSvg from "./TriangleSvg";
import { useTheme } from "@material-ui/core"
import {
  logoBackgroundColorDark,
  logoBackgroundColorLight,
  logoBackgroundColorDark2,
  logoBackgroundColorLight2,
} from "../styles"



const DesktopMainBar = (props: DesktopMainBarProps) => {

  const {
    classes,
    endRoute,
    loggedIn,
    color,
    isMainPage,
    isSellPage,
    isStartPage,
    isFeaturedPage,
  } = props;

  const theme = useTheme()
  // const router = useRouter()

  return (
    <div className={clsx(
      (isMainPage || isStartPage || isFeaturedPage || isSellPage)
        ? classes.baseBarInnerHomePage
        : classes.baseBarInnerDashboard,
      classes.blurBackgroundWide
    )}>

      {/* <div style={{ flexBasis: '0.5rem' }}></div> */}

      <div className={classes.logoContainer}>
        <Link href="/home">
          <a className={classes.buttonLinkLogo}>
            <Logo fillColor={
              // override logo color for desktop /start page light mode
              (isStartPage && !props.isDarkMode)
                ? Colors.black
                : color
            }/>
          </a>
        </Link>
        <TriangleSvg
          style1={{
            fill: isThemeDark(theme)
              ? logoBackgroundColorDark
              : logoBackgroundColorLight,
            opacity: 0
          }}
          style2={{
            fill: isThemeDark(theme)
              ? logoBackgroundColorDark2
              : logoBackgroundColorLight2,
            filter: isThemeDark(theme)
              ? 'drop-shadow(-2px 0px 2px rgba(25, 25, 25, 0.25))'
              : 'drop-shadow(-2px 0px 2px hsla(0, 0%, 0%, 0.25))',
          }}
        />
      </div>

      <CategoryBar/>
      <div style={{ flexGrow: 1}}/>

      <div className={classes.menuButtonsContainer}>

        {
          !loggedIn &&
          <ToggleDarkMode/>
        }


        {/* <Link href="/sell">
          <a className={classes.buttonLink}>
            <Button
              className={classes.navbarButton}
              classes={{
                label: classes.navbarButtonLabel
              }}
              variant={"text"}
              color="primary"
            >
              <ArrowStripeIcon
                title={"Sell"}
                color={
                  endRoute === 'sell' ? Colors.purple : color
                }
              />
            </Button>
          </a>
        </Link> */}

        {/* {
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
        } */}

        {
          !loggedIn &&
          <Link href="/signup">
            <a className={classes.buttonLink}>
              <Button
                className={classes.navbarButton}
                classes={{
                  label: classes.navbarButtonLabel
                }}
                variant={"text"}
                color="primary"
              >
                <div>
                  <span className={
                    endRoute === '/signup' ? classes.selectedRouteText : null
                  } style={{ color: color }}>
                    Sign Up
                  </span>
                </div>
              </Button>
            </a>
          </Link>
        }

        {
          loggedIn &&
          <NotificationsMenu className={classes.notificationsIcon} color={color} />
        }

        {
          loggedIn
          ? <UserMenu className={classes.navbarButton} color={color} />
          : <Login
              className={classes.navbarButton}
              buttonProps={{
                style: { color: color }
              }}
            />
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
  // navbar
  isMainPage: boolean
  isStartPage: boolean
  isSellPage: boolean
  isFeaturedPage: boolean
}

export default withStyles(styles)( DesktopMainBar );
