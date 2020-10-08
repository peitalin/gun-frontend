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
// Typings
import { Categories, Products, Product_Preview_Items } from "typings/gqlTypes";
import { genSrcSet, genImgBreakpoints } from "utils/images";
import { getYouTubeVimeoImagePreview } from "utils/strings";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Hidden from "@material-ui/core/Hidden";
import ProductRow from "pageComponents/FrontPage/FeaturedProductsMobile/ProductRow";
// Loading
import LoadingBar from "components/LoadingBar";
import { styles } from "./PreviewCardResponsiveCarousel/styles";
import PreviewImageEmpty from "./PreviewCardResponsiveCarousel/PreviewImageEmpty";
import {
  CARD_MAX_WIDTH_XL,
} from "./PreviewCardResponsiveCarousel/styles";


/// NOTE:
/// There are 2 <Link> tags, one of the image, one for the description container
/// This is to prevent the wishlist button from being inside the <Link> tag
/// so that clicking wishlist buttons don't navigate to the product page.


const PreviewCardLoading = (props: ReactProps) => {

  const [youTubeVimeoPreview, setYouTubeVimeoPreview] = React.useState("")
  // const [previewLoaded, setPreviewLoaded] = React.useState(false);

  const {
    classes,
    previewItem,
    refetch,
    fit = false,
    viewWidth = 25,
    showWishListButton = true,
    jumboXl = false,
  } = props;
  const image =  option(previewItem).image();
  const youTubeVimeoEmbedLink =  option(previewItem).youTubeEmbedLink();

  React.useEffect(() => {
    setYouTubeVimeoPreview(getYouTubeVimeoImagePreview(youTubeVimeoEmbedLink))
  }, [])


  const title = option(props).title('').length > 48
    ? props.title.slice(0, 55) + '...'
    : option(props).title()

  return (
    <div className={clsx(classes.rootContainer, 'pulse')}
      style={
        jumboXl
        ? { width: `calc(${viewWidth}vw)`, maxWidth: CARD_MAX_WIDTH_XL }
        : { width: `calc(${viewWidth}vw)` }
      }
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
            <PreviewImageEmpty
              style={{ height: '160px' }}
            />
          </CardActionArea>
        </Card>
      </a>
      <div className={classes.descriptionContainerOuter}
        style={{
          // opacity: '0.6',
          // backgroundColor: "rgba(0,0,0,0.01)"
        }}
      >
        <a className={classes.flexRow100Width}>
          <div className={classes.descriptionContainer}
            style={{
              width: `calc(${viewWidth}vw - 0rem)`,
              // margin: '0rem 0rem 1rem 0rem',
              margin: '0.5rem 0rem',
              overflow: "hidden",
              // background: '#fafafa',
            }}
          >
            <Typography
              className={clsx(
                classes.category,
                // !option(props).category.name() ? "pulse" : null
              )}
              variant="body1"
              component="div"
            >
              {option(props).category.name()}
            </Typography>
            <Typography
              className={clsx(
                classes.title,
                // !option(props).title() ? "pulse" : null
              )}
              variant="body1"
              component="div"
            >
              {option(title)("".repeat(2))}
            </Typography>
            <div className={clsx(
              classes.priceAbsoluteBottom,
              // !option(props).priceDetails() ? "pulse" : null
            )}>
              {/* <LoadingBar
                absoluteTop
                color={Colors.lightestGrey}
                height={4}
                width={`calc(${viewWidth}vw + 1rem)`}
                loading={true}
              /> */}
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

interface ReactProps extends WithStyles<typeof styles> {
  previewItem: Product_Preview_Items;
  fit?: boolean; // object-fit the image
  product: Products;
  title: string;
  tagline: string;
  category: Categories;
  price: number;
  priceWas?: number;
  quantityAvailable?: number | null;
  isSoldOut?: boolean;
  viewWidth?: number;
  viewWidthOffset?: number | string;
  productId?: string;
  productVariantId?: string;
  showWishListButton?: boolean;
  jumboXl?: boolean;
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
  const original = option(previewItem).image.original();

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.only("sm"))

  return (
    <>
      {/* xs */}
      <Hidden only={["sm", "md", "lg", "xl"]}>
        <ProductRow
          product={product as any}
          // Products is not Product type
          // make sure you get Products from gateway, not directly fron Hasura
        />
      </Hidden>
      {/* sm */}
      <Hidden only={["xs", "md", "lg", "xl"]}>
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <PreviewCardLoading
            previewItem={previewItem}
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
        <PreviewCardLoading
          previewItem={previewItem}
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
        <PreviewCardLoading
          previewItem={previewItem}
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
        <PreviewCardLoading
          previewItem={previewItem}
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

interface PreviewCardResponsiveProps extends WithStyles<typeof styles> {
  product?: Products;
  showWishListButton?: boolean;
  viewWidth?: number;
  listName?: string;
  loadCarouselPics?: any;
  setLoadCarouselPics?(a: any): any;
  productIndex?: number;
  refetch?(): void;
}



export default withStyles(styles)( PreviewCardResponsive );
