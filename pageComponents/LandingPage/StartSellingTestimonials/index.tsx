import React, { useState } from "react";
import clsx from "clsx";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius, BorderRadius2x } from "layout/AppTheme";
import { commonStyles } from "../commonStyles";
// Typings
import {} from "typings/gqlTypes";
// components
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "components/HiddenFix";
import AspectRatioConstraint from "components/AspectRatioConstraint";



const StartSelling6 = (props: ReactProps) => {

  const { classes } = props;

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <div className={clsx(
      classes.section6Root,
      mdDown ? classes.paddingRootMobile : classes.paddingRoot,
    )}>
      <div className={clsx(classes.section6, classes.flexCol)}>

        <Typography className={
          mdDown ? classes.titleMobile : classes.titleDesktop
        }>
          A revenue share model that puts creators first
        </Typography>

        <div className={clsx(classes.flexRowWrap, classes.textContainer)}>
          <div className={clsx(
            classes.flexColFlexStart,
            classes.maxMinWidth,
            !lgDown && classes.marginRight,
            mdDown && classes.textPaddingMobile,
          )}>
            <p className={mdDown ? classes.s6ParagraphMobile : classes.s6Paragraph}>
              At Relay, our mission is to create the best possible
              platform for independent creators to sell creative assets,
              earn passive income, and build businesses and careers around
              what they love.
            </p>
            <p className={mdDown ? classes.s6ParagraphMobile : classes.s6Paragraph}>
              We make money through a simple and transparent
              revenue share model where our interests are directly
              aligned with creators – we only make money when the creator
              makes a lot more money.
            </p>
            <p className={mdDown ? classes.s6ParagraphMobile : classes.s6Paragraph}>
              We you make a sale, you will receive 85% revenue share, minus
              payment processing fee of 3.6% + $0.30.
            </p>
          </div>

          <div className={clsx(
            classes.flexColFlexStart,
            classes.maxMinWidth,
            mdDown && classes.textPaddingMobile,
          )}>
            <p className={mdDown ? classes.s6ParagraphMobile : classes.s6Paragraph}>
              You'll automatically receive payouts every month via PayPal.
            </p>
            <p className={mdDown ? classes.s6ParagraphMobile : classes.s6Paragraph}>
              Relay's revenue share is 15%. As an independent team, it helps
              us fund ongoing server costs, engineering costs, customer support
              costs, and operational costs.
            </p>
            <p className={mdDown ? classes.s6ParagraphMobile : classes.s6Paragraph}>

              Our affiliate network may help promote products on Relay. If a sale is made through an affiliate’s link, a 25% referral fee will apply. We believe this aligns with creators, as affiliates are incentivized to help creators promote their products to new audiences and make more sales you otherwise wouldn’t receive.
            </p>
          </div>
        </div>


        <div className={clsx(classes.flexRowWrap)}>
          <div className={clsx(classes.flexItem, classes.maxMinWidth)}>
            <CardMedia
              component="img"
              className={clsx(mdDown ? classes.s11ImageMobile : classes.s11Image)}
              src={"/img/start/4_portrait.png"}
            />
          </div>
          <div className={clsx(
            classes.flexItem,
            classes.maxMinWidth,
            !mdDown && classes.marginLeftQuote,
          )}>
            <Typography className={clsx(mdDown ? classes.s11titleMobile : classes.s11title)}>
              "Relay has made it so easy for me to sell my Lightroom presets,
              video LUTs, and creative assets. It takes care of everything for you
              so that I can keep focusing on my craft and doing what I love."
            </Typography>
            <Typography className={clsx(mdDown ? classes.s11subtitleMobile : classes.s11subtitle)}>
              Mitch Lally
            </Typography>
            <Typography className={clsx(mdDown ? classes.s11captionMobile : classes.s11caption)}>
              Photography, Cinematographer, YouTuber
            </Typography>
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
  section6Root: {
    width: '100%',
    ...commonStyles(theme).border1,
  },
  section6: {
    width: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paddingRoot: {
    paddingTop: '6rem',
    paddingBottom: '6rem',
  },
  paddingRootMobile: {
    paddingTop: '4rem',
    paddingBottom: '6rem',
  },
  s6Paragraph: {
    textAlign: "start",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    fontSize: '1.1rem',
    lineHeight: '2rem',
    fontWeight: 600,
  },
  s6ParagraphMobile: {
    textAlign: "start",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    fontSize: '1.1rem',
    lineHeight: '1.75rem',
    fontWeight: 600,
  },
  marginRight: {
    marginRight: '1.5rem',
  },
  textPaddingMobile: {
    padding: '0rem 1rem',
  },

  maxMinWidth: {
    maxWidth: 480,
    minWidth: 350,
  },
  maxWidth400: {
    maxWidth: 400,
  },

  flexRowWrap:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  flexColFlexStart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  titleDesktop: {
    fontSize: "2.25rem",
    fontWeight: 700,
    textAlign: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: "0rem 1rem",
  },
  titleMobile: {
    fontSize: "1.75rem",
    fontWeight: 700,
    textAlign: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
    padding: "0rem 1.5rem",
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
  flexItem:{
    flexBasis: '50%',
    margin: '1rem 0rem',
  },
  textContainer: {
    marginBottom: '2rem',
  },
  marginLeftQuote: {
    marginLeft: '2rem',
  },

  s11title: {
    fontSize: '1.75rem',
    fontWeight: 600,
    color: Colors.black,
    marginBottom: '2rem',
    textAlign: "start",
  },
  s11subtitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: Colors.black,
    marginBottom: '0.5rem',
  },
  s11caption: {
    fontSize: '1rem',
    fontWeight: 600,
    color: Colors.black,
  },
  s11Image: {
    borderRadius: BorderRadius2x,
  },

  s11titleMobile: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: Colors.charcoal,
    marginBottom: '2rem',
    textAlign: "center",
    padding: '0rem 1rem',
  },
  s11subtitleMobile: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: Colors.black,
    marginBottom: '0.5rem',
    textAlign: "center",
  },
  s11captionMobile: {
    fontSize: '1rem',
    fontWeight: 600,
    color: Colors.darkGrey,
    textAlign: "center",
  },
  s11ImageMobile: {
    borderRadius: BorderRadius2x,
    padding: '0rem 1rem',
  },
})

export default withStyles(styles)(StartSelling6);
