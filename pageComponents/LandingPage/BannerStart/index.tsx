import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients, isThemeDark } from "layout/AppTheme";
// SSR
import { NextPage, NextPageContext } from 'next';
// import Login from "layout/Login";
import Hidden from 'components/HiddenFix';
// components
import BannerStartDesktop from "./BannerStartDesktop";
import BannerStartMobile from "./BannerStartMobile";
// CSS
import { useTheme } from "@material-ui/core/styles";




const BannerStart: NextPage<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const bannerForegroundImageUrlDark = `/img/start/screen1-dark.jpg`
  const bannerForegroundImageUrlLight = `/img/start/screen1-light.jpg`

  const theme = useTheme();
  // const mdDown = useMediaQuery(theme.breakpoints.down("md"))

  const ditherStyle = {
    background: props.isDarkMode
      ? `linear-gradient(60deg , ${Colors.uniswapDarkNavy} 48%, ${Colors.uniswapMediumNavy} 48%, ${Colors.uniswapMediumNavy} 50%, rgba(255, 255, 255, 0) 50%)`
      : `linear-gradient(60deg , ${Colors.cream} 48%, ${Colors.slateGreyDark} 48%, ${Colors.slateGreyDark} 50%, rgba(255, 255, 255, 0) 50%)`,
  }

  const ditherStyleMobile = {
    background: props.isDarkMode
      ? `linear-gradient(0deg , ${Colors.black1A} 25%, rgba(25, 25, 25, 0.1) 70%)`
      : `linear-gradient(0deg , ${Colors.black1A} 25%, rgba(25, 25, 25, 0.1) 70%)`,
  }

  const bannerContainerStyle = {
    backgroundImage:`url(/img/start/hero4.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: "cover",
    backgroundPosition: "right",
  }

  const bannerContainerStyleMobile = {
    backgroundColor: isThemeDark(theme)
      ? Colors.black1A
      : Colors.black1A,
    backgroundImage: isThemeDark(theme)
      ? `url(/img/start/gun-collage-light.png)`
      : `url(/img/start/gun-collage-light.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "left",
    backgroundSize: "cover",
    justifyContent: "flex-end",
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
          title={props.title}
          subtitle={props.subtitle}
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
          title={props.title}
          subtitle={props.subtitle}
        />
      </Hidden>
    </div>
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
    // ...commonStyles(theme).border1,
  },
  width100: {
    width: '100%',
  },
})

export default withStyles(styles)( BannerStart );






