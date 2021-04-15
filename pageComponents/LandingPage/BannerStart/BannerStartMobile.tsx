import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { BorderRadius2x, Colors } from "layout/AppTheme";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// SSR
import { NextPage, NextPageContext } from 'next';
import Login from "layout/Login";
import Hidden from '@material-ui/core/Hidden';
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// typings
import { UserPrivate } from "typings/gqlTypes";
import Link from "next/link";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from '@material-ui/core/Tooltip';
import StoreOrLogin from "pageComponents/ProductCreate/StoreOrLogin";



const BannerHomeMobile: NextPage<ReactProps> = (props) => {

  const {
    classes,
    user,
    ditherStyle,
    bannerContainerStyle,
    bannerForegroundImageUrl,
  } = props;

  const theme = useTheme();

  const xsDown = useMediaQuery(theme.breakpoints.down("xs"))
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"))

  return (
    <Banner
      // in /public/img
      // src={bannerImageUrl}
      titleStyle={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '2rem',
      }}
      ditherStyle={{
        ...ditherStyle
      }}
      bannerContainerStyles={{
        ...bannerContainerStyle
      }}
      dither={true}
      height={xsDown ? 540 : 580}
    >

      <div className={classes.flexCol}>

        <CardMedia
          component="img"
          className={"fadeIn"}
          classes={{ media: classes.categoryImage }}
          src={bannerForegroundImageUrl}
        />


        {
          lgDown
          ? <div className={classes.mainTitleContainerMobile}>
              <Typography variant={"h1"} className={classes.mainTitleMobile}>
                Sell creative assets on Relay and earn passive income in style.
              </Typography>
            </div>
          : <div className={classes.mainTitleContainerMobile}>
              <Typography variant={"h1"} className={classes.mainTitleMobile}>
                Sell creative assets on
                Relay and earn passive
                income in style.
              </Typography>
            </div>
        }


        <div className={classes.searchContainer}>
        </div>

      </div>

    </Banner>
  )
}




///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  ditherStyle?: any
  bannerContainerStyle: any
  bannerForegroundImageUrl: string
  user: UserPrivate
}

export const styles = (theme: Theme) => createStyles({
  flexCol: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  bannerInnerBoxLeftMobile: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    flexBasis: '60%',
  },
  bannerInnerBoxRightMobile: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: 500,
    flexBasis: '60%',
  },
  mainTitleContainerMobile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.75rem',
    lineHeight: '2rem',
  },
  mainTitleMobile: {
    fontWeight: 800,
    color: Colors.black,
    lineHeight: '2.25rem',
    fontSize: '1.75rem',
    textAlign: "center",
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '0rem 1rem',
    // textShadow: '1px 1px 2px #444',
  },
  minWidth440: {
    minWidth: 440,
  },
  minWidth360: {
    minWidth: 360,
  },
  minWidth160: {
    minWidth: 160,
  },
  searchContainer: {
    marginTop: '0rem',
  },
  storeOrLoginClass: {
    justifyContent: 'center',
  },
  storeOrLoginClassButtonRoot: {
    width: '220px',
    height: 50,
  },
  storeOrLoginClassButtonLabel: {
    fontSize: '1.125rem',
    fontWeight: 700,
  },
  categoryImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: 'center',
    borderRadius: BorderRadius2x,
    width: '100%',
    height: '100%',
    // maxWidth: 400,
    minWidth: 320,
    padding: '0rem 2rem',
  },
})

export default withStyles(styles)( BannerHomeMobile );






