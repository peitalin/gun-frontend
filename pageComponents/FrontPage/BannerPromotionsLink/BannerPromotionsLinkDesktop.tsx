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
import Button from '@mui/material/Button';
// Router
import { useRouter } from 'next/router';
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
import CardMedia from "@mui/material/CardMedia";
import Tooltip from '@mui/material/Tooltip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowStripeIcon from "../../../components/ArrowStripeIcon";



const BannerPromotionsLink: NextPage<ReactProps> = (props) => {

  const {
    classes,
    bannerForegroundImageUrl,
    bannerBackgroundImageUrl,
    bannerDither,
  } = props;

  const theme = useTheme();
  const isDarkMode = isThemeDark(theme)
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <div className={classes.rootDesktop}>
      <Banner
        // in /public/img
        // src={bannerBackgroundImageUrl}
        className={
          isDarkMode
            ? "background-neon"
            : "background-neon"
        }
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
            : `1px solid ${Colors.slateGrey}`
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
              List your products
            </Typography>
          </div>
          <Typography variant={"subtitle2"} className={classes.subline1}>
            Feature your product on the front page.
          </Typography>
          <div className={classes.buttonBox}>
            <Link href={"/promotions"}>
              <a>
                <Button
                  className={
                    clsx(
                      classes.buttonGoToPromotions,
                      classes.buttonHeightDesktop,
                    )
                  }
                  variant="text"
                  color="primary"
                  classes={{
                    label: classes.buttonLabelDesktop,
                  }}
                >
                  <ArrowStripeIcon
                    title={"Go Now"}
                  />
                  {/* <ArrowForwardIcon/> */}
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






