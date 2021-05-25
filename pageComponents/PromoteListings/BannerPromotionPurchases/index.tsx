import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";
import { styles } from "./styles";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// CSS
import { useTheme } from "@material-ui/core/styles";
// typings
import Hidden from 'components/HiddenFix';
import BannerPromotionPurchasesDesktop from "./BannerPromotionPurchasesDesktop";
import BannerPromotionPurchasesMobile from "./BannerPromotionPurchasesMobile";



const BannerPromotionPurchases: React.FC<ReactProps> = (props) => {

  const {
    classes,
    disableMetaHeader = false,
  } = props;

  const theme = useTheme();
  const isDarkMode = isThemeDark(theme)

  // const bannerImageUrl = "/img/banner10.jpg"

  const bannerDitherMobile = isDarkMode
    ? 'linear-gradient(0deg, rgba(25,25,25,0.2) 10%, rgba(25,25,25,0.2) 90%)'
    : 'linear-gradient(30deg, rgba(245,245,245,0.2) 10%, rgba(245,245,245,0.2) 90%)'

  const bannerDither = isDarkMode
    ? 'linear-gradient(30deg, rgba(25,25,25,0.2) 10%, rgba(25,25,25,0.2) 90%)'
    : 'linear-gradient(30deg, rgba(245,245,245,0.2) 10%, rgba(245,245,245,0.2) 90%)'
  // console.log("categorySlugForGql: ", props.categorySlug)

  return (
    <>
      {
        !disableMetaHeader &&
        <MetaHeadersPage
          title={`Promote Product Listings`}
          description={`Buy and promote your product listings`}
        />
      }

      {/* Mobile */}
      <Hidden mdUp implementation='css' className={classes.width100}>
        <BannerPromotionPurchasesMobile
          bannerForegroundImageUrl={undefined}
          bannerBackgroundImageUrl={undefined}
          bannerDither={bannerDitherMobile}
        />
      </Hidden>
      {/* Desktop */}
      <Hidden smDown implementation="css" className={classes.width100}>
        <BannerPromotionPurchasesDesktop
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


export default withStyles(styles)(BannerPromotionPurchases);






