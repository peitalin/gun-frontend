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
import WishlistButton from "components/WishlistButton";
// Typings
import { ProductPreviewItem, ProductCategory, Product, PriceDetails, ID } from "typings/gqlTypes";
import { genSrcSet } from "utils/files";
import { getYouTubeVimeoImagePreview } from "utils/strings";
import PriceDisplay2 from "components/PriceDisplay2";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";
import ProductRow from "pageComponents/ProductGallery/EndingSoonCarouselMobile/ProductRow";
// redux
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
// import { WishlistItemId } from "reduxStore/wishlist-reducer";
import Portal from "@material-ui/core/Portal";


/// NOTE:
/// There are 2 <Link> tags, one of the image, one for the description container
/// This is to prevent the wishlist button from being inside the <Link> tag
/// so that clicking wishlist buttons don't navigate to the product page.


const PreviewCard = (props: ReactProps) => {

  const [youTubeVimeoPreview, setYouTubeVimeoPreview] = React.useState("")
  // const [previewLoaded, setPreviewLoaded] = React.useState(false);

  const {
    classes,
    previewItem,
    fit = false,
    viewWidth = 25,
    showWishListButton = true,
  } = props;
  const image =  option(previewItem).image();
  const youTubeVimeoEmbedLink =  option(previewItem).youTubeEmbedLink();

  React.useEffect(() => {
    setYouTubeVimeoPreview(getYouTubeVimeoImagePreview(youTubeVimeoEmbedLink))
  }, [])


  const title = option(props).title('').length > 48
    ? props.title.slice(0, 55) + '...'
    : option(props).title()
  // console.log('srcSet....', genSrcSet(image))

  return (
    <div className={clsx(classes.rootContainer)}
      style={{
        width: `calc(${viewWidth}vw)`,
      }}
    >
      <Link
        href={"/download/[productId]"}
        as={`/download/${option(props).product.id()}`}
      >
        <a className={classes.flexRow100Width}>
          <Card className={classes.card}
            classes={{
              root: classes.cardRoot
            }}
            style={{
              width: `calc(${viewWidth}vw)`,
            }}
          >
            <CardActionArea>
              {
                option(image).original.id()
                ? <CardMedia
                    title={props.title}
                    component="img"
                    className={clsx(
                      fit ? classes.cardMediaFit : classes.cardMedia,
                      // (previewLoaded > 0) ? "fadeIn" : null,
                    )}
                    // onLoad={() => setPreviewLoaded(s => s + 1)}
                    src={image.original.url}
                    srcSet={genSrcSet(image)}
                    sizes={`(max-width: 320px) 280px, (max-width: 480px) 440px, 800px`}
                    // https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
                    style={{
                      height: `calc(${viewWidth}vw / 1.5)`,
                    }}
                  />
                : youTubeVimeoPreview
                  ? <CardMedia
                      component="img"
                      className={clsx(
                        fit ? classes.cardMediaFit : classes.cardMedia,
                        // (previewLoaded || process.browser) ? "fadeInFast" : "hidden",
                      )}
                      // onLoad={() => setPreviewLoaded(s => s + 1)}
                      src={youTubeVimeoPreview}
                      title={youTubeVimeoPreview ? props.title : "YouTube Vimeo thumbnail unavailable"}
                      style={{
                        height: `calc(${viewWidth}vw / 1.5)`,
                      }}
                    />
                  : <div className={clsx(
                      classes.cardMedia,
                      classes.emptyYouTubeVimeo,
                    )}>
                    </div>
              }
            </CardActionArea>
          </Card>
        </a>
      </Link>
      <div className={classes.descriptionContainerOuter}>
        {
          showWishListButton &&
          <WishlistButton
            productId={option(props).product.id()}
            variantId={option(props).product.featuredVariant.variantId()}
            style={{
              top: '-1rem',
            }}
          />
        }
        <Link
          href={"/download/[productId]"}
          as={`/download/${option(props).product.id()}`}
        >
          <a className={classes.flexRow100Width}>
            <div className={classes.descriptionContainer}
              style={{
                width: `calc(${viewWidth}vw - 1rem)`,
              }}
            >
              <Typography
                className={clsx(
                  classes.category,
                  !option(props).category.categoryGroup() ? "pulse" : null
                )}
                variant="body1"
                component="div"
              >
                {option(props).category.categoryGroup("Loading...")}
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
                !option(props).priceDetails() ? "pulse" : null
              )}>
                {
                  option(props).priceDetails()
                  ? <PriceDisplay2
                      priceDetails={props.priceDetails}
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
  product: Product;
  fit?: boolean; // object-fit the image
  title: string;
  tagline: string;
  category: ProductCategory;
  priceDetails: PriceDetails;
  quantityAvailable?: number | null;
  isSoldOut?: boolean;
  viewWidth?: number;
  productId?: ID;
  productVariantId?: ID;
  showWishListButton?: boolean;
}



