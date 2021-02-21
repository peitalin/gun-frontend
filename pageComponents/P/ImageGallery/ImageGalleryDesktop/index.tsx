import React from "react";
import { useState, useEffect } from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import {
  Product,
  Product_Preview_Items,
} from "typings/gqlTypes";
import { SelectedVariantProps } from "pageComponents/P/ProductId";
// Components
import FeaturedPreview from "../FeaturedPreview";
import FeaturedPreviewButtonsDesktop from "./FeaturedPreviewButtonsDesktop";
// Analytics
import { useAnalytics, analyticsEvent } from "utils/analytics";
// Media Query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import BottomImageCarouselDesktop from "./BottomImageCarouselDesktop";



const ImageGalleryDesktop: React.FC<ReactProps> = (props) => {

  const [featuredPreviewItem, setFeaturedPreviewItem] = useState(
    option(props).product.featuredVariant.previewItems[0]()
  );
  const [openedModals, setOpenedModals] = useState([]);

  useEffect(() => {
    let pitem = option(props).product.featuredVariant.previewItems[0]();
    if (pitem) {
      setFeaturedPreviewItem(pitem)
    }
  }, [option(props).product.featuredVariant()])

  const {
    classes,
    product,
    // featuredPreview carousel
    index,
    setIndex,
    numberOfItemsTall = 8,
    numberOfItemsWide = 6,
  } = props;

  const theme = useTheme();
  // const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>

      <FeaturedPreviewButtonsDesktop
        product={product}
        featuredPreviewItem={featuredPreviewItem}
        selectedOption={props.selectedOption}
      />

      <FeaturedPreview
        featuredPreviewItem={featuredPreviewItem}
        product={product}
        loading={props.loading}
        index={index}
        setIndex={setIndex}
      />

      <BottomImageCarouselDesktop
        setFeaturedPreviewItem={setFeaturedPreviewItem}
        product={product}
        loading={props.loading}
        index={index}
        setIndex={setIndex}
        numberOfItemsWide={numberOfItemsWide}
      />

    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  selectedOption: SelectedVariantProps;
  loading?: boolean;
  numberOfItemsTall?: number;
  numberOfItemsWide?: number;
  index: number;
  setIndex(a?: any): void;
}

const styles = (theme: Theme) => createStyles({
  root: {
    position: 'relative',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    // height: '100%',
  },
  carouselContainerPP: {
    left: 0,
    width: '100%',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
});


// const ImageGalleryDesktopMemo = React.memo(
//   (props: ReactProps) => <ImageGalleryDesktop {...props}/>,
// );

export default withStyles(styles)( ImageGalleryDesktop );


