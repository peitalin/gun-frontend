import React from "react";
import { oc as option } from "ts-optchain";
// typings
// Styles
import clsx from 'clsx';
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { styles } from "../styles";
// Components
import Login from "layout/Login";
import Logo from "components/Icons/Logo";
import Badge from '@material-ui/core/Badge';
import Searchbar from "layout/NavBarMain/Searchbar";
// MUI
import UserMenu from "layout/NavBarMain/UserMenu";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';
// Modals
import { goToModalConnect } from "utils/modals";
import { useDispatch, useSelector } from "react-redux";
// Chat
import OpenChatButton from "pageComponents/ChatCenter/OpenChatButton";
// Router
import Link from "next/link";
import { useRouter } from "next/router";
import { asCurrency as c } from "utils/prices";



const DesktopMainBarLg = (props: DesktopMainBarProps) => {

  const {
    classes,
    endRoute,
    cartCount,
    loggedIn,
    color,
    subtotal,
  } = props;

  const dispatch = useDispatch();
  const goToModal = goToModalConnect(dispatch);
  const router = useRouter()
  const [hide, setHide] = React.useState(false)

  const goToProductCreate = () => {
    router.push('/sell')
  }

  const goToMyWishlist = () => {
    router.push('/my-list')
  }

  const goToMyDownloads = () => {
    router.push('/my-orders')
  }

  return (
    <div className={classes.baseBarInner}>

      <div style={{ flexBasis: '0.5rem' }}></div>

      <Link href="/">
        <a className={classes.buttonLinkLogo}>
          <Logo color={color}/>
        </a>
      </Link>

      <div style={{ marginRight: '1rem' }} className={
        !hide ? "fadeIn" : null
      }>
        <Searchbar color={color}/>
      </div>

      <div style={{ flexGrow: 0.9 }}/>

      <div className={clsx(
        classes.mainBarInner,
        hide ? "displayNone" : "fadeIn"
      )}>
        <Button
          className={clsx(
            classes.navbarButton,
            endRoute === 'sell' ? classes.navbarButtonSelected : null,
          )}
          variant="text"
          color="primary"
          onClick={() => goToProductCreate()}
        >
          <div className={classes.flexItem}>
            <span className={
              endRoute === 'sell' ? classes.selectedRouteText : null
            }>
              Sell
            </span>
          </div>
        </Button>


        {
          loggedIn
          ? <Button
              className={classes.navbarButton}
              variant={"text"}
              color="primary"
              onClick={goToMyWishlist}
            >
              <div>
                <span className={
                  endRoute === 'my-list' ? classes.selectedRouteText : null
                }>
                  Wishlist
                </span>
              </div>
            </Button>
          : <div className={classes.myDownloadsLogin}>
              <Login
                buttonText={"Wishlist"}
                titleLogin={"Login to continue"}
                buttonProps={{ color: "primary" }}
              />
            </div>
          }

        {/* {
          loggedIn
          ? <Button
              className={classes.navbarButton}
              variant={"text"}
              color="primary"
              onClick={goToMyDownloads}
            >
              <div>
                <span className={
                  endRoute === 'my-orders' ? classes.selectedRouteText : null
                }>
                    Orders
                </span>
              </div>
            </Button>
          : <div className={classes.myDownloadsLogin}>
              <Login
                buttonText={"Orders"}
                titleLogin={"Login to continue"}
                buttonProps={{ color: "primary" }}
              />
            </div>
          } */}

        {
          loggedIn
          ? <OpenChatButton
              title={"Offers"}
              buttonProps={{
                color: "primary",
                classes: {
                  root: classes.marginRight,
                },
              }}
            />
          : <div className={classes.myDownloadsLogin}>
              <Login
                buttonText={"Offers"}
                titleLogin={"Login to continue"}
                buttonProps={{
                  color: "primary",
                }}
              />
            </div>
        }

        {/* <Button
          className={classes.navbarButton}
          variant="text"
          color="primary"
          onClick={() => goToModal.checkout()}
        >
          <Badge
            badgeContent={cartCount}
            classes={{ colorSecondary: classes.badge }}
            color="secondary"
          >
            <ShoppingCartIcon className={classes.icons}/>
          </Badge>
          <span className={classes.cartText}>
            {c(subtotal)}
          </span>
        </Button> */}

        <div className={classes.navbarButton}>
          <UserMenu loggedIn={loggedIn} />
          {
            !loggedIn &&
            <Login/>
          }
        </div>
      </div>

      <div style={{ flexGrow: 0.1 }}/>
    </div>
  )
}

interface DesktopMainBarProps extends WithStyles<typeof styles> {
  endRoute: string;
  cartCount: number;
  loggedIn: boolean;
  color: string;
  subtotal: number;
}

export default withStyles(styles)( DesktopMainBarLg );
