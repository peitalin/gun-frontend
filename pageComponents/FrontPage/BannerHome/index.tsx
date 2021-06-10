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

  const bannerImageUrl = undefined

  const bannerContainerStyle = {
    // backgroundImage:`url(/img/start/gun-collage-5.png)`,
    backgroundPositionY: "3rem",
    backgroundRepeat: 'repeat',
    backgroundSize: "contain",
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: "cover",
    backgroundPosition: "left",
    // backgroundSize: 'auto', //stretch to fit for hero3.png
    // borderBottom: isThemeDark(theme)
    //   ? `1px solid ${Colors.uniswapLightNavy}`
    //   : `1px solid ${Colors.slateGreyDark}`,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey
  }

  const bannerContainerStyleMobile = {
    // backgroundColor: isDarkMode
    //   ? Colors.uniswapDarkNavy
    //   : Colors.slateGrey,
    backgroundColor: isThemeDark(theme)
      ? Colors.uniswapDarkNavy
      : Colors.slateGrey,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "left",
    backgroundSize: "cover",
    // backgroundSize: "100%",
    // backgroundSize: 'auto', //stretch to fit for hero3.png
  }

  const bannerDither = isDarkMode
    ? 'linear-gradient(180deg, rgba(47, 52, 65, 0.1) 75%, rgba(47, 52, 65, 1) 100%)'
    : 'linear-gradient(180deg, rgba(236, 237, 238, 0.1) 50%, rgba(236, 237, 238, 1) 100%)'


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
          bannerImageUrl={bannerImageUrl}
          // bannerImageUrl={undefined}
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






