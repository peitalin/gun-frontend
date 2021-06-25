import React from "react";
import { useState, useEffect } from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { ProductPreviewItem, Product } from "typings/gqlTypes";
import { SelectedVariantProps } from "pageComponents/P/ProductId";
// Components
import CollectionsIcon from "components/CollectionsIcon";
// import AdminEditProductIcon from "components/AdminEditProductIcon";
// Media Query
import { useTheme } from "@material-ui/core/styles";



const FeaturedPreviewButtons: React.FC<ReactProps> = (props) => {

  const {
    classes,
    product,
    showButtons,
  } = props;

  const theme = useTheme();

  if (showButtons) {
    return (
      <div>
        {/* <CollectionsIcon
          productId={product?.id}
          variantId={product?.featuredVariant?.variantId}
          style={{
            top: 'unset',
            bottom: '-13px',
            right: '3rem',
          }}
        /> */}
        {/*
        <AdminEditProductIcon
          product={product}
          style={{
            top: '5rem',
            right: '1.75rem',
          }}
        /> */}
      </div>
    )
  } else {
    return <></>
  }
}


interface ReactProps extends WithStyles<typeof styles> {
  showButtons: boolean;
  product: Product;
  selectedOption: SelectedVariantProps;
}

const styles = (theme: Theme) => createStyles({
});

export default withStyles(styles)( FeaturedPreviewButtons );


