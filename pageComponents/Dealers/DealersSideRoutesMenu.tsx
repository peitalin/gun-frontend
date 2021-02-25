import React from "react";
import { useState } from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius, BorderRadius3x } from "layout/AppTheme";
// Router
import Link from "next/link";
import { useRouter } from "next/router";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { Actions } from 'reduxStore/actions';
// Utils
import { ID, StorePrivate } from "typings/gqlTypes";
// Material UI
import Typography from "@material-ui/core/Typography";



const GovSideRoutesMenu: React.FC<ReactProps> = (props) => {

  const { classes } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const isSelectedRoute = (path: string): boolean => {
    return router.pathname.split('/').pop() === path.split('/').pop()
  }

  return (
    <div className={classes.routeMenu}>

      <div className={classes.routeProfile}>
        <div className={classes.storeProfile}>
          <Typography className={classes.subtitle}>
            Gov Dashboard
          </Typography>
        </div>
      </div>

      <ul className={classes.routeMenuList}>
        <li>
          <Link href={"/gov"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/gov")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Home
                </Typography>
              </div>
            </a>
          </Link>
        </li>

        <li>
          <Link href={"/gov/test-emails"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("test-emails")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Test Emails
                </Typography>
              </div>
            </a>
          </Link>
        </li>

        <li>
          <Link href={"/gov/random-products"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("random-products")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Random Products
                </Typography>
              </div>
            </a>
          </Link>
        </li>

        <li>
          <Link href={"/gov/orders"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("orders")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Order Viewer
                </Typography>
              </div>
            </a>
          </Link>
        </li>

        <li>
          <Link href={"/gov/users"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("users")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  User Viewer
                </Typography>
              </div>
            </a>
          </Link>
        </li>

        <li>
          <Typography variant="subtitle1" className={classes.routeListItemTitle}>
            Escrow Payouts
          </Typography>
        </li>

        <li>
          <Link href={"/gov/escrow/pending-approval"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/pending-approval")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Pending Approval
                </Typography>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/gov/escrow/approved"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("approved")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Approved Payouts
                </Typography>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href={"/gov/escrow/complete"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("complete")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Completed Payouts
                </Typography>
              </div>
            </a>
          </Link>
        </li>


        <li>
          <Typography variant="subtitle1" className={classes.routeListItemTitle}>
            Expiring Orders
          </Typography>
        </li>


        <li>
          <Link href={"/gov/escrow/expiring"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("expiring")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Expiring Orders
                </Typography>
              </div>
            </a>
          </Link>
        </li>

        <li>
          <Link href={"/gov/escrow/cancelled"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("cancelled")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Cancelled Orders
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
}


const styles = (theme: Theme) => createStyles({
  routeProfile: {
    maxWidth: 250,
  },
  subtitle: {
    fontSize: "1.5rem",
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
    borderRadius: BorderRadius3x,
  },
  routeMenuList: {
    listStyle: "none",
    padding: 0,
    margin: '1rem 0rem',
  },
  routeListItem: {
    padding: "0.8rem 1rem",
    margin: "0.25rem 0rem",
    borderRadius: BorderRadius3x,
    color: Colors.darkGrey,
    fontSize: '0.9rem',
    fontWeight: 500,
    // background: theme.palette.type === 'dark'
    //   ? Colors.uniswapDarkNavy
    //   : 'transparent',
    background: "transparent",
    border: '1px solid rgba(0,0,0,0)',
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? fade(Colors.lightGrey, 0.1)
        : Colors.cream,
      transition: theme.transitions.create(['background', 'border-right'], {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      }),
    }
  },
  routeListItemSelected: {
    padding: "0.8rem 1rem",
    margin: "0.25rem 0rem",
    borderRadius: BorderRadius3x,
    color: Colors.darkGrey,
    fontSize: '0.9rem',
    fontWeight: 500,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.mediumGrey}`
      : `1px solid ${Colors.charcoal}`,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.darkWhite,
    "&:hover": {
      background: theme.palette.type === 'dark'
        ? fade(Colors.lightGrey, 0.1)
        : Colors.cream,
      transition: theme.transitions.create(['background', 'border-right'], {
        easing: theme.transitions.easing.easeIn,
        duration: "100ms",
      }),
    }
  },
  routeListItemTitle: {
    textAlign: "start",
    fontSize: '1.15rem',
    marginTop: "1rem",
    marginBottom: "1rem",
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
  },
});


export default withStyles(styles)( GovSideRoutesMenu );