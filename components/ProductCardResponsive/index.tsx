import React from "react";
import clsx from "clsx";
// Typings
import { Product, SoldOutStatus } from "typings/gqlTypes";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "components/HiddenFix";
// components
import ProductCardRC from "./ProductCardRC";
import ProductCardAsRow from "components/ProductCardAsRow"
import ProductRowMedium from "components/ProductRowMedium"




const ProductCardResponsive: React.FC<ProductCardResponsiveProps> = (props) => {

  const {
    product,
    refetch,
    cardsPerRow = {
      xs: 1,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    },
    xsCardRow = false,
    maxWidthOfRow = 1160,
  } = props;

  // const theme = useTheme();
  const featuredPreviewItem = product?.featuredVariant?.previewItems?.[0];

  const commonPreviewCardProps = {
    refetch: refetch,
    boxShadow: props.boxShadow,
    style: props.style,
    maxWidthOfRow: maxWidthOfRow,
    previewImageEmptyMessage: props.previewImageEmptyMessage,
    fit: featuredPreviewItem?.image?.original?.heightInPixels >
        featuredPreviewItem?.image?.original?.widthInPixels,
    onClick: props.onClick,
    // hideActionType: xs || sm || md
    hideActionType: product?.soldOutStatus !== SoldOutStatus.AVAILABLE,
    disableLoadingAnimation: props.disableLoadingAnimation,
    promotedSlotId: props.promotedSlotId,
  }

  // Note: use "implementation: css" for proper SSR.
  // otherwise there will be a flash of unstyled content before JS loads
  // and the js-controlled media queries kick into effect for responsiveness
  // Drawback: javascript carousels no longer work

  return (
    <>
      {/* xs */}
      <Hidden only={["md", "lg", "xl"]} implementation="css">
        {
          xsCardRow
          ? <ProductRowMedium
              loading={props.loading}
              product={product}
            />
          // ? <ProductCardAsRow
          //     product={product}
          //   />
          : <ProductCardRC
              product={product}
              {...commonPreviewCardProps}
              screenSize={"xs"}
              cardsPerRow={cardsPerRow.xs} // 1 default
            />
        }
      </Hidden>


      {/* sm + md  */}
      <Hidden only={["xs", "sm", "lg", "xl"]} implementation="css">
        <ProductCardRC
          product={product}
          {...commonPreviewCardProps}
          screenSize={"md"}
          cardsPerRow={cardsPerRow.md} // 2 default
        />
      </Hidden>

      {/* lg */}
      <Hidden only={["xs", "sm", "md", "xl"]} implementation="css">
        <ProductCardRC
          product={product}
          {...commonPreviewCardProps}
          screenSize={"lg"}
          cardsPerRow={cardsPerRow.lg} // 3 default
        />
      </Hidden>

      {/* xl */}
      <Hidden only={["xs", "sm", "md", "lg"]} implementation="css">
        <ProductCardRC
          product={product}
          {...commonPreviewCardProps}
          screenSize={"xl"}
          cardsPerRow={cardsPerRow.xl} // 4 default
        />
      </Hidden>
    </>
  )
}


interface ProductCardResponsiveProps {
  product: Product;
  refetch?(): void;
  showWatchlistButton?: boolean;
  cardsPerRow?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  xsCardRow?: boolean; // use cards or rows for xs screen sizes
  maxWidthOfRow?: number;
  //
  boxShadow?: boolean;
  style?: any;
  previewImageEmptyMessage?: React.ReactNode;
  onClick?(a: any): void;
  disableLoadingAnimation?: boolean;
  loading?: boolean;
  promotedSlotId?: string;
}



export default React.memo(
  (props: ProductCardResponsiveProps) => <ProductCardResponsive {...props}/>,
)
