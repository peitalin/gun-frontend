import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius3x, Colors, isThemeDark } from "layout/AppTheme";
import { styles } from "./styles";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
// SSR
import { NextPage, NextPageContext } from 'next';
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import StripeArrowButton from "components/StripeArrowButton";



const BannerPromotionsLink: NextPage<ReactProps> = (props) => {

  const {
    classes,
    bannerForegroundImageUrl,
    bannerBackgroundImageUrl,
    bannerDither,
  } = props;

  const theme = useTheme();
  const isDarkMode = isThemeDark(theme)
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <div className={classes.rootDesktop}>
      <Banner
        // in /public/img
        // src={bannerBackgroundImageUrl}
        className={
          isDarkMode
            ? "background-neon"
            : "background-neon"
        }
        titleStyle={{
          color: Colors.cream,
          alignItems: 'flex-start',
          paddingLeft: '3rem',
          flexDirection: 'row',
        }}
        ditherStyle={{
          background: bannerDither
        }}
        bannerContainerStyles={{
          borderRadius: BorderRadius3x,
          border: isDarkMode
            ? `1px solid ${Colors.uniswapLightNavy}`
            : `1px solid ${Colors.slateGrey}`
        }}
        dither={true}
        height={mdDown ? 240 : 300 }
      >
        <div className={clsx(
          classes.bannerInnerBoxLeft,
          classes.minWidth300,
        )}>
          <div className={classes.mainTitleContainer}>
            <Typography className={classes.mainTitle}>
              Promote your products
            </Typography>
          </div>
          <Typography variant={"subtitle2"} className={classes.subline1}>
            Feature your product on the front page.
          </Typography>
          <StripeArrowButton
            style={{ marginTop: "1rem" }}
            href={"/promotions"}
            title={"Go Now"}
          />
        </div>
        <div className={clsx(
          classes.bannerInnerBoxRight,
        )}>
        </div>
    </Banner>
    </div>
  )
}




///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  bannerDither: string
  bannerForegroundImageUrl: string
  bannerBackgroundImageUrl: string
}


export default withStyles(styles)( BannerPromotionsLink );






