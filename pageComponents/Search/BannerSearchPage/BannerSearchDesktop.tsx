import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius3x, Colors, isThemeDark } from "layout/AppTheme";
import { styles } from "./styles";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
// Router
import { useRouter } from 'next/router';
// SSR
import { NextPage, NextPageContext } from 'next';
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardMedia from "@material-ui/core/CardMedia";



const BannerSearch: NextPage<ReactProps> = (props) => {

  const {
    classes,
    bannerForegroundImageUrl,
    bannerBackgroundImageUrl,
    bannerDither,
    categorySlug,
  } = props;


  const router = useRouter()
  const theme = useTheme();
  const isDarkMode = isThemeDark(theme)
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))

  let pathname = router.pathname

  return (
    <div className={classes.rootDesktop}>
      <Banner
        // in /public/img
        // src={bannerBackgroundImageUrl}
        className={
          pathname.includes('new')
          ? isDarkMode
            ? "background-atlas"
            : "background-monte-carlo"
          : isDarkMode
            ? "background-miaka"
            : "background-velvet-sun"
        }
        titleStyle={{
          alignItems: 'flex-start',
          paddingLeft: '3rem',
          flexDirection: 'row',
        }}
        ditherStyle={{
          background: bannerDither
        }}
        bannerContainerStyles={{
          margin: '1rem',
          maxWidth: '1160px',
          borderRadius: BorderRadius3x,
          border: isThemeDark(theme)
            ? `1px solid ${Colors.uniswapLightNavy}`
            : `1px solid ${Colors.slateGreyDark}`
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
              {props.categoryName}
            </Typography>
          </div>

          <Typography variant={"subtitle2"} className={classes.subline1}>
            {props.blurb}
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
              alt={categorySlug}
            />
          }
        </div>

    </Banner>
      {props.children}
    </div>
  )
}




///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  bannerDither: string
  blurb?: string
  categoryName?: string
  categorySlug?: string
  bannerForegroundImageUrl?: string
  bannerBackgroundImageUrl?: string
}


export default withStyles(styles)( BannerSearch );






