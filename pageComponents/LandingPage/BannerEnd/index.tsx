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
    : `linear-gradient(60deg , ${Colors.cream} 48%, rgba(255, 255, 255, 0) 55%)`,
  }

  const ditherStyleMobile = {
    // background: props.isDarkMode
    //   ? Colors.uniswapDarkNavy
    //   : Gradients.gradientGrey3.background,
    // background: props.isDarkMode
    // ? `linear-gradient(60deg , ${Colors.uniswapDarkNavy} 48%, rgba(255, 255, 255, 0) 55%)`
    // : `linear-gradient(60deg , ${Colors.slateGrey} 48%, rgba(255, 255, 255, 0) 55%)`,
    background: props.isDarkMode
    ? `linear-gradient(0deg , ${Colors.uniswapDarkNavy} 30%, rgba(5, 5, 5, 0.4) 38%, rgba(5, 5, 5, 0) 90%)`
    : `linear-gradient(0deg , ${Colors.cream} 30%, rgba(255, 255, 255, 0.4) 38%, rgba(5, 5, 5, 0) 90%)`
  }

  const bannerContainerStyle = {
    backgroundImage:`url(/img/start/hero1.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: "cover",
    backgroundPosition: "left",
    // backgroundSize: 'auto', //stretch to fit for hero3.png
  }

  const bannerContainerStyleMobile = {
    // backgroundImage:`url(/img/start/hero3.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "left",
    backgroundSize: "cover",
    // backgroundSize: "100%",
    // backgroundSize: 'auto', //stretch to fit for hero3.png
  }

  return (
    <>
      {/* Desktop */}
      <Hidden mdDown implementation="css" className={classes.width100}>
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
      <Hidden lgUp implementation='css' className={classes.width100}>
        <BannerEndMobile
          // height={660}
          // portraitMode={true}
          ditherStyle={ditherStyleMobile}
          bannerContainerStyle={bannerContainerStyleMobile}
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






