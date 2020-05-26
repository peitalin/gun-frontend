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
import { ProductPreviewItem, ProductCategory, Product, PriceDetails, ID } from "typings/gqlTypes";
import { Categories, Products, Product_Preview_Items } from "typings/gqlTypes";
import { genSrcSet, genImgBreakpoints } from "utils/images";
import { getYouTubeVimeoImagePreview } from "utils/strings";
import PriceDisplayMain from "components/PriceDisplayMain";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";
import ProductRow from "pageComponents/ProductGallery/FeaturedProductsMobile/ProductRow";
// Carousel
import AirItemWide from "components/AirCarousel/AirItemWide";
import AirCarousel from "components/AirCarousel";
import { useScrollXPosition, useCalcNumItemsFromWindowWidth } from "utils/hooks";
import AspectRatioConstraint from "components/AspectRatioConstraint";


/// NOTE:
/// There are 2 <Link> tags, one of the image, one for the description container
/// This is to prevent the wishlist button from being inside the <Link> tag
/// so that clicking wishlist buttons don't navigate to the product page.


const PreviewCard = (props: ReactProps) => {

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
  // const image =  option(previewItem).image();
  // let img600 = option(image).variants([]).filter(v => v.widthInPixels === 600)[0];

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
        disableButtons={false}
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
          <CarouselItemWrapper
            i={0}
            classes={classes}
            shouldLoadImage={shouldLoadImage}
            setLoadCarouselPics={props.setLoadCarouselPics}
            productIndex={props.productIndex}
            productId={props.productId}
          >
            <div className={clsx(
              classes.cardMedia,
              classes.emptyYouTubeVimeo,
            )}/>
          </CarouselItemWrapper>
        }
        {
          (previewItems.length > 0) &&
          previewItems.map((previewItem, i) => {

            const image =  option(previewItem).image();
            let img600 = option(image).variants([]).filter(v => v.widthInPixels === 600)[0];
            let youTubeVimeoPreview = getYouTubeVimeoImagePreview(
              option(previewItem).youtubeEmbedLink()
            );

            return (
              <CarouselItemWrapper key={i}
                i={i}
                classes={classes}
                shouldLoadImage={shouldLoadImage}
                setLoadCarouselPics={props.setLoadCarouselPics}
                productIndex={props.productIndex}
                productId={props.productId}
              >
              {
                (img600 && img600.url || image)
                ? <CardMedia
                    title={props.title}
                    component="img"
                    className={clsx(
                      fit ? classes.cardMediaFit : classes.cardMedia,
                      (previewLoaded > 0) ? "fadeInFast" : 'hidden',
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
                      (previewLoaded > 0) ? "fadeInFast" : 'hidden',
                      )}
                      onLoad={() => {
                        setTimeout(() => {
                          setPreviewLoaded(s => s + 1)
                        }, 16)
                      }}
                      src={youTubeVimeoPreview}
                      title={youTubeVimeoPreview ? props.title : "YouTube Vimeo thumbnail unavailable"}
                    />
                  : <div className={clsx(
                      classes.cardMedia,
                      classes.emptyYouTubeVimeo,
                    )}/>
              }
              </CarouselItemWrapper>
            )
          })
        }
      </AirCarousel>

      <div className={classes.descriptionContainerOuter}>
        {/* {
          showWishListButton &&
          <WishlistIcon
            productId={option(props).product.id()}
            variantId={option(props).product.currentSnapshot.featuredVariant.variantId()}
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
  previewItem: Product_Preview_Items;
  previewItems?: Product_Preview_Items[];
  product: Products;
  fit?: boolean; // object-fit the image
  title: string;
  tagline: string;
  category: Categories;
  price: number;
  priceWas?: number;
  quantityAvailable?: number | null;
  isSoldOut?: boolean;
  viewWidth?: number | string;
  viewWidthOffset?: number | string;
  productId?: ID;
  productVariantId?: ID;
  showWishListButton?: boolean;
  jumboXl?: boolean;
  listName?: string;
  loadCarouselPics?: any;
  setLoadCarouselPics(a: React.Dispatch<React.SetStateAction<any>>): void;
  productIndex?: number;
  refetch?(): void;
}


interface CarouselItemWrapperProps extends WithStyles<typeof styles> {
  i: number;
  shouldLoadImage({ firstImage, productIndex }: {
    firstImage: boolean;
    productIndex: number
  }): boolean;
  setLoadCarouselPics(a: React.Dispatch<React.SetStateAction<any>>): void;
  productIndex: number;
  productId: string;
}

const CarouselItemWrapper: React.FC<CarouselItemWrapperProps> = (props) => {

  const {
    i,
    classes,
    shouldLoadImage,
    setLoadCarouselPics,
    productIndex,
    productId,
  } = props;

  return (
    <AirItemWide
      showNumItems={1}
      title={""}
      disableDither={true}
      removePaddingBottom={true}
      removeMarginBottom={true}
    >
      <Card
        className={classes.card}
        classes={{
          root: classes.cardRoot
        }}
        onMouseOver={() => {
          if (setLoadCarouselPics) {
            setLoadCarouselPics(s => {
              return { ...s, [productIndex]: true }
            })
          }
        }}
      >
        <Link
          key={i}
          href={"/p/[productId]"}
          as={`/p/${productId}`}
        >
          <a className={classes.flexRow100Width}>
            {
              shouldLoadImage({
                firstImage: i === 0 || i === 1, // load first 2 images
                productIndex: productIndex
              }) &&
              <CardActionArea
                classes={{
                  root: classes.cardActionArea
                }}
              >
                {props.children}
              </CardActionArea>
            }
          </a>
        </Link>
      </Card>
    </AirItemWide>
  )
}




interface PreviewCardResponsiveProps extends WithStyles<typeof styles> {
  product: Products;
  showWishListButton?: boolean;
  viewWidth?: number;
  listName?: string;
  loadCarouselPics?: any;
  setLoadCarouselPics?(a: any): any;
  productIndex?: number;
  refetch?(): void;
}
const PreviewCardResponsive: React.FC<PreviewCardResponsiveProps> = (props) => {

  const { product, classes, refetch } = props;
  const featuredVariant = option(product).currentSnapshot.currentVariants[0]();
  const previewItem = option(product).currentSnapshot.currentVariants[0].previewItems[0]();
  const previewItems = option(product).currentSnapshot.currentVariants[0].previewItems([]);
  const original = option(previewItem).image.original();

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.only("sm"))

  return (
    <>
      {/* xs */}
      <Hidden only={["sm", "md", "lg", "xl"]}>
        <ProductRow product={product} />
      </Hidden>
      {/* sm */}
      <Hidden only={["xs", "md", "lg", "xl"]}>
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <PreviewCard
            previewItem={previewItem}
            previewItems={previewItems}
            product={product}
            title={option(product).currentSnapshot.title()}
            tagline={option(product).currentSnapshot.model()}
            category={option(product).category()}
            price={option(featuredVariant).price()}
            priceWas={option(featuredVariant).priceWas()}
            quantityAvailable={0}
            isSoldOut={false}
            fit={original
              ? (original.heightInPixels > original.widthInPixels)
              : false
            }
            jumboXl={true}
            listName={props.listName}
            loadCarouselPics={props.loadCarouselPics}
            setLoadCarouselPics={props.setLoadCarouselPics}
            productIndex={props.productIndex}
            refetch={refetch}
            classes={classes}
            viewWidth={100}
            viewWidthOffset={1 + 1} // account for padding/margin on each card
            // e.g. 1 cards = 1rem each
            // +1 rem for padding-left, padding-right (0.5rem each)
            // with when divided over 1 cards = 1 rem
          />
        </div>
      </Hidden>
      {/* md */}
      <Hidden only={["xs", "sm", "lg", "xl"]}>
        <PreviewCard
          previewItem={previewItem}
          previewItems={previewItems}
          product={product}
          title={option(product).currentSnapshot.title()}
          tagline={option(product).currentSnapshot.model()}
          category={option(product).category()}
          price={option(featuredVariant).price()}
          priceWas={option(featuredVariant).priceWas()}
          quantityAvailable={0}
          isSoldOut={false}
          fit={original
            ? (original.heightInPixels > original.widthInPixels)
            : false
          }
          jumboXl={true}
          listName={props.listName}
          loadCarouselPics={props.loadCarouselPics}
          setLoadCarouselPics={props.setLoadCarouselPics}
          productIndex={props.productIndex}
          refetch={refetch}
          classes={classes}
          viewWidth={50} // 50% vw each card
          viewWidthOffset={1/2 + 1} // account for padding/margin on each card
          // e.g. 2 cards = 1rem each
          // +1 rem for padding-left, padding-right (0.5rem each)
          // with when divided over 2 cards = 1/2 rem
        />
      </Hidden>
      {/* lg */}
      <Hidden only={["xs", "sm", "md", "xl"]}>
        <PreviewCard
          previewItem={previewItem}
          previewItems={previewItems}
          product={product}
          title={option(product).currentSnapshot.title()}
          tagline={option(product).currentSnapshot.model()}
          category={option(product).category()}
          price={option(featuredVariant).price()}
          priceWas={option(featuredVariant).priceWas()}
          quantityAvailable={0}
          isSoldOut={false}
          fit={original
            ? (original.heightInPixels > original.widthInPixels)
            : false
          }
          refetch={refetch}
          listName={props.listName}
          loadCarouselPics={props.loadCarouselPics}
          setLoadCarouselPics={props.setLoadCarouselPics}
          productIndex={props.productIndex}
          classes={classes}
          viewWidth={33.333} // 33% each card, with leeway for margins
          viewWidthOffset={1/3 + 1} // account for (minus) padding/margin on each card
          // e.g. 3 cards = 1rem each
          // +1 rem for padding-left, padding-right (0.5rem each)
          // with when divided over 3 cards = 1/3 rem
        />
      </Hidden>
      {/* xl */}
      <Hidden only={["xs", "sm", "md", "lg"]}>
        <PreviewCard
          previewItem={previewItem}
          previewItems={previewItems}
          product={product}
          title={option(product).currentSnapshot.title()}
          tagline={option(product).currentSnapshot.model()}
          category={option(product).category()}
          price={option(featuredVariant).price()}
          priceWas={option(featuredVariant).priceWas()}
          quantityAvailable={0}
          isSoldOut={false}
          fit={original
            ? (original.heightInPixels > original.widthInPixels)
            : false
          }
          refetch={refetch}
          listName={props.listName}
          loadCarouselPics={props.loadCarouselPics}
          setLoadCarouselPics={props.setLoadCarouselPics}
          productIndex={props.productIndex}
          classes={classes}
          showWishListButton={props.showWishListButton}
          viewWidth={25 - 0} // 25% per card, with leeway for margins
          viewWidthOffset={1/4 + 1} // account for padding/margin on each card
          // e.g. 4 cards = 1rem each
          // +1 rem for padding-left, padding-right (0.5rem each)
          // with when divided over 4 cards = 1/4 rem
        />
      </Hidden>
    </>
  )
}




