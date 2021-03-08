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

  const bannerImageUrl = "/img/banner10.jpg"
  const bannerDitherMobile = 'linear-gradient(0deg, rgba(25,25,25,0.5) 10%, rgba(25,25,25,0.5) 90%)'
  const bannerDither = 'linear-gradient(30deg, rgba(25,25,25,0.5) 10%, rgba(25,25,25,0.5) 90%)'

  return (
    <>
      {/* Mobile */}
      <Hidden mdUp implementation='css' className={classes.width100}>
      <BannerCategoryMobile
        blurb={props.blurb ?? "category description"}
        bannerForegroundImageUrl={bannerImageUrl}
        bannerBackgroundImageUrl={bannerImageUrl}
        bannerDither={bannerDitherMobile}
      />
      </Hidden>
      {/* Desktop */}
      <Hidden smDown implementation="css" className={classes.width100}>
      <BannerCategoryDesktop
        categoryName={props.categoryName}
        blurb={props.blurb ?? "cateogry description"}
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
  blurb?: string
}


export default withStyles(styles)(BannerProductCreate);






