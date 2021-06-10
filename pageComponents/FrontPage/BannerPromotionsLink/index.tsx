import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";
import { styles } from "./styles";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// typings
import { Categories } from "typings/gqlTypes";
import Hidden from 'components/HiddenFix';
import BannerPromotionsLinkDesktop from "./BannerPromotionsLinkDesktop";
import BannerPromotionsLinkMobile from "./BannerPromotionsLinkMobile";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const BannerPromotionsLink: React.FC<ReactProps> = (props) => {

  const {
    classes,
    disableMetaHeader = false,
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
        <BannerPromotionsLinkMobile
          bannerForegroundImageUrl={undefined}
          bannerBackgroundImageUrl={undefined}
          bannerDither={bannerDitherMobile}
        />
      </Hidden>
      {/* Desktop */}
      <Hidden smDown implementation="css" className={classes.width100}>
        <BannerPromotionsLinkDesktop
          bannerForegroundImageUrl={undefined}
          bannerBackgroundImageUrl={undefined}
          bannerDither={bannerDither}
        />
      </Hidden>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  disableMetaHeader?: boolean
}


export default withStyles(styles)(BannerPromotionsLink);






