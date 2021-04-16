import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import { styles } from "./styles";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// Router
import { useRouter } from 'next/router';
// SSR
import { NextPage, NextPageContext } from 'next';
import Login from "layout/Login";
import Hidden from '@material-ui/core/Hidden';
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { UserPrivate } from "typings/gqlTypes";
import Link from "next/link";



const BannerCategoryMobile: NextPage<ReactProps> = (props) => {

  const {
    classes,
    bannerForegroundImageUrl,
    bannerBackgroundImageUrl,
    bannerDither,
    categorySlug,
  } = props;

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  const theme = useTheme();

  return (
    <Banner
      // in /public/img
      bannerContainerStyles={{
        marginBottom: "1rem",
      }}
      src={bannerBackgroundImageUrl}
      titleStyle={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        maxWidth: 'calc(100vw - 0rem)',
        top: '0px',
        color: "#181818",
      }}
      ditherStyle={{
        background: bannerDither
      }}
      height={
        !!props.blurb ? 210 : 140
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
  )
}

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  bannerDither: string
  blurb?: string
  categoryName?: string
  categorySlug?: string
  bannerForegroundImageUrl: string
  bannerBackgroundImageUrl: string
}

export default withStyles(styles)( BannerCategoryMobile );






