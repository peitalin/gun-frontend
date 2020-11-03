import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import { styles } from "components/BannerProductCreate/styles";
import BannerProductCreateDesktop from "./BannerProductCreateDesktop";
import BannerProductCreateMobile from "./BannerProductCreateMobile";



const BannerProductCreate: React.FC<ReactProps> = (props) => {

  const bannerImageUrl = "/img/banner10.jpg"
  const bannerDitherMobile = 'linear-gradient(0deg, rgba(25,25,25,0.5) 10%, rgba(25,25,25,0.5) 90%)'
  const bannerDither = 'linear-gradient(30deg, rgba(25,25,25,0.5) 10%, rgba(25,25,25,0.5) 90%)'

  return (
    <>
     <BannerProductCreateDesktop
        bannerImageUrl={bannerImageUrl}
        bannerDitherMobile={bannerDitherMobile}
        bannerDither={bannerDither}
     />
     <BannerProductCreateMobile
        bannerImageUrl={bannerImageUrl}
        bannerDitherMobile={bannerDitherMobile}
        bannerDither={bannerDither}
     />
    </>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
}


export default withStyles(styles)(BannerProductCreate);






