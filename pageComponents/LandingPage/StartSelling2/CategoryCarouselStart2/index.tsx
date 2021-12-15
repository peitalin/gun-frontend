import React from "react";
import clsx from "clsx";
// Router
import Link from "next/link";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { BorderRadius2x, Colors, BorderRadius } from "layout/AppTheme";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Components
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// theme css
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Hidden from 'components/HiddenFix';
import CategoryCarouselStartDesktop from "./CategoryCarouselStartDesktop";



const CategoryCarouselStart = (props: ReactProps) => {

  const { classes } = props

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('md'))
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'))

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

