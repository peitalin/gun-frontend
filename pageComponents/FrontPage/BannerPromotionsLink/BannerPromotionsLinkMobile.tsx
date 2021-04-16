import React from "react";
import clsx from "clsx";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import { styles } from "./styles";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
// Router
import { useRouter } from 'next/router';
// SSR
import { NextPage, NextPageContext } from 'next';
// CSS
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { Actions } from "reduxStore/actions";
import { UserPrivate } from "typings/gqlTypes";
import Link from "next/link";



const BannerPromotionsLinkMobile: NextPage<ReactProps> = (props) => {

  const {
    classes,
    bannerForegroundImageUrl,
    bannerBackgroundImageUrl,
    bannerDither,
  } = props;

  const user = useSelector<GrandReduxState, UserPrivate>(
    s => s.reduxLogin.user
  )

  const theme = useTheme();

  return (
    <Banner
      // in /public/img
      bannerContainerStyles={{
        marginBottom: "1rem",
      }}
      src={bannerBackgroundImageUrl}
      titleStyle={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        maxWidth: 'calc(100vw - 0rem)',
        top: '0px',
        color: "#181818",
      }}
      ditherStyle={{
        background: bannerDither
      }}
      height={140}
      dither={true}
    >
      <div className={classes.bannerInnerBoxLeftSm}>
      </div>

      <div className={classes.bannerInnerBoxRightSm}>
        <div className={classes.bannerInnerBoxRightBlur}>
          <div className={classes.mainTitleContainerMobile}>
            <Typography variant={"h2"} className={classes.mainTitleXs}>
              Promote product listings
            </Typography>
          </div>
        </div>
      </div>
        <Link href={"/promote-listings"}>
          <a>
            <Button
              className={
                  clsx(
                    classes.buttonBecomeASeller,
                    classes.minWidth184,
                    classes.buttonHeightMobile
                  )
              }
              variant="text"
              color="primary"
              classes={{
                root: classes.buttonRoot,
                label: classes.buttonFontSizeDesktop,
              }}
            >
              Go
            </Button>
          </a>
        </Link>
    </Banner>
  )
}

///////////////// TYPINGS ///////////////////
interface ReactProps extends WithStyles<typeof styles> {
  bannerDither: string
  bannerForegroundImageUrl: string
  bannerBackgroundImageUrl: string
}

export default withStyles(styles)( BannerPromotionsLinkMobile );






