import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, Gradients, isThemeDark } from "layout/AppTheme";
// SSR
import { NextPage } from 'next';
import Login from "layout/Login";
import Hidden from 'components/HiddenFix';
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
    background: props.isDarkMode
    ? `linear-gradient(60deg , ${Colors.uniswapDarkNavy} 48%, ${Colors.uniswapMediumNavy} 48%, ${Colors.uniswapMediumNavy} 49%, rgba(25, 25, 25, 0.1) 49.1%, rgba(25, 25, 25, 0.05) 100%)`
    : `linear-gradient(60deg , ${Colors.cream} 48%, ${Colors.slateGreyDark} 48%, ${Colors.slateGreyDark} 49%, rgba(25, 25, 25, 0.02) 49.1%, rgba(25, 25, 25, 0.02) 100%)`,
  }

  const ditherStyleMobile = {
    background: props.isDarkMode
    ? `linear-gradient(180deg , ${Colors.uniswapDarkNavy} 30%, ${Colors.uniswapNavy} 90%)`
    : `linear-gradient(0deg , ${Colors.slateGrey} 30%, rgba(255, 255, 255, 0) 60%, rgba(5, 5, 5, 0) 90%)`
  }

  const bannerContainerStyle = {
    backgroundImage:`url(/img/start/gun-collage-5.png)`,
    backgroundPositionY: "3rem",
    backgroundRepeat: 'repeat',
    backgroundSize: "contain",
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: "cover",
    backgroundPosition: "left",
    // backgroundSize: 'auto', //stretch to fit for hero3.png
  }

  const bannerContainerStyleMobile = {
    backgroundColor: props.isDarkMode
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey,
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
          title={props.title}
          subtitle={props.subtitle}
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
          title={props.title}
          subtitle={props.subtitle}
        />
      </Hidden>
    </>
  )
}

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  isDarkMode: boolean
  title: React.ReactNode
  subtitle: React.ReactNode
}

export const styles = (theme: Theme) => createStyles({
  root: {
  },
  width100: {
    width: '100%',
  },
})

export default withStyles(styles)( BannerEnd );






