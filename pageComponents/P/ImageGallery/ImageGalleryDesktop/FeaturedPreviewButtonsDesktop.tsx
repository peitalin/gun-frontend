import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { Product_Preview_Items, Product } from "typings/gqlTypes";
import { SelectedVariantProps } from "pageComponents/P/ProductId";
// Components
import CollectionsIcon from "components/CollectionsIcon";
// import AdminEditProductIcon from "components/AdminEditProductIcon";
// Media Query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const FeaturedPreviewButtons: React.FC<ReactProps> = (props) => {

  const {
    classes,
    product,
    featuredPreviewItem,
  } = props;

  const theme = useTheme();

  const chosenVariant = props?.selectedOption?.value;

  if (featuredPreviewItem?.image?.original?.id) {
    return (
      <div>
        {/* <CollectionsIcon
          productId={product?.id}
          variantId={product?.featuredVariant?.variantId}
          // refetch={watchListConnectionResponse.refetch}
          style={{
            top: '0.5rem',
            right: '1.75rem',
          }}
        /> */}
        {/* <AdminEditProductIcon
          product={product}
          style={{
            // top: '5rem',
            // right: '1.75rem',
            top: '2.75rem',
            padding: '0.25rem',
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
  featuredPreviewItem: Product_Preview_Items
  product: Product;
  selectedOption: SelectedVariantProps;
}

const styles = (theme: Theme) => createStyles({
});

export default withStyles(styles)( FeaturedPreviewButtons );


