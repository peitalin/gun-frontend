import React from "react";
import clsx from "clsx";
// styles
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { BorderRadius3x, Colors, isThemeDark } from "layout/AppTheme";
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
import CardMedia from "@mui/material/CardMedia";



const BannerCreateProductDesktop: NextPage<ReactProps> = (props) => {

  const {
    classes,
    bannerForegroundImageUrl,
    bannerBackgroundImageUrl,
    bannerDither,
  } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <Banner
      // in /public/img
      src={bannerBackgroundImageUrl}
      bannerContainerStyles={{
        // borderRadius: BorderRadius3x,
        // margin: "1rem",
        marginBottom: "1rem",
      }}
      className={
        isThemeDark(theme)
        ? "background-neon"
        : "background-pale-rainbow"
      }
      titleStyle={{
        color: Colors.cream,
        alignItems: 'flex-start',
        paddingLeft: "3rem",
        paddingTop: "5rem",
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
            Upload Gun Listings
          </Typography>
        </div>
        <Typography variant={"subtitle2"} className={classes.subline1}>
          100% Free to List
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


export default withStyles(styles)( BannerCreateProductDesktop );






