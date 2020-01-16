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
// Hooks
import { useWindowWidth } from "utils/hooks";
// Components
import FeaturedImageModal from "./FeaturedImageModal";
import FeaturedVideo from "./FeaturedVideo";
import FeaturedImagePlaceholder from "./FeaturedImagePlaceholder";
import Loading from "components/Loading";
import WishlistButton from "components/WishlistButton";
// carousel
import PreviewImage from "./PreviewImage";
import AirCarousel from "components/AirCarousel";
import AirItemTall from "components/AirCarousel/AirItemTall";
import AirItemWide from "components/AirCarousel/AirItemWide";
// redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { WishlistItemId } from "reduxStore/wishlist-reducer";



const ProductImageGallery: React.FC<ReactProps> = (props) => {

  const [featuredPreviewItem, setFeaturedPreviewItem] = useState(
    option(props).product.featuredVariant.previewItems[0]()
  );
  const [openedModals, setOpenedModals] = useState([]);

  useEffect(() => {
    let pitem: ProductPreviewItem = option(props).product.featuredVariant.previewItems[0]();
    if (pitem) {
      setFeaturedPreviewItem(pitem)
    }
  }, [option(props).product.featuredVariant()])


  const openModal = (id) => {
    setOpenedModals(openedModals => [...openedModals, id])
  }

  const closeModal = (id) => {
    setOpenedModals(openedModals => openedModals.filter(x => x !== id))
  }

  const handleImageClick = (previewItem: ProductPreviewItem) => {
    setFeaturedPreviewItem(previewItem)
  }

  const {
    classes,
    product,
    numberOfItemsTall = 5,
    numberOfItemsWide = 3,
  } = props;
  const previewItems = option(product).featuredVariant.previewItems();
  const portraitMode = option(previewItems)[0].image.original.heightInPixels(0)
                    > option(previewItems)[0].image.original.widthInPixels(0);

  return (
    <div className={classes.root}>
      {
        option(featuredPreviewItem).image.original.id() &&
        <WishlistButton
          productId={option(product).id()}
          variantId={option(product).featuredVariant.variantId()}
          style={{
            top: '0.5rem',
            right: '1rem',
          }}
        />
      }
      {
        option(featuredPreviewItem).image.original.id()
        ? <FeaturedImageModal
            previewItem={featuredPreviewItem}
            openedModals={openedModals || []}
            openModal={openModal}
            closeModal={closeModal}
          />
        : option(featuredPreviewItem).youTubeEmbedLink()
          ? <FeaturedVideo previewItem={featuredPreviewItem} />
          : <FeaturedImagePlaceholder previewItem={undefined} />
      }

      <div className={classes.carouselAbsolute}>
        <AirCarousel
          id={`air-cara-${option(product).id()}`}
          // product.id to re-render carousel position when product changes
          disableButtons={true}
        >
        {
          option(previewItems)([])
          .filter(p => option(p).image.original.id() !== undefined)
          .map((previewItem, i) => {
            return (
              <AirItemWide key={i}
                showNumItems={numberOfItemsWide}
                title={option(previewItem).image.description()}
                disableDither={true}
              >
                <PreviewImage
                  previewItem={previewItem}
                  onClick={() => handleImageClick(previewItem)}
                />
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
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  carouselAbsolute: {
    // position: 'absolute',
    // bottom: '0px',
    left: 0,
    width: '100%',
    marginBottom: '0.5rem',
  },
});


const ProductImageGalleryMemo = React.memo(
  (props: ReactProps) => <ProductImageGallery {...props}/>,
);

export default withStyles(styles)( ProductImageGalleryMemo );


