import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
// Typings
import { Product } from "typings/gqlTypes";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// components
import ProductCardImageCarousel from "./ProductCardImageCarousel";




const PreviewCardResponsive: React.FC<PreviewCardResponsiveProps> = (props) => {

  const {
    product,
    refetch,
    hidePrice = false,
    cardsPerRow = {
      xs: 1,
      sm: 2,
      md: 2,
      lg: 3,
      xl: 4,
    },
    xsCardRow = true,
    maxWidthOfRow = 1160,
  } = props;

  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.only("xl"))
  const lg = useMediaQuery(theme.breakpoints.only("lg"))
  const md = useMediaQuery(theme.breakpoints.only("md"))
  const sm = useMediaQuery(theme.breakpoints.only("sm"))
  const xs = useMediaQuery(theme.breakpoints.only("xs"))
  const noMediaQuery = [xl, lg, md, sm, xs].every(s => !s);
  // if no media query applies

  const featuredPreviewItem = option(product).featuredVariant.previewItems[0]();

  const commonPreviewCardProps = {
    listName: props.listName,
    loadCarouselPics: props.loadCarouselPics,
    setLoadCarouselPics: props.setLoadCarouselPics,
    productIndex: props.productIndex,
    refetch: refetch,
    boxShadow: props.boxShadow,
    style: props.style,
    maxWidthOfRow: maxWidthOfRow,
    hidePrice: hidePrice,
    previewImageEmptyMessage: props.previewImageEmptyMessage,
    fit: option(featuredPreviewItem).image.original.heightInPixels() >
        option(featuredPreviewItem).image.original.widthInPixels(),
    onClick: props.onClick,
  }


  // Note: use "implementation: css" for proper SSR.
  // otherwise there will be a flash of unstyled content before JS loads
  // and the js-controlled media queries kick into effect for responsiveness
  // Drawback: javascript carousels no longer work

  // return (
  //   <>
  //     {/* xs */}
  //     <Hidden only={["sm", "md", "lg", "xl"]} implementation="css">
  //       <ProductRow product={product} />
  //     </Hidden>

  //     {/* sm */}
  //     <Hidden only={["xs", "md", "lg", "xl"]} implementation="css">
  //       <ProductCardImageCarousel
  //         product={product}
  //         {...commonPreviewCardProps}
  //         screenSize={"sm"}
  //         cardsPerRow={cardsPerRow.sm} // 1 default
  //       />
  //     </Hidden>

  //     {/* md */}
  //     <Hidden only={["xs", "sm", "lg", "xl"]} implementation="css">
  //       <ProductCardImageCarousel
  //         product={product}
  //         {...commonPreviewCardProps}
  //         screenSize={"md"}
  //         cardsPerRow={cardsPerRow.md} // 2 default
  //       />
  //     </Hidden>

  //     {/* lg */}
  //     <Hidden only={["xs", "sm", "md", "xl"]} implementation="css">
  //       <ProductCardImageCarousel
  //         product={product}
  //         {...commonPreviewCardProps}
  //         screenSize={"lg"}
  //         cardsPerRow={cardsPerRow.lg} // 3 default
  //       />
  //     </Hidden>

  //     {/* xl */}
  //     <Hidden only={["xs", "sm", "md", "lg"]} implementation="css">
  //       <ProductCardImageCarousel
  //         product={product}
  //         {...commonPreviewCardProps}
  //         screenSize={"xl"}
  //         cardsPerRow={cardsPerRow.xl} // 4 default
  //       />
  //     </Hidden>
  //   </>
  // )

  if (xl || noMediaQuery) {
    return (
      <ProductCardImageCarousel
        product={product}
        {...commonPreviewCardProps}
        screenSize={"xl"}
        cardsPerRow={cardsPerRow.xl} // 4 default
      />
    )
  } else if (lg) {
    return (
      <ProductCardImageCarousel
        product={product}
        {...commonPreviewCardProps}
        screenSize={"lg"}
        cardsPerRow={cardsPerRow.lg} // 3 default
      />
    )
  } else if (md) {
    return (
      <ProductCardImageCarousel
        product={product}
        {...commonPreviewCardProps}
        screenSize={"md"}
        cardsPerRow={cardsPerRow.md} // 2 default
      />
    )
  } else if (sm) {
    return (
      <ProductCardImageCarousel
        product={product}
        {...commonPreviewCardProps}
        screenSize={"sm"}
        cardsPerRow={cardsPerRow.md} // 2 default
      />
    )
  } else {
    // else if (xs)
    return (
      <ProductCardImageCarousel
        product={product}
        {...commonPreviewCardProps}
        screenSize={"sm"}
        cardsPerRow={cardsPerRow.sm} // 1 default
      />
    )
  }
}


interface PreviewCardResponsiveProps {
  product: Product;
  refetch?(): void;
  showWishListButton?: boolean;
  cardsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  xsCardRow?: boolean; // use cards or rows for xs screen sizes
  maxWidthOfRow?: number;
  // carousel props
  listName?: string;
  loadCarouselPics?: any;
  setLoadCarouselPics?(a: any): any;
  productIndex?: number;
  hidePrice?: boolean;
  //
  boxShadow?: boolean;
  style?: any;
  previewImageEmptyMessage?: string;
  onClick?(a: any): void;
}


export default PreviewCardResponsive;
