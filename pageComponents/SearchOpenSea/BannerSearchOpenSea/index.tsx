import React from "react";
// styles
import { withStyles, WithStyles, createStyles, useTheme } from "@material-ui/core/styles";
import {
  Colors,
  BorderRadius,
  isThemeDark,
} from "layout/AppTheme";
import { styles } from "./styles";
// typings
import {
  Categories,
} from "typings/gqlTypes";
import Hidden from 'components/HiddenFix';
import BannerSearchOpenSeaDesktop from "./BannerSearchOpenSeaDesktop";
import BannerSearchOpenSeaMobile from "./BannerSearchOpenSeaMobile";



const BannerSearchOpenSea = (props: ReactProps) => {

  const {
    classes,
    disableMetaHeader,
  } = props;

  // const selectedCategorySlug: string = selectedCategory
  //   ? selectedCategory?.slug
  //   : "all"

  // const bannerImageUrl = getBannerImageUrl()
  const bannerDitherMobile = 'linear-gradient(0deg, rgba(25,25,25,0.01) 10%, rgba(25,25,25,0.01) 90%)'
  const bannerDither = 'linear-gradient(30deg, rgba(25,25,25,0.01) 10%, rgba(25,25,25,0.01) 90%)'

  return (
    <>
      {/* Mobile */}
      <Hidden lgUp implementation='css' className={classes.width100}>
        <BannerSearchOpenSeaMobile
          categoryName={props.bannerTitle}
          blurb={props.bannerBlurb}
          bannerDither={bannerDitherMobile}
        />
      </Hidden>

      {/* Desktop */}
      <Hidden mdDown implementation="css" className={classes.width100}>
        <BannerSearchOpenSeaDesktop
          categoryName={props.bannerTitle}
          blurb={props.bannerBlurb}
          bannerDither={bannerDither}
        />
      </Hidden>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  disableMetaHeader: boolean
  bannerTitle?: string;
  bannerBlurb?: string;
}


export default withStyles(styles)(BannerSearchOpenSea);






