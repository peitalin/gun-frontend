import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Typings
import { NewsItem, SoldOutStatus } from "typings/gqlTypes";
import NewsItemCardAsRowDesktop from "./NewsItemCardAsRowDesktop";
import ProductRowMedium from "components/ProductRowMedium";
import ShowOnMobileOrDesktopSSR from "components/ShowOnMobileOrDesktopSSR";



const ProductCardAsRow = (props: ReactProps) => {

  const {
    classes,
  } = props;

  return (
    <>
      <ShowOnMobileOrDesktopSSR desktop>
        <NewsItemCardAsRowDesktop
          newsItem={props.newsItem}
        />
      </ShowOnMobileOrDesktopSSR>
      <ShowOnMobileOrDesktopSSR mobile>
        <ProductRowMedium
          product={props.newsItem?.product}
          externalProduct={props.newsItem?.externalProduct}
        />
      </ShowOnMobileOrDesktopSSR>
    </>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem;
}

const styles = (theme: Theme) => createStyles({
});



export default withStyles(styles)(ProductCardAsRow);
