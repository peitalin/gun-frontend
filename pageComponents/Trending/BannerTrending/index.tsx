import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";
import { styles } from "./styles";
// typings
import Hidden from 'components/HiddenFix';
import BannerTrendingLinkDesktop from "./BannerTrendingDesktop";
import BannerTrendingLinkMobile from "./BannerTrendingMobile";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";



const BannerTrendingLink: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const theme = useTheme();
  const isDarkMode = isThemeDark(theme)

  // const bannerImageUrl = "/img/banner10.jpg"

  const bannerDitherMobile = isDarkMode
    ? 'linear-gradient(130deg, rgba(25,25,25,0.2) 10%, rgba(25,25,25,0.4) 90%)'
    // : 'linear-gradient(130deg, rgba(245,245,245,0.2) 10%, rgba(245,245,245,0.4) 90%)'
    : 'unset'

  const bannerDither = isDarkMode
    ? 'linear-gradient(130deg, rgba(25,25,25,0.2) 10%, rgba(25,25,25,0.4) 90%)'
    // : 'linear-gradient(130deg, rgba(245,245,245,0.2) 10%, rgba(245,245,245,0.4) 90%)'
    : 'unset'
  // console.log("categorySlugForGql: ", props.categorySlug)

  return (
    <>
      {/* Mobile */}
      <ShowOnMobileOrDesktopSSR mobile implementation='css' className={classes.width100}>
        <BannerTrendingLinkMobile
          headingMobile={props.headingMobile}
          subheadingMobile={props.subheadingMobile}
          link={props.link}
          buttonText={props.buttonText}
          bannerForegroundImageUrl={undefined}
          bannerBackgroundImageUrl={undefined}
          bannerDither={bannerDitherMobile}
        />
      </ShowOnMobileOrDesktopSSR>
      {/* Desktop */}
      <ShowOnMobileOrDesktopSSR desktop implementation='css' className={classes.width100}>
        <BannerTrendingLinkDesktop
          headingDesktop={props.headingDesktop}
          subheadingDesktop={props.subheadingDesktop}
          link={props.link}
          buttonText={props.buttonText}
          bannerForegroundImageUrl={undefined}
          bannerBackgroundImageUrl={undefined}
          bannerDither={bannerDither}
        />
      </ShowOnMobileOrDesktopSSR>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  headingDesktop: string
  subheadingDesktop?: string
  headingMobile: string
  subheadingMobile?: string
  link: string
  buttonText: string
}


export default withStyles(styles)(BannerTrendingLink);






