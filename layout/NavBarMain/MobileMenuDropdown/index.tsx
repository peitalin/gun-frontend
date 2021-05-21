import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius, Gradients } from "layout/AppTheme";
import { NewsBarHeight, MainBarHeightDashboard, NavBarHeight } from "layout/NavBarMain/styles";
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { GrandReduxState } from 'reduxStore/grand-reducer';
import { Actions } from 'reduxStore/actions';
// typings
import { UserPrivate, StorePrivate } from "typings/gqlTypes";

// MUI
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import Divider from "components/Divider";
import Typography from "@material-ui/core/Typography";
// Components
import MobileMenuUserProfile from "./MobileMenuUserProfile";
import MobileMenuRoutes from "./MobileMenuRoutes";




export const MobileMenuDropdown: React.FC<ReactProps> = (props) => {

  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    classes,
    color
  } = props;

  function toggleMenuOpen(event) {
    setMobileMenuOpen(s => !s);
  }

  const dispatch = useDispatch();

  const closeMobileMenuWithDelay = () => {
    setTimeout(() => {
      setMobileMenuOpen(s => false)
    }, 0)
  }

  return (
    <menu className={classes.root}>
      <Button
        className={props.className}
        onClick={toggleMenuOpen}
        aria-controls="user-menu"
        aria-haspopup="true"
      >
        {
          mobileMenuOpen
          ? <ClearIcon style={{ fill: color }} />
          : <MenuIcon style={{ fill: color }} />
        }
      </Button>
      <MobileMenuExpander classes={classes}
        open={mobileMenuOpen}
      >
        <MobileMenuRoutes
          mobileMenuOpen={mobileMenuOpen}
          closeMobileMenu={closeMobileMenuWithDelay}
        />
        <Divider style={{ width: "90%" }}/>
        <MobileMenuUserProfile
          closeMobileMenu={closeMobileMenuWithDelay}
        />
      </MobileMenuExpander>
    </menu>
  );
}


const MobileMenuExpander: React.FC<MobileMenuExpanderProps> = (props) => {

  const { classes, open } = props;

  if (open) {
    return (
      <div className={clsx(
        classes.mobileMenuExpanderRoot,
        'fadeInFast',
      )}>
        <div className={classes.mobileMenuOuterContainer}>
          { props.children }
        </div>
      </div>
    )
  } else {
    return <></>
  }
}



interface ReactProps extends WithStyles<typeof styles> {
  className?: any;
  loggedIn: boolean;
  color?: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen(f: (s: boolean) => boolean): void;
}

interface MobileMenuExpanderProps extends WithStyles<typeof styles> {
  open: boolean;
}


/////////////// STYLES /////////////////////

const styles = (theme: Theme) => createStyles({
  root: {
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: BorderRadius,
  },
  mobileMenuExpanderRoot: {
    zIndex: 2,
    position: "absolute", // relative to MainBar, which is under NewsBar
    top: `calc(${MainBarHeightDashboard}px + 1rem - 1px)`, // 1px tucked under navbar
    left: '0.5rem',
    width: 'calc(100% - 1rem)',
    borderRadius: BorderRadius,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      : Colors.cream,
    border: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapMediumNavy}`
      : `1px solid ${Colors.slateGreyBlack}`,
    // transform: "translateX(-100%)",
    // opacity: 0,
    // transition: theme.transitions.create(['all'], {
    //   easing: theme.transitions.easing.easeInOut,
    //   duration: "300ms",
    // })
  },
  mobileMenuOuterContainer: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});


export default withStyles(styles)( MobileMenuDropdown );

