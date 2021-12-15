import React from "react";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { GrandReduxState, Actions } from 'reduxStore/grand-reducer';
import { UserPrivate, Role } from "typings/gqlTypes";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, BorderRadius2x, BorderRadius4x } from "layout/AppTheme";
// MUI
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
// Icons
import GavelIcon from '@mui/icons-material/Gavel';
import StorefrontIcon from "@mui/icons-material/Storefront";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DownloadIcon from "@mui/icons-material/SaveAlt";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import CollectionsIcon from '@mui/icons-material/Collections';

import ToggleDarkMode from "layout/NavBarMain/ToggleDarkMode";

// Router
import Link from "next/link";
import Hidden from "@mui/material/Hidden";
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

  const { classes, color } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const {
    user,
  } = useSelector<GrandReduxState, ReduxProps>(state => ({
    user: state?.reduxLogin?.user,
  }));

  const dispatch = useDispatch();
  // const goToModal = goToModalConnect(dispatch);
  // const router = useRouter();
  const apolloClient = useApolloClient();


  return <>
    <Hidden mdDown implementation="css">
      <Button
        className={props.className}
        classes={{
          label: classes.navbarButtonLabel
        }}
        onClick={handleClickMenu}
        aria-controls="user-menu"
        aria-haspopup="true"
      >
        <span className={classes.iconText}
          style={{ color: color }}
        >
          {user?.defaultLicense?.firstName ?? "Menu"}
        </span>
        <MenuIcon style={{ fill: color }}/>
      </Button>
    </Hidden>
    <Hidden mdUp implementation="css">
      <Button
        className={props.className}
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
          <Link href="/gov/escrow/pending-approval">
            <a className={classes.menuLink}>
              <GavelIcon className={classes.menuIcon}/>
              <span className={classes.menuText}>
                Governance Dashboard
              </span>
            </a>
          </Link>
        </MenuItem>
      }

      {
        (user.userRole === Role.PLATFORM_ADMIN ||
        user.userRole === Role.DEALER) &&
        <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>
          {/* <Link href="/gov/random-products"> */}
          <Link href="/dealers">
            <a className={classes.menuLink}>
              <GavelIcon className={classes.menuIcon}
                style={{}}/>
              <span className={classes.menuText}>
                Dealer Dashboard
              </span>
            </a>
          </Link>
        </MenuItem>
      }

      <Divider/>

      <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>
        {
          user?.store?.id
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

      {/* <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>
        <Link href="/orders">
          <a className={classes.menuLink}>
            <ShoppingCartIcon className={classes.menuIcon}/>
            <span className={classes.menuText}> My Orders </span>
          </a>
        </Link>
      </MenuItem>

      <MenuItem  className={classes.menuItem} onClick={handleCloseMenu}>
        <Link href="/bids">
          <a className={classes.menuLink}>
            <HowToVoteIcon className={classes.menuIcon}/>
            <span className={classes.menuText}> My Bids </span>
          </a>
        </Link>
      </MenuItem> */}

      <MenuItem  className={classes.menuItem} onClick={handleCloseMenu}>
        <Link href="/saved-searches">
          <a className={classes.menuLink}>
            <SearchIcon className={classes.menuIcon}/>
            <span className={classes.menuText}>Saved Searches </span>
          </a>
        </Link>
      </MenuItem>

      <MenuItem  className={classes.menuItem} onClick={handleCloseMenu}>
        <Link href="/collections">
          <a className={classes.menuLink}>
            <CollectionsIcon className={classes.menuIcon}/>
            <span className={classes.menuText}>Collections </span>
          </a>
        </Link>
      </MenuItem>

      <Divider/>

      <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>
        <Link href="/settings">
          <a className={classes.menuLink}>
            <SettingsIcon className={classes.menuIcon}/>
            <span className={classes.menuText}> Settings </span>
          </a>
        </Link>
      </MenuItem>

      <MenuItem className={classes.menuItem}>
        <div className={classes.menuLink}>
          <Brightness4Icon className={classes.menuIcon}/>
          <span className={classes.menuText}> Dark Mode </span>
          <div className={classes.darkModeToggle}>
            <ToggleDarkMode callback={handleCloseMenu}/>
          </div>
        </div>
      </MenuItem>


      <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>
        <Link href="/help/faq">
          <a className={classes.menuLink}>
            <HelpOutlineIcon className={classes.menuIcon}/>
            <span className={classes.menuText}> FAQ </span>
          </a>
        </Link>
      </MenuItem>

      <MenuItem className={classes.menuItem} onClick={() => {
        handleCloseMenu()
        logout(apolloClient, dispatch)('/')
      }}>
        <a className={classes.menuLink}>
          <PowerSettingsNewIcon className={classes.menuIcon} />
          <span className={classes.menuText}> Logout </span>
        </a>
      </MenuItem>

    </Menu>
  </>;
}



interface ReactProps extends WithStyles<typeof styles> {
  color?: string;
  className?: any;
}
interface ReduxProps {
  user: UserPrivate;
}

/////////////// STYLES /////////////////////

const styles = (theme: Theme) => createStyles({
  iconText: {
    marginRight: '0.5rem',
  },
  menu: {
    padding: 0,
    top: "3rem !important",
    right: 0,
    width: theme.spacing(32),
    borderRadius: BorderRadius2x,
    backgroundColor: theme.palette.mode === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey,
  },
  z5001: {
    zIndex: 5001,
  },
  navbarButtonLabel: {
    height: '100%',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
  },
  menuText: {
    color: theme.palette.mode === 'dark'
      ? Colors.lightGrey
      : Colors.black,
    fontSize: '0.9rem',
  },
  menuIcon: {
    marginRight: "0.5rem",
    color: theme.palette.mode === 'dark'
      ? Colors.lightGrey
      : Colors.black,
  },
  menuItem: {
    "&:hover": {
      backgroundColor: theme.palette.mode === 'dark'
        ? Colors.uniswapNavy
        : Colors.slateGreyDarker,
      color: Colors.cream,
    },
  },
  menuLink: {
    position: 'relative',
    padding: '0.5rem',
    display: 'flex',
    width: '100%',
  },
  darkModeToggle: {
    position: 'absolute',
    top: 0,
    right: '1rem',
  },
});


export default withStyles(styles)( UserMenu );