export const CARD_MAX_WIDTH_XL = 420;
export const CARD_MAX_HEIGHT_XL = 280;

export const CARD_MAX_WIDTH = 270;
export const CARD_MAX_HEIGHT = 180;
// export const CARD_MAX_WIDTH = 255;
// export const CARD_MAX_HEIGHT = 170;
// export const CARD_MAX_WIDTH = 240;
// export const CARD_MAX_HEIGHT = 160;

// export const CARD_MIN_WIDTH = 210;
// export const CARD_MIN_HEIGHT = 140;
export const CARD_MIN_WIDTH = 200;
export const CARD_MIN_HEIGHT = 133.333;
// Replace hash with html-encoded %23
const patternColor = "e2e2e2";
const cardCornerRadius = 4
const backgroundColor = Colors.cream;


export const styles = (theme: Theme) => createStyles({
  rootContainer: {
    maxWidth: CARD_MAX_WIDTH,
    lineHeight: "1rem",
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    // boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)',
    // "&:hover":{
      // boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
      // boxShadow: "0 2px 4px 0 rgba(0,0,0,.2), 0 7px 9px 1px rgba(0,0,0,.11)",
      // transition: theme.transitions.create('border-shadow', {
      //   easing: theme.transitions.easing.easeIn,
      //   duration: "100ms",
      // }),
    // },
    // marginBottom: '1rem',
  },
  card: {
    // maxWidth: CARD_MAX_WIDTH,
    // width: `calc(${VW}vw)`,
    // minWidth: CARD_MIN_WIDTH,
    // borderRadius: `${cardCornerRadius}px ${cardCornerRadius}px 0px 0px`,
    borderRadius: `${cardCornerRadius}px`,
    backgroundColor: backgroundColor,
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23${patternColor}' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    transition: theme.transitions.create('border', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  cardRoot: {
    boxShadow: 'none',
    height: '100%',
    // backgroundColor: backgroundColor,
  },
  cardActionArea: {
    height: '100%',
    width: '100%',
  },
  cardMedia: {
    objectFit: "cover",
    // maxHeight: CARD_MAX_HEIGHT,
    // height: `calc(${VW}vw / 1.5)`,
    // minHeight: CARD_MIN_HEIGHT,
    height: '100%',
    border: 'none',
  },
  cardMediaFit: {
    objectFit: "cover",
    // maxHeight: CARD_MAX_HEIGHT,
    // height: `calc(${VW}vw / 1.5)`,
    // minHeight: CARD_MIN_HEIGHT,
    height: '100%',
    border: 'none',
  },
  // Need and outer and inner descriptionContainer for wishlist absolutee button
  descriptionContainerOuter: {
    position: 'relative', // for wishlist Button position: absolute
    width: '100%',
  },
  descriptionContainer: {
    // maxWidth: `calc(${CARD_MAX_WIDTH}px - 2rem)`,
    maxWidth: `calc(${CARD_MAX_WIDTH}px - 0rem)`,
    // width: `calc(${VW}vw - 1rem)`,
    minWidth: `calc(${CARD_MIN_WIDTH}px - 2rem)`,
    marginTop: "0.5rem",
    paddingTop: "0.25rem",
    margin: '0.5rem',
    minHeight: "136px", // ensure all cards are same height
    height: "136px", // ensure all cards are same height
    cursor: 'pointer',
    position: 'relative', // for wishlist Button position: absolute
  },
  category: {
    textTransform: "uppercase",
    fontWeight: 500,
    color: Colors.darkGrey,
    marginBottom: '0.4rem',
    lineHeight: '1rem',
  },
  title: {
    fontWeight: 600,
    color: Colors.charcoal,
    marginBottom: '0.4rem',
    lineHeight: '1.25rem',
    overflowY: 'hidden',
    minHeight: '2.5rem',
    maxHeight: '2.5rem',
  },
  tagline: {
    fontSize: '.875rem',
    color: "#aaa",
    marginBottom: '0.4rem',
    lineHeight: '1rem',
  },
  priceSpacer: {
    height: "40px", // 2 lines high
  },
  priceAbsoluteBottom: {
    // position: "absolute",
    bottom: '0.25rem',
    // width: 'calc(100% - 1rem)',
  },
  emptyYouTubeVimeo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightestGrey,
  },
  flexRow100Width: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default withStyles(styles)( PreviewCardResponsive );
