import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import WishlistIcon from "components/WishlistIcon";
import DiscountBadge from "components/DiscountBadge";
// Typings
import { ProductCategory, Product, ProductPreviewItem } from "typings/gqlTypes";
import { genSrcSet, genImgBreakpoints } from "utils/images";
import { getYouTubeVimeoImagePreview } from "utils/strings";
import PriceDisplayMain from "components/PriceDisplayMain";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";
import ProductRow from "pageComponents/FrontPage/FeaturedProductsMobile/ProductRow";
// Carousel
import AirItemWide from "components/AirCarousel/AirItemWide";
import AirCarousel from "components/AirCarousel";
import { useScrollXPosition, useCalcNumItemsFromWindowWidth } from "utils/hooks";
import AspectRatioConstraint from "components/AspectRatioConstraint";
import PreviewImageEmpty from "./PreviewImageEmpty";
import AspectCarouselItemLink from "./AspectCarouselItemLink";
import {
  CARD_MAX_WIDTH,
  CARD_MAX_WIDTH_XL,
  CARD_MIN_WIDTH,
  styles,
} from "./styles";
import { showDateAndTime } from "utils/dates";


/// NOTE:
/// There are 2 <Link> tags, one of the image, one for the description container
/// This is to prevent the wishlist button from being inside the <Link> tag
/// so that clicking wishlist buttons don't navigate to the product page.


