import React from "react";
import clsx from "clsx";
// Styles
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { BorderRadius, Colors } from "layout/AppTheme";
// Typings
import {
  Product,
  ProductPreviewItem,
} from "typings/gqlTypes";
import { SelectedVariantProps } from "pageComponents/P/ProductId";
// Components
import FeaturedPreview from "../FeaturedPreview";
import FeaturedPreviewButtonsDesktop from "./FeaturedPreviewButtonsDesktop";
// Media Query
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import BottomImageCarouselDesktop from "./BottomImageCarouselDesktop";



const ImageGalleryDesktop: React.FC<ReactProps> = (props) => {

  const {
    classes,
    product,
    // featuredPreview carousel
    index,
    setIndex,
    numberOfItemsWide = 6,
  } = props;

  const theme = useTheme();
  const previewItems = props?.product?.featuredVariant?.previewItems

  const [
    featuredPreviewItem,
    setFeaturedPreviewItem
  ] = React.useState(undefined);


  React.useEffect(() => {
    let pitem = previewItems?.[0]
    if (pitem) {
      setFeaturedPreviewItem(pitem)
    }
  }, [previewItems])

  // const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  // console.log("loading::::::::::::", props.loading)
  // console.log("product::::::::::::", props.product)
  // console.log("featuredPreview::::::::::::", featuredPreviewItem)
  // console.log("index::::::::::::", index)

  return (
    <div className={classes.root}>

      <FeaturedPreview
        featuredPreviewItem={featuredPreviewItem}
        previewItems={previewItems}
        loading={props.loading || !process.browser} // for SSR
        index={index}
        setIndex={setIndex}
        isPromoted={props.isPromoted}
        disableModalPopup={props.disableModalPopup}
        style={{
          borderRadius: BorderRadius,
        }}
      />

      <FeaturedPreviewButtonsDesktop
        featuredPreviewItem={featuredPreviewItem as any}
        productId={product?.id}
      />

      <BottomImageCarouselDesktop
        setFeaturedPreviewItem={setFeaturedPreviewItem}
        previewItems={previewItems}
        productId={product?.id}
        loading={props.loading || !process.browser} // for SSR
        index={index}
        setIndex={setIndex}
        numberOfItemsWide={numberOfItemsWide}
      />

    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  loading: boolean;
  numberOfItemsTall?: number;
  numberOfItemsWide?: number;
  index: number;
  setIndex(a?: any): void;
  isPromoted?: boolean;
  disableModalPopup?: boolean;
}

const styles = (theme: Theme) => createStyles({
  root: {
    position: 'relative',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    // height: '100%',
  },
});

export default withStyles(styles)( ImageGalleryDesktop );


