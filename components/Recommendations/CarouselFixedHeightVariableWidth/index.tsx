import React from "react";
import { oc as option } from "ts-optchain";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
import clsx from "clsx";
// Material UI
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Components
import PreviewCardTall from "./PreviewCardTall";
import Link from "next/link";
import Loading from "components/Loading";
import WishlistIcon from "components/WishlistIcon";
// Typings
import { Connection, Product, Edge, ProductsEdge } from "typings/gqlTypes";
// Carousel
import AirItemTall from "components/AirCarousel/AirItemTall";
import AirCarousel from "components/AirCarousel";
// Paginator hooks
import { ConnectionQueryProps } from "components/Paginators/usePaginateQueryHook";
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";
// redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { WishlistItemId } from "reduxStore/wishlist-reducer";
import { getProductIdOrSlug } from "utils/links";



const CarouselFixedHeightVariableWidth = (props: ReactProps) => {

  const {
    classes,
    carouselId,
    getPrevPage,
    getNextPage,
    loading,
    accumConnectionEdges,
    numberOfItems,
  } = props;

  return (
    <main
      className={classes.root}
      style={{
        maxWidth: props.maxWidthCarousel,
      }}
    >
      {
        (accumConnectionEdges.length > 0) &&
        <Typography variant="h5" className={classes.title} gutterBottom>
          {props.title}
        </Typography>
      }
      <AirCarousel
        id={carouselId}
        handleClickLeft={getPrevPage}
        handleClickRight={getNextPage}
        disableButtons={false}
        scrollSnapType={"none"}
        rightDither={false}
      >
      {
        accumConnectionEdges.map(({ node: product }, i) =>
          <AirItemProduct
            key={i}
            product={product}
            numberOfItems={numberOfItems}
            classes={classes}
            maxWidthCarousel={props.maxWidthCarousel}
            topHalfFraction={props.topHalfFraction}
            wishlistStyle={props.wishlistStyle}
            refetch={props.refetch}
          />
        )
      }
      </AirCarousel>
      {
        loading &&
        <Loading fixed/>
      }
    </main>
  )
}



interface AirItemProductProps extends WithStyles<typeof styles> {
  product: Product;
  numberOfItems: number;
  isInWishlist?: boolean;
  maxWidthCarousel?: number;
  topHalfFraction?: number;
  wishlistStyle?: any;
  refetch?(): void;
}
const AirItemProduct = (props: AirItemProductProps) => {

  const {
    product,
    numberOfItems,
    classes
  } = props;

  const featuredVariant = option(product).featuredVariant();
  const previewItem = option(product).featuredVariant.previewItems[0]();
  const original = option(previewItem).image.original();

  return (
    <AirItemTall
      showNumItems={numberOfItems}
      title={null}
      disableDither={true}
    >
      <div className={classes.flexItem}>
        <WishlistIcon
          productId={option(product).id()}
          variantId={option(product).featuredVariant.variantId()}
          style={
            props.wishlistStyle
              ? props.wishlistStyle
              : { top: 'calc(50% - 16px)' }
          }
          refetch={props.refetch}
        />
        <Link
          href={"/p/[productIdOrSlug]"}
          as={`/p/${getProductIdOrSlug(product)}`}
        >
          <a className={classes.productImage}>
            <PreviewCardTall
              previewItem={previewItem}
              title={option(product).name()}
              tagline={option(product).tagline()}
              category={option(product).category()}
              priceDetails={option(featuredVariant).priceDetails()}
              quantityAvailable={option(featuredVariant).currentStockLevel.quantityAvailable()}
              isSoldOut={option(featuredVariant).isSoldOut()}
              fit={original ? (original.heightInPixels > original.widthInPixels) : false}
              count={numberOfItems}
              maxWidthCarousel={props.maxWidthCarousel}
              topHalfFraction={props.topHalfFraction}
            />
          </a>
        </Link>
      </div>
    </AirItemTall>
  )
}



interface ReactProps extends WithStyles<typeof styles> {
  title?: string;
  numberOfItems?: number;
  maxWidthCarousel: number;
  topHalfFraction?: number;
  wishlistStyle?: any;
  // hooks args
  carouselId: string;
  getPrevPage(): void;
  getNextPage(): void;
  refetch?(): void;
  loading: boolean;
  accumConnectionEdges: ProductsEdge[],
  // products connection, accumulated over pages
}

export const cardCornerRadius = 4;

const styles = (theme: Theme) => createStyles({
  root: {
    margin: "0rem 0rem",
    paddingRight: '1rem', // subtract 1rem for carousel buttons: 1rem on both sides
    paddingLeft: '1rem', // subtract 1rem for carousel buttons: 1rem on both sides
    width: '100%',
  },
  productImage: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 600,
    marginBottom: "0.5rem",
  },
  flexCol: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flexItem: {
    borderRadius: `${cardCornerRadius}px ${cardCornerRadius}px 0px 0px`,
    position: 'relative',
  },
  flexItemHoverNull: {
    "&:hover": {
      backgroundColor: "#fafafa",
      transition: theme.transitions.create('border', {
        easing: theme.transitions.easing.easeIn,
        duration: "200ms",
      }),
    }
  },
  paginateButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default withStyles(styles)( CarouselFixedHeightVariableWidth );







