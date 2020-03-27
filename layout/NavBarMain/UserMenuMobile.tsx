import React from "react";
import { oc as option } from "ts-optchain";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { Actions } from 'reduxStore/actions';
import { UserPrivate, StorePrivate } from "typings/gqlTypes";
// Router
import { goToModalConnect } from "utils/modals";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
// MUI
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import Divider from "components/Divider";
import Typography from "@material-ui/core/Typography";
// Icons
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import { logout } from "queries/requests";
// import UserButNoStore from "pageComponents/BecomeASeller/UserButNoStore";
// Router
import Link from "next/link";
import Login from "layout/Login"
import { CategoryBarHeightMobile, NewsBarHeight, MainBarHeight, NavBarHeight } from "layout/NavBarMain/styles";
import { Colors } from "layout/AppTheme";
// Styles
import clsx from "clsx";
// Components
import StoreProfile from "./StoreProfile";
import { useRouter } from "next/router";

// // ENV variables
// import getConfig from 'next/config'
// const {
//   // Available both client and server side
//   publicRuntimeConfig: {
//     GATEWAY_GRAPHQL_URL,
//     SERVER_GATEWAY_GRAPHQL_URL,
//     NODE_ENV
//   },
//   // Only available server side
//   serverRuntimeConfig: {
//     IN_DOCKER,
//   },
// } = getConfig()

const NODE_ENV = "develop"



export const UserMenuMobile: React.FC<ReactProps> = (props) => {

  const {
    mobileMenuOpen,
    setMobileMenuOpen
  } = props;

  function toggleMenuOpen(event) {
    setMobileMenuOpen(s => !s);
  }

  const { classes } = props;
  const dispatch = useDispatch();

  return (
    <menu className={classes.root}>
      <Button
        onClick={toggleMenuOpen}
        aria-controls="user-menu"
        aria-haspopup="true"
      >
        {
          mobileMenuOpen
          ? <ClearIcon/>
          : <MenuIcon/>
        }
      </Button>
      {
        mobileMenuOpen &&
        <MobileMenuExpander
          mobileMenuOpen={mobileMenuOpen}
          closeMobileMenu={() => setMobileMenuOpen(s => false)}
          classes={classes}
        />
      }
    </menu>
  );
}




const MobileMenuExpander = (props: MobileMenuExpanderProps) => {

  const { classes, closeMobileMenu } = props;

  interface SelectorProps {
    loggedIn: boolean;
    userStore: StorePrivate;
  }
  const { loggedIn, userStore } = useSelector<GrandReduxState, SelectorProps>(
    state => ({
      loggedIn: state.reduxLogin.loggedIn,
      userStore: option(state).reduxLogin.user.store(),
    })
  );

  return (
    <>
      <div className={clsx(
        classes.mobileMenu,
        'fadeInFast',
        // !props.mobileMenuOpen ? classes.mobileMenuFadeout : null,
      )}>
        <div className={classes.mobileMenuOuterContainer}>
          {
            (loggedIn && userStore && userStore.name)
            ? <StoreProfile userStore={userStore}/>
            : (loggedIn)
              // ? <UserButNoStore disableTitle={true}/>
              ? <div>User but no store</div>
              : <div className={classes.flexRowLogin}>
                  <Login
                    loginTitle={"Create Account"}
                    buttonProps={{
                      classes: { root: classes.buttonCreateAccount }
                    }}
                    callbackOnComplete={() => {
                      closeMobileMenu()
                    }}
                  />
                  <Login
                    loginTitle={"Login"}
                    buttonProps={{
                      classes: { root: classes.buttonLogin }
                    }}
                    callbackOnComplete={() => {
                      closeMobileMenu()
                    }}
                  />
                </div>
          }
          <Divider style={{ width: "90%" }}/>
          <MobileMenuCategories {...props}/>
          <Divider style={{ width: "90%" }}/>
          <MobileMenuRoutes {...props}/>
          <Divider style={{ width: "90%" }}/>
          <MobileMenuBottom {...props}/>
        </div>
      </div>
    </>
  )
}


const staticCategories = [
  "All Categories",
  "New",
  "Cyber Monday",
  "Design",
  "Flash Deals",
  "How To",
]

const MobileMenuCategories = (props: MobileMenuExpanderProps) => {
  const { classes } = props;
  return (
    <div className={classes.mobileMenuInnerContainer}>
    {
      staticCategories.map(category => {
        return (
          <div key={category}
            className={clsx(
              classes.mobileMenuFlexitem,
            )}
          >
            <Link key={category}
              href="/category/[categoryIdOrName]"
              as={`/category/${category}`}
            >
              <a className={classes.aLink}>
                <MenuItem
                  className={classes.mobileMenuItemRoot}
                  onClick={() => props.closeMobileMenu()}
                >
                  <Typography className={classes.mobileMenuItemText}>
                    {category}
                  </Typography>
                </MenuItem>
              </a>
            </Link>
          </div>
        )
      })
    }
    </div>
  )
}


