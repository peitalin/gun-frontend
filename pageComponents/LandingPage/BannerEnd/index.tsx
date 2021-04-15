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
import BannerEndDesktop from "./BannerEndDesktop";
import BannerEndMobile from "./BannerEndMobile";




const BannerEnd: NextPage<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const bannerForegroundImageUrlDark = `/img/start/screen1-dark.jpg`
  const bannerForegroundImageUrlLight = `/img/start/screen1-light.jpg`

  const ditherStyle = {
    // background: isDarkMode
    //   ? Gradients.gradientUniswapDark.background
    //   : Gradients.gradientGrey3.background,
    background: props.isDarkMode
    ? `linear-gradient(60deg , ${Colors.uniswapDarkNavy} 48%, rgba(255, 255, 255, 0) 55%)`
    : `linear-gradient(60deg , ${Colors.slateGrey} 48%, rgba(255, 255, 255, 0) 55%)`,
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
    backgroundImage:`url(/img/start/hero1.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto', //stretch to fit
    // backgroundSize: '600px 300px',
  }

  return (
    <>
      {/* Desktop */}
      <Hidden smDown implementation="css" className={classes.width100}>
        <BannerEndDesktop
          height={680}
          portraitMode={true}
          ditherStyle={ditherStyle}
          bannerContainerStyle={bannerContainerStyle}
          bannerForegroundImageUrlDark={bannerForegroundImageUrlDark}
          bannerForegroundImageUrlLight={bannerForegroundImageUrlLight}
          isDarkMode={props.isDarkMode}
        />
      </Hidden>
      {/* Mobile */}
      <Hidden mdUp implementation='css' className={classes.width100}>
        <BannerEndMobile
          // height={660}
          // portraitMode={true}
          ditherStyle={ditherStyle}
          bannerContainerStyle={bannerContainerStyle}
          bannerForegroundImageUrlDark={bannerForegroundImageUrlDark}
          bannerForegroundImageUrlLight={bannerForegroundImageUrlLight}
          isDarkMode={props.isDarkMode}
        />
      </Hidden>
    </>
  )
}

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  isDarkMode: boolean
}

export const styles = (theme: Theme) => createStyles({
  root: {
  },
  width100: {
    width: '100%',
  },
})

export default withStyles(styles)( BannerEnd );






