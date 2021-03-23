import React from "react";
import clsx from "clsx";
// SSR
import { NextPage, NextPageContext } from 'next';
import BannerHomeLayout from "./BannerHomeLayout";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";




const BannerHome: NextPage<ReactProps> = (props) => {

  const bannerImageUrl = "/img/banner5.jpg"
  const bannerMobileImageUrl = "/img/banner5-portrait.jpg"
  const bannerDither = 'linear-gradient(30deg, rgba(25,25,25,0.7) 10%, rgba(25,25,25,0.4) 60%)'

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <BannerHomeLayout
      height={540}
      heightMobile={600}
      bannerImageUrl={bannerImageUrl}
      bannerMobileImageUrl={bannerMobileImageUrl}
      bannerDither={bannerDither}
    />
  )
}
///////////////// TYPINGS ///////////////////
interface ReactProps {
}


export default BannerHome;






