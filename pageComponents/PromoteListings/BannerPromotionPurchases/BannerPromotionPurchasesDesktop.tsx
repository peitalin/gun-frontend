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


  const theme = useTheme();
  const isDarkMode = isThemeDark(theme)
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))


  return (
    <Banner
      // in /public/img
      // src={bannerBackgroundImageUrl}
      className={
        isDarkMode
          ? "background-uniswap-dark"
          : "background-slate-grey"
      }
      bannerContainerStyles={{
        borderRadius: BorderRadius3x,
        margin: "1rem",
        border: isDarkMode
          ? `1px solid ${Colors.uniswapMediumNavy}`
          : `1px solid ${Colors.slateGreyDark}`
      }}
      titleStyle={{
        color: Colors.cream,
        alignItems: 'flex-start',
        paddingLeft: '3rem',
        flexDirection: 'row',
      }}
      ditherStyle={{
        background: bannerDither
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






