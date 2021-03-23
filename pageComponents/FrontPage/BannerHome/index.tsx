import React from "react";
import clsx from "clsx";
// SSR
import { NextPage, NextPageContext } from 'next';
import BannerHomeLayout from "./BannerHomeLayout";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "components/HiddenFix";
import classes from "*.module.css";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";




const BannerHome: NextPage<ReactProps> = (props) => {

  const bannerImageUrl = "/img/banner5.jpg"
  const bannerMobileImageUrl = "/img/banner5-portrait.jpg"
  const bannerDither = 'linear-gradient(30deg, rgba(25,25,25,0.7) 10%, rgba(25,25,25,0.4) 60%)'

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {/* Mobile  */}
      <Hidden only={["lg", "xl"]} implementation="css">
        <BannerHomeLayout
          height={660}
          mdDown={true}
          bannerImageUrl={bannerMobileImageUrl}
          bannerDither={bannerDither}
          portraitMode={true}
        />
      </Hidden>
      {/* Desktop  */}
      <Hidden only={["xs", "sm", "md"]} implementation="css">
        <BannerHomeLayout
          height={540}
          mdDown={false}
          bannerImageUrl={bannerImageUrl}
          bannerDither={bannerDither}
          portraitMode={false}
        />
      </Hidden>
    </>
  )
}
///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
}

export const styles = (theme: Theme) => createStyles({
  width100: {
    width: '100%',
  },
})

export default withStyles(styles)(BannerHome);






