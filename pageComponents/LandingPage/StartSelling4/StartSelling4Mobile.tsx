import React, { useState } from "react";
import clsx from "clsx";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles";
import { Colors, BoxShadows, isThemeDark, Gradients } from "layout/AppTheme";
import { commonStyles } from "../commonStyles";
// Typings
import {} from "typings/gqlTypes";
// components
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardMedia from "@material-ui/core/CardMedia";
import TickPoint from "./TickPoint";
import { Gradient } from "@material-ui/icons";



const StartSelling4 = (props: ReactProps) => {

  const { classes } = props;

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const TickHeight = 40

  return (
    <div className={clsx(classes.section4Root)}>
      <div className={clsx(classes.section4, classes.flexCol)}>

        <Typography className={classes.title}>
          Manage and edit your listings easily
        </Typography>

        <div className={classes.flexRowWrap}>

          <div className={clsx(
            classes.flexColFlexStart,
            classes.width400,
            classes.marginBottom,
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

          <div className={clsx(
            classes.width400,
            classes.imageContainer,
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
        </div>

      {
        props.sectionType === "notifications"
        ? <div className={clsx(classes.flexRowWrap, classes.marginTop)}>
            <div className={clsx(
              classes.flexColFlexStart,
              classes.width400,
              classes.marginBottom,
            )}>
              {
                [
                  "Save search terms for notifications",
                  "Get emails when matching items appear",
                  "Match on make, model, caliber keyword combinations",
                  "Manage your saved searches in our dashboard",
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
                    ? "/img/start/screen6-dark.jpg"
                    : "/img/start/screen6-light.jpg"
                }
              />
            </div>
          </div>
        : <div className={clsx(classes.flexRowWrap, classes.marginTop)}>
            <div className={clsx(
              classes.flexColFlexStart,
              classes.width400,
              classes.marginBottom,
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
      }

      </div>
    </div>
  );
};



interface ReactProps extends WithStyles<typeof styles> {
  isDarkMode: boolean
  sectionType: "notifications" | "orders"
}

export const styles = (theme: Theme) => createStyles({
  section4Root: {
    paddingTop: '1rem',
    paddingBottom: '4rem',
    width: '100%',
    ...commonStyles(theme).border1,
  },
  section4: {
    paddingBottom: '2rem',
  },
  width400: {
    padding: '1rem',
    minWidth: 350,
    maxWidth: 480,
    width: '100%',
  },
  marginRight2: {
    marginRight: '2rem',
  },
  marginTop: {
    marginTop: '1rem',
  },
  marginBottom: {
    marginBottom: '1rem',
  },
  flexRowWrap:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  flexColFlexStart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: 600,
    textAlign: "center",
    marginTop: "4rem",
    marginBottom: "1rem",
    maxWidth: 500,
    padding: '1rem',
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
  },
  bullet: {
  },
  imageContainer: {
  },
  tickPointText: {
    fontWeight: 500,
    fontSize: '1.125rem',
    marginLeft: '0.5rem',
    marginTop: "0.25rem",
    marginBottom: "0.25rem",
  },
  tick: {
  },
})

export default withStyles(styles)(StartSelling4);
