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


  return (
    <div className={classes.categoryCarouselRoot}>

      {
        !disableTitle &&
        <Typography className={classes.title}>
          { props.title ?? "Categories" }
        </Typography>
      }

      {/* xl */}
      <Hidden only={["xs", "sm", "md"]} implementation="css">
        {/* IMPLEMENTATION must be JS or scroll won't work */}
        <CategoryGalleryDesktop
          style={props.style}
          cardTextStyle={props.cardTextStyle}
          categories={props.initialCategories}
          screenSize={"xl"}
        />
      </Hidden>

      {/* md */}
      <Hidden only={["xs", "sm", "lg", "xl"]} implementation="css">
        <CategoryCarouselMobile
          style={props.style}
          cardTextStyle={props.cardTextStyle}
          categories={props.initialCategories}
          screenSize={"md"}
        />
      </Hidden>


      {/* xs */}
      <Hidden only={["md", "lg", "xl"]} implementation="css">
        <CategoryCarouselMobile
          style={props.style}
          cardTextStyle={props.cardTextStyle}
          categories={props.initialCategories}
          screenSize={"xs"}
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
  initialCategories: Categories[];
}
export interface CategoryPreviewCard {
  imageUrl: string,
  name: string,
  slug: string,
}


export const styles = (theme: Theme) => createStyles({
  categoryCarouselRoot: {
    width: '100%',
    // maxWidth: '100vw',
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

