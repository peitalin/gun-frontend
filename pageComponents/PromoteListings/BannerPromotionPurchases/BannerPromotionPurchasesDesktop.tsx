import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius3x, Colors } from "layout/AppTheme";
import { styles } from "./styles";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
// SSR
import { NextPage, NextPageContext } from 'next';
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import CardMedia from "@material-ui/core/CardMedia";



const BannerPromotionPurchases: NextPage<ReactProps> = (props) => {

  const {
    classes,
    bannerForegroundImageUrl,
    bannerBackgroundImageUrl,
    bannerDither,
  } = props;

  const isDarkMode = useSelector<GrandReduxState, boolean>(
    s => s.reduxLogin.darkMode === 'dark'
  )

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"))

  return (
    <Banner
      // in /public/img
      src={bannerBackgroundImageUrl}
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
          : `1px solid ${Colors.slateGreyBlack}`
      }}
      dither={true}
      height={mdDown ? 240 : 300 }
    >
      <div className={clsx(
        classes.bannerInnerBoxLeft,
        classes.minWidth300,
      )}>
        <div className={classes.mainTitleContainer}>
          <Typography variant={"h1"} className={classes.mainTitle}>
            Promoted Product Listings
          </Typography>
        </div>
        <Typography variant={"subtitle2"} className={classes.subline1}>
            Add your product to a featured section on the front page.
        </Typography>
      </div>
      <div className={clsx(
        classes.bannerInnerBoxRight,
        // mdDown ? classes.minWidth300 : classes.minWidth400,
      )}>
        {
          !!bannerForegroundImageUrl &&
          <CardMedia
            component="img"
            // className={classes.image}
            classes={{ media: classes.categoryImage }}
            src={bannerForegroundImageUrl}
          />
        }
      </div>
    </Banner>
  )
}




///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  bannerDither: string
  bannerForegroundImageUrl: string
  bannerBackgroundImageUrl: string
}


export default withStyles(styles)( BannerPromotionPurchases );






