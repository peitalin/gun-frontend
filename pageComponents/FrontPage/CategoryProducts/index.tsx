
import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
import clsx from "clsx";
// Typings
import { Connection, Product, ProductsConnection } from "typings/gqlTypes";

import CategoryProductsMobileCarousel from "pageComponents/FrontPage/CategoryProducts/CategoryProductsMobileCarousel";
import CategoryProductsDesktop from "pageComponents/FrontPage/CategoryProducts/CategoryProductsDesktop";
import Hidden from 'components/HiddenFix';






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
      <Hidden smDown implementation="css">
        <CategoryProductsDesktop
          initialProducts={initialProducts}
          count={count}
          cardsPerRow={cardsPerRow}
          categoryIdOrName={categoryIdOrName}
        />
      </Hidden>
      <Hidden mdUp implementation="css">
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
  initialProducts?: ProductsConnection;
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







