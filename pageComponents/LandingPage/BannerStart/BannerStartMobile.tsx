import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius2x, BorderRadius, Colors, fontFam } from "layout/AppTheme";
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
import CardMedia from "@material-ui/core/CardMedia";

import { useFormik } from 'formik';
import { validationSchemas } from "utils/validation";
import { useSnackbar } from "notistack";
import { useMutation } from "@apollo/client";

import {
  GET_SIGNUP_WAITLIST,
  SIGNUP_TO_WAITLIST,
} from "queries/signup-waitlist";






const BannerStartMobile: NextPage<ReactProps> = (props) => {

  const {
    classes,
    ditherStyle,
    bannerContainerStyle,
  } = props;

  const snackbar = useSnackbar();

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"))
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"))

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
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '4rem',
      }}
      ditherStyle={{
        ...ditherStyle
      }}
      bannerContainerStyles={{
        ...bannerContainerStyle
      }}
      dither={true}
      height={620}
    >

      <div className={classes.flexCol}>

        {
          props.isDarkMode
          ? <CardMedia
              component="img"
              className={"fadeIn"}
              classes={{ media: classes.categoryImage }}
              src={props.bannerForegroundImageUrlDark}
            />
          : <CardMedia
              component="img"
              className={"fadeIn"}
              classes={{ media: classes.categoryImage }}
              src={props.bannerForegroundImageUrlLight}
            />
        }


        <div className={classes.mainTitleContainerMobile}>
          <Typography className={classes.mainTitleSm}>
            Buy and sell firearms simply and safely
          </Typography>
          <Typography variant={"subtitle2"}
            className={classes.subline1Sm}
          >
            A secure payment system
            that protects you every step of the transfer
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
                  classes.buttonSignupDesktop,
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
    color: theme.palette.type === 'dark'
      ? Colors.lightestGrey
      : Colors.black,
    lineHeight: '2rem',
    fontSize: '1.75rem',
    marginBottom: "0.25rem",
    textAlign: "center",
    maxWidth: 340,
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
    maxWidth: 318,
  },
  categoryImage: {
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
  buttonSignupDesktop: {
    fontSize: '1rem',
    minWidth: 100,
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
})

export default withStyles(styles)( BannerStartMobile );






