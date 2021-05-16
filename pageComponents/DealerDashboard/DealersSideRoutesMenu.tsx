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



const DealersSideRoutesMenu: React.FC<ReactProps> = (props) => {

  const router = useRouter()

  const isSelectedRoute = (path: string): boolean => {
    return router.pathname.split('/').pop() === path.split('/').pop()
  }

  const { classes, user } = props;
  // console.log("dealer.user :", user)

  return (
    <div className={classes.routeMenu}>

      <div className={classes.routeProfile}>
        <div className={classes.dealerProfile}>

          <Link
            href="/dealers/[dealerId]"
            as={`/dealers/${user?.dealer?.id}`}
            scroll={false}
          >
            <Typography className={classes.title} variant="h6">
              {user?.dealer?.name}
            </Typography>
          </Link>
          <Typography className={classes.subtitle} variant="h6">
            {user?.dealer?.licenseNumber}
          </Typography>
          {
            user?.dealer?.city &&
            <Typography className={classes.subtitle} variant="h6">
              {user?.dealer?.city}
            </Typography>
          }
          {
            user?.dealer?.state &&
            user?.dealer?.postCode &&
            <Typography className={classes.subtitle} variant="h6">
              {`${user?.dealer?.postCode}, ${user?.dealer?.state}`}
            </Typography>
          }

        </div>
      </div>

      <ul className={classes.routeMenuList}>

        <li>
          <Typography variant="subtitle1" className={classes.routeListItemTitle}>
            Dealer Dashboard
          </Typography>
        </li>

        <li>
          <Link href={"/dealers"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/dealers")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Edit Dealer Profile
                </Typography>
              </div>
            </a>
          </Link>
        </li>


        <li>
          <Link href={"/dealers/escrow/orders"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/orders")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Arriving Orders
                </Typography>
              </div>
            </a>
          </Link>
        </li>

        <li>
          <Link href={"/dealers/escrow/orders-completing"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/orders-completing")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Completing Orders
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
    lineHeight: '1.5rem',
    fontWeight: 600,
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightestGrey
      : Colors.black,
    marginBottom: '0.5rem',
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
    borderRight: '2px solid rgba(0,0,0,0)',
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
  dealerProfile: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    margin: "1rem 0rem 2rem 1rem",
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


export default withStyles(styles)( DealersSideRoutesMenu );