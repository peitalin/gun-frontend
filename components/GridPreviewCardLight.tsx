import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import WishlistIcon from "components/WishlistIcon";
import DiscountBadge from "components/DiscountBadge";
// Typings
import { ProductPreviewItem, Product, ID } from "typings/gqlTypes";
import { genSrcSet, genImgBreakpoints } from "utils/images";
import { getYouTubeVimeoImagePreview } from "utils/links";
import PriceDisplayMain from "components/PriceDisplayMain";
import LinkLoading from "pageComponents/FrontPage/PreviewCardResponsive/LinkLoading";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";
import DescriptionLoading from "pageComponents/FrontPage/PreviewCardResponsive/DescriptionLoading";
// Carousel
import AirCarousel from "components/AirCarousel";
import { useScrollXPosition, useCalcNumItemsFromWindowWidth } from "utils/hooks";
import AspectRatioConstraint from "components/AspectRatioConstraint";
import PreviewImageEmpty from "pageComponents/FrontPage/PreviewCardResponsive/PreviewImageEmpty";
import AspectCarouselItemLink from "pageComponents/FrontPage/PreviewCardResponsive/AspectCarouselItemLink";
import {
  CARD_MAX_WIDTH_XL,
  DESCRIPTION_HEIGHT,
  styles,
} from "pageComponents/FrontPage/PreviewCardResponsive/styles";




