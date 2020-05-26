import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
// Router
import { useRouter } from 'next/router';
// SSR
import { NextPage, NextPageContext } from 'next';
import Hidden from '@material-ui/core/Hidden';
import CloudUpload from "@material-ui/icons/CloudUpload";

import { styles } from "components/BannerProductCreate/styles";
import BannerProductCreateDesktop from "./BannerProductCreateDesktop";
import BannerProductCreateMobile from "./BannerProductCreateMobile";



const BannerProductCreate: NextPage<ReactProps> = (props) => {

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






