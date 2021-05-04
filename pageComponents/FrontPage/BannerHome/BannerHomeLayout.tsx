import React from "react";
import clsx from "clsx";
import { styles } from "./styles";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";
// typings
import { Categories } from "typings/gqlTypes";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// Router
import { useRouter } from 'next/router';
// SSR
import { NextPage, NextPageContext } from 'next';
import Login from "layout/Login";
import Hidden from 'components/HiddenFix';
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";

// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { UserPrivate } from "typings/gqlTypes";
import Link from "next/link";




const BannerHomeLayout: NextPage<ReactProps> = (props) => {

  const {
    classes,
    bannerImageUrl,
    bannerDither,
    mdDown,
    height = 480,
  } = props;

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  return (
    <Banner
      // in /public/img
      src={bannerImageUrl}
      titleStyle={{
        color: "#181818",
      }}
      height={height}
      ditherStyle={{
        background: bannerDither
      }}
      dither={true}
      portraitMode={props.portraitMode}
    >

      <div className={classes.searchContainer}>
        {props.children}
      </div>


      <div className={classes.mainTitleContainer}>
        <Typography className={mdDown ? classes.mainTitleSm : classes.mainTitle}>
          Buy and sell firearms
        </Typography>
        <Typography variant={"subtitle2"}
          className={mdDown ? classes.subline1Sm : classes.subline1}
        >
          Free to list. Simple and Safe.
        </Typography>

        <div className={clsx(classes.buttonsFlexRow, 'fadeInFast')}>
          {
            !user?.id
            ? <Login
                initialTabIndex={1}
                titleSignup={"Create Account"}
                buttonText={"Get Started"}
                buttonProps={{
                  className: clsx(
                    classes.buttonBecomeASeller,
                    classes.minWidth184,
                    classes.buttonHeightDesktop,
                    classes.buttonFontSizeDesktop,
                  ),
                  classes: {
                    root: classes.buttonRoot,
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
                          classes.buttonBecomeASeller,
                          classes.minWidth184,
                          classes.buttonHeightMobile
                        )
                      : clsx(
                          classes.buttonBecomeASeller,
                          classes.minWidth184,
                          classes.buttonHeightDesktop,
                        )
                    }
                    variant="text"
                    color="primary"
                    classes={{
                      root: classes.buttonRoot,
                      label: classes.buttonFontSizeDesktop,
                    }}
                  >
                    Sell
                  </Button>
                </a>
              </Link>
          }
        </div>
      </div>

    </Banner>
  )
}

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  height?: number
  mdDown: boolean
  bannerImageUrl: string
  bannerDither: string
  portraitMode?: boolean;
}

export default withStyles(styles)( BannerHomeLayout );






