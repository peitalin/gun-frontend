import React from "react";
import { useState, useEffect } from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import {
  Product,
} from "typings/gqlTypes";
// Components
import FeaturedImageModal from "./FeaturedPreview/FeaturedImageModal";
import FeaturedImagePlaceholder from "./FeaturedPreview/FeaturedImagePlaceholder";
import FeaturedVideoMobile from "./FeaturedPreview/FeaturedVideoMobile";
import WishlistIcon from "components/WishlistIcon";
// Carousel
import AirCarousel from "components/AirCarousel";
import AirItemTall from "components/AirCarousel/AirItemTall";
import AirItemWide from "components/AirCarousel/AirItemWide";
// redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { WishlistItemId } from "reduxStore/wishlist-reducer";
// import { QueryWishlistHookArgs } from "pageComponents/Wishlist";
import usePaginateQueryHook from "components/Paginators/usePaginateQueryHook";




const ImageGalleryMobile: React.FC<ReactProps> = (props) => {


  const openModal = (id) => {
    setOpenedModals(openedModals => [...openedModals, id])
  }

  const closeModal = (id) => {
    setOpenedModals(openedModals => openedModals.filter(x => x !== id))
  }

  const {
    classes,
    product,
    // featuredPreview carousel
    index,
    setIndex,
  } = props;

  const [openedModals, setOpenedModals] = useState([]);

  const previewItems = option(product).featuredVariant.previewItems([])
    .filter(p =>
      option(p).image.original.id() !== undefined
      || option(p).youTubeEmbedLink !== undefined
    )

  // const wishlistConnectionResponse = usePaginateQueryHook(QueryWishlistHookArgs);


  return (
    <div className={classes.root}>
      {/* {
        (previewItems.length > 0) &&
        <WishlistIcon
          productId={option(product).id()}
          variantId={option(product).featuredVariant.variantId()}
          // refetch={wishlistConnectionResponse.refetch}
          style={{
            top: 'unset',
            bottom: '-13px',
            right: '2rem',
          }}
        />
      } */}
      <div className={classes.carouselRelative}>
        <div className={classes.widenCarousel}>
          <AirCarousel
            id={`air-cara-${option(product).id()}`}
            key={`air-cara-${option(product).id()}`}
            // key: product.id to re-render carousel position when product changes
            disableButtons={true}
            showPositionIndicator={true}
            totalNumberOfItems={previewItems.length}
          >
            {
              (previewItems.length === 0)
              ? <AirItemWide
                  // SSR loading/rendering state
                  showNumItems={1}
                  title={''}
                  disableDither={true}
                  removePaddingBottom={true}
                  removeMarginBottom={true}
                  borderGutter={"0.25rem"}
                >
                  <div
                    // className="shimmer"
                    style={{ height: '100%' }}
                  >
                  </div>
                </AirItemWide>
              : previewItems.map((pitem, i) => {
                  return (
                    <AirItemWide key={i}
                      showNumItems={1}
                      title={option(pitem).image.description()}
                      disableDither={true}
                      removePaddingBottom={true}
                      removeMarginBottom={true}
                      borderGutter={"0.25rem"}
                    >
                      {
                        props.loading
                        ? <FeaturedImagePlaceholder previewItem={undefined} />
                        : option(pitem).image.original.id()
                          ? <FeaturedImageModal
                              previewItem={pitem}
                              openedModals={openedModals || []}
                              openModal={openModal}
                              closeModal={closeModal}
                              product={product}
                              index={index}
                              setIndex={setIndex}
                              isMobile={true}
                            />
                          : option(pitem).youTubeEmbedLink()
                            ? <FeaturedVideoMobile previewItem={pitem} />
                            : <FeaturedImagePlaceholder previewItem={undefined} />
                      }
                    </AirItemWide>
                  )
                })
            }
          </AirCarousel>
        </div>
      </div>
    </div>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  loading?: boolean;
  numberOfItemsTall?: number;
  numberOfItemsWide?: number;
  wishlistOffset?: any;
  index: number;
  setIndex(a?: any): void;
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  carouselRelative: {
    position: 'relative',
    left: 0,
    width: '100%',
    overflowX: 'hidden',
  },
  widenCarousel: {
    // make image wider, and shift left to remove whitespace
    transform: 'translateX(-1.5%)',
    width: '104%',
  },
});


const ImageGalleryMobileMemo = React.memo(
  (props: ReactProps) => <ImageGalleryMobile {...props}/>,
);

export default withStyles(styles)( ImageGalleryMobileMemo );


