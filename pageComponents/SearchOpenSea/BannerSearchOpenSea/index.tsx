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
    focused,
    selectedCategory,
  } = props;

  const selectedCategoryName: string = selectedCategory
    ? selectedCategory?.name
    : "All Products"

  const selectedCategoryBlurb: string = selectedCategory
    ? selectedCategory?.blurb
    : ""

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
          categoryName={props.bannerTitle ?? selectedCategoryName}
          blurb={props.bannerBlurb ?? selectedCategoryBlurb ?? ""}
          bannerDither={bannerDitherMobile}
          isExpanded={focused}
        />
      </Hidden>

      {/* Desktop */}
      <Hidden mdDown implementation="css" className={classes.width100}>
        <BannerSearchOpenSeaDesktop
          categoryName={props.bannerTitle ?? selectedCategoryName}
          blurb={props.bannerBlurb ?? selectedCategoryBlurb ?? ""}
          bannerDither={bannerDither}
        />
      </Hidden>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  disableMetaHeader: boolean
  selectedCategory: Categories
  focused?: boolean;
  bannerTitle?: string;
  bannerBlurb?: string;
}


export default withStyles(styles)(BannerSearchOpenSea);






