import React from "react";
import clsx from "clsx";
// styles
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors, isThemeDark } from "layout/AppTheme";
import { styles } from "./styles";
// components
import Banner from "components/Banner";
import Typography from "@mui/material/Typography";
// SSR
import { NextPage, NextPageContext } from 'next';
// CSS
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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

  const theme = useTheme();
  const isDarkMode = isThemeDark(theme)

  return (
    <Banner
      // in /public/img
      bannerContainerStyles={{
        marginBottom: "1rem",
        border: isDarkMode
          ? `1px solid ${Colors.uniswapMediumNavy}`
          : `1px solid ${Colors.slateGreyDark}`
      }}
      // src={bannerBackgroundImageUrl}
      className={
        isDarkMode
          ? "background-uniswap-dark"
          : "background-slate-grey"
      }
      titleStyle={{
        position: 'absolute',
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
      height={160}
      dither={true}
    >
      <div className={classes.bannerInnerBoxLeftSm}>
      </div>

      <div className={classes.bannerInnerBoxRightSm}>
        <div className={classes.bannerInnerBoxRightBlur}>
          <div className={classes.mainTitleContainerMobile}>
            <Typography variant={"h2"} className={classes.mainTitleXs}>
              Promoted Product Listings
            </Typography>
          </div>
          <Typography variant={"body2"} className={classes.subline1Xs}>
            Add your product to a featured section on the front page.
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






