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
  fontFam,
  isThemeDark
} from "layout/AppTheme";
import { commonStyles } from "../commonStyles";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import TextInput from "components/Fields/TextInput";
// SSR
import { NextPage } from 'next';
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// typings
import { UserPrivate, Signup_Emails } from "typings/gqlTypes";
import Image from 'next/image';

import { useFormik } from 'formik';
import { validationSchemas } from "utils/validation";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/client";

import Login from "layout/Login"
import ArrowStripeIcon from "components/ArrowStripeIcon"





const BannerEndMobile: NextPage<ReactProps> = (props) => {

  const {
    classes,
    ditherStyle,
    bannerContainerStyle,
  } = props;

  const snackbar = useSnackbar();
  const theme = useTheme();


  return (
    <Banner
      // in /public/img
      // src={bannerImageUrl}
      titleStyle={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '6rem',
      }}
      ditherStyle={{
        ...ditherStyle
      }}
      bannerContainerStyles={{
        ...bannerContainerStyle,
        ...commonStyles(theme).borderLast,
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
            titleLogin={"Sign up to Browse"}
            initialTabIndex={1} // sign up tab
          />

        </div>


        {
          props.isDarkMode
          ?
            <div className={classes.clickableCard}>
              <Image src={props.bannerForegroundImageUrlDark}
                className={classes.bannerImage}
                width={"600px"}
                height={"400px"}
                alt="Banner Image"
              />
            </div>
          : <div className={classes.clickableCard}>
              <Image src={props.bannerForegroundImageUrlLight}
                className={classes.bannerImage}
                width={"600px"}
                height={"400px"}
                alt="Banner Image"
              />
              {/* <Link href={"/"}>
                <a className={classes.linkToApp}>
                  <Button
                    className={classes.linkToAppButton}
                    classes={{
                      label: classes.linkToAppButtonText
                    }}
                  >
                    Explore the beta
                  </Button>
                </a>
              </Link> */}
            </div>
        }

      </div>

    </Banner>
  )
}



const StyledButton = withStyles({
  root: {
    height: '44px',
    width: '100%',
    maxWidth: 330,
    paddingLeft: '1rem',
    paddingRight: '1rem',
    cursor: "pointer",
    color: Colors.cream,
    borderRadius: BorderRadius,
    padding: 0,
  },
  label: {
    textTransform: "uppercase",
    color: "#fff",
    // '&:focused': {
    //   border: `1px solid ${Colors.ultramarineBlue}`,
    // },
  },
})(Button);



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
    color: theme.palette.type === 'dark'
      ? Colors.lightestGrey
      : Colors.slateGreyBlack,
    lineHeight: '2rem',
    fontSize: '1.75rem',
    marginBottom: "0.25rem",
    textAlign: "center",
    maxWidth: 340,
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  subline1Sm: {
    color: theme.palette.type === 'dark'
      ? Colors.uniswapLightGrey
      : Colors.slateGreyLightBlack,
    fontFamily: fontFam,
    lineHeight: "1.5",
    fontWeight: 500,
    fontSize: '1.125rem', // 20px
    textAlign: "center",
    maxWidth: 360,
  },
  bannerImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: 'center',
    borderRadius: BorderRadius2x,
    height: '100%',
    width: '90%',
    maxWidth: 400,
    minWidth: 320,
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  buttonsFlexRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: '1rem',
  },
  buttonSignupEmail: {
    background: theme.palette.type === "dark"
      ? Colors.purple
      : Colors.ultramarineBlue,
    fontSize: '0.7rem',
    color: Colors.cream,
    minWidth: "140px",
    "&:hover": {
      background: theme.palette.type === "dark"
        ? fade(Colors.purple, 0.9)
        : fade(Colors.ultramarineBlue, 0.9),
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
  clickableCard: {
    position: "relative",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
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

export default withStyles(styles)( BannerEndMobile );






