import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// Router
import { useRouter } from 'next/router';
// SSR
import { NextPage, NextPageContext } from 'next';
import Login from "layout/Login";
import Hidden from '@material-ui/core/Hidden';
import RelayDownloadIcon from "components/Icons/RelayDownloadIcon";
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { UserPrivate } from "typings/gqlTypes";
import Link from "next/link";




const BannerHome: NextPage<ReactProps> = (props) => {

  const { classes } = props;
  const router = useRouter();

  const bannerImageUrl = "/img/banner5.jpg"
  const bannerDitherMobile = 'linear-gradient(0deg, rgba(25,25,25,0.7) 50%, rgba(25,25,25,0.1) 90%)'
  const bannerDither = 'linear-gradient(30deg, rgba(25,25,25,0.7) 10%, rgba(25,25,25,0.1) 80%)'

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  // const theme = useTheme();
  // const lgUp1024 = useMediaQuery('min-width:1024px');

  return (
    <>
      {/* Mobile */}
      <Hidden mdUp implementation='css'>
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
            top: '0px',
            color: "#181818",
          }}
          ditherStyle={{
            background: bannerDitherMobile
          }}
          height={220}
          dither={true}
        >
          <div className={classes.mainTitleContainer}>
            <RelayDownloadIcon className={classes.downloadIconXs}/>
            <Typography variant={"h2"} className={classes.mainTitleXs}>
              Gun Marketplace
            </Typography>
          </div>
          <Typography variant={"body2"} className={classes.subline1Xs}>
            List and exchange guns
          </Typography>
          <Typography variant={"body2"} className={classes.subline1Xs}>
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
                      <a style={{ marginRight: '0.5rem' }}>
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
      </Hidden>


      {/* Desktop */}
      <Hidden smDown implementation="css">
        <Banner
          // in /public/img
          src={bannerImageUrl}
          titleStyle={{
            color: "#181818",
            alignItems: 'flex-start',
            marginLeft: '1.5rem',
          }}
          ditherStyle={{
            background: bannerDither
          }}
          dither={true}
        >
          <div className={classes.mainTitleContainer}>
            <RelayDownloadIcon className={classes.downloadIcon}/>
            <Typography variant={"h1"} className={classes.mainTitle}>
              Gun Marketplace
            </Typography>
          </div>

          <Typography variant={"subtitle2"} className={classes.subline1}>
            List and exchange guns
          </Typography>
          <Typography variant={"subtitle2"} className={classes.subline1}>
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
                      <a style={{ marginRight: '0.5rem' }}>
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
      </Hidden>
    </>
  )
}

const fontFam = 'Helvetica Neue, Arial';

const styles = (theme: Theme) => createStyles({
  root: {
    // backgroundColor: "#fefefe",
  },
  mainTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  mainTitle: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: Colors.lightestGrey,
    lineHeight: '1.5rem',
  },
  mainTitleXs: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: Colors.lightestGrey,
    lineHeight: '1.2rem',
    fontSize: '1.5rem',
  },
  mainTitleHighlight: {
    fontWeight: 600,
    fontFamily: fontFam,
    color: Colors.secondary,
  },
  downloadIcon: {
    fill: Colors.foregroundColor,
    height: '1.5rem',
    marginRight: '0.5rem',
    width: '1.5rem',
  },
  downloadIconXs: {
    fill: Colors.foregroundColor,
    height: '1.2rem',
    marginRight: '0.5rem',
    width: '1.2rem',
  },
  subTitle: {
    marginTop: "0.25rem",
    fontSize: '0.9rem',
  },
  subline1: {
    color: Colors.lightGrey,
    fontFamily: fontFam,
    lineHeight: "1.25",
    fontWeight: 500,
    fontSize: '1.375rem', // 20px
  },
  subline1Xs: {
    color: Colors.lightGrey,
    fontFamily: fontFam,
    lineHeight: "1.25",
    fontWeight: 500,
    fontSize: '1rem', // 20px
  },
  subline2: {
    color: Colors.grey,
    fontWeight: 400,
  },
  subline3: {
    color: Colors.grey,
    fontWeight: 500,
  },
  productSectionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  buttonsContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonsFlexRow: {
    display: "flex",
    flexDirection: "row",
    marginTop: '1.2rem',
    position: 'absolute',
    top: 0,
  },
  buttonCreateAccount: {
    marginRight: '0.5rem',
    color: Colors.foregroundColor,
    backgroundColor: Colors.secondary,
    border: `1px solid ${Colors.secondaryBright}`,
    transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      backgroundColor: Colors.secondaryBright,
      border: `1px solid ${Colors.secondaryBright}`,
      transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  buttonPlaceholder: {
    opacity: 0,
  },
  buttonBecomeASeller: {
    backgroundColor: Colors.foregroundColor,
    color: Colors.charcoal,
    width: '100%',
    border: `1px solid ${Colors.charcoal}`,
    transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      color: Colors.secondaryBright,
      border: `1px solid ${Colors.secondaryBright}`,
      backgroundColor: Colors.foregroundColor,
      transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  buttonBrowseCategories: {
    backgroundColor: fade(Colors.darkGrey55, 0.8),
    color: Colors.cream,
    width: '100%',
    marginRight: '0.5rem',
    border: `1px solid ${fade(Colors.darkGrey55, 0.8)}`,
    transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
      easing: theme.transitions.easing.easeIn,
      duration: '100ms',
    }),
    "&:hover": {
      backgroundColor: Colors.lightGrey,
      color: Colors.charcoal,
      // border: `1px solid ${Colors.lightGrey}`,
      transition: theme.transitions.create(['color', 'backgroundColor', 'border'], {
        easing: theme.transitions.easing.easeIn,
        duration: '100ms',
      })
    },
  },
  minWidth160: {
    minWidth: 160,
  },
  minWidth184: {
    minWidth: 184,
  },
  buttonHeightMobile: {
    height: 40,
  },
  buttonHeightDesktop: {
    height: 44,
  },
  buttonFontSizeDesktop: {
    fontSize: '1rem',
  },
  mobileButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '1rem',
    position: 'absolute',
    top: 0,
  },
  buttonRoot: {
  },
  buttonLabel: {
    fontSize: '0.9rem',
  },
  saveAlt: {
  },
})

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
}


export default withStyles(styles)( BannerHome );






