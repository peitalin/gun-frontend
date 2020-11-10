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
import Searchbar from "layout/NavBarMain/Searchbar";




const BannerHomeDesktop: NextPage<ReactProps> = (props) => {

  const {
    classes,
    bannerImageUrl,
    bannerDither,
    height = 400
  } = props;

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Banner
      // in /public/img
      src={bannerImageUrl}
      titleStyle={{
        color: "#181818",
        alignItems: 'flex-start',
        marginLeft: mdDown ? "4rem" : "6rem",
      }}
      height={height}
      ditherStyle={{
        background: bannerDither
      }}
      dither={true}
    >

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 'calc(100% - 6rem)',
        padding: '1rem',
        marginTop: "6rem",
        marginBottom: '4rem',
      }}>
        <Searchbar color={Colors.uniswapLightestGrey}/>
      </div>

      <div className={classes.mainTitleContainer}>
        <Typography className={mdDown ? classes.mainTitleMd : classes.mainTitle}>
          List and exchange guns
        </Typography>
      </div>

      <Typography variant={"subtitle2"}
        className={mdDown ? classes.subline1Md : classes.subline1}
      >
        Support independent gun owners directly.
      </Typography>

      <div style={{ position: 'relative' }}>
        {/* placeholder to position banner title without shifting */}
        <div style={{ height: '40px', width: 1, opacity: 0 }}>placeholder</div>
        {/* Hide buttons until JS kicks in so both buttons load at same time */}
        <Hidden smDown implementation="js">
          <div className={clsx(classes.buttonsFlexRow, 'fadeInFast')}>
            {
              !option(user).id()
              ? <Login
                  initialTabIndex={1}
                  titleSignup={"Create Free Account"}
                  buttonText={"Create Free Account"}
                  buttonProps={{
                    className: clsx(
                      classes.buttonCreateAccount,
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
              : <Link href={"/categories"}>
                  <a style={{ marginRight: '1rem' }}>
                    <Button
                        className={clsx(
                          classes.buttonBrowseCategories,
                          classes.minWidth184,
                          classes.buttonHeightDesktop,
                        )}
                        variant="text"
                        color="primary"
                        classes={{
                          root: classes.buttonRoot,
                          label: classes.buttonFontSizeDesktop,
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
                    classes.minWidth184,
                    classes.buttonHeightDesktop,
                  )}
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

export default withStyles(styles)( BannerHomeDesktop );






