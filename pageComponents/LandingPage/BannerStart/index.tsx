import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";
// SSR
import { NextPage, NextPageContext } from 'next';
import Login from "layout/Login";
import Hidden from 'components/HiddenFix';
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState, Actions } from "reduxStore/grand-reducer";
import { UserPrivate } from "typings/gqlTypes";
// components
import BannerStartDesktop from "./BannerStartDesktop";
import BannerStartMobile from "./BannerStartMobile";




const BannerStart: NextPage<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const isDarkMode = useSelector<GrandReduxState, boolean>(
    s => s.reduxLogin.darkMode === 'dark'
  )

  const bannerForegroundImageUrl = `/img/start/hero.jpg`

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )


  const ditherStyle = {
    // background: isDarkMode
    //   ? Gradients.gradientUniswapDark.background
    //   : Gradients.gradientGrey3.background,
    background: isDarkMode
    ? `linear-gradient(60deg , ${Colors.uniswapDarkNavy} 45%, rgba(255, 255, 255, 0) 55%)`
    : `linear-gradient(60deg , ${Colors.slateGrey} 45%, rgba(255, 255, 255, 0) 55%)`,
  }

  ///// https://codepen.io/danichk/pen/YyVeXa
  // const bannerContainerStyle = {
  //   // polkadot
  //   background: `${Colors.uniswapDarkNavy}`,
  //   backgroundImage:`radial-gradient(${Colors.uniswapMediumNavy} 10%, transparent 0), radial-gradient(${Colors.uniswapMediumNavy} 10%, transparent 0)`,
  //   backgroundSize: "40px 40px",
  //   backgroundPosition: "0 0, 20px 20px",
  // }

  const bannerContainerStyle = {
    // polkadot
    // background: `${Colors.uniswapDarkNavy}`,
    backgroundImage:`url(/img/start/hero.jpg)`,
    // backgroundSize: "40px 40px",
    // backgroundPosition: "0 0, 20px 20px",
  }

  return (
    <>
      {/* Desktop */}
      <Hidden smDown implementation="css" className={classes.width100}>
        <BannerStartDesktop
          height={680}
          portraitMode={true}
          ditherStyle={ditherStyle}
          bannerContainerStyle={bannerContainerStyle}
          bannerForegroundImageUrl={bannerForegroundImageUrl}
          user={user}
        />
      </Hidden>
      {/* Mobile */}
      <Hidden mdUp implementation='css' className={classes.width100}>
        <BannerStartMobile
          // height={660}
          // portraitMode={true}
          ditherStyle={ditherStyle}
          bannerContainerStyle={bannerContainerStyle}
          bannerForegroundImageUrl={bannerForegroundImageUrl}
          user={user}
        />
      </Hidden>
    </>
  )
}

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
}

export const styles = (theme: Theme) => createStyles({
  root: {
  },
  width100: {
    width: '100%',
  },
})

export default withStyles(styles)( BannerStart );






