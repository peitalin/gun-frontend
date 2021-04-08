import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, Gradients, BorderRadius } from "layout/AppTheme";
// Router
import Link from "next/link";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState, Actions } from 'reduxStore/grand-reducer';
// Utils
import { ID, UserPrivate, Dealers } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';

import { useRouter } from "next/router";
import Router from 'next/router'



const SellersSideRoutesMenu: React.FC<ReactProps> = (props) => {

  const isSelectedRoute = (path: string): boolean => {
    return Router.pathname.split('/').pop() === path.split('/').pop()
  }

  const { classes, user } = props;

  return (
    <div className={classes.routeMenu}>
      <div className={classes.routeProfile}>
        <div className={classes.storeProfile}>

          {/* {
            dealerId &&
            <div className={classes.avatarBorder}>
              <Avatar className={classes.avatar}>
                <img
                  src={profile?.original?.url}
                  onLoad={() => setAvatarImgLoaded(true)}
                  className={clsx(
                    classes.avatarImg,
                    avatarImgLoaded ? "fadeIn" : null,
                  )}
                />
              </Avatar>
            </div>
          } */}

          <Link
            href="/s/[storeId]"
            as={`/s/${user?.store?.id}`}
            scroll={false}
          >
            <a className={clsx(classes.flexCol, classes.viewStoreLink)}>
              <Tooltip title="View my store" placement={"left"}>
                <Typography className={classes.title} variant="h6">
                  {user?.store?.name}
                </Typography>
              </Tooltip>
            </a>
          </Link>
          <Typography className={classes.subtitle} variant="h6">
            {user?.license?.licenseNumber}
          </Typography>
          <Typography className={classes.subtitle} variant="h6">
            {user?.license?.licenseState}
          </Typography>

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
          <Link href={"/admin/orders"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/admin/orders")
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
  user: UserPrivate;
}


const styles = (theme: Theme) => createStyles({
  routeProfile: {
    maxWidth: 250,
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
    "&:hover": {
      color: Colors.secondary,
    },
  },
  subtitle: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: Colors.uniswapLighterGrey,
    width: '100%',
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
    borderRadius: BorderRadius,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? fade(Colors.lightGrey, 0.05)
        : fade(Colors.black, 0.05),
      transition: theme.transitions.create(['background', 'border-right'], {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      }),
    }
  },
  routeListItemSelected: {
    padding: "0.6rem 1rem",
    margin: "0.25rem 0rem",
    fontSize: '0.9rem',
    fontWeight: 500,
    "& > h6": {
      color: theme.palette.type === 'dark'
        ? Colors.purple
        : Colors.blue,
    },
    borderRight: theme.palette.type === 'dark'
      ? `2px solid ${Colors.purple}`
      : `2px solid ${Colors.lightBlue}`,
    borderRadius: `${BorderRadius}px 0px 0px ${BorderRadius}px`,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? fade(Colors.lightGrey, 0.05)
        : fade(Colors.black, 0.05),
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
  storeProfile: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    margin: "2rem 0rem 0rem 0rem",
    maxWidth: 300,
    width: "100%",
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
  viewStoreLink: {
    margin: '0.5rem 0rem',
  },
});


export default withStyles(styles)( SellersSideRoutesMenu );