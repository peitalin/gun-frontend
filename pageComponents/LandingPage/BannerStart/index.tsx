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
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";




const BannerStart: NextPage<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const bannerForegroundImageUrlDark = `/img/start/screen1-dark.jpg`
  const bannerForegroundImageUrlLight = `/img/start/screen1-light.jpg`

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"))

  const ditherStyle = {
    // background: isDarkMode
    //   ? Gradients.gradientUniswapDark.background
    //   : Gradients.gradientGrey3.background,
    background: props.isDarkMode
    ? `linear-gradient(60deg , ${Colors.uniswapDarkNavy} 48%, rgba(255, 255, 255, 0) 55%)`
    : `linear-gradient(60deg , ${Colors.cream} 48%, rgba(250, 250, 250, 0.1) 55%,  rgba(255, 255, 255, 0) 70%)`,
  }

  const ditherStyleMobile = {
    // background: props.isDarkMode
    //   ? Colors.uniswapDarkNavy
    //   : Gradients.gradientGrey3.background,
    // background: props.isDarkMode
    // ? `linear-gradient(60deg , ${Colors.uniswapDarkNavy} 48%, rgba(255, 255, 255, 0) 55%)`
    // : `linear-gradient(60deg , ${Colors.slateGrey} 48%, rgba(255, 255, 255, 0) 55%)`,
    background: props.isDarkMode
    ? `linear-gradient(0deg , ${Colors.uniswapDarkNavy} 32%, rgba(5, 5, 5, 0.2) 44%, rgba(5, 5, 5, 0) 90%)`
    : `linear-gradient(0deg , ${Colors.cream} 32%, rgba(255, 255, 255, 0.2) 44%, rgba(5, 5, 5, 0) 90%)`
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
    backgroundImage:`url(/img/start/hero4.jpg)`,
    // backgroundImage:`url(/img/start/hero1.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: "cover",
    backgroundPosition: "right",
    // backgroundSize: 'auto', //stretch to fit for hero3.png
  }

  const bannerContainerStyleMobile = {
    // backgroundImage:`url(/img/start/hero2.jpg)`,
    backgroundImage:`url(/img/start/hero1.png)`,
    // backgroundImage:`url(/img/start/hero4.jpg)`,
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
        <BannerStartDesktop
          height={640}
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
        <BannerStartMobile
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

export default withStyles(styles)( BannerStart );