const PreviewCardRC = (props: ReactProps) => {

  const [previewLoaded, setPreviewLoaded] = React.useState(0);

  const {
    classes,
    previewItem,
    previewItems,
    refetch,
    fit = false,
    viewWidth = 25,
    viewWidthOffset = '1.25rem',
    showWishListButton = true,
    jumboXl = false,
    product,
    listName = "",
  } = props;

  const title = option(props).title('').length > 50
    ? props.title.slice(0, 50) + '...'
    : option(props).title()

  const vwOffset = viewWidthOffset;

  const shouldLoadImage = ({
    firstImage,
    productIndex
  }: { firstImage: boolean, productIndex: number}) => {
    // load secondary preview item images after onmousehover event.
    // if hovered over product card
    if (props.loadCarouselPics && productIndex) {
      return firstImage || props.loadCarouselPics[productIndex]
    } else {
      // no loadCarouselPics logic, load all images up front
      return true
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  const carouselId = `air-paginator-${product.id}-${listName}`


  return (
    <div className={clsx(classes.rootContainer)}
      style={
        jumboXl
        ? { width: `calc(${viewWidth}vw - ${vwOffset}rem)`, maxWidth: CARD_MAX_WIDTH_XL }
        : { width: `calc(${viewWidth}vw - ${vwOffset}rem)` }
      }
    >
      <AirCarousel
        id={carouselId}
        // handleClickLeft={getPrevPage}
        // handleClickRight={getNextPage}
        disableButtons={previewItems.length < 2}
        // scrollSnapType={"none"}
        rightDither={false}
        scrollItemsPerClick={1}
        onMouseOver={() => {
          if (props.setLoadCarouselPics) {
            props.setLoadCarouselPics(s => {
              // console.log(`loading carousel pics for product card: ${props.loadCarouselPics}`)
              return { ...s, [props.productIndex]: true }
            })
          }
        }}
      >
        {
          (previewItems.length === 0) &&
          <AspectCarouselItemLink
            i={0}
            classes={classes}
            shouldLoadImage={shouldLoadImage}
            setLoadCarouselPics={props.setLoadCarouselPics}
            productIndex={props.productIndex}
            productId={props.product.id}
          >
            <PreviewImageEmpty/>
          </AspectCarouselItemLink>
        }
        {
          (previewItems.length > 0) &&
          previewItems.map((previewItem, i) => {

            const image =  option(previewItem).image();
            let img600 = option(image).variants([]).filter(v => v.widthInPixels === 600)[0];
            let youTubeVimeoPreview = getYouTubeVimeoImagePreview(
              option(previewItem).youTubeEmbedLink()
            );

            return (
              <AspectCarouselItemLink key={i}
                i={i}
                classes={classes}
                shouldLoadImage={shouldLoadImage}
                setLoadCarouselPics={props.setLoadCarouselPics}
                productIndex={props.productIndex}
                productId={props.product.id}
              >
              {
                (img600 && img600.url || image)
                ? <CardMedia
                    title={props.title}
                    component="img"
                    className={clsx(
                      fit ? classes.cardMediaFit : classes.cardMedia,
                      // (previewLoaded > 0) ? "fadeInFast" : 'hidden',
                    )}
                    onLoad={() => {
                      setTimeout(() => {
                        setPreviewLoaded(s => s + 1)
                      }, 16)
                    }}
                    src={option(img600).url() || option(image).original.url()}
                    srcSet={genSrcSet(image)}
                    sizes={genImgBreakpoints({
                      xs: 200,
                      sm: 200,
                      md: 200,
                      lg: 200,
                      xl: 200,
                    })}
                    // sizes={`
                    //   (max-width: 416px) 200px,
                    //   (max-width: 480px) 200px,
                    //   (max-width: 720px) 200px,
                    //   (max-width: 900px) 600px,
                    //   (min-width: 901px) 600px,
                    // `}
                    // https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
                  />
                : youTubeVimeoPreview
                  ? <CardMedia
                      component="img"
                      className={clsx(
                        fit ? classes.cardMediaFit : classes.cardMedia,
                      // (previewLoaded > 0) ? "fadeInFast" : 'hidden',
                      )}
                      onLoad={() => {
                        setTimeout(() => {
                          setPreviewLoaded(s => s + 1)
                        }, 16)
                      }}
                      src={youTubeVimeoPreview}
                      title={youTubeVimeoPreview ? props.title : "YouTube Vimeo thumbnail unavailable"}
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
          showWishListButton &&
          <WishlistIcon
            productId={option(props).product.id()}
            variantId={option(props).product.featuredVariant.variantId()}
            refetch={refetch}
            style={{
              top: '-0.8rem',
            }}
          />
        } */}
        <Link
          href={"/p/[productId]"}
          as={`/p/${props.product.id}`}
        >
          <a className={classes.flexRow100Width}>
            <div className={classes.descriptionContainer}
              style={
                jumboXl
                ? { width: `calc(${viewWidth}vw - 1rem)`, maxWidth: CARD_MAX_WIDTH_XL }
                : { width: `calc(${viewWidth}vw - 1rem)` }
              }
            >
              <Typography
                className={clsx(
                  classes.category,
                  !option(props).category.name() ? "pulse" : null
                )}
                variant="body2"
                component="div"
              >
                {option(props).category.name()}
              </Typography>

              <Typography
                className={clsx(
                  classes.title,
                  !option(props).title() ? "pulse" : null
                )}
                variant="body1"
                component="div"
              >
                {option(title)(".... ".repeat(2))}
              </Typography>

              <Typography
                className={classes.createdAt}
                variant="caption"
                component="div"
              >
                {
                  option(product).createdAt()
                    ? showDateAndTime(product.createdAt)
                    : undefined
                }
              </Typography>

              <Typography
                className={classes.createdAt}
                variant="caption"
                component="div"
              >
                {
                  option(product).store.name()
                }
              </Typography>

              <div className={clsx(
                classes.priceAbsoluteBottom,
                !option(props).price() ? "pulse" : null
              )}>
                {
                  option(props).price()
                  ? <PriceDisplayMain
                      price={props.price}
                      priceWas={props.priceWas}
                      quantityAvailable={props.quantityAvailable}
                      isSoldOut={props.isSoldOut}
                    />
                  : <span style={{ color: Colors.grey }}>.... .... ....</span>
                }
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  previewItem: ProductPreviewItem;
  previewItems?: ProductPreviewItem[];
  product: Product;
  fit?: boolean; // object-fit the image
  title: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  priceWas?: number;
  quantityAvailable?: number | null;
  isSoldOut?: boolean;
  viewWidth?: number | string;
  viewWidthOffset?: number | string;
  productVariantId?: string;
  showWishListButton?: boolean;
  jumboXl?: boolean;
  listName?: string;
  loadCarouselPics?: any;
  setLoadCarouselPics(a: React.Dispatch<React.SetStateAction<any>>): void;
  productIndex?: number;
  refetch?(): void;
}


export default withStyles(styles)( PreviewCardRC );
