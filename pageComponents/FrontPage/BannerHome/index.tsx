import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, Gradients, isThemeDark } from "layout/AppTheme";
// SSR
import { NextPage, NextPageContext } from 'next';
import BannerHomeLayout from "./BannerHomeLayout";
import { Categories, Calibers } from "typings/gqlTypes";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "components/HiddenFix";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
import SearchbarMain from "./SearchbarMain";




const BannerHome: NextPage<ReactProps> = (props) => {

  const theme = useTheme()
  const isDarkMode = isThemeDark(theme)

  // const bannerImageUrl = "/img/cdx-50-tremor.png"
  // const bannerMobileImageUrl = "/img/start/gun-collage-dark.png"

  const bannerContainerStyle = {
    // backgroundImage:`url(/img/start/gun-collage-5.png)`,
    // backgroundImage:`url(/img/rifles-background.png)`,
    backgroundPositionY: "3rem",
    backgroundRepeat: 'repeat',
    backgroundSize: "contain",
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: "cover",
    backgroundPosition: "left",
    // backgroundSize: 'auto', //stretch to fit for hero3.png
    borderBottom: isThemeDark(theme)
      ? `1px solid ${Colors.uniswapLightNavy}`
      : `1px solid ${Colors.slateGreyDark}`,
    backgroundColor: Colors.cream,
  }

  const bannerContainerStyleMobile = {
    // backgroundColor: isDarkMode
    //   ? Colors.uniswapDarkNavy
    //   : Colors.slateGrey,
    backgroundColor: Colors.uniswapDarkNavy,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "left",
    backgroundSize: "cover",
    // backgroundSize: "100%",
    // backgroundSize: 'auto', //stretch to fit for hero3.png
  }

  // const bannerDither = 'linear-gradient(30deg, rgba(25,25,25,0.7) 10%, rgba(25,25,25,0.4) 60%)'
  // const bannerDither = 'linear-gradient(180deg, rgba(25, 25, 25, 0.1) 25%, rgba(25, 25, 25, 1) 75%)'
  const bannerDither = isDarkMode
    ? 'linear-gradient(180deg, rgba(25,25,25,0.2) 20%, rgba(25,25,25,0.9) 100%)'
    : 'linear-gradient(180deg, rgba(245,245,245,0) 20%, rgba(245,245,245,0) 100%)'


  return (
    <>
      {/* Mobile  */}
      <ShowOnMobileOrDesktopSSR mobile>
        <BannerHomeLayout
          height={660}
          mdDown={true}
          // bannerImageUrl={bannerMobileImageUrl}
          bannerImageUrl={undefined}
          bannerContainerStyle={bannerContainerStyleMobile}
          bannerDither={bannerDither}
          portraitMode={true}
        >
          <SearchbarMain
            id={"frontpage-1-mobile"}
            isMobile={true}
            initialDropdownCategories={props.initialCategories}
          />
        </BannerHomeLayout>
      </ShowOnMobileOrDesktopSSR>
      {/* Desktop  */}
      <ShowOnMobileOrDesktopSSR desktop>
        <BannerHomeLayout
          height={750}
          mdDown={false}
          // bannerImageUrl={bannerImageUrl}
          bannerImageUrl={undefined}
          bannerContainerStyle={bannerContainerStyle}
          bannerDither={bannerDither}
          portraitMode={false}
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






