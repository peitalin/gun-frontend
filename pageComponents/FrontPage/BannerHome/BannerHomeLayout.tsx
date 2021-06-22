import React from "react";
import clsx from "clsx";
import { styles } from "./styles";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, Gradients, isThemeDark } from "layout/AppTheme";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// SSR
import { NextPage, NextPageContext } from 'next';
import Login from "layout/Login";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";
import CardMedia from "@material-ui/core/CardMedia";

// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { UserPrivate } from "typings/gqlTypes";
import Link from "next/link";
import RiflesBackground from "components/Icons/RiflesBackground";




const BannerHomeLayout: NextPage<ReactProps> = (props) => {

  const {
    classes,
    bannerImageUrl,
    bannerDither,
    mdDown,
    height = 480,
  } = props;

  const [hover, setHover] = React.useState(false)

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  const renderRiflesBackground = (isDarkMode: boolean) => {
    if (isDarkMode) {
      return <RiflesBackground color={Colors.uniswapGreyNavy}/>
    } else {
      return <RiflesBackground color={fade(Colors.slateGreyDarker, 0.5)}/>
    }
  }

  const theme = useTheme()
  const isDarkMode = isThemeDark(theme)

  return (
    <Banner
      // in /public/img
      // src={bannerImageUrl}
      // className={
      //   isDarkMode
      //   ? "background-neon"
      //   : "background-neon"
      // }
      // className={
      //   isDarkMode
      //   ? "background-neon"
      //   : "background-slate-grey"
      // }

      height={height}
      bannerContainerStyles={{
        marginTop: "-4rem", // for fixed floating navbar offset
        ...(props.bannerContainerStyle ?? {}),
      }}
      ditherStyle={{
        background: bannerDither,
      }}
      dither={true}
      renderBackgroundComponent={() => {
        if (mdDown) {
          return (
            <div className={clsx(classes.bannerInnerBoxRight)}>
              <div className={clsx(
                classes.flexRiflesCol,
                // hover && classes.backgroundBlur,
              )}>
                {/* {renderRiflesBackground(isDarkMode)} */}
              </div>
            </div>
          )
        } else {
          return (
            <div className={clsx(classes.bannerInnerBoxRight)}>
              <div className={clsx(
                classes.flexRiflesRow,
                // hover && classes.backgroundBlur,
              )}>
                {/* {renderRiflesBackground(isDarkMode)} */}
              </div>
              <div className={clsx(
                classes.flexRiflesRow,
                // hover && classes.backgroundBlur,
              )}>
                {/* {renderRiflesBackground(isDarkMode)} */}
              </div>
            </div>
          )
        }
      }}
      portraitMode={props.portraitMode}
    >

      <div className={classes.searchContainer}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {props.children}
      </div>

      <div className={classes.mainTitleContainer}>
        <Typography className={mdDown ? classes.mainTitleSm : classes.mainTitle}>
          Buy and sell used guns
        </Typography>
        <Typography variant={"subtitle2"}
          className={mdDown ? classes.subline1Sm : classes.subline1}
        >
          Free to list. Secured by Escrow.
        </Typography>

        <div className={clsx(classes.buttonsFlexRow, 'fadeInFast')}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
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
  bannerContainerStyle?: any
}

export default withStyles(styles)( BannerHomeLayout );






