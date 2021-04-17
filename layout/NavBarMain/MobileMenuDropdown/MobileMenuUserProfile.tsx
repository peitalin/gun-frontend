import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import clsx from "clsx";
import { Colors, Gradients } from "layout/AppTheme";
import { NewsBarHeight, MainBarHeightDashboard, NavBarHeight } from "layout/NavBarMain/styles";
// Redux
import { useSelector } from 'react-redux';
import { GrandReduxState } from 'reduxStore/grand-reducer';
// typings
import { UserPrivate, StorePrivate } from "typings/gqlTypes";

// MUI
import Divider from "components/Divider";
import Typography from "@material-ui/core/Typography";
// Components
import Login from "layout/Login"
import UserCompactProfile from "./UserCompactProfile";



const MobileMenuUserProfile: React.FC<ReactProps> = (props) => {

  const { classes, closeMobileMenu } = props;

  interface SelectorProps {
    loggedIn: boolean;
    user: UserPrivate;
  }
  const { loggedIn, user } = useSelector<GrandReduxState, SelectorProps>(
    state => ({
      loggedIn: !!state?.reduxLogin?.user?.id,
      user: state?.reduxLogin?.user,
    })
  );

  return (
    <>
    {
      (loggedIn)
      ? <UserCompactProfile user={user}/>
      : <div className={classes.flexRowLogin}>
          <Login
            initialTabIndex={1}
            buttonText={"Sign Up"}
            buttonProps={{
              classes: { root: classes.buttonCreateAccount }
            }}
            callbackOnComplete={() => {
              closeMobileMenu()
            }}
          />
          <div className={classes.spacing}></div>
          <Login
            initialTabIndex={0}
            buttonText={"Login"}
            buttonProps={{
              classes: { root: classes.buttonLogin }
            }}
            callbackOnComplete={() => {
              closeMobileMenu()
            }}
          />
        </div>
    }
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  closeMobileMenu(): void;
}


/////////////// STYLES /////////////////////

const styles = (theme: Theme) => createStyles({
  flexRowLogin: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  mobileMenuExpanderRoot: {
    zIndex: 2,
    position: "absolute", // relative to MainBar, which is under NewsBar
    top: MainBarHeightDashboard - 1, // 1px tucked under navbar
    left: 0,
    width: '100%',
    background: Colors.uniswapDarkNavy,
    borderTop: `1px solid ${Colors.uniswapLightNavy}`,
    // transform: "translateY(-150%)",
    // transitionDuration: '100ms',
    // transition: theme.transitions.create(['all'], {
    //   easing: theme.transitions.easing.easeIn,
    //   duration: "100ms",
    // })
  },
  mobileMenuOuterContainer: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonCreateAccount: {
    marginRight: '0.5rem',
    backgroundImage: Gradients.gradientUniswapFluro.background,
    border: `1px solid ${Colors.gradientUniswapFluro2}`,
    color: Colors.cream,
    minWidth: '150px',
    "&:hover": {
      backgroundImage: Gradients.gradientUniswapFluro2.background,
      border: `1px solid ${Colors.gradientUniswapFluro1}`,
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
      backgroundPosition: '75px',
    }
  },
  buttonLogin: {
    backgroundImage: Gradients.gradientUniswapBlue.background,
    border: `1px solid ${Colors.gradientUniswapBlue1}`,
    fontSize: '0.7rem',
    color: Colors.cream,
    minWidth: "150px",
    "&:hover": {
      backgroundImage: Gradients.gradientUniswapBlue2.background,
      border: `1px solid ${Colors.gradientUniswapFluro2}`,
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
      backgroundPosition: '75px',
    }
  },
  spacing: {
    width: '0.75rem',
  },
});


export default withStyles(styles)( MobileMenuUserProfile );

