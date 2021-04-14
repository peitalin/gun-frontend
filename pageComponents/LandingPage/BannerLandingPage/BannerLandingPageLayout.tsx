import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius, Colors, Gradients } from "layout/AppTheme";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// import TextField from "@material-ui/core/TextField";
import TextInput from "components/Fields/TextInput";
// Router
import { useRouter } from 'next/router';
// SSR
import { NextPage, NextPageContext } from 'next';
import Login from "layout/Login";
import Hidden from 'components/HiddenFix';

// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { UserPrivate, Signup_Emails } from "typings/gqlTypes";
import Link from "next/link";

import { useFormik } from 'formik';
import { validationSchemas } from "utils/validation";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/client";

import {
  GET_SIGNUP_WAITLIST,
  SIGNUP_TO_WAITLIST,
} from "queries/signup-waitlist";




const BannerLandingPageLayout: NextPage<ReactProps> = (props) => {

  const {
    classes,
    bannerImageUrl,
    bannerDither,
    mdDown,
    height = 480,
  } = props;

  const snackbar = useSnackbar();

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

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
            `${errMsg}`,
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
      src={bannerImageUrl}
      titleStyle={{
        justifyContent: "flex-end",
      }}
      height={height}
      ditherStyle={{
        background: bannerDither
      }}
      dither={true}
      portraitMode={props.portraitMode}
    >

      {/* <div className={classes.searchContainer}>
      </div> */}


      <div className={
        mdDown
        ? classes.mainTitleContainerSm
        : classes.mainTitleContainer
      }>
        <Typography className={mdDown ? classes.mainTitleSm : classes.mainTitle}>
          List and exchange guns
        </Typography>
        <Typography variant={"subtitle2"}
          className={mdDown ? classes.subline1Sm : classes.subline1}
        >
          Support independent gun owners
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <div className={clsx(classes.buttonsFlexRow, 'fadeInFast')}>
            <TextInput
              variant="outlined"
              name="email"
              type="email"
              placeholder="Enter email"
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
              }}
            >
              Signup for Launch
            </StyledButton>
          </div>
        </form>


        <div className={clsx(classes.buttonsFlexRow, 'fadeInFast')}>
          {
            !user?.id
            ? <Login
                initialTabIndex={1}
                titleSignup={"Create an Account"}
                buttonText={"Create an Account"}
                buttonProps={{
                  className: clsx(
                    classes.buttonSignupEmail,
                    classes.minWidth2,
                    classes.buttonHeightDesktop,
                    classes.buttonFontSizeDesktop,
                  ),
                  classes: {
                    label: classes.buttonFontSizeDesktop,
                  }
                }}
              />
            : <Link href={"/sell"}>
                <a>
                  <Button
                    className={
                      mdDown
                      ? clsx(
                          classes.buttonSignupEmail,
                          classes.minWidth184,
                          classes.buttonHeightMobile
                        )
                      : clsx(
                          classes.buttonSignupEmail,
                          classes.minWidth184,
                          classes.buttonHeightDesktop,
                        )
                    }
                    variant="text"
                    color="primary"
                    classes={{
                      label: classes.buttonFontSizeDesktop,
                    }}
                  >
                    I'm Selling
                  </Button>
                </a>
              </Link>
          }
        </div>
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
  mdDown: boolean
  bannerImageUrl: string
  bannerDither: string
  portraitMode?: boolean;
}


const fontFam = 'Helvetica Neue, Arial';

export const styles = (theme: Theme) => createStyles({
  root: {
    // backgroundColor: "#fefefe",
    width: "100%",
  },
  mainTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    position: "relative",
    marginLeft: '7rem',
    marginBottom: '3rem',
  },
  mainTitleContainerSm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: "relative",
    marginBottom: '3rem',
  },
  mainTitle: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: Colors.lightestGrey,
    lineHeight: '3rem',
    fontSize: '2.5rem',
  },
  mainTitleSm: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: Colors.lightestGrey,
    lineHeight: '2rem',
    fontSize: '1.75rem',
    marginBottom: "0.25rem",
    textAlign: "center",
  },
  subline1: {
    color: Colors.lightGrey,
    fontFamily: fontFam,
    lineHeight: "1.5",
    fontWeight: 500,
    fontSize: '1.5rem', // 20px
  },
  subline1Sm: {
    color: Colors.lightGrey,
    fontFamily: fontFam,
    lineHeight: "1.5",
    fontWeight: 500,
    fontSize: '1.125rem', // 20px
    textAlign: "center",
  },
  buttonsFlexRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: '1rem',
  },
  buttonSignupEmail: {
    // backgroundImage: theme.palette.type === "dark"
    //   ? Gradients.gradientUniswapFluro.background
    //   : Gradients.gradientUniswapBlueGreen.background,
    background: theme.palette.type === "dark"
      ? Colors.purple
      : Colors.ultramarineBlue,
    fontSize: '0.7rem',
    color: Colors.cream,
    minWidth: "150px",
    "&:hover": {
      // backgroundImage: theme.palette.type === "dark"
      //   ? Gradients.gradientUniswapFluro2.background
      //   : Gradients.gradientUniswapBlueGreen2.background,
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
  minWidth2: {
    minWidth: 120,
  },
  minWidth184: {
    minWidth: 184,
  },
  buttonHeightMobile: {
    height: 44,
  },
  buttonHeightDesktop: {
    height: 44,
  },
  buttonFontSizeDesktop: {
    fontSize: '1rem',
  },
  marginLeft1: {
    marginLeft: '0.5rem',
  },

  /// Email form
  emailForm: {
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    padding: '1rem',
    marginTop: "8rem",
    marginBottom: '4rem',
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
})






export default withStyles(styles)( BannerLandingPageLayout );






