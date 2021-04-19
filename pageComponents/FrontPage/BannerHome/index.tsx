import React from "react";
import clsx from "clsx";
// SSR
import { NextPage, NextPageContext } from 'next';
import BannerHomeLayout from "./BannerHomeLayout";
import { Categories } from "typings/gqlTypes";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "components/HiddenFix";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
import SearchbarMain from "./SearchbarMain";




const BannerHome: NextPage<ReactProps> = (props) => {

  const bannerImageUrl = "/img/banner5.jpg"
  const bannerMobileImageUrl = "/img/banner5-portrait.jpg"
  const bannerDither = 'linear-gradient(30deg, rgba(25,25,25,0.7) 10%, rgba(25,25,25,0.4) 60%)'
  // const bannerDither = 'linear-gradient(180deg, rgba(25, 25, 25, 0.1) 25%, rgba(25, 25, 25, 1) 75%)'

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {/* Mobile  */}
      <ShowOnMobileOrDesktopSSR mobile>
        <BannerHomeLayout
          height={660}
          mdDown={true}
          bannerImageUrl={bannerMobileImageUrl}
          bannerDither={bannerDither}
          portraitMode={true}
          initialCategories={props.initialCategories}
        >
          <SearchbarMain
            id={"frontpage-1-mobile"}
            isMobile={false}
            initialDropdownCategories={props.initialCategories}
          />
        </BannerHomeLayout>
      </ShowOnMobileOrDesktopSSR>
      {/* Desktop  */}
      <ShowOnMobileOrDesktopSSR desktop>
        <BannerHomeLayout
          height={540}
          mdDown={false}
          bannerImageUrl={bannerImageUrl}
          bannerDither={bannerDither}
          portraitMode={false}
          initialCategories={props.initialCategories}
        >
          <SearchbarMain
            id={"frontpage-2-desktop"}
            isMobile={false}
            initialDropdownCategories={props.initialCategories}
          />
        </BannerHomeLayout>
      </ShowOnMobileOrDesktopSSR>
    </>
  )
}
///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  initialCategories: Categories[];
}

export const styles = (theme: Theme) => createStyles({
  width100: {
    width: '100%',
  },
})

export default withStyles(styles)(BannerHome);






