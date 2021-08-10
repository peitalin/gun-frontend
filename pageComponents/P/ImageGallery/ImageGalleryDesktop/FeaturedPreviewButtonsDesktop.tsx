import React from "react";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { ProductPreviewItem, Product } from "typings/gqlTypes";
// Components
import CollectionsIcon from "components/Collections/CollectionsIcon";
// import AdminEditProductIcon from "components/AdminEditProductIcon";
// Media Query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const FeaturedPreviewButtons: React.FC<ReactProps> = (props) => {

  const {
    classes,
    featuredPreviewItem,
  } = props;

  if (featuredPreviewItem?.image?.original?.id) {
    return (
      <div>
        <CollectionsIcon
          productId={props.productId}
          style={{
            top: '.75rem',
            right: '1.75rem',
          }}
        />
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
  featuredPreviewItem: ProductPreviewItem
  productId?: string
}

const styles = (theme: Theme) => createStyles({
});

export default withStyles(styles)( FeaturedPreviewButtons );


