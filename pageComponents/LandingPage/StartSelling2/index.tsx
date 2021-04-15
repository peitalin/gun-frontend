import React, { useState } from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from "@material-ui/core/styles";
import { Colors, BoxShadows } from "layout/AppTheme";
// Typings
import { CategoryPreviewCard } from "./CategoryCarouselStart";
// components
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CardMedia from "@material-ui/core/CardMedia";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Hidden from "components/HiddenFix";
import { PaymentIcons } from "layout/Footer";
import CategoryCarouselStart from "../StartSelling2/CategoryCarouselStart";
import { shuffle } from "utils/misc";


const StartSelling2 = ({ classes }: ReactProps) => {

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  let categoryPreviewCards = [
    {
      name: 'Patterns',
      imageUrl: "/img/categories-banner/combinations.jpg"
    },
    {
      name: 'Social Media',
      imageUrl: "/img/categories-banner/handguns.jpg"
    },
    {
      name: 'Overlays',
      imageUrl: "/img/categories-banner/rifles.jpg"
    },
    {
      name: 'Video LUTs',
      imageUrl: "/img/categories-banner/shotguns.jpg"
    },
    {
      name: 'Lightroom Presets',
      imageUrl: "/img/categories-banner/combinations.jpg"
    },
    {
      name: 'Design Templates',
      imageUrl: "/img/categories-banner/handguns.jpg"
    },
    {
      name: 'Graphics',
      imageUrl: "/img/categories-banner/rifles.jpg"
    },
    {
      name: 'Fonts',
      imageUrl: "/img/categories-banner/shotguns.jpg"
    },
    {
      name: 'Backgrounds',
      imageUrl: "/img/categories-banner/combinations.jpg"
    },
  ]

  return (
    <div className={clsx(
      mdDown ? classes.section2RootMobile : classes.section2Root
    )}>

      <div className={
        smDown ? classes.titleBox : classes.titleBoxDesktop
      }>
        <Typography variant="h3"
          className={mdDown ? classes.titleMobile : classes.title}
        >
          Upload and earn money doing what you love.
        </Typography>
        <Typography variant="h3"
          className={mdDown ? classes.titleMobile : classes.title}
        >
          It's free and easy to use.
        </Typography>
      </div>


      <CategoryCarouselStart
        style={{
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
        categoriesPreviewCard={
          mdDown
          ? [
              ...categoryPreviewCards.slice(2),
              ...categoryPreviewCards.slice(0,2),
              // reorder so that Video Luts is in the middle on small screens
            ]
          : [
              ...categoryPreviewCards,
              ...categoryPreviewCards,
              ...categoryPreviewCards,
              // duplicate a few times over for large screens
            ]
        }
      />
    </div>
  );
};


interface ReactProps extends WithStyles<typeof styles> {}

export const styles = (theme: Theme) => createStyles({
  // section 2
  section2Root: {
    paddingTop: '4rem',
    paddingBottom: '6rem',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    background: Colors.white,
    textAlign: "center",
    position: 'relative',
  },
  section2RootMobile: {
    paddingTop: '1rem',
    paddingBottom: '4rem',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    background: Colors.white,
    textAlign: "center",
    position: 'relative',
  },
  titleBox: {
    marginTop: '1rem',
    marginLeft: '0.5rem',
    marginBottom: '3rem',
    transform: 'translateY(1rem)',
  },
  titleBoxDesktop: {
    marginTop: '1rem',
    marginLeft: '1rem',
    marginBottom: '5rem',
    transform: 'translateY(1rem)',
  },
  title: {
    fontWeight: 700,
    fontSize: '2.25rem',
    lineHeight: '3rem',
  },
  titleMobile: {
    fontWeight: 700,
    fontSize: "1.75rem",
    lineHeight: '2.25rem',
    padding: '0rem 1rem',
  },
})

export default withStyles(styles)(StartSelling2);
