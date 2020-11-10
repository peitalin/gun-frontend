import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { styles } from "./styles";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";
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
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { UserPrivate } from "typings/gqlTypes";
import Link from "next/link";




const BannerHomeMobile: NextPage<ReactProps> = (props) => {

  const {
    classes,
    bannerImageUrl,
    bannerDither,
    height = 300
  } = props;

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  return (
    <Banner
      // in /public/img
      src={bannerImageUrl}
      titleStyle={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 'calc(100vw - 2rem)',
        top: '2rem',
        color: "#181818",
      }}
      ditherStyle={{
        background: bannerDither
      }}
      height={height}
      dither={true}
    >
      <div className={classes.mainTitleContainer}>
        <Typography variant={"h3"} className={classes.mainTitleSm}>
          List and exchange guns
        </Typography>
      </div>

      <Typography variant={"subtitle2"} className={classes.subline1Sm}>
        Support independent gun owners directly.
      </Typography>

      <div className={classes.buttonsContainer}>
        {/* placeholder to position banner title without shifting */}
        <div style={{ height: '40px', width: 1, opacity: 0 }}>placeholder</div>

        {/* Hide buttons until JS kicks in so both buttons load at same time */}
        <Hidden mdUp implementation='js'>
          <div className={clsx(classes.mobileButtons, 'fadeInFast')}>
            {
              !option(user).id()
              ? <Login
                  initialTabIndex={1}
                  buttonText={"Create Free Account"}
                  titleSignup={"Create Free Account"}
                  buttonProps={{
                    className: clsx(
                      classes.buttonCreateAccount,
                      classes.minWidth160,
                      classes.buttonHeightMobile
                    ),
                    classes: { root: classes.buttonRoot }
                  }}
                />
              : <Link href={"/categories"}>
                  <a style={{ marginRight: '1rem' }}>
                    <Button
                        className={clsx(
                          classes.buttonBrowseCategories,
                          classes.minWidth160,
                          classes.buttonHeightMobile
                        )}
                        variant="text"
                        color="primary"
                        classes={{
                          root: classes.buttonRoot,
                        }}
                      >
                        Browse Categories
                    </Button>
                  </a>
                </Link>
            }
            <Link href={"/sell"}>
              <a>
                <Button
                  className={clsx(
                    classes.buttonBecomeASeller,
                    classes.minWidth160,
                    classes.buttonHeightMobile
                  )}
                  variant="text"
                  color="primary"
                  classes={{
                    root: classes.buttonRoot
                  }}
                >
                  Sell
                </Button>
              </a>
            </Link>
          </div>
        </Hidden>
      </div>

    </Banner>
  )
}

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  height?: number
  bannerImageUrl: string
  bannerDither: string
}

export default withStyles(styles)( BannerHomeMobile );






