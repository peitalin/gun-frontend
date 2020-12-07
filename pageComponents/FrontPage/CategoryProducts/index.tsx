
import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Typings
import { Connection, Product, ProductsConnectionCursorBased, CuratedListItemsConnection } from "typings/gqlTypes";

import getConfig from "next/config";
const {
  publicRuntimeConfig: { FEATURED_LIST_ID }
} = getConfig();
import { getProductIdOrSlug } from "utils/links";

import CategoryProductsMobile from "pageComponents/FrontPage/CategoryProducts/CategoryProductsMobile";
import CategoryProductsMobileCarousel from "pageComponents/FrontPage/CategoryProducts/CategoryProductsMobileCarousel";
import CategoryProductsDesktop from "pageComponents/FrontPage/CategoryProducts/CategoryProductsDesktop";
import Hidden from 'components/HiddenFix';

// const FEATURED_LIST_ID = 'prodlist_1bea860c-7b8b-476d-a417-82728287dc9d'
export const DEV_FEATURED_LIST_ID = 'prodlist_838af685-ba9c-40b4-80ee-fcf9529bdcfc'





const CategoryProducts = (props: ReactProps) => {

  const {
    classes,
    initialProducts,
    cardsPerRow = {
      xs: 1.5,
      sm: 1.5,
      md: 2,
      lg: 3,
      xl: 4,
    },
    categoryIdOrName,
    count = 8,
  } = props;

  return (
    <>
      <Hidden xsDown implementation="css">
        {
          (FEATURED_LIST_ID || DEV_FEATURED_LIST_ID) &&
          <CategoryProductsDesktop
            initialProducts={initialProducts}
            count={count}
            cardsPerRow={cardsPerRow}
            categoryIdOrName={categoryIdOrName}
          />
        }
      </Hidden>
      <Hidden smUp implementation="css">
        <CategoryProductsMobileCarousel
          initialProducts={initialProducts}
          count={count}
          cardsPerRow={cardsPerRow}
          categoryIdOrName={categoryIdOrName}
        />
      </Hidden>
    </>
  )
}





interface ReactProps extends WithStyles<typeof styles> {
  initialProducts?: ProductsConnectionCursorBased;
  count: number;
  cardsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  categoryIdOrName: string;
}

const styles = (theme: Theme) => createStyles({
  root: {
  },
});


export default withStyles(styles)( CategoryProducts );







