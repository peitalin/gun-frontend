import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Router
import Link from "next/link";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius2x, Colors, BorderRadius } from "layout/AppTheme";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Components
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// theme css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from 'components/HiddenFix';
import CategoryCarouselStartDesktop from "./CategoryCarouselStartDesktop";



const CategoryCarouselStart = (props: ReactProps) => {

  const { classes } = props

  //////// Remember, the <Hidden/> CSS components,
  /////// initialNumItems should match this:
  /////// so that SSR loading carousel will have same dimensions
  ////// as the carousel once its fully loaded
  // const getScrollItemsForScreenSize = () => {
  //   if (xs) {
  //     return 2.5
  //   }
  //   if (sm) {
  //     return 2.5
  //   }
  //   if (md) {
  //     return 3
  //   }
  //   if (lg) {
  //     return 5
  //   }
  //   if (xl) {
  //     return 7
  //   } else {
  //     // SSR loading
  //     return -1
  //   }
  // }

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))
  const mdDown = useMediaQuery(theme.breakpoints.down("md"))


  return (
    <div className={classes.categoryCarouselRoot}>

      <Hidden only={["xs", "sm", "md", "lg"]} implementation="css">
        {/* IMPLEMENTATION must be JS or scroll won't work */}
        <CategoryCarouselStartDesktop
          style={props.style}
          categoriesPreviewCard={props.categoriesPreviewCard}
          initialNumItems={8}
        />
      </Hidden>

      <Hidden only={["xs", "sm", "md", "xl"]} implementation="css">
        <CategoryCarouselStartDesktop
          style={props.style}
          categoriesPreviewCard={props.categoriesPreviewCard}
          initialNumItems={6}
        />
      </Hidden>

      <Hidden only={["xs", "sm", "lg", "xl"]} implementation="css">
        <CategoryCarouselStartDesktop
          style={props.style}
          categoriesPreviewCard={props.categoriesPreviewCard}
          initialNumItems={4}
        />
      </Hidden>

      <Hidden only={["xs", "md", "lg", "xl"]} implementation="css">
        <CategoryCarouselStartDesktop
          style={props.style}
          categoriesPreviewCard={props.categoriesPreviewCard}
          initialNumItems={4}
        />
      </Hidden>

      <Hidden only={["sm", "md", "lg", "xl"]} implementation="css">
        <CategoryCarouselStartDesktop
          style={props.style}
          categoriesPreviewCard={props.categoriesPreviewCard}
          initialNumItems={4}
        />
      </Hidden>

    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  style?: any;
  categoriesPreviewCard: Array<CategoryPreviewCard>
}
export interface CategoryPreviewCard {
  imageUrl: string,
  name: string
}


export const styles = (theme: Theme) => createStyles({
  categoryCarouselRoot: {
    width: '100%',
    overflow: "hidden",
  },
});


export default withStyles(styles)( CategoryCarouselStart );

