import React, { useState } from "react";
import clsx from "clsx";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles";
import { Colors, BoxShadows } from "layout/AppTheme";
// Typings
import {} from "typings/gqlTypes";
// components
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardMedia from "@material-ui/core/CardMedia";
import Tick from "components/Icons/Tick";
import TickPoint from "./TickPoint";



const StartSelling4 = (props: ReactProps) => {

  const { classes } = props;

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const TickHeight = 40

  return (
    <div className={clsx(classes.section4Root)}>
      <div className={clsx(classes.section4, classes.flexCol)}>

        <Typography className={classes.title}>
          All you need to manage and track your orders
        </Typography>

        <div className={classes.flexRowWrap}>
          <div className={clsx(
            classes.width400,
            classes.imageContainer,
            classes.marginRight2,
          )}>
            <CardMedia
              component="img"
              // className={classes.sxImage1}
              classes={{ media: classes.imgShadow }}
              src={
                props.isDarkMode
                  ? "/img/start/screen3-dark.jpg"
                  : "/img/start/screen3-light.jpg"
              }
            />
          </div>

          <div className={clsx(
            classes.flexColFlexStart,
            classes.width400,
          )}>
            {
              [
                "List unlimited products for free",
                "Create and manage product listings easily",
                "Choose and edit product photos and details",
                "Set your own prices",
                "Payments secured before you dispose your firearm",
              ].map(( text, i ) => {
                return (
                  <div key={i} className={classes.flexItemTickRow}>
                    <TickPoint key={i}
                      isDarkMode={props.isDarkMode}
                      text={text}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>

        <div className={clsx(classes.flexRowWrap, classes.marginTop)}>
          <div className={clsx(
            classes.flexColFlexStart,
            classes.width400,
            classes.marginRight2,
          )}>
            {
              [
                "View and track order's progress",
                "Manage disposal receipts in one place",
                "Real-time notifications for order progress",
                "Direct payment to your bank account. No questions asked.",
              ].map(( text, i ) => {
                return (
                  <div key={i} className={classes.flexItemTickRow}>
                    <TickPoint key={i}
                      isDarkMode={props.isDarkMode}
                      text={text}
                    />
                  </div>
                )
              })
            }
          </div>
          <div className={clsx(
            classes.imageContainer,
            classes.width400,
          )}>
            <CardMedia
              component="img"
              // className={classes.sxImage1}
              classes={{ media: classes.imgShadow }}
              src={
                props.isDarkMode
                  ? "/img/start/screen4-dark.jpg"
                  : "/img/start/screen4-light.jpg"
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
  section4Root: {
    paddingTop: '6rem',
    paddingBottom: '6rem',
    width: '100%',
    // borderTop: theme.palette.type === 'dark'
    //   ? `1px solid ${Colors.uniswapGrey}`
    //   : `1px solid ${Colors.slateGreyDarkest}`,
    // borderBottom: theme.palette.type === 'dark'
    //   ? `1px solid ${Colors.uniswapGrey}`
    //   : `1px solid ${Colors.slateGreyDarkest}`,
    backgroundColor: theme.palette.type === 'dark'
      ? `${Colors.uniswapDarkNavy}`
      : `${Colors.cream}`,
  },
  section4: {
    paddingBottom: '2rem',
  },
  width400: {
    minWidth: 450,
    maxWidth: 480,
    width: '100%',
  },
  marginRight2: {
    marginRight: '2rem',
  },
  marginTop: {
    marginTop: '6rem',
  },
  flexRowWrap:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: '100%',
  },
  flexColFlexStart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    fontSize: "2.25rem",
    fontWeight: 700,
    textAlign: "center",
    marginTop: "2rem",
    marginBottom: "4rem",
    color: theme.palette.type === 'dark'
      ? `${Colors.uniswapLightGrey}`
      : `${Colors.slateGreyBlack}`,
  },
  flexRow:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flexCol:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  flexItem: {
    flexBasis: '50%',
  },
  sxImage1: {
    border: `1px solid ${Colors.mediumGrey}`,
    borderRadius: '0.5rem',
  },
  imgShadow: {
    boxShadow: BoxShadows.shadowStart.boxShadow,
    borderRadius: "8px",
  },
  flexItemTickRow: {
    flexBasis: '50%',
    flexGrow: 1,
    justifyContent: 'flex-start',
    display: 'flex',
    marginTop: '0.5rem',
    marginBottom: '0.75rem',
  },
  bullet: {
  },
  imageContainer: {
  },
  tickPointText: {
    fontWeight: 600,
    fontSize: '1.25rem',
    marginLeft: '1rem',
  },
  tick: {
    marginRight: '0.5rem',
  },
})

export default withStyles(styles)(StartSelling4);
