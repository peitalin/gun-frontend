import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";
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
import { UserPrivate } from "typings/gqlTypes";
// Router
import { useRouter } from 'next/router';



const BannerSearchMobile: NextPage<ReactProps> = (props) => {

  const {
    classes,
    // bannerForegroundImageUrl,
    // bannerBackgroundImageUrl,
    bannerDither,
    categorySlug,
  } = props;

  // const user = useSelector<GrandReduxState, UserPrivate>(
  //   s => s.reduxLogin.user
  // )
  const router = useRouter()
  const theme = useTheme();
  const isDarkMode = isThemeDark(theme)
  let pathname = router.pathname

  return (
    <div className={
      props.isExpanded
      ? classes.rootMobileExpanded
      : classes.rootMobile
    }>
      <Banner
        // in /public/img
        bannerContainerStyles={{
          marginBottom: "1rem",
        }}
        className={
          pathname.includes('new')
          ? isDarkMode
            ? "background-atlas"
            : "background-monte-carlo"
          : isDarkMode
            ? "background-miaka"
            : "background-velvet-sun"
        }
        // src={bannerBackgroundImageUrl}
        titleStyle={{
          // position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          maxWidth: 'calc(100vw - 0rem)',
          top: '0px',
        }}
        ditherStyle={{
          background: bannerDither
        }}
        height={
          210
        }
        dither={true}
      >
        <div className={classes.bannerInnerBoxLeftSm}>
          {/* <CardMedia
            component="img"
            // className={classes.image}
            classes={{ media: classes.categoryImageMd }}
            src={bannerForegroundImageUrl}
            alt={categorySlug}
          /> */}
        </div>

        <div className={classes.bannerInnerBoxRightSm}>
          <div className={classes.bannerInnerBoxRightBlur}>
            <div className={classes.mainTitleContainerMobile}>
              <Typography variant={"h2"} className={classes.mainTitleXs}>
                {props.categoryName}
              </Typography>
            </div>
            <Typography variant={"body2"} className={classes.subline1Xs}>
              {props.blurb}
            </Typography>
          </div>
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
  // bannerForegroundImageUrl: string
  // bannerBackgroundImageUrl: string
  isExpanded: boolean
}

export default withStyles(styles)( BannerSearchMobile );






