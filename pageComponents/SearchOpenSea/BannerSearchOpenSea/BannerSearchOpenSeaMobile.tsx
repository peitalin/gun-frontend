import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";
import { styles } from "./styles";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
// SSR
import { NextPage } from 'next';
// CSS
import { useTheme } from "@material-ui/core/styles";
// Router
import { useRouter } from 'next/router';



const BannerSearchOpenSeaMobile: NextPage<ReactProps> = (props) => {

  const {
    classes,
    // bannerForegroundImageUrl,
    // bannerBackgroundImageUrl,
    bannerDither,
  } = props;

  // const user = useSelector<GrandReduxState, UserPrivate>(
  //   s => s.reduxLogin.user
  // )
  const router = useRouter()
  const theme = useTheme();
  const isDarkMode = isThemeDark(theme)
  let pathname = router.pathname

  return (
    <div className={classes.rootMobile}>
      <Banner
        // in /public/img
        bannerContainerStyles={{
          marginBottom: "0.75rem",
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
}

export default withStyles(styles)( BannerSearchOpenSeaMobile );






