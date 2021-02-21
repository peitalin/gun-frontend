import React from "react";
import {oc as option} from "ts-optchain";
import clsx from "clsx";
// Router
import Link from "next/link";
// styles
import { withStyles, WithStyles, createStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, Gradients } from "layout/AppTheme";
// typings
import {
  Categories
} from "typings/gqlTypes";
// SSR
import { NextPage, NextPageContext } from 'next';
import Login from "layout/Login";
import Hidden from 'components/HiddenFix';
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import CategoriesCarouselDesktop from "./CategoriesCarouselDesktop";
import CategoriesCarouselMobile from "./CategoriesCarouselMobile";
// import CategoriesCarouselMain from "pageComponents/FrontPage/CategoryCarouselMain";



const CategoriesCarousel = (props: ReactProps) => {

  const {
    classes,
    style,
    categoriesMetadata,
  } = props;

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down("xs"));

  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  // if (smDown) {
  //   return (
  //     <div className={classes.categoriesCarouselMobileRoot}>
  //       <CategoriesCarouselMain categoriesMetadata={categoriesMetadata} />
  //     </div>
  //   )
  // } else {
  // }
  return <CategoriesCarouselDesktop style={style} categoriesMetadata={categoriesMetadata}/>
}


interface ReactProps extends WithStyles<typeof styles> {
  style?: any;
  categoriesMetadata: Array<Categories>
}


export const styles = (theme: Theme) => createStyles({
  width100: {
    width: '100%',
  },
  categoriesCarouselMobileRoot: {
    width: '100%',
    marginTop: '1rem',
    // marginBottom: '1rem',
    // marginLeft: '1rem',
  },
});


export default withStyles(styles)( CategoriesCarousel );

