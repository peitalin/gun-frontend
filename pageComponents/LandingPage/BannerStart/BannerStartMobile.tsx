import React from "react";
import clsx from "clsx";
// styles
import { Theme, alpha } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import {
  BorderRadius,
  Colors,
  Gradients,
  BorderRadius2x,
  BorderRadius3x,
  BoxShadows,
  fontFam,
  isThemeDark
} from "layout/AppTheme";
import { commonStyles } from "../commonStyles";
// components
import Banner from "components/Banner";
import Typography from "@mui/material/Typography";
// SSR
import { NextPage } from 'next';
// CSS
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import Login from "layout/Login"
import ArrowStripeIcon from "components/ArrowStripeIcon"






const BannerStartMobile: NextPage<ReactProps> = (props) => {

  const {
    classes,
    ditherStyle,
    bannerContainerStyle,
  } = props;

  return (
    <Banner
      // in /public/img
      // src={bannerImageUrl}
      titleStyle={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '4rem',
        marginBottom: "4rem",
        height: 'unset',
      }}
      ditherStyle={{
        ...ditherStyle
      }}
      bannerContainerStyles={{
        // ...commonStyles(theme).border1,
        ...bannerContainerStyle,
      }}
      dither={true}
      height={620}
    >

      <div className={classes.flexCol}>
        <div className={classes.mainTitleContainerMobile}>

          <Typography className={classes.mainTitleSm}>
            {props.title}
          </Typography>
          <Typography variant={"subtitle2"}
            className={classes.subline1Sm}
          >
            {props.subtitle}
          </Typography>

          <Login
            className={classes.navbarButton}
            buttonText={
              <ArrowStripeIcon
                className={clsx(
                  classes.categoryLinkTextMain,
                )}
                title={"Sign up"}
                color={
                  Colors.cream
                }
              />
            }
            redirectOnComplete={'/'}
            titleLogin={"Sign up to Browse"}
            initialTabIndex={1} // sign up tab
          />
        </div>
      </div>

    </Banner>
  )
}





///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  ditherStyle?: any
  bannerContainerStyle: any
  bannerForegroundImageUrlDark: string
  bannerForegroundImageUrlLight: string
  isDarkMode: boolean;
  title: React.ReactNode
  subtitle: React.ReactNode
}



export const styles = (theme: Theme) => createStyles({
  flexCol: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  mainTitleContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
    lineHeight: '2rem',
  },
  mainTitleSm: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: theme.palette.mode === 'dark'
      ? Colors.lightestGrey
      : Colors.cream,
    lineHeight: '2rem',
    fontSize: '1.75rem',
    marginBottom: "0.25rem",
    textAlign: "center",
    maxWidth: 340,
  },
  subline1Sm: {
    color: theme.palette.mode === 'dark'
      ? Colors.uniswapLightGrey
      : Colors.slateGreyDarkest,
    fontFamily: fontFam,
    lineHeight: "1.5",
    fontWeight: 500,
    fontSize: '1.125rem', // 20px
    textAlign: "center",
    maxWidth: 318,
  },
  bannerImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: 'center',
    borderRadius: BorderRadius2x,
    width: '90%',
    height: '100%',
    maxWidth: 400,
    minWidth: 320,
    marginTop: '3rem',
    marginBottom: '3rem',
  },
  buttonsFlexRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: '1rem',
  },
  buttonSignupEmail: {
    background: theme.palette.mode === "dark"
      ? Colors.purple
      : Colors.ultramarineBlue,
    fontSize: '0.7rem',
    color: Colors.cream,
    minWidth: "150px",
    "&:hover": {
      background: theme.palette.mode === "dark"
        ? alpha(Colors.purple, 0.9)
        : alpha(Colors.ultramarineBlue, 0.9),
      transition: theme.transitions.create(['color', 'border', 'background'], {
        easing: theme.transitions.easing.easeInOut,
        duration: "200ms",
      }),
      backgroundPosition: '-75px',
    }
  },
  buttonSignupMobile: {
    fontSize: '1rem',
    minWidth: 60,
    marginLeft: '0.5rem',
  },
  linkInput: {
    width: '100%',
    minWidth: 240,
  },
  textInputSmall: {
    fontSize: '16px',
    height: '100%',
    background: theme.palette.mode === 'dark'
      ? Colors.uniswapLightNavy
      : Colors.slateGrey,
    borderRadius: BorderRadius,
    '&:focus': {
      boxShadow: `${alpha('#50B5F5', 0.2)} 0 0 0 2px`,
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

export default withStyles(styles)( BannerStartMobile );






