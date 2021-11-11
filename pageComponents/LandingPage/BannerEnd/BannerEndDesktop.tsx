import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import {
  BorderRadius,
  Colors,
  Gradients,
  BorderRadius2x,
  BorderRadius3x,
  BoxShadows,
  isThemeDark,
  fontFam,
} from "layout/AppTheme";
import { commonStyles } from "../commonStyles";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
// SSR
import { NextPage } from 'next';
// CSS
import { useTheme } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Login from "layout/Login"
import ArrowStripeIcon from "components/ArrowStripeIcon"





const BannerEndDesktop: NextPage<ReactProps> = (props) => {

  const {
    classes,
    height,
    ditherStyle,
    bannerContainerStyle,
  } = props;

  const theme = useTheme();
  const [hoverStripeArrow, setHoverStripeArrow] = React.useState(false)

  return (
    <Banner
      // in /public/img
      // src={bannerImageUrl}
      titleStyle={{
        flexDirection: 'row',
        paddingLeft: '1rem',
        paddingTop: '4rem',
      }}
      ditherStyle={{
        ...ditherStyle,
      }}
      bannerContainerStyles={{
        ...commonStyles(theme).border1,
        ...bannerContainerStyle,
      }}
      dither={true}
      height={height}
      portraitMode={props.portraitMode}
    >

      <div className={classes.backgroundBlur}></div>

      <div className={clsx(
        classes.bannerInnerBoxLeft,
        classes.minWidth500,
      )}>
        <div className={classes.mainTitleContainer}>
          <Typography className={classes.mainTitle}>
            {props.title}
          </Typography>
          <Typography variant={"subtitle2"}
            className={classes.subline1}
          >
            {props.subtitle}
          </Typography>
          <Login
            className={classes.navbarButton}
            // onMouseEnter={() => setHoverStripeArrow(true)}
            // onMouseLeave={() => setHoverStripeArrow(false)}
            buttonText={
              <ArrowStripeIcon
                className={clsx(
                  classes.categoryLinkTextMain,
                )}
                title={"Sign up"}
                color={ Colors.cream }
              />
            }
            redirectOnComplete={'/'}
            titleLogin={"Sign up to Browse"}
            initialTabIndex={1} // sign up tab
          />
        </div>
      </div>

      <div className={clsx(
        classes.bannerInnerBoxRight,
        classes.minWidth260,
      )}>
        {
          props.isDarkMode
          ?
            <div className={classes.clickableCard}>
              <CardMedia
                component="img"
                className={"fadeIn"}
                classes={{ media: classes.bannerImage }}
                src={props.bannerForegroundImageUrlDark}
              />
            </div>
          : <div className={classes.clickableCard}>
              <CardMedia
                component="img"
                className={"fadeIn"}
                classes={{ media: classes.bannerImage }}
                src={props.bannerForegroundImageUrlLight}
              />
            </div>
        }
      </div>
    </Banner>
  )
}




///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  height?: number
  ditherStyle?: any
  bannerContainerStyle: any
  bannerForegroundImageUrlDark: string
  bannerForegroundImageUrlLight: string
  isDarkMode: boolean;
  portraitMode?: boolean;
  title: React.ReactNode
  subtitle: React.ReactNode
}



