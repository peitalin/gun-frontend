import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius, Gradients } from "layout/AppTheme";
import { MainBarHeight, CategoryBarHeight } from "layout/NavBarMain/styles";
import { DashboardBarHeight } from "pageComponents/Gov/GovDashboardMobileMenu/styles";

// MUI
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";
import Button from "@material-ui/core/Button";
import Divider from "components/Divider";
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
        isDashboardPage={props.isDashboardPage}
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

  const { classes, open, isDashboardPage } = props;
  // console.log("isDashboardPage", isDashboardPage)

  if (open) {
    return (
      <div className={clsx(
        classes.mobileMenuExpanderRoot,
        isDashboardPage ? classes.menuTopDashboard : classes.menuTop,
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
  isDashboardPage: boolean;
}

interface MobileMenuExpanderProps extends WithStyles<typeof styles> {
  open: boolean;
  isDashboardPage: boolean;
}


/////////////// STYLES /////////////////////

const styles = (theme: Theme) => createStyles({
  root: {
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: BorderRadius,
  },
  menuTop: {
    top: `calc(${MainBarHeight + CategoryBarHeight}px + 0.25rem)`, // 1px tucked under navbar
  },
  menuTopDashboard: {
    top: `calc(${MainBarHeight + CategoryBarHeight + DashboardBarHeight}px + 0.25rem)`,
  },
  mobileMenuExpanderRoot: {
    zIndex: 2,
    position: "absolute", // relative to MainBar, which is under NewsBar
    left: '0.25rem',
    width: 'calc(100vw - 1rem)',
    borderRadius: BorderRadius,
    background: theme.palette.type === 'dark'
      ? Colors.uniswapDarkNavy
      // ? Colors.uniswapBlack
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

