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



const BannerTrendingLink: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const theme = useTheme();
  const isDarkMode = isThemeDark(theme)

  // const bannerImageUrl = "/img/banner10.jpg"

  const bannerDitherMobile = isDarkMode
    ? 'linear-gradient(130deg, rgba(25,25,25,0.2) 10%, rgba(25,25,25,0.4) 90%)'
    : 'linear-gradient(130deg, rgba(245,245,245,0.2) 10%, rgba(245,245,245,0.4) 90%)'

  const bannerDither = isDarkMode
    ? 'linear-gradient(130deg, rgba(25,25,25,0.2) 10%, rgba(25,25,25,0.4) 90%)'
    : 'linear-gradient(130deg, rgba(245,245,245,0.2) 10%, rgba(245,245,245,0.4) 90%)'
  // console.log("categorySlugForGql: ", props.categorySlug)

  return (
    <>
      {/* Mobile */}
      <Hidden mdUp implementation='css' className={classes.width100}>
        <BannerTrendingLinkMobile
          bannerForegroundImageUrl={undefined}
          bannerBackgroundImageUrl={undefined}
          bannerDither={bannerDitherMobile}
        />
      </Hidden>
      {/* Desktop */}
      <Hidden smDown implementation="css" className={classes.width100}>
        <BannerTrendingLinkDesktop
          bannerForegroundImageUrl={undefined}
          bannerBackgroundImageUrl={undefined}
          bannerDither={bannerDither}
        />
      </Hidden>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
}


export default withStyles(styles)(BannerTrendingLink);






