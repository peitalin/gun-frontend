import React from "react";
import clsx from "clsx";
// SSR
import { NextPage, NextPageContext } from 'next';
import BannerHomeDesktop from "./BannerHomeDesktop";
import BannerHomeMobile from "./BannerHomeMobile";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";




const BannerHome: NextPage<ReactProps> = (props) => {

  const bannerImageUrl = "/img/banner5.jpg"
  const bannerDitherMobile = 'linear-gradient(0deg, rgba(25,25,25,0.7) 50%, rgba(25,25,25,0.1) 90%)'
  const bannerDither = 'linear-gradient(30deg, rgba(25,25,25,0.7) 10%, rgba(25,25,25,0.4) 60%)'

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  if (smDown) {
    return (
      <BannerHomeMobile
        height={280}
        bannerImageUrl={bannerImageUrl}
        bannerDither={bannerDitherMobile}
      />
    )
  } else {
    return (
      <BannerHomeDesktop
        height={480}
        bannerImageUrl={bannerImageUrl}
        bannerDither={bannerDither}
      />
    )
  }
}
///////////////// TYPINGS ///////////////////
interface ReactProps {
}


export default BannerHome;






