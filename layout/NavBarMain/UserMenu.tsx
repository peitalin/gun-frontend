import React from "react";
import { oc as option } from "ts-optchain";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { Actions } from 'reduxStore/actions';
import { UserPrivate } from "typings/gqlTypes";
// Router
import { goToModalConnect } from "utils/modals";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// MUI
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
// Icons
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import StoreIcon from "@material-ui/icons/Store";
import DownloadIcon from "@material-ui/icons/SaveAlt";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import CardGiftcard from "@material-ui/icons/CardGiftcard";
import QAIcon from "@material-ui/icons/QuestionAnswer";
// Router
import Link from "next/link";
import Hidden from "@material-ui/core/Hidden";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/react-hooks";



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

          <MenuItem onClick={handleCloseMenu}>
            <Link href="/my-downloads">
              <a className={classes.menuLink}>
                <DownloadIcon className={classes.menuIcon}/>
                <span className={classes.menuText}> My Downloads </span>
              </a>
            </Link>
          </MenuItem>

          <MenuItem onClick={handleCloseMenu}>
            <Link href="/my-list">
              <a className={classes.menuLink}>
                <CardGiftcard className={classes.menuIcon}/>
                <span className={classes.menuText}> Wishlist </span>
              </a>
            </Link>
          </MenuItem>

          <MenuItem onClick={handleCloseMenu}>
            {
              option(user).store.id()
              ? <Link href="/seller">
                  <a className={classes.menuLink}>
                    <StoreIcon className={classes.menuIcon}/>
                    <span className={classes.menuText}> Seller Dashboard </span>
                  </a>
                </Link>
              : <Link href="/become-a-seller">
                  <a className={classes.menuLink}>
                    <MonetizationOnIcon className={classes.menuIcon}/>
                    <span className={classes.menuText}> Become a Seller </span>
                  </a>
                </Link>
            }
          </MenuItem>

          <MenuItem onClick={() => {
            handleCloseMenu();
            goToModal.mySettings()
          }}>
            <a className={classes.menuLink}>
              <PermIdentityIcon className={classes.menuIcon}/>
              <span className={classes.menuText}> My Settings </span>
            </a>
          </MenuItem>

          <Divider/>

          <MenuItem onClick={handleCloseMenu}>
            <Link href="/faq">
              <a className={classes.menuLink}>
                <QAIcon className={classes.menuIcon}/>
                <span className={classes.menuText}> FAQ </span>
              </a>
            </Link>
          </MenuItem>

          <MenuItem onClick={() => {
            handleCloseMenu();
            goToModal.contactUs()
          }}>
            <a className={classes.menuLink}>
              <ContactSupportIcon className={classes.menuIcon}/>
              <span className={classes.menuText}> Contact Us </span>
            </a>
          </MenuItem>

          <MenuItem onClick={() => {
            handleCloseMenu()
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
const menuTextColor = "#484848";

const styles = (theme: Theme) => createStyles({
  iconText: {
    marginRight: '0.5rem',
  },
  menu: {
    padding: 0,
    top: "3rem",
    right: 0,
    width: theme.spacing(32),
    borderRadius: 0,
  },
  z5001: {
    zIndex: 5001,
  },
  menuText: {
    color: menuTextColor,
    fontSize: '0.9rem',
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

