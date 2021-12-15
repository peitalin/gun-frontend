import React from "react";
// Styles
import clsx from 'clsx';
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import { styles } from "../styles";
import { Colors, isThemeDark } from "layout/AppTheme";
import { UserPrivate } from "typings/gqlTypes"
// Components
import Login from "layout/Login";
import Logo from "components/Icons/Logo";
// MUI
import UserMenu from "layout/NavBarMain/UserMenu";
import NotificationsMenu from "layout/NavBarMain/NotificationsMenu";
import Button from "@mui/material/Button";
// Router
import Link from "next/link";
import ToggleDarkMode from "layout/NavBarMain/ToggleDarkMode";
// import Tooltip from '@mui/material/Tooltip';
import CategoryBarDesktop from "../CategoryBar/CategoryBarDesktop";
import TriangleSvg from "./TriangleSvg";
import { useTheme } from "@mui/material"
import {
  logoBackgroundColorDark,
  logoBackgroundColorLight,
  logoBackgroundColorDark2,
  logoBackgroundColorLight2,
} from "../styles"

import Hidden from "components/HiddenFix";
import { Categories } from "typings/gqlTypes";
import { useRouter, NextRouter } from "next/router";
import { categoryPreviewsBackup } from "utils/categories";




const DesktopMainBar = (props: DesktopMainBarProps) => {

  const {
    classes,
    endRoute,
    user,
    color,
    isMainPage,
    isSellPage,
    isStartPage,
    isFeaturedPage,
  } = props;

  const theme = useTheme()
  const router = useRouter()

  let initialCategories: Categories[] = categoryPreviewsBackup as any

  return (
    <div className={clsx(
      (isMainPage || isStartPage || isFeaturedPage || isSellPage)
        ? classes.baseBarInnerHomePage
        : classes.baseBarInnerDashboard,
      classes.blurBackgroundWide
    )}>

      {/* <div style={{ flexBasis: '0.5rem' }}></div> */}

      <div className={classes.logoContainer}>
        <Link href="/">
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

      <Hidden xlDown implementation="css">
        <CategoryBarDesktop
          categories={initialCategories}
          isMainPage={props.isMainPage}
          isStartPage={props.isStartPage}
          isSellPage={props.isSellPage}
          isFeaturedPage={props.isFeaturedPage}
          user={user}
        />
      </Hidden>

      <div style={{ flexGrow: 1}}/>

      <div className={classes.menuButtonsContainer}>

        {
          !user &&
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
          user
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
          !user &&
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
          user &&
          <NotificationsMenu className={classes.notificationsIcon} color={color} />
        }

        {
          user
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
  );
}

interface DesktopMainBarProps extends WithStyles<typeof styles> {
  endRoute: string;
  user: UserPrivate;
  color: string;
  isDarkMode: boolean;
  // navbar
  isMainPage: boolean
  isStartPage: boolean
  isSellPage: boolean
  isFeaturedPage: boolean
}

export default withStyles(styles)( DesktopMainBar );
