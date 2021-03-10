import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import { styles } from "./styles";
import Hidden from 'components/HiddenFix';
import BannerCategoryDesktop from "./BannerCategoryDesktop";
import BannerCategoryMobile from "./BannerCategoryMobile";



const BannerProductCreate: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const getBannerImageUrl = (slug) => {
    switch (slug) {
      case "handguns": {
        return "/img/banner5.jpg"
      }
      case "rifles": {
        return "/img/banner10.jpg"
      }
      case "shotguns": {
        return "/img/banner10.jpg"
      }
      case "combination": {
        return "/img/banner4.jpg"
      }
      default: {
        return "/img/banner5.jpg"
      }
    }
  }

  const bannerImageUrl = getBannerImageUrl(props.categorySlug)
  const bannerDitherMobile = 'linear-gradient(0deg, rgba(25,25,25,0.4) 10%, rgba(25,25,25,0.4) 90%)'
  const bannerDither = 'linear-gradient(30deg, rgba(25,25,25,0.4) 10%, rgba(25,25,25,0.4) 90%)'

  return (
    <>
      {/* Mobile */}
      <Hidden mdUp implementation='css' className={classes.width100}>
      <BannerCategoryMobile
        categoryName={props.categoryName}
        blurb={props.categoryBlurb ?? ""}
        bannerForegroundImageUrl={bannerImageUrl}
        bannerBackgroundImageUrl={bannerImageUrl}
        bannerDither={bannerDitherMobile}
      />
      </Hidden>
      {/* Desktop */}
      <Hidden smDown implementation="css" className={classes.width100}>
      <BannerCategoryDesktop
        categoryName={props.categoryName}
        blurb={props.categoryBlurb ?? ""}
        bannerForegroundImageUrl={undefined}
        bannerBackgroundImageUrl={bannerImageUrl}
        bannerDither={bannerDither}
      />
      </Hidden>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  categoryName?: string
  categorySlug?: string
  categoryBlurb?: string
}


export default withStyles(styles)(BannerProductCreate);






