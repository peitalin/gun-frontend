import React from "react";
import { useState } from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
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
import { useRouter } from "next/router";
import Router from 'next/router'
import { getStoreIdOrSlug } from "utils/links";



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

          <Typography className={classes.subtitle} variant="h6">
            {storePrivate && storePrivate.name}
          </Typography>

          <ul className={classes.routeMenuList}>
            <li>
              <Button
                variant="outlined"
                color="primary"
                className={classes.viewSellerProfileButton}
                onClick={() => {
                  Router.push(
                    "/seller/edit-seller-profile",
                    undefined,
                    { scroll: false }
                  )
                }}
              >
                Edit Seller Profile
              </Button>
            </li>
            <li>
              <Link
                href="/s/[storeIdOrSlug]"
                as={`/s/${getStoreIdOrSlug(storePrivate)}`}
                scroll={false}
              >
                <a className={clsx(classes.flexCol, classes.viewStoreLink)}>
                  <Typography variant="body1" className={classes.viewMyStoreText}>
                    View My Store
                  </Typography>
                </a>
              </Link>
            </li>
            <li>
              <Button
                variant="contained"
                color="secondary"
                className={classes.addItemButton}
                onClick={() => {
                  Router.push(
                    "/sell",
                    undefined,
                    { scroll: false }
                  )
                }}
              >
                <Typography variant="body2" className={classes.addItemButtonText}>
                  <CloudUpload style={{ marginRight: '0.5rem' }}/>
                  Upload Product
                </Typography>
              </Button>
            </li>
          </ul>
        </div>
      </div>

      <ul className={classes.routeMenuList}>
        <li>
          <Link href={"/seller"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/seller")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  My Products
                </Typography>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/seller/unpublished-products"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("unpublished-products")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  My Unpublished Products
                </Typography>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/seller/sales"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("sales")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  My Sales
                </Typography>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/seller/payouts"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("payouts")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  My Payouts
                </Typography>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/seller/promo-codes"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("promo-codes")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Manage Promo Codes
                </Typography>
              </div>
            </a>
          </Link>
        </li>


        <li>
          <Typography variant="body1" className={classes.storeLink}>
            Store Link
          </Typography>
          <div className={classes.storeNameCopyContainer}>
            <input
              className={classes.storeNameCopy}
              type="text"
              value={`relaydownloads.com/s/${storePrivate.id}`}
              onChange={() => {}}
              id="copyText"
            />
            <Button
              variant="outlined"
              className={classes.storeNameCopyButton}
              onClick={copyText}
            >
              Copy
            </Button>
          </div>
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
    borderRadius: `4px`,
    color: Colors.darkGrey,
    fontSize: '0.9rem',
    fontWeight: 500,
    background: fade(Colors.foregroundColor, 0),
    border: '1px solid rgba(0,0,0,0)',
    "&:hover": {
      background: fade(Colors.lightGrey, 0.5),
      transition: theme.transitions.create(['background', 'border-right'], {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      }),
    }
  },
  routeListItemSelected: {
    padding: "0.6rem 1rem",
    margin: "0.25rem 0rem",
    borderRadius: `4px`,
    color: Colors.darkGrey,
    fontSize: '0.9rem',
    fontWeight: 500,
    border: `1px solid ${Colors.mediumGrey}`,
    background: Colors.foregroundColor,
    "&:hover": {
      background: fade(Colors.lightGrey, 0.5),
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
  avatar: {
    width: 100,
    height: 100,
    // border: `3px solid ${Colors.foregroundColor}`,
    boxShadow: "0px 0px 1px 1px rgba(0,0,0,0.5)",
    marginTop: '1rem',
    marginBottom: '1rem',
    color: Colors.charcoal,
    backgroundColor: "#fafafa",
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0hv20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23ddd' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  },
  // avatar image
  avatarImg: {
    // make a little bigger to fit avatar
    objectFit: 'cover',
    height: "105%",
    width: "105%",
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