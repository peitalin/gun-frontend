import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import { styles } from "./styles";
// Meta headers
import MetaHeadersPage from "layout/MetaHeadersPage";
// typings
import { Categories } from "typings/gqlTypes";
import Hidden from 'components/HiddenFix';
import BannerPromotionsLinkDesktop from "./BannerPromotionsLinkDesktop";
import BannerPromotionsLinkMobile from "./BannerPromotionsLinkMobile";



const BannerPromotionsLink: React.FC<ReactProps> = (props) => {

  const {
    classes,
    disableMetaHeader = false,
  } = props;


  const bannerImageUrl = "/img/banner10.jpg"
  const bannerDitherMobile = 'linear-gradient(0deg, rgba(25,25,25,0.4) 10%, rgba(25,25,25,0.4) 90%)'
  const bannerDither = 'linear-gradient(30deg, rgba(25,25,25,0.4) 10%, rgba(25,25,25,0.4) 90%)'
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
        <BannerPromotionsLinkMobile
          bannerForegroundImageUrl={bannerImageUrl}
          bannerBackgroundImageUrl={bannerImageUrl}
          bannerDither={bannerDitherMobile}
        />
      </Hidden>
      {/* Desktop */}
      <Hidden smDown implementation="css" className={classes.width100}>
        <BannerPromotionsLinkDesktop
          bannerForegroundImageUrl={undefined}
          bannerBackgroundImageUrl={bannerImageUrl}
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






