import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { Colors } from "layout/AppTheme";
// Typings
import { ProductPreviewItem, Product } from "typings/gqlTypes";
// Components
import CollectionsIcon from "components/Collections/CollectionsIcon";
// import AdminEditProductIcon from "components/AdminEditProductIcon";
// Media Query
import { useTheme } from "@mui/material/styles";



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
        <CollectionsIcon
          productId={product?.id}
          // variantId={product?.featuredVariant?.variantId}
          style={{
            top: 'unset',
            bottom: '-13px',
            right: '3rem',
          }}
        />
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
}

const styles = (theme: Theme) => createStyles({
});

export default withStyles(styles)( FeaturedPreviewButtons );


