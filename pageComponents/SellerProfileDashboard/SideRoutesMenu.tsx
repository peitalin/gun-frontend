import React from "react";
import { useState } from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, Gradients, BorderRadius } from "layout/AppTheme";
// Router
import Link from "next/link";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { Actions } from 'reduxStore/actions';
// Utils
import { ID, StorePrivate } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextInput from "components/Fields/TextInput";
import CloudUpload from "@material-ui/icons/CloudUpload";
import Tooltip from '@material-ui/core/Tooltip';

import { useRouter } from "next/router";
import Router from 'next/router'



const SideMenu: React.FC<ReactProps> = (props) => {

  const isSelectedRoute = (path: string): boolean => {
    return Router.pathname.split('/').pop() === path.split('/').pop()
  }

  const copyText = () => {
    var copyText = document.getElementById("copyText") as HTMLInputElement;
    copyText.select();
    document.execCommand("copy");
    console.log("copied: ", copyText.value);
  }


  const { classes, storePrivate } = props;
  const profile = option(storePrivate).profile();
  // imgloaded
  const [avatarImgLoaded, setAvatarImgLoaded] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className={classes.routeMenu}>
      <div className={classes.routeProfile}>
        <div className={classes.storeProfile}>

          <div className={classes.avatarBorder}>
            <Avatar className={classes.avatar}>
              <img
                src={option(profile).original.url()}
                onLoad={() => setAvatarImgLoaded(true)}
                className={clsx(
                  classes.avatarImg,
                  avatarImgLoaded ? "fadeIn" : null,
                )}
              />
            </Avatar>
          </div>

          <Link
            href="/s/[storeId]"
            as={`/s/${storePrivate.id}`}
            scroll={false}
          >
            <a className={clsx(classes.flexCol, classes.viewStoreLink)}>
              <Tooltip title="View my store" placement={"left"}>
                <Typography className={classes.subtitle} variant="h6">
                  {storePrivate && storePrivate.name}
                </Typography>
              </Tooltip>
            </a>
          </Link>

        </div>
      </div>

      <ul className={classes.routeMenuList}>
        <li>
          <Link href={"/admin/edit-store"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/admin/edit-store")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Edit Store
                </Typography>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/admin/products"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/admin/products")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Products
                </Typography>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/orders"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/orders")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Orders
                </Typography>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/admin/offers"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/admin/offers")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Offers
                </Typography>
              </div>
            </a>
          </Link>
        </li>

      </ul>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  storePrivate: StorePrivate;
}


const styles = (theme: Theme) => createStyles({
  routeProfile: {
    maxWidth: 250,
  },
  subtitle: {
    "&:hover": {
      color: Colors.secondary,
    }
  },
  routeMenu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexBasis: '15%',
    maxWidth: 250,
    minWidth: 210,
    margin: '4rem 1rem 0rem 1rem',
    // border: `1px solid ${Colors.lightGrey}`,
    // borderBottom: `0px solid ${Colors.lightGrey}`,
    borderRadius: '2px',
  },
  routeMenuList: {
    listStyle: "none",
    padding: 0,
    margin: '1rem 0rem',
  },
  routeListItem: {
    padding: "0.6rem 1rem",
    margin: "0.25rem 0rem",
    color: Colors.darkGrey,
    fontSize: '0.9rem',
    fontWeight: 500,
    borderRight: '4px solid rgba(0,0,0,0)',
    "&:hover": {
      background: fade(Colors.lightGrey, 0.05),
      transition: theme.transitions.create(['background', 'border-right'], {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      }),
    }
  },
  routeListItemSelected: {
    padding: "0.6rem 1rem",
    margin: "0.25rem 0rem",
    color: Colors.gradientUniswapFluro1,
    fontSize: '0.9rem',
    fontWeight: 500,
    borderRight: `4px solid ${Colors.gradientUniswapFluro1}`,
    "&:hover": {
      background: fade(Colors.lightGrey, 0.05),
      transition: theme.transitions.create(['background', 'border-right'], {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      }),
    }
  },
  routeListItemText: {
    textAlign: "start",
    fontSize: '0.9rem',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  routeSectionDivider: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: '0.5rem',
    marginBottom: "0.5rem",
    borderBottom: `2px solid ${Colors.charcoal}`,
  },
  storeProfile: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    margin: "2rem 0rem 0rem 0rem",
    maxWidth: 300,
  },
  // avatar outline circle
  avatarBorder: {
    marginBottom: "0.5rem",
    height: '106px',
    width: '106px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    // background: Gradients.gradientPurple.background,
    // background: Gradients.gradientUniswapFluro.background,
    background: Gradients.gradientUniswapFluro.background,
  },
  avatar: {
    width: 100,
    height: 100,
    marginTop: '1rem',
    marginBottom: '1rem',
    border: `4px solid ${Colors.uniswapNavy}`,
    background: Colors.uniswapNavy,
  },
  // avatar image
  avatarImg: {
    // make a little bigger to fit avatar
    // objectFit: 'cover',
    height: "104%",
    width: "104%",
    transition: theme.transitions.create('filter', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  addItemButton: {
    padding: "0.5rem 1rem",
    marginTop: "0.25rem",
    marginBottom: "0.25rem",
    width: '100%',
    borderRadius: '2px',
    border: `1px solid ${Colors.secondary}`,
    backgroundColor: Colors.secondary,
    minWidth: 180,
  },
  addItemButtonText: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: Colors.cream,
    textTransform: "none",
  },
  viewSellerProfileButton: {
    width: '100%',
    position: 'relative',
    backgroundColor: Colors.cream,
  },
  viewStoreLink: {
    margin: '0.5rem 0rem',
  },
  viewMyStoreText: {
    textAlign: 'center',
    color: Colors.blue,
    fontSize: '0.9rem',
    fontWeight: 600,
    "&:hover": {
      color: fade(Colors.blue, 0.8),
    }
  },
  storeLink: {
    marginTop: '2rem',
    // marginLeft: '1rem',
    fontWeight: 600,
  },
  storeNameCopyContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '1rem',
    width: '100%',
    maxWidth: 400,
  },
  storeNameCopyButton: {
    borderRadius: '0px 4px 4px 0px',
    borderTop: '1px solid rgba(36, 132, 255, 0.7)',
    borderRight: '1px solid rgba(36, 132, 255, 0.7)',
    borderBottom: '1px solid rgba(36, 132, 255, 0.7)',
    borderLeft: '1px solid rgba(36, 132, 255, 0.7)',
    color: "rgba(36, 132, 255, 0.8)",
    backgroundColor: "rgba(36, 132, 255, 0.1)",
  },
  storeNameCopy: {
    width: '100%',
    height: 35,
    fontSize: '1rem',
    border: '1px solid #ced4da',
    borderRight: '0px solid rgba(36, 132, 255, 0.7)',
    borderRadius: '4px 0px 0px 4px',
    padding: '0rem 0.5rem',
    outline: 'none',
  },
});


export default withStyles(styles)( SideMenu );