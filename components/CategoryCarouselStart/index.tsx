import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius2x, Colors, BorderRadius } from "layout/AppTheme";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// typings
import { Categories } from "typings/gqlTypes";
// Components
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// theme css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from 'components/HiddenFix';
import CategoryGalleryDesktop from "./CategoryGalleryDesktop";
import CategoryCarouselMobile from "./CategoryCarouselMobile";
import { shuffle } from "utils/misc";



const CategoryCarouselStart = (props: ReactProps) => {

  const {
    classes,
    disableTitle = false,
  } = props

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

      {
        !disableTitle &&
        <Typography className={classes.title}>
          { props.title ?? "Categories" }
        </Typography>
      }

      {/* xl */}
      <Hidden only={["xs", "sm", "md", "lg"]} implementation="css">
        {/* IMPLEMENTATION must be JS or scroll won't work */}
        <CategoryGalleryDesktop
          style={props.style}
          cardTextStyle={props.cardTextStyle}
          categories={props.categories}
          initialNumItems={8}
        />
      </Hidden>

      {/* lg */}
      <Hidden only={["xs", "sm", "md", "xl"]} implementation="css">
        <CategoryGalleryDesktop
          style={props.style}
          cardTextStyle={props.cardTextStyle}
          categories={props.categories}
          initialNumItems={6}
        />
      </Hidden>

      {/* mg */}
      <Hidden only={["xs", "sm", "lg", "xl"]} implementation="css">
        <CategoryGalleryDesktop
          style={props.style}
          cardTextStyle={props.cardTextStyle}
          categories={props.categories}
          initialNumItems={4}
        />
      </Hidden>

      {/* sm */}
      <Hidden only={["xs", "md", "lg", "xl"]} implementation="css">
        <CategoryCarouselMobile
          style={props.style}
          cardTextStyle={props.cardTextStyle}
          categories={props.categories}
          initialNumItems={2.5}
        />
      </Hidden>

      {/* xs */}
      <Hidden only={["sm", "md", "lg", "xl"]} implementation="css">
        <CategoryCarouselMobile
          style={props.style}
          cardTextStyle={props.cardTextStyle}
          categories={props.categories}
          initialNumItems={2.5}
        />
      </Hidden>

    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  style?: any;
  cardTextStyle?: any;
  disableTitle?: boolean;
  categories: Categories[];
}
export interface CategoryPreviewCard {
  imageUrl: string,
  name: string,
  slug: string,
}


export const styles = (theme: Theme) => createStyles({
  categoryCarouselRoot: {
    width: '100%',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    paddingLeft: "1rem",
    marginTop: '2rem',
    marginBottom: '1rem',
  },
});


export default withStyles(styles)( CategoryCarouselStart );

