import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Typings
import { Product, SoldOutStatus } from "typings/gqlTypes";
import ProductCardAsRowDesktop from "./ProductCardAsRowDesktop";
import ProductRowMedium from "components/ProductRowMedium";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";


const ProductCardAsRow = (props: ReactProps) => {

  const {
    classes,
    product,
  } = props;

  return (
    <>
      <ShowOnMobileOrDesktopSSR desktop>
        <ProductCardAsRowDesktop
          product={props.product}
        />
      </ShowOnMobileOrDesktopSSR>
      <ShowOnMobileOrDesktopSSR mobile>
        <ProductRowMedium
          product={props.product}
        />
      </ShowOnMobileOrDesktopSSR>
    </>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
}

const styles = (theme: Theme) => createStyles({
});



export default withStyles(styles)(ProductCardAsRow);
