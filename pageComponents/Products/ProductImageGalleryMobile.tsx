import React from "react";
import { useState, useEffect } from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import {
  Product,
  ProductVariant,
  ProductPreviewItem,
} from "typings/gqlTypes";
// Components
import FeaturedImageModal from "./FeaturedImageModal";
import FeaturedImagePlaceholder from "./FeaturedImagePlaceholder";
import FeaturedVideoMobile from "./FeaturedVideoMobile";
import FeaturedVideo from "./FeaturedVideo";
import Loading from "components/Loading";
import WishlistButton from "components/WishlistButton";
// Carousel
import PreviewImage from "./PreviewImage";
import AirCarousel from "components/AirCarousel";
import AirItemTall from "components/AirCarousel/AirItemTall";
import AirItemWide from "components/AirCarousel/AirItemWide";
// redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { WishlistItemId } from "reduxStore/wishlist-reducer";




const ProductImageGalleryMobile: React.FC<ReactProps> = (props) => {

  const [openedModals, setOpenedModals] = useState([]);

  const openModal = (id) => {
    setOpenedModals(openedModals => [...openedModals, id])
  }

  const closeModal = (id) => {
    setOpenedModals(openedModals => openedModals.filter(x => x !== id))
  }

  const {
    classes,
    product,
  } = props;

  const previewItems = option(product).featuredVariant.previewItems([])
    .filter(p =>
      option(p).image.original.id() !== undefined
      || option(p).youTubeEmbedLink !== undefined
    )



  return (
    <div className={classes.root}>
      {
        (previewItems.length > 0) &&
        <WishlistButton
          productId={option(product).id()}
          variantId={option(product).featuredVariant.variantId()}
          style={{
            top: 'unset',
            bottom: '-12px',
            right: '2rem',
          }}
        />
      }
      <div className={classes.carouselRelative}>
        <AirCarousel
          id={`air-cara-${option(product).id()}`}
          key={`air-cara-${option(product).id()}`}
          // key: product.id to re-render carousel position when product changes
          disableButtons={true}
          showPositionIndicator={true}
          totalNumberOfItems={previewItems.length}
        >
          {
            (previewItems.length > 0) &&
            previewItems.map((previewItem, i) => {
              return (
                <AirItemWide key={i}
                  showNumItems={1}
                  title={option(previewItem).image.description()}
                  disableDither={true}
                  removeBottomPadding={true}
                >
                  {
                    option(previewItem).image.original.id()
                    ? <FeaturedImageModal
                        previewItem={previewItem}
                        openedModals={openedModals || []}
                        openModal={openModal}
                        closeModal={closeModal}
                        isMobile={true}
                      />
                    : option(previewItem).youTubeEmbedLink()
                      ? <FeaturedVideoMobile previewItem={previewItem} />
                      : <FeaturedImagePlaceholder previewItem={undefined} />
                  }
                </AirItemWide>
              )
            })
          }
        </AirCarousel>
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
  },
});


const ProductImageGalleryMobileMemo = React.memo(
  (props: ReactProps) => <ProductImageGalleryMobile {...props}/>,
);

export default withStyles(styles)( ProductImageGalleryMobileMemo );


