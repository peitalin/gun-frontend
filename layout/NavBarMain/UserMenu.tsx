import React from "react";
import { oc as option } from "ts-optchain";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { Actions } from 'reduxStore/actions';
import { UserPrivate, Role } from "typings/gqlTypes";

// Router
import { goToModalConnect } from "utils/modals";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// MUI
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
// Icons
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import StorefrontIcon from "@material-ui/icons/Storefront";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import DownloadIcon from "@material-ui/icons/SaveAlt";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import CardGiftcard from "@material-ui/icons/CardGiftcard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import QAIcon from "@material-ui/icons/QuestionAnswer";
// Router
import Link from "next/link";
import Hidden from "@material-ui/core/Hidden";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { logout } from "queries/requests";



export const UserMenu: React.FC<ReactProps> = (props) => {

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleCloseMenu = () => {
    setAnchorEl(null);
  }

  const { classes } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const user = useSelector<GrandReduxState, UserPrivate>(
    state => state.reduxLogin.user
  );

  const dispatch = useDispatch();
  const goToModal = goToModalConnect(dispatch);
  const router = useRouter();
  const apolloClient = useApolloClient();


  if (!props.loggedIn) {
    return <div className="not-loggedin-no-user-menu"></div>
  } else {
    return (
      <>
        <Hidden mdDown implementation="css">
          <Button
            onClick={handleClickMenu}
            aria-controls="user-menu"
            aria-haspopup="true"
          >
            <span className={classes.iconText}>
              {option(user).firstName("Menu")}
            </span>
            <MenuIcon/>
          </Button>
        </Hidden>
        <Hidden lgUp implementation="css">
          <Button
            onClick={handleClickMenu}
            aria-controls="user-menu"
            aria-haspopup="true"
          >
            <MenuIcon/>
          </Button>
        </Hidden>


        <Menu
          classes={{
            paper: classes.menu,
          }}
          style={{
            zIndex: 5005, // to be above modals
          }}
          id="user-menu"
          anchorEl={anchorEl}
          // anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          // anchorPosition={{ top: 80, left: 1200 }}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >


          {
            user.userRole === Role.PLATFORM_ADMIN &&
            <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>
              {/* <Link href="/gov/random-products"> */}
              <Link href="/gov/payouts/pending-approval">
                <a className={classes.menuLink}>
                  <LibraryBooks className={classes.menuIcon}/>
                  <span className={classes.menuText}> Governance Dashboard</span>
                </a>
              </Link>
            </MenuItem>
          }

          <Divider/>


          <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>
            <Link href="/admin/products">
              <a className={classes.menuLink}>
                <LibraryBooks className={classes.menuIcon}/>
                <span className={classes.menuText}>Seller Dashboard</span>
              </a>
            </Link>
          </MenuItem>

          <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>
            <Link href="/my-orders">
              <a className={classes.menuLink}>
                <ShoppingCartIcon className={classes.menuIcon}/>
                <span className={classes.menuText}> My Orders </span>
              </a>
            </Link>
          </MenuItem>

          {/* <MenuItem  className={classes.menuItem} onClick={handleCloseMenu}>
            <Link href="/my-list">
              <a className={classes.menuLink}>
                <CardGiftcard className={classes.menuIcon}/>
                <span className={classes.menuText}> Wishlist </span>
              </a>
            </Link>
          </MenuItem  className={classes.menuItem}> */}


          <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>
            {
              option(user).store.id()
              ? <Link href="/admin/products">
                  <a className={classes.menuLink}>
                    <StorefrontIcon className={classes.menuIcon}/>
                    <span className={classes.menuText}> Seller Dashboard </span>
                  </a>
                </Link>
              : <Link href="/create-store">
                  <a className={classes.menuLink}>
                    <MonetizationOnIcon className={classes.menuIcon}/>
                    <span className={classes.menuText}> Become a Seller </span>
                  </a>
                </Link>
            }
          </MenuItem>

          <MenuItem className={classes.menuItem} onClick={() => {
            handleCloseMenu();
            goToModal.mySettings()
          }}>
            <a className={classes.menuLink}>
              <PermIdentityIcon className={classes.menuIcon}/>
              <span className={classes.menuText}> My Settings </span>
            </a>
          </MenuItem>

          <Divider/>

          <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>
            <Link href="/faq">
              <a className={classes.menuLink}>
                <QAIcon className={classes.menuIcon}/>
                <span className={classes.menuText}> FAQ </span>
              </a>
            </Link>
          </MenuItem>

          <MenuItem className={classes.menuItem} onClick={() => {
            handleCloseMenu();
            goToModal.contactUs()
          }}>
            <a className={classes.menuLink}>
              <ContactSupportIcon className={classes.menuIcon}/>
              <span className={classes.menuText}> Contact Us </span>
            </a>
          </MenuItem>

          <MenuItem className={classes.menuItem} onClick={() => {
            handleCloseMenu()
            logout(apolloClient, dispatch)('/')
          }}>
            <a className={classes.menuLink}>
              <QAIcon className={classes.menuIcon}/>
              <span className={classes.menuText}> Logout </span>
            </a>
          </MenuItem>

        </Menu>
      </>
    );
  }
}



interface ReactProps extends WithStyles<typeof styles> {
  loggedIn: boolean;
}

/////////////// STYLES /////////////////////
const menuTextColor = Colors.lightGrey;

const styles = (theme: Theme) => createStyles({
  iconText: {
    marginRight: '0.5rem',
  },
  menu: {
    padding: 0,
    top: "3rem",
    right: 0,
    width: theme.spacing(32),
    borderRadius: 16,
    backgroundColor: Colors.uniswapDarkNavy,
  },
  z5001: {
    zIndex: 5001,
  },
  menuText: {
    color: menuTextColor,
    fontSize: '0.9rem',
  },
  menuItem: {
    "&:hover": {
      backgroundColor: Colors.uniswapNavy,
      color: Colors.cream,
    },
  },
  menuIcon: {
    marginRight: "0.5rem",
    color: menuTextColor,
  },
  menuLink: {
    padding: '0.5rem',
    display: 'flex',
    width: '100%',
  },
});


export default withStyles(styles)( UserMenu );

