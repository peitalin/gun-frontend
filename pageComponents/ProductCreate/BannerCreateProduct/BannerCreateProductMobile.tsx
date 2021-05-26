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
import Link from "next/link";



const BannerPromotionPurchasesMobile: NextPage<ReactProps> = (props) => {

  const {
    classes,
    bannerForegroundImageUrl,
    bannerBackgroundImageUrl,
    bannerDither,
  } = props;

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  const theme = useTheme();

  return (
    <Banner
      // in /public/img
      bannerContainerStyles={{
        // borderBottom: isThemeDark(theme)
        //   ? `1px solid ${Colors.uniswapMediumNavy}`
        //   : `1px solid ${Colors.slateGrey}`,
      }}
      // className={"background-neon"}
      className={
        isThemeDark(theme)
        ? "background-neon"
        : "background-pale-rainbow"
      }
      src={bannerBackgroundImageUrl}
      titleStyle={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        maxWidth: 'calc(100vw - 0rem)',
        paddingTop: "4rem",
        top: '0px',
      }}
      ditherStyle={{
        background: bannerDither
      }}
      height={200}
      dither={true}
    >
      <div className={classes.bannerInnerBoxLeftSm}>
      </div>

      <div className={classes.bannerInnerBoxRightSm}>
        <div className={classes.bannerInnerBoxRightBlur}>
          <div className={classes.mainTitleContainerMobile}>
            <Typography variant={"h2"} className={classes.mainTitleXs}>
              Upload Listings
            </Typography>
          </div>
          <Typography variant={"body2"} className={classes.subline1Xs}>
            100% Free to List
          </Typography>
        </div>
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

export default withStyles(styles)( BannerPromotionPurchasesMobile );






