import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius2x, BoxShadows, Colors, isThemeDark } from "layout/AppTheme";
import { styles } from "./styles";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import StripeArrowButton from "components/StripeArrowButton";



const BannerTrendingLink: React.FC<ReactProps> = (props) => {

  const {
    classes,
    bannerForegroundImageUrl,
    bannerBackgroundImageUrl,
    bannerDither,
  } = props;

  const theme = useTheme();
  const isDarkMode = isThemeDark(theme)
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <div className={classes.rootDesktop}>
      <Banner
        // in /public/img
        // src={bannerBackgroundImageUrl}
        className={
          isDarkMode
            ? "background-neon"
            : "background-black"
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
          borderRadius: BorderRadius2x,
          // boxShadow: BoxShadows.shadow5.boxShadow,
          border: isDarkMode
            ? `0px solid ${Colors.uniswapDarkPurple}`
            : `0px solid ${Colors.slateGrey}`
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
              {props.headingDesktop}
            </Typography>
          </div>
          <Typography variant={"subtitle2"} className={classes.subline1}>
              {props.subheadingDesktop}
          </Typography>
          <div className={classes.buttonBox}>
            <StripeArrowButton
              href={props.link}
              title={props.buttonText}
            />
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
  headingDesktop: string
  subheadingDesktop: string
  link: string
  buttonText: string
  bannerDither: string
  bannerForegroundImageUrl: string
  bannerBackgroundImageUrl: string
}


export default withStyles(styles)( BannerTrendingLink );






