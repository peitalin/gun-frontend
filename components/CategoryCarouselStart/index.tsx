import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius2x, Colors, BorderRadius } from "layout/AppTheme";
// typings
import { Categories } from "typings/gqlTypes";
import Hidden from 'components/HiddenFix';
import CategoryGalleryDesktop from "./CategoryGalleryDesktop";
import CategoryCarouselMobile from "./CategoryCarouselMobile";



const CategoryCarouselStart = (props: ReactProps) => {

  const {
    classes,
    disableTitle = false,
  } = props


  return (
    <div className={classes.categoryCarouselRoot}
      style={props.containerStyle}
    >
      {
        !disableTitle &&
        <div className={classes.categoryTitleBox}>
          <div className={classes.categoryTitleText}>
            { props.title ?? "Categories" }
          </div>
        </div>
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
  containerStyle?: any;
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
    position: "relative",
    // maxWidth: '100vw',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    paddingLeft: "1rem",
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  categoryTitleText: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    maxWidth: 500,
    textTransform: "uppercase",
    fontSize: '0.8rem',
    fontWeight: 600,
    marginTop: "1rem",
    marginBottom: "1rem",
    position: "absolute",
    top: '-3rem',
    // color: theme.palette.type === 'dark'
    //   ? Colors.uniswapLighterGrey
    //   : Colors.slateGreyBlack,
    color: Colors.uniswapLighterGrey,
  },
  categoryTitleBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1rem',
  },
});


export default withStyles(styles)( CategoryCarouselStart );

