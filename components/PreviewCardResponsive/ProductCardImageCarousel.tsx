import React from "react";
import clsx from "clsx";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Material UI
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import WatchlistIcon from "components/WatchlistIcon";
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
import AirCarousel from "components/AirCarousel";
import PreviewImageEmpty from "./PreviewImageEmpty";
import AspectCarouselItemLink from "./AspectCarouselItemLink";
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




const ProductCardImageCarousel = (props: ReactProps) => {
  /// NOTE:
  /// There are 2 <Link> tags, one of the image, one for the description container
  /// This is to prevent the watchList button from being inside the <Link> tag
  /// so that clicking watchList buttons don't navigate to the product page.

  const {
    classes,
    product,
    refetch,
    fit = false,
    cardsPerRow = 1,
    maxWidthOfRow = 1160,
    showWatchlistButton = true,
    listName = "",
    isMobile = false,
    hidePrice = false,
  } = props;

  let viewWidth = 100 / cardsPerRow;
  let viewWidthOffset = 1 / cardsPerRow + 1 // account for padding/margin on each card
  // e.g. 4 cards = 1rem each +1 rem for padding-left,
  // with when divided over 4 cards = 1/4 rem

  const shouldLoadImage = ({
    firstImage,
    productIndex
  }: { firstImage: boolean, productIndex: number}) => {
    // load secondary preview item images after onmousehover event.
    // if hovered over product card
    if (!!props.loadCarouselPics) {
      // console.log("firstImage: ", firstImage)
      // console.log("loadCarouselPics: ", props.loadCarouselPics)
      return firstImage || props.loadCarouselPics[productIndex]
    } else {
      // no loadCarouselPics logic, load just the first pic
      return firstImage
    }
  }


  const onMouseOver = () => {
    // console.log("onMouseOver")
    if (props.setLoadCarouselPics) {
      if (!props.loadCarouselPics[props.productIndex]) {
        // console.log(`loading carousel pics for product card: ${props.loadCarouselPics}`)
        props.setLoadCarouselPics(s => {
          return { ...s, [props.productIndex]: true }
        })
      }
    }
  }

  const productId = product?.id;
  const productVariantId = product?.featuredVariant?.variantId

  const previewItems = isMobile
    ? product?.featuredVariant?.previewItems ?? []
    : (product?.featuredVariant?.previewItems ?? []).slice(0,8);
    // load only N preview items for mobile

  const numPreviews = previewItems.length;

  const title = product?.currentSnapshot?.title
  const price = product?.featuredVariant?.price;
  const priceWas = product?.featuredVariant?.price;


  // const isSoldOut = product?.featuredVariant?.isSoldOut;

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
  const carouselId = `air-paginator-${product?.id}-${listName}-${props.productIndex}`
  const imgSizesSrcSet = getImgSrcSetSizes(cardsPerRow, props.screenSize)
  // console.log("imgSizes srcSet: ", imgSizesSrcSet)
  // console.log("cardsPerRow", cardsPerRow)
  // console.log("carouselId: ", carouselId)

  let previewItemsInSwiper = (props.setLoadCarouselPics !== undefined)
    ? previewItems
    : previewItems.slice(0,1)

  return (
    <div className={classes.rootContainer}
      style={{
        ...cardWidthStyle,
        boxShadow: props.boxShadow ? BoxShadows.shadow3.boxShadow : null,
        borderRadius: props.boxShadow ? `${BorderRadius}px` : "",
        ...props.style
      }}
    >
      <AirCarousel
        id={carouselId}
        // handleClickLeft={getPrevPage}
        // handleClickRight={getNextPage}
        disableButtons={
          (numPreviews < 2) ||
          (!props.loadCarouselPics || !props.setLoadCarouselPics)
        }
        // scrollSnapType={"none"}
        rightDither={false}
        scrollItemsPerClick={1}
        onMouseOver={onMouseOver}
        style={{ borderRadius: `${BorderRadius}px ${BorderRadius}px 0px 0px`}}
      >
        {/* If no PreviewItems */}
        {
          (previewItems.length === 0) &&
          <AspectCarouselItemLink
            i={0}
            classes={classes}
            shouldLoadImage={shouldLoadImage}
            onMouseOver={onMouseOver}
            productIndex={props.productIndex}
            product={product}
          >
            <PreviewImageEmpty
              previewImageEmptyMessage={props.previewImageEmptyMessage}
              onClick={props.onClick}
            />
          </AspectCarouselItemLink>
        }

        {/* If PreviewItems */}
        {
          (previewItemsInSwiper.length > 0) &&
          previewItemsInSwiper.map((previewItem, i) => {

            const image =  previewItem?.image
            let youTubeVimeoPreview = getYouTubeVimeoImagePreview(
              previewItem?.youTubeEmbedLink
            );

            return (
              <AspectCarouselItemLink key={i}
                i={i}
                classes={classes}
                shouldLoadImage={shouldLoadImage}
                onMouseOver={onMouseOver}
                productIndex={props.productIndex}
                product={product}
              >
              {
                image?.original?.url
                ? <CardMedia
                    title={title}
                    component="img"
                    className={clsx(
                      fit ? classes.cardMediaFit : classes.cardMedia,
                      // (previewLoaded > 0) ? "fadeIn" : 'hidden',
                    )}
                    // onLoad={() => {
                    //   setTimeout(() => {
                    //     setPreviewLoaded(s => s + 1)
                    //   }, 16)
                    // }}
                    onClick={props.onClick}
                    src={image?.original?.url}
                    srcSet={genSrcSet(image)}
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
                      title={youTubeVimeoPreview ? title : "Video thumbnail unavailable"}
                    />
                  : <PreviewImageEmpty/>
              }
              </AspectCarouselItemLink>
            )
          })
        }
      </AirCarousel>

      <div className={classes.descriptionContainerOuter}>
        {/* {
          showWatchlistButton &&
          productId &&
          <WatchlistIcon
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
                // height={DESCRIPTION_HEIGHT}
              />
            : <div className={classes.descriptionContainer}
                style={cardWidthStyle}
              >
                <div className={classes.actionTag}>
                  <Typography
                    className={classes.actionType}
                    variant="body2"
                    component="div"
                  >
                    {product?.currentSnapshot?.actionType}
                  </Typography>
                </div>
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
                      isSuspended={product?.isSuspended}
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


const showDiscountBadge = (price: number, priceWas: number) => {
  if (
    price !== undefined &&
    priceWas !== undefined
  ) {
    return price < priceWas
  } else {
    return false
  }
}


interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  screenSize: "xs" | "sm" | "md" | "lg" | "xl";
  fit?: boolean; // object-fit the image
  cardsPerRow: number;
  maxWidthOfRow: number;
  showWatchlistButton?: boolean;
  listName?: string;
  isMobile?: boolean;
  refetch?(): void;
  hidePrice?: boolean;
  // carousels
  loadCarouselPics?: any;
  setLoadCarouselPics?(a: any): any;
  productIndex?: number;
  boxShadow?: boolean;
  style?: any;
  previewImageEmptyMessage?: string;
  onClick?(a: any): void;
}


export default withStyles(styles)( ProductCardImageCarousel );
