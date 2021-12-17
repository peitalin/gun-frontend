import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, isThemeDark } from "layout/AppTheme";
import { styles } from "./styles";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
// CSS
import { useTheme } from "@material-ui/core/styles";
import StripeArrowButton from "components/StripeArrowButton";



const BannerTrendingLinkMobile: React.FC<ReactProps> = (props) => {

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
            : "background-black"
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
                {props.headingMobile}
              </Typography>
            </div>
          </div>
          <div className={classes.bannerInnerBoxRightMobile}>
            <StripeArrowButton
              href={props.link}
              title={props.buttonText}
            />
          </div>
        </div>
      </Banner>
    </div>
  )
}

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  headingMobile: string
  subheadingMobile: string
  link: string
  buttonText: string
  bannerDither: string
  bannerForegroundImageUrl: string
  bannerBackgroundImageUrl: string
}

export default withStyles(styles)( BannerTrendingLinkMobile );






