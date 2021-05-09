import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, Gradients, isThemeDark } from "layout/AppTheme";
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
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))

  const ditherStyle = {
    // background: isDarkMode
    //   ? Gradients.gradientUniswapDark.background
    //   : Gradients.gradientGrey3.background,
    background: props.isDarkMode
    ? `linear-gradient(60deg , ${Colors.uniswapDarkNavy} 48%, ${Colors.uniswapMediumNavy} 48%, ${Colors.uniswapMediumNavy} 50%, rgba(255, 255, 255, 0) 50%)`
    : `linear-gradient(60deg , ${Colors.cream} 48%, ${Colors.slateGreyDark} 48%, ${Colors.slateGreyDark} 50%, rgba(255, 255, 255, 0) 50%)`,
  }

  const ditherStyleMobile = {
    // top row: solid background
    // bottom row: navbar dither

    background: props.isDarkMode
      ? `linear-gradient(0deg , ${Colors.black1A} 25%, rgba(25, 25, 25, 0.1) 70%)`
      : `linear-gradient(0deg , ${Colors.black1A} 25%, rgba(25, 25, 25, 0.1) 70%)`,
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

  // // collage
  // const bannerContainerStyle = {
  //   backgroundImage:`url(/img/start/gun-collage-5.png)`,
  //   backgroundPositionY: "2rem",
  //   backgroundRepeat: 'repeat',
  //   backgroundSize: "contain",
  //   // backgroundRepeat: 'no-repeat',
  //   // backgroundSize: "cover",
  //   backgroundPosition: "left",
  //   // backgroundSize: 'auto', //stretch to fit for hero3.png
  // }

  const bannerContainerStyleMobile = {
    // backgroundImage:`url(/img/start/hero2.jpg)`,
    backgroundColor: isThemeDark(theme)
      ? Colors.black1A
      : Colors.black1A,
    backgroundImage: isThemeDark(theme)
      ? `url(/img/start/gun-collage-light.png)`
      : `url(/img/start/gun-collage-light.png)`,
    // backgroundImage:`url(/img/start/hero4.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "left",
    backgroundSize: "cover",
    justifyContent: "flex-end",
    // backgroundSize: "100%",
    // backgroundSize: 'auto', //stretch to fit for hero3.png
  }

  return (
    <div className={classes.root}>
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
    </div>
  )
}

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  isDarkMode: boolean
}

export const styles = (theme: Theme) => createStyles({
  root: {
    // ...commonStyles(theme).border1,
  },
  width100: {
    width: '100%',
  },
})

export default withStyles(styles)( BannerStart );






