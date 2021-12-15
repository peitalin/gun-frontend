import React from "react";
import clsx from "clsx";
// Typings
import { NewsItem, Product, SoldOutStatus } from "typings/gqlTypes";
// Responsiveness
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Hidden from "components/HiddenFix";
// components
import NewsItemCardRC from "./NewsItemCardRC";
import NewsItemRowMedium from "components/NewsItemRowMedium"




const NewsItemCardResponsive: React.FC<NewsItemCardResponsiveProps> = (props) => {

  const {
    newsItem,
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
  const featuredPreviewItem = newsItem?.product?.featuredVariant?.previewItems?.[0]
    ?? newsItem?.externalProduct?.currentExternalProductSnapshot?.previewItems?.[0]


  const commonPreviewCardProps = {
    refetch: refetch,
    boxShadow: props.boxShadow,
    style: props.style,
    maxWidthOfRow: maxWidthOfRow,
    previewImageEmptyMessage: props.previewImageEmptyMessage,
    fit: featuredPreviewItem?.image?.original?.heightInPixels >
        featuredPreviewItem?.image?.original?.widthInPixels,
    onClick: props.onClick,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    // hideActionType: xs || sm || md
    hideActionType: newsItem?.product?.soldOutStatus !== SoldOutStatus.AVAILABLE
      ?? !!newsItem?.externalProduct?.currentExternalProductSnapshot?.soldText,
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
          ? <NewsItemRowMedium
              loading={props.loading}
              newsItem={newsItem}
            />
          // ? <ProductCardAsRow
          //     newsItem={newsItem}
          //   />
          : <NewsItemCardRC
              newsItem={newsItem}
              {...commonPreviewCardProps}
              screenSize={"xs"}
              cardsPerRow={cardsPerRow.xs} // 1 default
            />
        }
      </Hidden>


      {/* sm + md  */}
      <Hidden only={["xs", "sm", "lg", "xl"]} implementation="css">
        <NewsItemCardRC
          newsItem={newsItem}
          {...commonPreviewCardProps}
          screenSize={"md"}
          cardsPerRow={cardsPerRow.md} // 2 default
        />
      </Hidden>

      {/* lg */}
      <Hidden only={["xs", "sm", "md", "xl"]} implementation="css">
        <NewsItemCardRC
          newsItem={newsItem}
          {...commonPreviewCardProps}
          screenSize={"lg"}
          cardsPerRow={cardsPerRow.lg} // 3 default
        />
      </Hidden>

      {/* xl */}
      <Hidden only={["xs", "sm", "md", "lg"]} implementation="css">
        <NewsItemCardRC
          newsItem={newsItem}
          {...commonPreviewCardProps}
          screenSize={"xl"}
          cardsPerRow={cardsPerRow.xl} // 4 default
        />
      </Hidden>
    </>
  )
}


interface NewsItemCardResponsiveProps {
  newsItem: NewsItem;
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
  onMouseEnter?(a: any): void;
  onMouseLeave?(a: any): void;
  disableLoadingAnimation?: boolean;
  loading?: boolean;
  promotedSlotId?: string;
}



export default React.memo(
  (props: NewsItemCardResponsiveProps) => <NewsItemCardResponsive {...props}/>,
)
