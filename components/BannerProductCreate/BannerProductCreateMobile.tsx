import React from "react";
// styles
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
// SSR
import { NextPage, NextPageContext } from 'next';
import Hidden from '@material-ui/core/Hidden';
import CloudUpload from "@material-ui/icons/CloudUpload";
import { styles } from "components/BannerProductCreate/styles";




const BannerProductCreateMobile: NextPage<ReactProps> = (props) => {

  const {
    bannerImageUrl,
    bannerDitherMobile,
    bannerDither,
    classes,
  } = props;

  return (
    <Hidden lgUp implementation='css'>
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
          height: '100%',
          color: "#181818",
        }}
        height={220}
        ditherStyle={{
          background: bannerDitherMobile
        }}
        dither={true}
      >
        <div className={classes.mainTitleContainerMobile}>
        </div>
        <div className={classes.mainTitleContainerMobile}>
          <Typography variant={"h4"} className={classes.mainTitleMobile}>
            Buy and Sell Used Guns on Gun Marketplace
          </Typography>
        </div>
        <Typography variant={"body2"} className={classes.subline1Mobile}>
          No listing fees. No subscription fees. No maintenance time.
          Just upload your products, set your own prices, and
          select a licensed gun dealer to handle transfers.
        </Typography>
      </Banner>
    </Hidden>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  bannerImageUrl: string;
  bannerDitherMobile: string;
  bannerDither: string;
}

export default withStyles(styles)(BannerProductCreateMobile);






