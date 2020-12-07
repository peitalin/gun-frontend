import React from "react";
import { useState, useEffect } from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import {
  Product,
  Product_Preview_Items,
} from "typings/gqlTypes";
import {
  SelectedVariantProps
} from "pageComponents/P/ProductId";
// Components
import FeaturedImagePlaceholder from "./FeaturedPreview/FeaturedImagePlaceholder";
import FeaturedImageModal from "./FeaturedPreview/FeaturedImageModal";
import WishlistIcon from "components/WishlistIcon";
// import AddCartItemIcon from "components/AddCartItemIcon";
// carousel
import ThumbnailImage from "./FeaturedPreview/ThumbnailImage";
import ThumbnailVideo from "./FeaturedPreview/ThumbnailVideo";
import AirCarousel from "components/AirCarousel";
import AirItemTall from "components/AirCarousel/AirItemTall";
import AirItemWide from "components/AirCarousel/AirItemWide";
// redux
import { useDispatch, useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";
import { WishlistItemId } from "reduxStore/wishlist-reducer";
// // Analytics
// import { useAnalytics, analyticsEvent } from "utils/analytics";
// Media Query
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";



const ImageGalleryDesktop: React.FC<ReactProps> = (props) => {

  const [featuredPreviewItem, setFeaturedPreviewItem] = useState(
    option(props).product.featuredVariant.previewItems[0]()
  );
  const [openedModals, setOpenedModals] = useState([]);

  useEffect(() => {
    let pitem = option(props).product.featuredVariant.previewItems[0]();
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

  const handleImageClick = (previewItem: Product_Preview_Items) => {
    setFeaturedPreviewItem(previewItem)
  }

  const {
    classes,
    product,
    // featuredPreview carousel
    index,
    setIndex,
    numberOfItemsTall = 5,
    numberOfItemsWide = 3,
  } = props;

  const previewItems = option(product)
    .featuredVariant
    .previewItems([])
    .filter(p =>
      option(p).image.original.id() !== undefined ||
      option(p).youTubeEmbedLink() !== undefined
    );

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  // const wishlistConnectionResponse = usePaginateQueryHook(QueryWishlistHookArgs);
  const featuredVariant = option(props).selectedOption.value();

  return (
    <div className={classes.root}>
      {/* {
        (option(featuredPreviewItem).image.original.id()
        || option(featuredPreviewItem).youTubeEmbedLink()) &&
        <div>
          <WishlistIcon
            Product_Variants={option(product).id()}
            variantId={option(product).featuredVariant.variantId()}
            // refetch={wishlistConnectionResponse.refetch}
            style={{
              top: '0.5rem',
              right: '0.75rem',
            }}
          />
        </div>
      } */}

      {
        props.loading
        ? <FeaturedImagePlaceholder previewItem={undefined} />
        : <FeaturedImageModal
            previewItem={featuredPreviewItem}
            openedModals={openedModals || []}
            openModal={openModal}
            closeModal={closeModal}
            product={product}
            index={index}
            setIndex={setIndex}
          />
      }

      <div className={classes.carouselContainer}>
        <AirCarousel
          id={`air-cara-${option(product).id()}`}
          // product.id to re-render carousel position when product changes
          disableButtons={true}
        >
        {
          props.loading
          ? [0,1,2,3,4,5,6,7].map(i => {
              return (
                <AirItemWide key={i}
                  showNumItems={numberOfItemsWide}
                  title={""}
                  disableDither={true}
                  borderGutter={"0.25rem"}
                >
                  <ThumbnailImage
                    previewItem={undefined}
                    onClick={() => {}}
                  />
                </AirItemWide>
              )
            })
          : previewItems.map((previewItem, i) => {
              return (
                <AirItemWide key={i}
                  showNumItems={numberOfItemsWide}
                  title={option(previewItem).image.description()}
                  disableDither={true}
                  borderGutter={"0.25rem"}
                >
                  <div style={{
                    // make non-selected previews dimmed
                    opacity: (index === i) ? 1 : 0.5,
                    height: '100%',
                    width: '100%',
                  }}>
                    {
                      option(previewItem).image.original.url()
                      ? <ThumbnailImage
                          previewItem={previewItem}
                          onClick={() => {
                            handleImageClick(previewItem)
                            setIndex(i)
                          }}
                        />
                      : <ThumbnailVideo
                          videoUrl={option(previewItem).youTubeEmbedLink()}
                          onClick={() => {
                            handleImageClick(previewItem)
                            setIndex(i)
                          }}
                        />
                    }
                  </div>
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
  selectedOption: SelectedVariantProps;
  loading?: boolean;
  numberOfItemsTall?: number;
  numberOfItemsWide?: number;
  index: number;
  setIndex(a?: any): void;
}

const styles = (theme: Theme) => createStyles({
  root: {
    position: 'relative',
    height: '100%',
  },
  carouselContainer: {
    left: 0,
    width: '100%',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },
});


const ImageGalleryDesktopMemo = React.memo(
  (props: ReactProps) => <ImageGalleryDesktop {...props}/>,
);

export default withStyles(styles)( ImageGalleryDesktopMemo );


