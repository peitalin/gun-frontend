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
import BannerCategoryDesktop from "./BannerCategoryDesktop";
import BannerCategoryMobile from "./BannerCategoryMobile";



const BannerProductCreate: React.FC<ReactProps> = (props) => {

  const {
    classes,
    disableMetaHeader,
    currentCategories,
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

  let selectedCategory = currentCategories?.[0];

  const selectedCategoryName: string = currentCategories?.length === 0
    ? "All Products"
    : selectedCategory?.name
  const selectedCategoryBlurb: string = currentCategories?.length === 0
    ? ""
    : selectedCategory?.blurb
  const selectedCategorySlug: string = currentCategories?.length === 0
    ? "all"
    : selectedCategory?.slug


  const bannerImageUrl = getBannerImageUrl(selectedCategorySlug)
  const bannerDitherMobile = 'linear-gradient(0deg, rgba(25,25,25,0.4) 10%, rgba(25,25,25,0.4) 90%)'
  const bannerDither = 'linear-gradient(30deg, rgba(25,25,25,0.4) 10%, rgba(25,25,25,0.4) 90%)'
  // console.log("categorySlugForGql: ", props.categorySlug)

  return (
    <>
      {
        !disableMetaHeader &&
        <MetaHeadersPage
          title={`Categories`}
          description={`Search categories of firearms`}
        />
      }

      {/* Mobile */}
      <Hidden mdUp implementation='css' className={classes.width100}>
      <BannerCategoryMobile
        categoryName={selectedCategoryName}
        blurb={selectedCategoryBlurb ?? ""}
        bannerForegroundImageUrl={bannerImageUrl}
        bannerBackgroundImageUrl={bannerImageUrl}
        bannerDither={bannerDitherMobile}
      />
      </Hidden>
      {/* Desktop */}
      <Hidden smDown implementation="css" className={classes.width100}>
      <BannerCategoryDesktop
        categoryName={selectedCategoryName}
        blurb={selectedCategoryBlurb ?? ""}
        bannerForegroundImageUrl={undefined}
        bannerBackgroundImageUrl={bannerImageUrl}
        bannerDither={bannerDither}
      />
      </Hidden>
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  currentCategories: Categories[]
  disableMetaHeader: boolean
}


export default withStyles(styles)(BannerProductCreate);






