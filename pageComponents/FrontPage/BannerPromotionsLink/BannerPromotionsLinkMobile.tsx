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
import Button from '@mui/material/Button';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowStripeIcon from "components/ArrowStripeIcon"
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
import { Actions } from "reduxStore/actions";
import { UserPrivate } from "typings/gqlTypes";
import Link from "next/link";



const BannerPromotionsLinkMobile: NextPage<ReactProps> = (props) => {

  const {
    classes,
    bannerForegroundImageUrl,
    bannerBackgroundImageUrl,
    bannerDither,
  } = props;

  const theme = useTheme();
  const isDarkMode = isThemeDark(theme)
  // const mdDown = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <div className={classes.rootMobile}>
      <Banner
        // in /public/img
        bannerContainerStyles={{
          marginBottom: "1rem",
        }}
        // src={bannerBackgroundImageUrl}
        className={
          isDarkMode
            ? "background-neon"
            : "background-neon"
        }
        titleStyle={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: 'calc(100vw - 0rem)',
          top: '0px',
        }}
        ditherStyle={{
          background: bannerDither
        }}
        height={240}
        dither={true}
      >
        <div className={classes.bannerInnerBoxLeftSm}>
        </div>

        <div className={classes.bannerInnerBoxRightSm}>
          <div className={classes.bannerInnerBoxRightMobile}>
            <div className={classes.mainTitleContainerMobile}>
              <Typography variant={"h2"} className={classes.mainTitleXs}>
                List your products
              </Typography>
            </div>
          </div>
          <div className={classes.bannerInnerBoxRightMobile}>
            <Link href={"/promotions"}>
              <a>
                <Button
                  className={
                      clsx(
                        classes.buttonGoToPromotions,
                        classes.buttonHeightMobile
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
                </Button>
              </a>
            </Link>
          </div>
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

export default withStyles(styles)( BannerPromotionsLinkMobile );






