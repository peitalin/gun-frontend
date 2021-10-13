import React from "react";
import clsx from "clsx";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Material UI
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import CollectionsIcon from "components/Collections/CollectionsIcon";
// Typings
import { ProductPreview } from "typings/gqlTypes";
import PriceDisplayMain from "components/PriceDisplayMain";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DescriptionLoading from "./DescriptionLoading";
// Carousel
import MainPreviewImage from "./MainPreviewImage";
import LinkLoading from "components/LinkLoading";
import {
  styles,
} from "./styles";
// img responsive sizing
import {
  imgSizesForScreenSizes,
  getImgSrcSetSizes
} from "./imageResponsiveSizes";
import DiscountBadge from "components/DiscountBadge";




const ProductPreviewCardRC = (props: ReactProps) => {
  /// NOTE:
  /// There are 2 <Link> tags, one of the image, one for the description container
  /// This is to prevent the watchList button from being inside the <Link> tag
  /// so that clicking watchList buttons don't navigate to the product page.

  const {
    classes,
    productPreview,
    refetch,
    fit = false,
    cardsPerRow = 1,
    maxWidthOfRow = 1160,
    showCollectionsButton = true,
    isMobile = false,
    hideActionType = false,
    disableLoadingAnimation = false,
  } = props;

  let viewWidth = 100 / cardsPerRow;
  let viewWidthOffset = 1 / cardsPerRow + 1 // account for padding/margin on each card
  // e.g. 4 cards = 1rem each +1 rem for padding-left,
  // with when divided over 4 cards = 1/4 rem

  const productId = productPreview?.id

  const title = productPreview?.title?.slice(0,60)
  const price = productPreview?.price
  const priceWas = productPreview?.priceWas
  const squishLetters = title?.length > 30


  const getCardMaxWidth = (cardsPerRow: number) => {
    // minus 16px (1rem) for left-padding on carousel
    // divide by 4, numCardsPerRow
    // minus 16px (1rem) for each card in the row
    return (maxWidthOfRow - 16) / cardsPerRow - 16
  }

  const cardWidthStyle = {
    width: `calc(${viewWidth}vw - ${viewWidthOffset}rem)`,
    maxWidth: getCardMaxWidth(cardsPerRow),
  };

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  const showDiscountBadge = () => {
    if (price && priceWas) {
      return price < priceWas
    } else {
      return false
    }
  }

  const showDiscount = React.useMemo(() => showDiscountBadge(), [price, priceWas])

  // console.log("PPPL", productPreview)

  return (
    <div className={classes.rootContainer}
      style={{
        ...cardWidthStyle,
        boxShadow: props.boxShadow ? BoxShadows.shadow3.boxShadow : null,
        borderRadius: props.boxShadow ? `${BorderRadius}px` : "",
        ...props.style
      }}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >

      {
        showDiscount &&
        <DiscountBadge
          price={price}
          priceWas={priceWas}
        />
      }

      <MainPreviewImage
        productPreview={productPreview}
        screenSize={props.screenSize}
        fit={fit}
        cardsPerRow={cardsPerRow}
        previewImageEmptyMessage={props.previewImageEmptyMessage}
        onClick={props.onClick}
        promotedSlotId={props.promotedSlotId}
        disableLink={
          typeof props.onClick === 'function'
          // disable link when onClick is defined
        }
      />

      <div className={classes.descriptionContainerOuter}
        style={props.styleInner}
      >
        {
          showCollectionsButton &&
          productId &&
          <CollectionsIcon
            productId={productId}
            refetch={refetch}
            style={{
              top: '-0.8rem',
            }}
          />
        }
        <LinkLoading
          href={
            props.promotedSlotId ? "/f/[promotedSlotId]" : "/p/[productId]"
          }
          as={
            props.promotedSlotId ? `/f/${productId}` : `/p/${productId}`
          }
          disable={
            typeof props.onClick === 'function'
            // disable link when onClick is defined
          }
          onClick={props.onClick}
        >
          {
            !productId
            ? <DescriptionLoading
                style={cardWidthStyle}
                disableLoadingAnimation={disableLoadingAnimation}
              />
            : <div className={classes.descriptionContainer}
                style={cardWidthStyle}
              >
                {
                  productPreview?.actionType &&
                  !hideActionType &&
                  <div className={classes.actionTag}>
                    <Typography
                      className={classes.actionType}
                      variant="body2"
                      component="div"
                    >
                      {productPreview?.actionType}
                    </Typography>
                  </div>
                }
                <div className={classes.descriptionDetailsFlexItem}>
                  <Typography
                    className={clsx(
                      classes.title,
                      squishLetters && classes.squishLetters,
                    )}
                    variant="body1"
                    component="div"
                  >
                    { title ? title : "" }
                  </Typography>
                  <Typography
                    className={classes.makeModel}
                    variant="body2"
                    component="div"
                  >
                    {`${productPreview?.make}`}
                  </Typography>
                  <Typography
                    className={classes.makeModel}
                    variant="body2"
                    component="div"
                  >
                    {`${productPreview?.model}`}
                  </Typography>
                </div>
                <div className={classes.priceDetailsFlexItem}>
                  {
                    price !== undefined &&
                    <PriceDisplayMain
                      price={price}
                      priceWas={priceWas}
                      isSuspended={productPreview.isSuspended}
                      soldOutStatus={productPreview.soldOutStatus}
                    />
                  }
                </div>
              </div>
          }
        </LinkLoading>
      </div>
    </div>
  );
}




interface ReactProps extends WithStyles<typeof styles> {
  productPreview: ProductPreview;
  screenSize: "xs" | "sm" | "md" | "lg" | "xl";
  fit?: boolean; // object-fit the image
  cardsPerRow: number;
  maxWidthOfRow: number;
  showCollectionsButton?: boolean;
  isMobile?: boolean;
  refetch?(): void;
  // carousels
  boxShadow?: boolean;
  style?: any;
  styleInner?: any;
  previewImageEmptyMessage?: React.ReactNode;
  onClick?(a: any): void;
  onMouseEnter?(a: any): void;
  onMouseLeave?(a: any): void;
  hideActionType?: boolean;
  disableLoadingAnimation?: boolean;
  promotedSlotId?: string
}


export default withStyles(styles)( ProductPreviewCardRC );
