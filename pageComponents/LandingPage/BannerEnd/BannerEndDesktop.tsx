import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import {
  BorderRadius,
  Colors,
  Gradients,
  BorderRadius2x,
  BoxShadows,
  isThemeDark,
  fontFam,
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
import Link from "next/link";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from '@material-ui/core/Tooltip';


import { useFormik } from 'formik';
import { validationSchemas } from "utils/validation";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/client";

import {
  GET_SIGNUP_WAITLIST,
  SIGNUP_TO_WAITLIST,
} from "queries/signup-waitlist";



const BannerEndDesktop: NextPage<ReactProps> = (props) => {

  const {
    classes,
    height,
    ditherStyle,
    bannerContainerStyle,
  } = props;

  const snackbar = useSnackbar();

  const theme = useTheme();

  const [
    signupToWaitlist,
    signupToWaitlistResponse
  ] = useMutation<{ signupToWaitlist: Signup_Emails }, { email: string }>(
    SIGNUP_TO_WAITLIST, {
      variables: {
        email: "",  // use formik values later
      },
      onCompleted: ({ signupToWaitlist }) => {
        console.log("data::::", signupToWaitlist)
        snackbar.enqueueSnackbar(
          `You're on the waitlist ${signupToWaitlist?.email}`,
          { variant: "success" }
        )
      },
      onError: (err) => {
        let errMsg = err?.graphQLErrors?.[0]?.message;
        if (errMsg?.includes("duplicate")) {
          snackbar.enqueueSnackbar(
            `You've already signed up`,
            { variant: "info" }
          )
        } else {
          snackbar.enqueueSnackbar(
            `${errMsg ?? "There was a connection error"}`,
            { variant: "error" }
          )
        }
      },
    }
  )

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchemas.SignupEmail,
    onSubmit: async (values) => {
      console.log(JSON.stringify(values))
      await signupToWaitlist({
        variables: {
          email: values?.email,
        }
      })
      formik.resetForm();
    },
  });

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
            Get Launch Updates
          </Typography>
          <Typography variant={"subtitle2"}
            className={classes.subline1}
          >
            We are currently in beta testing and
            will launch soon. Please sign up for more details
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <div className={clsx(classes.buttonsFlexRow, 'fadeInFast')}>
              <TextInput
                variant="outlined"
                name="email"
                type="email"
                placeholder="Enter email for updates"
                onChange={formik.handleChange}
                value={formik.values.email}
                className={classes.linkInput}
                classes={{
                  root: classes.textInputSmallRoot
                }}
                inputProps={{
                  className: classes.textInputSmall
                }}
              />
              <StyledButton
                variant="contained"
                type="submit"
                className={clsx(
                  classes.buttonSignupEmail,
                  classes.minWidth2,
                  classes.buttonFontSizeDesktop,
                  classes.marginLeft1,
                )}
                onClick={() => {
                  if (!formik.values?.email) {
                    snackbar.enqueueSnackbar(
                      `Please enter an email`,
                      { variant: "info" }
                    )
                  }
                }}
              >
                Sign up
              </StyledButton>
            </div>
          </form>
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
          : <div className={classes.clickableCard}>
              <CardMedia
                component="img"
                className={"fadeIn"}
                classes={{ media: classes.bannerImage }}
                src={props.bannerForegroundImageUrlLight}
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
  height?: number
  ditherStyle?: any
  bannerContainerStyle: any
  bannerForegroundImageUrlDark: string
  bannerForegroundImageUrlLight: string
  isDarkMode: boolean;
  portraitMode?: boolean;
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
    backgroundImage:`url(/img/start/blur.png)`,
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
})

export default withStyles(styles)( BannerEndDesktop );