const GridPreviewCardLight = (props: ReactProps) => {
  /// NOTE:
  /// There are 2 <Link> tags, one of the image, one for the description container
  /// This is to prevent the wishlist button from being inside the <Link> tag
  /// so that clicking wishlist buttons don't navigate to the product page.

  const [previewLoaded, setPreviewLoaded] = React.useState(0);

  const {
    classes,
    product,
    refetch,
    cardsPerRow = 1,
    maxWidthOfRow = 1160,
    showWishListButton = true,
    listName = "",
  } = props;

  let viewWidth = 100 / cardsPerRow;
  let viewWidthOffset = 1 / cardsPerRow + 1 // account for padding/margin on each card
  // e.g. 4 cards = 1rem each +1 rem for padding-left,
  // with when divided over 4 cards = 1/4 rem

  let price = product.featuredVariant.price
  let priceWas = product.featuredVariant.priceWas

  const productId = product?.id;
  const productVariantId = product?.featuredVariant?.variantId

  const previewItems = product?.featuredVariant?.previewItems ?? []
  const featuredPreview = previewItems[0];
  const image = featuredPreview?.image;
  let youTubeVimeoPreview = getYouTubeVimeoImagePreview(
    featuredPreview?.youTubeEmbedLink
  );

  const numPreviews = previewItems.length;

  const title = (product?.currentSnapshot?.title ?? "").length > 50
    ? product.currentSnapshot.title.slice(0, 52) + '...'
    : product?.currentSnapshot?.title

  const category = product?.category;
  const soldOutStatus = product?.soldOutStatus;

  const getCardMaxWidth = (cardsPerRow: number) => {
    // minus 16px (1rem) for left-padding on carousel
    // divide by 4, numCardsPerRow
    // minus 16px (1rem) for each card in the row
    return (maxWidthOfRow - 16) / cardsPerRow - 16
  }

  const getImgSizes = (cardsPerRow: number) => {
    switch (cardsPerRow) {
      case 5: {
        return imgSizes.fivePerRow
      }
      case 4: {
        return imgSizes.fourPerRow
      }
      case 3: {
        return imgSizes.threePerRow
      }
      case 2: {
        return imgSizes.twoPerRow
      }
      case 1: {
        return imgSizes.onePerRow
      }
      default: {
        return imgSizes.twoPerRow
      }
    }
  }

  const cardWidthStyle = {
    width: `calc(${viewWidth}vw - ${viewWidthOffset}rem)`,
    maxWidth: getCardMaxWidth(cardsPerRow),
  };

  const loadMoreImages = () => {
    if (props.setLoadCarouselPics) {
      if (!props.loadCarouselPics[props.productIndex]) {
        // console.log(`loading carousel pics for product card: ${props.loadCarouselPics}`)
        props.setLoadCarouselPics(s => {
          return { ...s, [props.productIndex]: true }
        })
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  const carouselId = `air-paginator-${product.id}-${listName}-${props.productIndex}`
  const imgSizesSrcSet = getImgSizes(cardsPerRow)
  // console.log("imgSizes srcSet: ", imgSizesSrcSet)
  // console.log("cardsPerRow", cardsPerRow)
  // console.log("carouselId: ", carouselId)

  const showDiscountBadge = () => {
    if (price !== undefined && priceWas !== undefined) {
      return price < priceWas
    } else {
      return false
    }
  }

  return (
    <div className={clsx(classes.rootContainer, classes.marginBottom)}
      style={{
        ...cardWidthStyle,
        boxShadow: props.boxShadow ? BoxShadows.shadow3.boxShadow : null,
        borderRadius: props.boxShadow ? `${BorderRadius}px` : "",
        ...props.style
      }}
    >
      {
        showDiscountBadge() &&
        <DiscountBadge
          price={price}
          priceWas={priceWas}
        />
      }
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
        onMouseOver={loadMoreImages}
        style={{ borderRadius: `${BorderRadius}px ${BorderRadius}px 0px 0px`}}
      >

        {/* If no PreviewItems */}
        {
          (previewItems.length === 0) &&
          <AspectCarouselItemLink
            classes={classes}
            product={product}
          >
            <PreviewImageEmpty/>
          </AspectCarouselItemLink>
        }

        {/* If PreviewItems */}
        {
          (previewItems.length > 0) &&
          <AspectCarouselItemLink
            classes={classes}
            product={product}
          >
            {
              image?.original?.url
              ? <CardMedia
                  title={title}
                  component="img"
                  className={clsx(classes.cardMedia)}
                  src={image?.original?.url}
                  srcSet={genSrcSet(image)}
                  sizes={genImgBreakpoints(imgSizesSrcSet)}
                />
              : youTubeVimeoPreview
                ? <CardMedia
                    component="img"
                    className={clsx(classes.cardMedia)}
                    src={youTubeVimeoPreview}
                    title={youTubeVimeoPreview ? title : "Video thumbnail unavailable"}
                  />
                : <PreviewImageEmpty/>
            }
          </AspectCarouselItemLink>
        }
      </AirCarousel>

      <div className={classes.descriptionContainerOuter}>
        {
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
        }
        <LinkLoading
          href={"/p/[productIdOrSlug]"}
          as={`/p/${props.product.id}`}
          disable={!props?.product?.storeId}
        >
          {
            !productId
            ? <DescriptionLoading
                style={cardWidthStyle}
                height={DESCRIPTION_HEIGHT}
              />
            : <div className={classes.descriptionContainer}
                style={cardWidthStyle}
              >
                <Typography
                  className={classes.category}
                  variant="body2"
                  component="div"
                >
                  {category?.name}
                </Typography>
                <Typography
                  className={classes.title}
                  variant="body1"
                  component="div"
                >
                  { title ? title : "" }
                </Typography>
                <div className={classes.priceAbsoluteBottom}>
                  <PriceDisplayMain
                    price={price}
                    priceWas={priceWas}
                    quantityAvailable={1}
                    soldOutStatus={soldOutStatus}
                  />
                </div>
              </div>
          }
        </LinkLoading>
      </div>
    </div>
  );
}



// sizes={`
//   (max-width: 416px) 200px,
//   (max-width: 480px) 200px,
//   (max-width: 720px) 200px,
//   (max-width: 900px) 200px,
//   (min-width: 901px) 200px,
// `}
// https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
const imgSizes = {
  fivePerRow: {
    xs: 200,
    sm: 200,
    md: 200,
    lg: 200,
    xl: 200,
  },
  fourPerRow: {
    xs: 200,
    sm: 200,
    md: 200,
    lg: 200,
    xl: 200,
  },
  threePerRow: {
    xs: 400,
    sm: 400,
    md: 400,
    lg: 400,
    xl: 400,
  },
  twoPerRow: {
    xs: 600,
    sm: 600,
    md: 1200,
    lg: 1200,
    xl: 1200,
  },
  onePerRow: {
    xs: 600,
    sm: 1200,
    md: 1200,
    lg: 1200,
    xl: 1200,
  },
};


interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  cardsPerRow: number;
  maxWidthOfRow: number;
  showWishListButton?: boolean;
  listName?: string;
  refetch?(): void;
  // carousels
  loadCarouselPics?: any;
  setLoadCarouselPics?(a: any): any;
  productIndex?: number;
  boxShadow?: boolean;
  style?: any;
}


export default withStyles(styles)( GridPreviewCardLight );
