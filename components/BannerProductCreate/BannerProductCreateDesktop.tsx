import React from "react";
import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// components
import Banner from "components/Banner";
import Typography from "@material-ui/core/Typography";
// Router
import { useRouter } from 'next/router';
// SSR
import { NextPage, NextPageContext } from 'next';
import Hidden from '@material-ui/core/Hidden';
import CloudUpload from "@material-ui/icons/CloudUpload";
import { styles } from "components/BannerProductCreate/styles";




const BannerProductCreateDesktop: NextPage<ReactProps> = (props) => {

  const {
    bannerImageUrl,
    bannerDitherMobile,
    bannerDither,
    classes,
  } = props;

  return (
    <Hidden mdDown implementation="css">
      <Banner
        // in /public/img
        src={bannerImageUrl}
        titleStyle={{
          color: "#181818",
          alignItems: 'center',
          marginLeft: '1.5rem',
        }}
        height={250}
        ditherStyle={{
          background: bannerDither
        }}
        // dither={true}
        dither={false}
      >
        <div className={classes.mainTitleContainer}>
          <CloudUpload className={classes.downloadIcon}/>
        </div>
        <div className={classes.mainTitleContainer}>
          <Typography variant={"h2"} className={classes.mainTitle}>
            Sell Unlimited Digital Products on Relay
          </Typography>
        </div>
        <Typography variant={"body2"} className={classes.subline1}>
          No listing fees. No subscription fees. No maintenance time.
        </Typography>
        <Typography variant={"body2"} className={classes.subline1}>
          Just upload your digital products, set your own prices, and
        </Typography>
        <Typography variant={"body2"} className={classes.subline1}>
          get paid passive income – automatically, every month.
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


export default withStyles(styles)(BannerProductCreateDesktop);






