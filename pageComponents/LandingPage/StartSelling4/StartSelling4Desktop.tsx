import React, { useState } from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles";
import { Colors, BoxShadows, combineStyles } from "layout/AppTheme";
// Typings
import {} from "typings/gqlTypes";
// components
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "components/HiddenFix";
import Tick from "components/Icons/Tick";



const StartSelling4 = ({ classes }: ReactProps) => {

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const TickHeight = 40

  return (
    <div className={clsx(classes.section4Root)}>
      <div className={clsx(classes.section4, classes.flexCol)}>

        <Typography className={classes.title}>
          Everything you need to start and manage your shop
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
              src={"/img/start-new/2_store_page.png"}
            />
          </div>

          <div className={clsx(
            classes.flexColFlexStart,
            classes.width400,
          )}>
            {
              [
                "Create a passive income stream instantly",
                "Choose your own custom shop link",
                "List unlimited products for free",
                "Set your own prices",
                "Receive payouts automatically every month",
              ].map(( text, i ) => {
                return (
                  <div className={classes.flexItemTickRow}>
                    <TickPoint key={i}
                      classes={classes}
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
                "Get access to your own seller dashboard",
                "No exclusivity required",
                "Instant product delivery to customers",
                "Build your email list",
                "Apple Pay, Google Pay, Paypal built-in",
              ].map(( text, i ) => {
                return (
                  <div className={classes.flexItemTickRow}>
                    <TickPoint key={i}
                      classes={classes}
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
              src={"/img/start-new/3_product_page.png"}
            />
          </div>

        </div>

      </div>
    </div>
  );
};

const TickPoint = ({ text, classes }) => {
  return (
    <div className={classes.flexRow}>
      <Tick
        className={classes.tick}
        size={40}
        color={Colors.cream}
        outerCircleColor={Colors.cream}
        innerCircleColor={Colors.blue}
      />
      <Typography className={classes.tickPointText}>
        {text}
      </Typography>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {}

export const styles = (theme: Theme) => createStyles({
  section4Root: {
    paddingTop: '6rem',
    paddingBottom: '6rem',
    width: '100%',
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
