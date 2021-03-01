import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Router
import Link from "next/link";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { BorderRadius2x, Colors, BorderRadius } from "layout/AppTheme";
// Typings
import { Categories } from "typings/gqlTypes";
// Utils Components
import ErrorBounds from "components/ErrorBounds";
// Components
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "components/Divider";
import AirCarousel from "components/AirCarousel";
import AirItemWide from "components/AirCarousel/AirItemWide"
import AirItemTall from "components/AirCarousel/AirItemTall"
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from '@material-ui/core/Tooltip';
// theme css
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from 'components/HiddenFix';
import CategoryCarouselMainDesktop from "./CategoryCarouselMainDesktop";

import { useQuery } from "@apollo/client";
import {
  GET_PRODUCT_CATEGORIES,
} from "queries/categories-queries";



const CategoryCarouselMain = (props: ReactProps) => {

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


  const { data, loading, error } = useQuery<QueryData, QueryVar>(
    GET_PRODUCT_CATEGORIES,
    {
      variables: {},
      fetchPolicy: "cache-and-network",
    }
  );

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"))

  console.log("dataaaaaa: ", data)
  const categoriesMetadata = data?.getProductCategories;

  return (
    <div className={classes.categoryCarouselRoot}>
      {
        props.title &&
        <div className={
          smDown ? classes.titleBox : classes.titleBoxDesktop
        }>
          <Typography className={classes.title} variant="h3">
            {props.title}
          </Typography>
        </div>
      }

      <Hidden only={["xs", "sm", "md", "lg"]} implementation="js">
        {/* IMPLEMENTATION must be JS or scroll won't work */}
        <CategoryCarouselMainDesktop
          style={props.style}
          categoriesMetadata={categoriesMetadata}
          initialNumItems={4}
        />
      </Hidden>

      <Hidden only={["xs", "sm", "md", "xl"]} implementation="js">
        <CategoryCarouselMainDesktop
          style={props.style}
          categoriesMetadata={categoriesMetadata}
          initialNumItems={4}
        />
      </Hidden>

      <Hidden only={["xs", "sm", "lg", "xl"]} implementation="css">
        <CategoryCarouselMainDesktop
          style={props.style}
          categoriesMetadata={categoriesMetadata}
          initialNumItems={3}
        />
      </Hidden>

      <Hidden only={["xs", "md", "lg", "xl"]} implementation="js">
        <CategoryCarouselMainDesktop
          style={props.style}
          categoriesMetadata={categoriesMetadata}
          initialNumItems={2.5}
        />
      </Hidden>

      <Hidden only={["sm", "md", "lg", "xl"]} implementation="js">
        <CategoryCarouselMainDesktop
          style={props.style}
          categoriesMetadata={categoriesMetadata}
          initialNumItems={2.5}
        />
      </Hidden>

    </div>
  )
}

interface QueryData {
  getProductCategories: Categories[]
}
interface QueryVar {
}


interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  style?: any;
}


export const styles = (theme: Theme) => createStyles({
  categoryCarouselRoot: {
    marginTop: "2rem",
  },
  titleBox: {
    marginTop: '1rem',
    marginLeft: '0.5rem',
    transform: 'translateY(1rem)',
  },
  titleBoxDesktop: {
    marginTop: '1rem',
    marginLeft: '1rem',
    transform: 'translateY(1rem)',
  },
  title: {
    fontWeight: 700,
  },
});


export default withStyles(styles)( CategoryCarouselMain );

