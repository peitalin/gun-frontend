import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Material UI
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import WishlistIcon from "components/WishlistIcon";
import DiscountBadge from "components/DiscountBadge";
// Typings
import { Categories, Product, Product_Preview_Items, SoldOutStatus } from "typings/gqlTypes";
import { genSrcSet, genImgBreakpoints } from "utils/images";
import { getYouTubeVimeoImagePreview } from "utils/links";
import PriceDisplayMain from "components/PriceDisplayMain";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DescriptionLoading from "./DescriptionLoading";
// Carousel
import PreviewImageEmpty from "./PreviewImageEmpty";
import AspectGridItemLink from "./AspectGridItemLink";
import LinkLoading from "components/LinkLoading";
import {
  CARD_MAX_WIDTH_XL,
  DESCRIPTION_HEIGHT,
  styles,
} from "./styles";
// img responsive sizing
import {
  imgSizesForScreenSizes,
  getImgSrcSetSizes
} from "./imageResponsiveSizes";




const ProductCardRC = (props: ReactProps) => {
  /// NOTE:
  /// There are 2 <Link> tags, one of the image, one for the description container
  /// This is to prevent the wishlist button from being inside the <Link> tag
  /// so that clicking wishlist buttons don't navigate to the product page.

  const {
    classes,
    product,
    refetch,
    fit = false,
    cardsPerRow = 1,
    maxWidthOfRow = 1160,
    showWishListButton = true,
    isMobile = false,
    hideActionType = false,
    disableLoadingAnimation = false,
  } = props;

  let viewWidth = 100 / cardsPerRow;
  let viewWidthOffset = 1 / cardsPerRow + 1 // account for padding/margin on each card
  // e.g. 4 cards = 1rem each +1 rem for padding-left,
  // with when divided over 4 cards = 1/4 rem

  const productId = product?.id;
  const previewItems = product?.featuredVariant?.previewItems ?? []

  const title = product?.currentSnapshot?.title
  const price = product?.featuredVariant?.price;
  const priceWas = product?.featuredVariant?.price;


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
  const imgSizesSrcSet = getImgSrcSetSizes(cardsPerRow, props.screenSize)

  let firstPreview = previewItems?.[0]

  let youTubeVimeoPreview = getYouTubeVimeoImagePreview(
    firstPreview?.youTubeEmbedLink
  );


  return (
    <div className={classes.rootContainer}
      style={{
        ...cardWidthStyle,
        boxShadow: props.boxShadow ? BoxShadows.shadow3.boxShadow : null,
        borderRadius: props.boxShadow ? `${BorderRadius}px` : "",
        ...props.style
      }}
    >
      {
        //  If no PreviewItems
        (previewItems.length === 0) &&
        <AspectGridItemLink product={product}>
          <PreviewImageEmpty
            previewImageEmptyMessage={props.previewImageEmptyMessage}
            onClick={props.onClick}
          />
        </AspectGridItemLink>
      }

      {
        firstPreview &&
        <AspectGridItemLink product={product}>
          {
            firstPreview?.image?.original?.url
            ? <CardMedia
                title={title}
                component="img"
                className={clsx(
                  fit ? classes.cardMediaFit : classes.cardMedia,
                  // (previewLoaded > 0) ? "fadeIn" : 'hidden',
                )}
                onClick={props.onClick}
                src={firstPreview?.image?.original?.url}
                srcSet={genSrcSet(firstPreview?.image)}
                sizes={genImgBreakpoints(imgSizesSrcSet)}
              />
            : youTubeVimeoPreview
              ? <CardMedia
                  component="img"
                  className={clsx(
                    fit ? classes.cardMediaFit : classes.cardMedia,
                  )}
                  onClick={props.onClick}
                  src={youTubeVimeoPreview}
                  title={
                    youTubeVimeoPreview ? title : "Video thumbnail unavailable"
                  }
                />
              : <PreviewImageEmpty/>
          }
        </AspectGridItemLink>
      }

      <div className={classes.descriptionContainerOuter}>
        {/* {
          showWishListButton &&
          productId &&
          <WishlistIcon
            productId={productId}
            variantId={productVariantId}
            refetch={refetch}
            style={{
              top: '-0.8rem',
            }}
          />
        } */}
        <LinkLoading
          href={"/p/[productId]"}
          as={`/p/${props.product?.id}`}
          disable={
            !props.product?.storeId ||
            typeof props.onClick === 'function'
          }
          onClick={props.onClick}
        >
          {
            !productId
            ? <DescriptionLoading
                style={cardWidthStyle}
                disableLoadingAnimation={disableLoadingAnimation}
                // height={DESCRIPTION_HEIGHT}
              />
            : <div className={classes.descriptionContainer}
                style={cardWidthStyle}
              >
                {
                  product?.currentSnapshot?.actionType &&
                  !hideActionType &&
                  <div className={classes.actionTag}>
                    <Typography
                      className={classes.actionType}
                      variant="body2"
                      component="div"
                    >
                      {product?.currentSnapshot?.actionType}
                    </Typography>
                  </div>
                }
                <div className={classes.descriptionDetailsFlexItem}>
                  <Typography
                    className={classes.title}
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
                    {`${product?.currentSnapshot?.make}`}
                  </Typography>
                  <Typography
                    className={classes.makeModel}
                    variant="body2"
                    component="div"
                  >
                    {`${product?.currentSnapshot?.model}`}
                  </Typography>
                </div>
                <div className={classes.priceDetailsFlexItem}>
                  {
                    price !== undefined &&
                    <PriceDisplayMain
                      price={price}
                      priceWas={priceWas}
                      soldOutStatus={product.soldOutStatus}
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
  product: Product;
  screenSize: "xs" | "sm" | "md" | "lg" | "xl";
  fit?: boolean; // object-fit the image
  cardsPerRow: number;
  maxWidthOfRow: number;
  showWishListButton?: boolean;
  isMobile?: boolean;
  refetch?(): void;
  // carousels
  boxShadow?: boolean;
  style?: any;
  previewImageEmptyMessage?: React.ReactNode;
  onClick?(a: any): void;
  hideActionType?: boolean;
  disableLoadingAnimation?: boolean;
}


export default withStyles(styles)( ProductCardRC );