const MobileMenuRoutes = (props: MobileMenuExpanderProps) => {

  const { classes } = props;
  const dispatch = useDispatch();
  const loggedIn = useSelector<GrandReduxState, boolean>(
    s => s.reduxLogin.loggedIn
  );
  const goToModal = goToModalConnect(dispatch);

  return (
    <div className={classes.mobileMenuInnerContainer}>
      {
        loggedIn &&
        <div className={classes.mobileMenuFlexitem}>
          <Link href="/my-list">
            <a className={classes.menuLink}>
              <MenuItem
                className={clsx(
                  classes.mobileMenuFlexitem,
                  classes.mobileMenuItemRoot
                )}
                onClick={() => props.closeMobileMenu()}
              >
                <Typography className={classes.mobileMenuItemText}>
                  My List
                </Typography>
              </MenuItem>
            </a>
          </Link>
        </div>
      }
      <div className={classes.mobileMenuFlexitem}>
        <a href={
            NODE_ENV === "develop"
              ? "https://www.fileworks.net/blog"
              : "https://www.relaydownloads.com/blog"
          }
          className={classes.menuLink}
          target="_blank"
        >
          <MenuItem
            className={clsx(
              classes.mobileMenuFlexitem,
              classes.mobileMenuItemRoot
            )}
            onClick={() => props.closeMobileMenu()}
          >
            <Typography className={classes.mobileMenuItemText}>
              Blog
            </Typography>
          </MenuItem>
        </a>
      </div>
      {
        loggedIn &&
        <div className={classes.mobileMenuFlexitem}>
          <Link href="/my-downloads">
            <a className={classes.menuLink}>
              <MenuItem
                className={clsx(
                  classes.mobileMenuFlexitem,
                  classes.mobileMenuItemRoot
                )}
                onClick={() => props.closeMobileMenu()}
              >
                <Typography className={classes.mobileMenuItemText}>
                  My Downloads
                </Typography>
              </MenuItem>
            </a>
          </Link>
        </div>
      }
      <div className={classes.mobileMenuFlexitem}>
        <Link href="/faq">
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
      {
        loggedIn &&
        <div className={classes.mobileMenuFlexitem}>
          <MenuItem
            className={clsx(
              classes.mobileMenuFlexitem,
              classes.mobileMenuItemRoot
            )}
            onClick={() => {
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
    </div>
  )
}


const MobileMenuBottom = (props: MobileMenuExpanderProps) => {

  const { classes } = props;
  const loggedIn = useSelector<GrandReduxState, boolean>(
    s => s.reduxLogin.loggedIn
  );
  const router = useRouter();

  return (
    <div className={classes.mobileMenuInnerContainer}>
      <MenuItem
        className={clsx(
          classes.mobileMenuFlexitem,
          classes.mobileMenuItemRoot
        )}
        onClick={() => props.closeMobileMenu()}
      >
        {
          loggedIn
          ? <Link href="/seller">
              <a className={classes.aLink}>
                <Typography className={classes.mobileMenuItemText}>
                  Seller Dashboard
                </Typography>
              </a>
            </Link>
          : <Link href="/become-a-seller">
              <a className={classes.aLink}>
                <Typography className={classes.mobileMenuItemText}>
                  Become a Seller
                </Typography>
              </a>
            </Link>
        }
      </MenuItem>
      <div className={clsx(
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
            router.push("/create-product")
            props.closeMobileMenu()
          }}
        >
          <CloudUploadIcon className={classes.iconsCloud}/>
          <Typography variant="body2" className={classes.uploadProductText}>
            Upload Product
          </Typography>
        </Button>
      </div>
    </div>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  loggedIn: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen(f: (s: boolean) => boolean): void;
}

interface MobileMenuExpanderProps extends WithStyles<typeof styles> {
  closeMobileMenu(): void;
  mobileMenuOpen: boolean;
}


/////////////// STYLES /////////////////////
const menuTextColor = "#484848";

const styles = (theme: Theme) => createStyles({
  root: {
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  flexRowLogin: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  mobileMenu: {
    zIndex: 2,
    position: "absolute", // relative to MainBar, which is under NewsBar
    top: CategoryBarHeightMobile + MainBarHeight - 1, // 1px tucked under navbar
    left: 0,
    width: '100%',
    // top: MainBarHeight + CategoryBarHeight,
    background: Colors.foregroundColor,
    borderTop: `1px solid ${Colors.lightGrey}`,
    // transform: "translateY(-150%)",
    // transitionDuration: '100ms',
    // transition: theme.transitions.create(['all'], {
    //   easing: theme.transitions.easing.easeIn,
    //   duration: "100ms",
    // })
  },
  mobileMenuExpanded: {
    transform: "translateY(0%)",
    transitionDuration: '200ms',
    transition: theme.transitions.create([''], {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    })
  },
  mobileMenuOuterContainer: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mobileMenuInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '0.5rem 0.5rem',
    width: '100%',
  },
  mobileMenuFlexitem: {
    flexGrow: 1,
    flexBasis: '40%',
  },
  mobileMenuItemRoot: {
    minHeight: '0rem',
    padding: "0.5rem 1.25rem",
  },
  mobileMenuItemText: {
    fontWeight: 600,
  },
  buttonCreateAccount: {
    marginRight: '0.5rem',
    backgroundColor: Colors.red,
    border: `1px solid ${Colors.red}`,
    color: Colors.cream,
    minWidth: '150px',
    "&:hover": {
      backgroundColor: fade(Colors.lightRed, 1),
      border: `1px solid ${Colors.lightRed}`,
      transition: theme.transitions.create(['color', 'border'], {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      })
    }
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
    backgroundColor: Colors.red,
    border: `1px solid ${Colors.red}`,
    fontSize: '0.7rem',
    color: Colors.cream,
    minWidth: "150px",
    "&:hover": {
      color: Colors.cream,
      border: `1px solid ${Colors.secondaryBright}`,
      backgroundColor: Colors.secondaryBright,
      transition: theme.transitions.create(['color', 'border', 'backgroundColor'], {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      })
    }
  },
  uploadProductText: {
    color: Colors.cream,
    fontSize: '0.7rem',
    fontWeight: 600,
  },
  aLink: {
    color: Colors.charcoal,
  },
  menuText: {
    color: menuTextColor,
    fontSize: '0.9rem',
  },
  menuLink: {
    color: Colors.charcoal,
  },
  iconsCloud: {
    fill: Colors.cream,
    marginRight: '0.25rem',
  },
});


export default withStyles(styles)( UserMenuMobile );