interface PreviewCardResponsiveProps extends WithStyles<typeof styles> {
  product: Product;
  showWishListButton?: boolean;
  viewWidth?: number;
}
const PreviewCardResponsive: React.FC<PreviewCardResponsiveProps> = (props) => {

  const { product, classes } = props;
  const featuredVariant = option(product).featuredVariant();
  const previewItem = option(product).featuredVariant.previewItems[0]();
  const original = option(previewItem).image.original();

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.only("sm"))

  return (
    <>
      {/* xs */}
      <Hidden only={["sm", "md", "lg", "xl"]}>
        <ProductRow product={product}/>
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
            product={product}
            title={option(product).name()}
            tagline={option(product).tagline()}
            category={option(product).category()}
            priceDetails={option(featuredVariant).priceDetails()}
            quantityAvailable={option(featuredVariant).currentStockLevel.quantityAvailable()}
            isSoldOut={option(featuredVariant).isSoldOut()}
            fit={original
              ? (original.heightInPixels > original.widthInPixels)
              : false
            }
            classes={classes}
            viewWidth={90}
          />
        </div>
      </Hidden>
      {/* md */}
      <Hidden only={["xs", "sm", "lg", "xl"]}>
        <PreviewCard
          previewItem={previewItem}
          product={product}
          title={option(product).name()}
          tagline={option(product).tagline()}
          category={option(product).category()}
          priceDetails={option(featuredVariant).priceDetails()}
          quantityAvailable={option(featuredVariant).currentStockLevel.quantityAvailable()}
          isSoldOut={option(featuredVariant).isSoldOut()}
          fit={original
            ? (original.heightInPixels > original.widthInPixels)
            : false
          }
          classes={classes}
          viewWidth={40}
        />
      </Hidden>
      {/* lg */}
      <Hidden only={["xs", "sm", "md", "xl"]}>
        <PreviewCard
          previewItem={previewItem}
          product={product}
          title={option(product).name()}
          tagline={option(product).tagline()}
          category={option(product).category()}
          priceDetails={option(featuredVariant).priceDetails()}
          quantityAvailable={option(featuredVariant).currentStockLevel.quantityAvailable()}
          isSoldOut={option(featuredVariant).isSoldOut()}
          fit={original
            ? (original.heightInPixels > original.widthInPixels)
            : false
          }
          classes={classes}
          viewWidth={30}
        />
      </Hidden>
      {/* xl */}
      <Hidden only={["xs", "sm", "md", "lg"]}>
        <PreviewCard
          previewItem={previewItem}
          product={product}
          title={option(product).name()}
          tagline={option(product).tagline()}
          category={option(product).category()}
          priceDetails={option(featuredVariant).priceDetails()}
          quantityAvailable={option(featuredVariant).currentStockLevel.quantityAvailable()}
          isSoldOut={option(featuredVariant).isSoldOut()}
          fit={original
            ? (original.heightInPixels > original.widthInPixels)
            : false
          }
          classes={classes}
          showWishListButton={props.showWishListButton}
          viewWidth={25}
        />
      </Hidden>
    </>
  )
}




export const CARD_MAX_WIDTH = 300;
export const CARD_MAX_HEIGHT = 200;

export const CARD_MIN_WIDTH = 210;
export const CARD_MIN_HEIGHT = 140;
// Replace hash with html-encoded %23
const patternColor = "e2e2e2";
const cardCornerRadius = 4
const backgroundColor = Colors.cream;


const styles = (theme: Theme) => createStyles({
  rootContainer: {
    maxWidth: CARD_MAX_WIDTH,
    lineHeight: "1rem",
    position: "relative",
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  card: {
    maxWidth: CARD_MAX_WIDTH,
    // width: `calc(${VW}vw)`,
    minWidth: CARD_MIN_WIDTH,
    borderRadius: `${cardCornerRadius}px ${cardCornerRadius}px 0px 0px`,
    backgroundColor: backgroundColor,
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${patternColor}' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='2' cy='2' r='2'/%3E%3Ccircle cx='13' cy='13' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23${patternColor}' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    transition: theme.transitions.create('border', {
      easing: theme.transitions.easing.easeIn,
      duration: "200ms",
    }),
  },
  cardRoot: {
    boxShadow: 'none',
    // backgroundColor: backgroundColor,
  },
  cardMedia: {
    objectFit: "cover",
    maxHeight: CARD_MAX_HEIGHT,
    // height: `calc(${VW}vw / 1.5)`,
    minHeight: CARD_MIN_HEIGHT,
    border: 'none',
  },
  cardMediaFit: {
    objectFit: "cover",
    maxHeight: CARD_MAX_HEIGHT,
    // height: `calc(${VW}vw / 1.5)`,
    minHeight: CARD_MIN_HEIGHT,
    border: 'none',
  },
  // Need and outer and inner descriptionContainer for wishlist absolutee button
  descriptionContainerOuter: {
    position: 'relative', // for wishlist Button position: absolute
    width: '100%',
  },
  descriptionContainer: {
    maxWidth: `calc(${CARD_MAX_WIDTH}px - 2rem)`,
    // width: `calc(${VW}vw - 1rem)`,
    minWidth: `calc(${CARD_MIN_WIDTH}px - 2rem)`,
    marginTop: "0.5rem",
    paddingTop: "0.25rem",
    margin: '0.5rem',
    minHeight: "136px",
    cursor: 'pointer',
    position: 'relative', // for wishlist Button position: absolute
  },
  category: {
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: '.8rem',
    color: "#888",
    marginBottom: '0.4rem',
    lineHeight: '1rem',
  },
  title: {
    fontWeight: 600,
    color: "#444",
    marginBottom: '0.4rem',
    lineHeight: '1rem',
    maxHeight: '2rem',
    overflowY: 'hidden',
  },
  tagline: {
    fontSize: '.8rem',
    color: "#aaa",
    marginBottom: '0.4rem',
    lineHeight: '1rem',
  },
  priceSpacer: {
    height: "40px", // 2 lines high
  },
  priceAbsoluteBottom: {
    position: "absolute",
    bottom: '0.25rem',
    // width: 'calc(100% - 1rem)',
  },
  emptyYouTubeVimeo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow100Width: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export default withStyles(styles)( PreviewCardResponsive );
