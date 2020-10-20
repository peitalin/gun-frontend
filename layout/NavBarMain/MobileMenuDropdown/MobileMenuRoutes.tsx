import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import clsx from "clsx";
import { Colors, BorderRadius, Gradients } from "layout/AppTheme";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { Actions } from 'reduxStore/actions';
// typings
import { UserPrivate, StorePrivate, Role } from "typings/gqlTypes";

// MUI
import MenuItem from '@material-ui/core/MenuItem';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// components
import Divider from "components/Divider";
import Login from "layout/Login"
// Router
import { useRouter } from "next/router";
import Link from "next/link";
import { goToModalConnect } from "utils/modals";
// Analytics
import { useAnalytics, analyticsEvent } from "utils/analytics";
// ENV variables
import getConfig from 'next/config'
const {
  // Available both client and server side
  publicRuntimeConfig: { GUN_ENV },
} = getConfig()



const MobileMenuRoutes = (props: ReactProps) => {

  const { classes } = props;
  const dispatch = useDispatch();
  const {
    loggedIn,
    user
  } = useSelector<GrandReduxState, MobileMenuReduxProps>(s => {
    return {
      loggedIn: s.reduxLogin.loggedIn,
      user: s.reduxLogin.user,
    }
  });
  const goToModal = goToModalConnect(dispatch);

  const dividerStyle = {
    width: '95%',
    margin: "0.5rem 0rem",
    // opacity: 0.25,
  }

  return (
    <div className={classes.mobileMenuRoutesRoot}>

      {
        user?.userRole === Role.PLATFORM_ADMIN &&
        <MenuItem
          className={clsx(
            classes.mobileMenuFlexitem,
            classes.mobileMenuItemRoot
          )}
          onClick={() => props.closeMobileMenu()}
        >
          <Link href="/gov/payouts/pending-approval">
            <a className={classes.aLink}>
              <Typography className={classes.mobileMenuItemTextEmph2}>
                Governance Dashboard
              </Typography>
            </a>
          </Link>
        </MenuItem>
      }


      {/* <div className={clsx(
        classes.mobileMenuFlexitem,
        classes.mobileMenuItemRoot
      )}>
        <Button
          classes={{
            root: classes.buttonUploadProduct
          }}
          variant="text"
          color="primary"
          onClick={() => {
            // router.push("/sell")
            props.closeMobileMenu()
          }}
        >
          <Typography variant="body2" className={classes.uploadProductText}>
            Add Product
          </Typography>
        </Button>
      </div> */}

      {
        loggedIn &&
        <div className={classes.mobileMenuFlexitem}>
          <Link href="/sell">
            <a className={classes.menuLink}
              onClick={() => analyticsEvent("Nav.AddProduct.Pressed")}
            >
              <MenuItem
                className={clsx(
                  classes.mobileMenuFlexitem,
                  classes.mobileMenuItemRoot
                )}
                onClick={() => props.closeMobileMenu()}
              >
                <Typography className={classes.mobileMenuItemTextEmph}>
                  Add Product
                </Typography>
              </MenuItem>
            </a>
          </Link>
        </div>
      }

      <MenuItem
        className={clsx(
          classes.mobileMenuFlexitem,
          classes.mobileMenuItemRoot
        )}
        onClick={() => props.closeMobileMenu()}
      >
        {
          loggedIn
          ? <Link href="/admin">
              <a className={classes.aLink}>
                <Typography className={classes.mobileMenuItemTextEmph}>
                  Manage Store
                </Typography>
              </a>
            </Link>
          : <Link href="/create-store">
              <a className={classes.aLink}>
                <Typography className={classes.mobileMenuItemTextEmph}>
                  Create Store
                </Typography>
              </a>
            </Link>
        }
      </MenuItem>


      {
        loggedIn
        ? <div className={classes.mobileMenuFlexitem}>
            <Link href="/orders">
              <a className={classes.menuLink}>
                <MenuItem
                  className={clsx(
                    classes.mobileMenuFlexitem,
                    classes.mobileMenuItemRoot
                  )}
                  onClick={() => props.closeMobileMenu()}
                >
                  <Typography className={classes.mobileMenuItemText}>
                    Orders
                  </Typography>
                </MenuItem>
              </a>
            </Link>
          </div>
        : <div className={classes.mobileMenuFlexitem}>
            <Login
              initialTabIndex={0}
              buttonProps={{
                classes: { root: classes.buttonLogin }
              }}
              buttonText={"Orders"}
              buttonType={"menuItem"}
              menuItemTextClassName={classes.mobileMenuItemText}
              redirectOnComplete={"/orders"}
              callbackOnComplete={() => {
                // only close menu after login, otherwise login component unmounts
                // and login modal never shows
                props.closeMobileMenu()
              }}
            />
          </div>
      }

      <Divider style={dividerStyle}/>

      {
        loggedIn &&
        <div className={classes.mobileMenuFlexitem}>
          <Link href="/wishlist">
            <a className={classes.menuLink}
              // onClick={() => analyticsEvent("Nav.Wishlist.Pressed")}
            >
              <MenuItem
                className={clsx(
                  classes.mobileMenuFlexitem,
                  classes.mobileMenuItemRoot
                )}
                onClick={() => props.closeMobileMenu()}
              >
                <Typography className={classes.mobileMenuItemText}>
                  Wishlist
                </Typography>
              </MenuItem>
            </a>
          </Link>
        </div>
      }

      {/* {
        loggedIn &&
        <div className={classes.mobileMenuFlexitem}>
          <Link href="/followed-stores">
            <a className={classes.menuLink}
              onClick={() => analyticsEvent("Nav.FollowedStores.Pressed")}
            >
              <MenuItem
                className={clsx(
                  classes.mobileMenuFlexitem,
                  classes.mobileMenuItemRoot
                )}
                onClick={() => props.closeMobileMenu()}
              >
                <Typography className={classes.mobileMenuItemText}>
                  Following
                </Typography>
              </MenuItem>
            </a>
          </Link>
        </div>
      } */}


      <div className={classes.mobileMenuFlexitem}>
        <Link href="/categories">
          <a className={classes.menuLink}
            // onClick={() => analyticsEvent("Nav.Categories.Pressed")}
          >
            <MenuItem
              className={clsx(
                classes.mobileMenuFlexitem,
                classes.mobileMenuItemRoot
              )}
              onClick={() => props.closeMobileMenu()}
            >
              <Typography className={classes.mobileMenuItemText}>
                Browse Categories
              </Typography>
            </MenuItem>
          </a>
        </Link>
      </div>

      <div className={classes.mobileMenuFlexitem}>
        <Link href="/contact-us">
          <a className={classes.menuLink}>
            <MenuItem
              className={clsx(
                classes.mobileMenuFlexitem,
                classes.mobileMenuItemRoot
              )}
              onClick={() => props.closeMobileMenu()}
            >
              <Typography className={classes.mobileMenuItemText}>
                Contact Us
              </Typography>
            </MenuItem>
          </a>
        </Link>
      </div>

      {/* <Divider style={dividerStyle}/> */}

      {
        loggedIn &&
        <div className={classes.mobileMenuFlexitem}>
          <MenuItem
            className={clsx(
              classes.mobileMenuFlexitem,
              classes.mobileMenuItemRoot
            )}
            onClick={() => {
              // dispatch(Actions.reduxStripe.SHOW_MY_SETTINGS_STRIPE_COMPONENT())
              goToModal.mySettings()
              props.closeMobileMenu()
            }}
          >
            <Typography className={classes.mobileMenuItemText}>
              Settings
            </Typography>
          </MenuItem>
        </div>
      }
    </div>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
  closeMobileMenu(): void;
  mobileMenuOpen: boolean;
}

interface MobileMenuReduxProps {
  loggedIn: boolean;
  user: UserPrivate;
}


/////////////// STYLES /////////////////////

const styles = (theme: Theme) => createStyles({
  mobileMenuRoutesRoot: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: "center",
    padding: '0.5rem 0.5rem',
    paddingTop: '1rem',
    width: '100%',
  },
  mobileMenuFlexitem: {
    flexGrow: 1,
    flexBasis: '40%',
    width: '100%',
    borderRadius: BorderRadius,
  },
  mobileMenuItemRoot: {
    minHeight: '0rem',
    padding: "0.5rem 1.25rem",
  },
  mobileMenuItemText: {
    fontWeight: 500,
  },
  mobileMenuItemTextEmph: {
    fontWeight: 500,
    color: Colors.gradientUniswapBlue1,
  },
  mobileMenuItemTextEmph2: {
    fontWeight: 500,
    color: Colors.gradientUniswapGreen,
  },
  aLink: {
    color: Colors.charcoal,
  },
  menuLink: {
    color: Colors.charcoal,
  },
  buttonLogin: {
    backgroundColor: Colors.cream,
    border: `1px solid ${Colors.charcoal}`,
    color: Colors.charcoal,
    minWidth: '150px',
    "&:hover": {
      color: Colors.secondaryBright,
      border: `1px solid ${Colors.secondaryBright}`,
      backgroundColor: Colors.cream,
      transition: theme.transitions.create(['color', 'border', 'backgroundColor'], {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      })
    }
  },
  buttonUploadProduct: {
    backgroundImage: Gradients.gradientUniswapBlueGreen.background,
    border: `1px solid ${Colors.gradientUniswapBlue1}`,
    fontSize: '0.7rem',
    color: Colors.cream,
    minWidth: "150px",
    "&:hover": {
      backgroundImage: Gradients.gradientUniswapBlueGreen2.background,
      border: `1px solid ${Colors.gradientUniswapGreen}`,
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
      backgroundPosition: '-75px',
    }
  },
  uploadProductText: {
    color: Colors.cream,
    fontSize: '0.9rem',
    fontWeight: 600,
    height: '1.5rem',
    display: 'flex',
    alignItems: 'center',
  },
});


export default withStyles(styles)( MobileMenuRoutes );

