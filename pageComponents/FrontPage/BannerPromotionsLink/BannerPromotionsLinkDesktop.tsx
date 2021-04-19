import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius3x, Colors } from "layout/AppTheme";
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
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { UserPrivate } from "typings/gqlTypes";
import Link from "next/link";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from '@material-ui/core/Tooltip';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';



const BannerPromotionsLink: NextPage<ReactProps> = (props) => {

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
    <div className={classes.rootDesktop}>
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
              Promote your products
            </Typography>
          </div>
          <Typography variant={"subtitle2"} className={classes.subline1}>
            Feature your product on the front page.
          </Typography>
          <div className={classes.buttonBox}>
            <Link href={"/promote-listings"}>
              <a>
                <Button
                  className={
                    clsx(
                      classes.buttonGoToPromotions,
                      classes.minWidth184,
                      classes.buttonHeightDesktop,
                    )
                  }
                  variant="text"
                  color="primary"
                  classes={{
                    root: classes.buttonRoot,
                    label: classes.buttonFontSizeDesktop,
                  }}
                >
                  {"Go Now "} <ArrowForwardIcon/>
                </Button>
              </a>
            </Link>
          </div>
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






