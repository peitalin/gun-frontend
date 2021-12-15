import React from "react";
import clsx from "clsx";
// Styles
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, Gradients, BorderRadius } from "layout/AppTheme";
// Router
import Link from "next/link";
// Material UI
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";



const HelpSideRoutesMenu: React.FC<ReactProps> = (props) => {

  let router = useRouter()

  const isSelectedRoute = (path: string): boolean => {
    return router.pathname.split('/').pop() === path.split('/').pop()
  }

  const { classes } = props;

  return (
    <div className={classes.routeMenu}>

      <ul className={classes.routeMenuList}>
        <li>
          <Link href={"/help/faq"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/help/faq")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  FAQ
                </Typography>
              </div>
            </a>
          </Link>
        </li>

        <li>
          <Link href={"/help/privacy"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/help/privacy")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Privacy Policy
                </Typography>
              </div>
            </a>
          </Link>
        </li>

        <li>
          <Link href={"/help/terms"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/help/terms")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Terms of Use
                </Typography>
              </div>
            </a>
          </Link>
        </li>

        <li>
          <Link href={"/help/about-us"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/help/about-us")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  About Us
                </Typography>
              </div>
            </a>
          </Link>
        </li>

        <li>
          <Link href={"/help/firearm-registries"} scroll={false}>
            <a>
              <div className={
                isSelectedRoute("/help/firearm-registries")
                  ? classes.routeListItemSelected
                  : classes.routeListItem
              }>
                <Typography variant="subtitle1" className={classes.routeListItemText}>
                  Firearm Registries
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
  title: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: theme.palette.mode === 'dark'
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
    borderRight: '2px solid rgba(0,0,0,0)',
    borderRadius: BorderRadius,
    "&:hover": {
      background: theme.palette.mode === 'dark'
        ? alpha(Colors.lightGrey, 0.05)
        : alpha(Colors.black, 0.05),
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
      color: theme.palette.mode === 'dark'
        ? Colors.purple
        : Colors.blue,
    },
    borderRight: theme.palette.mode === 'dark'
      ? `2px solid ${Colors.purple}`
      : `2px solid ${Colors.lightBlue}`,
    borderRadius: `${BorderRadius}px 0px 0px ${BorderRadius}px`,
    "&:hover": {
      background: theme.palette.mode === 'dark'
        ? alpha(Colors.lightGrey, 0.05)
        : alpha(Colors.black, 0.05),
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
});


export default withStyles(styles)( HelpSideRoutesMenu );