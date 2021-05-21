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
import ToggleDarkMode from "layout/NavBarMain/ToggleDarkMode";



const MobileMenuRoutes = (props: ReactProps) => {

  const { classes } = props;
  const dispatch = useDispatch();
  const { user } = useSelector<GrandReduxState, MobileMenuReduxProps>(s => {
    return {
      user: s.reduxLogin.user,
    }
  });

  const goToModal = goToModalConnect(dispatch);
  let loggedIn = !!user?.id;

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
          <Link href="/gov/escrow/pending-approval">
            <a className={classes.aLink}>
              <Typography className={classes.mobileMenuItemTextEmph2}>
                Governance Dashboard
              </Typography>
            </a>
          </Link>
        </MenuItem>
      }

      {
        loggedIn &&
        <div className={classes.mobileMenuFlexitem}>
          <Link href="/sell">
            <a className={classes.menuLink}>
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
          ? <Link href="/admin/products">
              <a className={classes.aLink}>
                <Typography className={classes.mobileMenuItemTextEmph}>
                  Manage Store
                </Typography>
              </a>
            </Link>
          : <Link href="/create-store">
              <a className={classes.aLink}>
                <Typography className={classes.mobileMenuItemText}>
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


      <div className={classes.mobileMenuFlexitem}>
        <Link href="/">
          <a className={classes.menuLink}>
            <MenuItem
              className={clsx(
                classes.mobileMenuFlexitem,
                classes.mobileMenuItemRoot
              )}
              onClick={() => props.closeMobileMenu()}
            >
              <Typography className={classes.mobileMenuItemText}>
                Browse Products
              </Typography>
            </MenuItem>
          </a>
        </Link>
      </div>

      <div className={classes.mobileMenuFlexitem}>
        <Link href="/help/faq">
          <a className={classes.menuLink}>
            <MenuItem
              className={clsx(
                classes.mobileMenuFlexitem,
                classes.mobileMenuItemRoot
              )}
              onClick={() => props.closeMobileMenu()}
            >
              <Typography className={classes.mobileMenuItemText}>
                FAQ
              </Typography>
            </MenuItem>
          </a>
        </Link>
      </div>

      <Divider style={dividerStyle}/>

      <MenuItem
        className={clsx(
          classes.mobileMenuFlexitem,
          classes.mobileMenuItemRoot,
          classes.mobileMenuFlexitemSpaceBetween,
          classes.maxHeight40,
        )}
      >
        <div className={classes.toggleDarkModeText}>
          <Typography className={classes.mobileMenuItemText}>
            Dark Mode
          </Typography>
        </div>
        <ToggleDarkMode/>
      </MenuItem>

      {
        loggedIn &&
        <div className={classes.mobileMenuFlexitem}>
          <Link href="/saved-searches">
            <a className={classes.menuLink}>
              <MenuItem
                className={clsx(
                  classes.mobileMenuFlexitem,
                  classes.mobileMenuItemRoot
                )}
                onClick={() => {
                  props.closeMobileMenu()
                }}
              >
                <Typography className={classes.mobileMenuItemText}>
                  Saved Searches
                </Typography>
              </MenuItem>
            </a>
          </Link>
        </div>
      }


      {
        loggedIn &&
        <div className={classes.mobileMenuFlexitem}>
          <Link href="/settings">
            <a className={classes.menuLink}>
              <MenuItem
                className={clsx(
                  classes.mobileMenuFlexitem,
                  classes.mobileMenuItemRoot
                )}
                onClick={() => {
                  // dispatch(Actions.reduxStripe.SHOW_MY_SETTINGS_STRIPE_COMPONENT())
                  // goToModal.mySettings()
                  props.closeMobileMenu()
                }}
              >
                <Typography className={classes.mobileMenuItemText}>
                  Settings
                </Typography>
              </MenuItem>
            </a>
          </Link>
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
    color: theme.palette.type === 'dark'
      ? Colors.gradientUniswapFluro1
      : Colors.gradientUniswapBlue1,
  },
  mobileMenuItemTextEmph2: {
    fontWeight: 500,
    color: theme.palette.type === 'dark'
      ? Colors.purple
      : Colors.gradientUniswapGreen,
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
    color: theme.palette.type === 'dark'
      ? Colors.uniswapGrey
      : Colors.charcoal,
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
  uploadProductText: {
    color: Colors.cream,
    fontSize: '0.9rem',
    fontWeight: 600,
    height: '1.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  toggleDarkModeText: {
  },
  mobileMenuFlexitemSpaceBetween: {
    justifyContent: 'space-between',
  },
  maxHeight40: {
    maxHeight: 40,
  },
});


export default withStyles(styles)( MobileMenuRoutes );

