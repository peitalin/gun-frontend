import React, { useState } from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius3x } from "layout/AppTheme";
// components
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "components/HiddenFix";
import Tick from "components/Icons/Tick";



const StartSelling3 = (props: ReactProps) => {

  const { classes } = props;
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className={clsx(classes.section3Root, classes.flexRow)}>

      <div className={clsx(classes.section3)}>
        <Typography className={mdDown ? classes.titleMobile : classes.title}>
          Buy and Sell in 5 steps
        </Typography>

        <div className={clsx(
          mdDown ? classes.flexCol : classes.flexRow,
          classes.flexWrap
        )}>
          <div className={clsx(
            classes.flexItem,
            mdDown ? classes.flexRowMobile : classes.flexRow,
            mdDown ? classes.minWidthMobile : classes.minWidth
          )}>
            <div className={classes.reasonContainer}>
              <div className={clsx(classes.flexRow, classes.reasonRow)}>
                <div className={clsx(
                  classes.numberBullet,
                  mdDown ? classes.bulletSizeMobile : classes.bulletSize
                )}>
                  1
                </div>
                <Typography className={mdDown ? classes.reasonMobile : classes.reason}>
                  Buyer makes payment into a secure escrow account for the firearm
                </Typography>
              </div>
              <div className={clsx(classes.flexRow, classes.reasonRow)}>
                <div className={clsx(
                  classes.numberBullet,
                  mdDown ? classes.bulletSizeMobile : classes.bulletSize
                )}>
                  2
                </div>
                <Typography className={mdDown ? classes.reasonMobile : classes.reason}>
                  When payment arrives, seller is notified to dispose the firearm
                </Typography>
              </div>
              <div className={clsx(classes.flexRow, classes.reasonRow)}>
                <div className={clsx(
                  classes.numberBullet,
                  mdDown ? classes.bulletSizeMobile : classes.bulletSize
                )}>
                  3
                </div>
                <Typography className={mdDown ? classes.reasonMobile : classes.reason}>
                  Transferring dealer gives seller a receipt to upload on the platform
                </Typography>
              </div>
              <div className={clsx(classes.flexRow, classes.reasonRow)}>
                <div className={clsx(
                  classes.numberBullet,
                  mdDown ? classes.bulletSizeMobile : classes.bulletSize
                )}>
                  4
                </div>
                <Typography className={mdDown ? classes.reasonMobile : classes.reason}>
                  Once the receipt is approved, payout is scheduled automatically.
                </Typography>
              </div>
              <div className={clsx(classes.flexRow, classes.reasonRow)}>
                <div className={clsx(
                  classes.numberBullet,
                  mdDown ? classes.bulletSizeMobile : classes.bulletSize
                )}>
                  5
                </div>
                <Typography className={mdDown ? classes.reasonMobile : classes.reason}>
                  Buyer is notified to pickup the firearm.
                </Typography>
              </div>
            </div>
          </div>
          <div className={clsx(
            classes.flexItem,
            mdDown ? classes.imageContainerMobile : classes.imageContainer,
          )}>
            <CardMedia
              component="img"
              // className={classes.sxImage1}
              classes={{ media: classes.imgShadow }}
              src={
                props.isDarkMode
                  ? "/img/start/screen2-dark.jpg"
                  : "/img/start/screen2-light.jpg"
              }
            />
          </div>
        </div>
      </div>

    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {
  isDarkMode: boolean
}

export const styles = (theme: Theme) => createStyles({
  section3Root: {
    paddingTop: '4rem',
    paddingBottom: '4rem',
    width: '100%',
    borderTop: theme.palette.type === 'dark'
      ? `1px solid ${Colors.uniswapGrey}`
      : `1px solid ${Colors.slateGreyDarkest}`,
    // borderBottom: theme.palette.type === 'dark'
    //   ? `1px solid ${Colors.uniswapGrey}`
    //   : `1px solid ${Colors.slateGreyDarkest}`,
    backgroundColor: theme.palette.type === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.slateGrey}`,
  },
  section3: {
    paddingBottom: '2rem',
    maxWidth: 1180,
  },
  title: {
    fontSize: "2.25rem",
    fontWeight: 700,
    textAlign: "center",
    marginTop: "4rem",
    marginBottom: "2rem",
  },
  titleMobile: {
    fontSize: "1.75rem",
    fontWeight: 700,
    textAlign: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: '0rem 1rem',
  },
  flexRow:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flexRowMobile:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  flexCol:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flexItem: {
    flexBasis: '45%',
  },
  minWidth: {
    minWidth: 450,
  },
  minWidthMobile: {
    minWidth: 350,
  },
  imageContainer: {
    margin: '2rem',
  },
  imageContainerMobile: {
    padding: "1rem",
  },
  imgShadow: {
    boxShadow: BoxShadows.shadowStart.boxShadow,
    borderRadius: "8px",
  },
  reasonContainer: {
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: '1rem',
  },
  reasonRow: {
    marginBottom: '2rem',
  },
  reason: {
    fontSize: '1.3rem',
    fontWeight: 600,
  },
  reasonMobile: {
    fontSize: '1.125rem',
    fontWeight: 600,
  },
  bulletSize: {
    minWidth: 40,
    minHeight: 40,
  },
  bulletSizeMobile: {
    minWidth: 32,
    minHeight: 32,
  },
  numberBullet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "50%",
    color: Colors.cream,
    fontSize: "1.125rem",
    fontWeight: 600,
    background: Colors.green,
    marginRight: '1rem',
  },
})


export default withStyles(styles)(StartSelling3);