export const styles = (theme: Theme) => createStyles({
  bannerInnerBoxLeft: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    flexGrow: 0.4,
  },
  bannerInnerBoxRight: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    // height: '100%',
    maxWidth: 480,
    flexBasis: '60%',
  },
  minWidth260: {
    minWidth: 260,
  },
  minWidth500: {
    minWidth: 500,
  },
  minWidth160: {
    minWidth: 160,
  },
  mainTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    position: "relative",
    marginLeft: '1rem',
    marginRight: '1rem',
    marginBottom: '1rem',
  },
  mainTitle: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: theme.palette.type === 'dark'
      ? Colors.lightestGrey
      : Colors.slateGreyBlack,
    lineHeight: '2.5rem',
    fontSize: '2.25rem',
    maxWidth: 400,
  },
  subline1: {
    color: theme.palette.type === 'dark'
      ? Colors.lightGrey
      : Colors.slateGreyLightBlack,
    fontFamily: fontFam,
    marginTop: "0.5rem",
    lineHeight: "1.5",
    fontWeight: 500,
    fontSize: '1.25rem',
    maxWidth: 450,
  },
  bannerImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: 'center',
    borderRadius: BorderRadius2x,
    width: '100%',
    height: '100%',
    boxShadow: BoxShadows.shadow2.boxShadow,
    // border: theme.palette.type === 'dark'
    //   ? `1px solid ${Colors.uniswapLightestGrey}`
    //   : `1px solid ${Colors.slateGreyBlack}`,
    // maxWidth: 400,
    minWidth: 400,
  },
  buttonsFlexRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: '1rem',
  },
  buttonSignupEmail: {
    background: isThemeDark(theme)
      ? Colors.purple
      : Colors.ultramarineBlue,
    fontSize: '0.7rem',
    color: Colors.cream,
    minWidth: "150px",
    "&:hover": {
      background: isThemeDark(theme)
        ? fade(Colors.purple, 0.9)
        : fade(Colors.ultramarineBlue, 0.9),
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
      backgroundPosition: '-75px',
    }
  },
  minWidth2: {
    minWidth: 120,
  },
  buttonFontSizeDesktop: {
    fontSize: '1rem',
  },
  marginLeft1: {
    marginLeft: '0.5rem',
  },

  linkContainer: {
    width: '100%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    "& span": {
      fontSize: 16,
      letterSpacing: -0.3,
    },
  },
  linkInput: {
    width: '100%',
    minWidth: "300px",
  },
  copyLink: {
    color: fade(Colors.blue, 1),
    "&:hover": {
      color: fade(Colors.blue, 0.7),
      cursor: "pointer",
    },
  },
  textInputSmall: {
    fontSize: '16px',
    height: '100%',
    background: theme.palette.type === 'dark'
      ? Colors.uniswapLightNavy
      : Colors.slateGrey,
    borderRadius: BorderRadius,
    '&:focus': {
      boxShadow: `${fade('#50B5F5', 0.2)} 0 0 0 2px`,
      borderColor: Colors.blue,
      color: Colors.blue,
      border: `1px solid ${Colors.ultramarineBlue}`,
    },
    "&:focus-within": {
      border: `1px solid ${Colors.ultramarineBlue}`,
    },
  },
  textInputSmallRoot: {
    color: Colors.cream,
    fontSize: '16px',
    maxWidth: 330,
  },
  backgroundBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    // backgroundImage:`url(/img/start/blur.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
  },
  clickableCard: {
    position: "relative",
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  linkToApp: {
    position: "absolute",
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkToAppButtonText: {
    fontSize: '1.15rem',
  },
  linkToAppButton: {
    backgroundColor: Colors.ultramarineBlue,
    color: Colors.cream,
    width: '100%',
    cursor: "pointer",
    height: 50,
    borderRadius: BorderRadius,
    maxWidth: 200,
    // border: `0px solid ${Colors.charcoal}`,
    transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      color: Colors.cream,
      backgroundColor: Colors.lightBlue,
      transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  navbarButton: {
    color: Colors.cream,
    borderRadius: BorderRadius3x,
    padding: 0,
    background: isThemeDark(theme)
      ? Colors.purple
      : Colors.ultramarineBlue,
    "&:hover": {
      background: isThemeDark(theme)
        ? Colors.lighterPurple
        : Colors.ultramarineBlueLight,
    },
    // marginRight: "0.5rem",
    marginTop: "1rem",
    minWidth: 150,
    height: 40,
    maxWidth: 180,
    width: '100%',
    "& span": {
      height: '100%',
      width: '100%',
    },
    "& span > span": {
      height: '100%',
      width: '100%',
    },
  },
  categoryLinkTextMain: {
    height: '100%',
    width: '100%',
    paddingRight: '0.80rem',
    paddingLeft: '0.70rem',
    minWidth: '50px',
    whiteSpace: 'nowrap',
    fontSize: '0.9rem',
    fontWeight: 600,
    // bottom border
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '2px solid rgba(0,0,0,0)',
    transition: theme.transitions.create(['border', 'color'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      transition: theme.transitions.create(['border', 'color'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
})

export default withStyles(styles)( BannerEndDesktop );






