import React from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import {
  Product,
  Product_Preview_Items,
} from "typings/gqlTypes";
// carousel
import ThumbnailImage from "./ThumbnailImage";
import ThumbnailVideo from "./ThumbnailVideo";
import AirCarousel from "components/AirCarousel";
import AirItemWide from "components/AirCarousel/AirItemWide";



const BottomImageCarouselDesktop: React.FC<ReactProps> = (props) => {

  const {
    classes,
    product,
    // featuredPreview carousel
    index,
    setIndex,
    numberOfItemsTall = 8,
    numberOfItemsWide = 6,
  } = props;

  const handleImageClick = (previewItem: Product_Preview_Items) => {
    props.setFeaturedPreviewItem(previewItem)
  }

  const previewItems = (product?.featuredVariant?.previewItems ?? [])
    .filter(p =>
      p?.image?.original?.id !== undefined ||
      p?.youTubeEmbedLink !== undefined
    );

  return (
    <div className={classes.carouselContainerPP}>
      <AirCarousel
        id={`air-cara-${product?.id}`}
        // product.id to re-render carousel position when product changes
        disableButtons={previewItems.length <= 9}
      >
      {
        (props.loading)
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
                title={previewItem?.image?.description}
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
                    previewItem?.image?.original?.url
                    ? <ThumbnailImage
                        previewItem={previewItem}
                        carouselSize={true}
                        onClick={() => {
                          handleImageClick(previewItem)
                          setIndex(i)
                        }}
                      />
                    : <ThumbnailVideo
                        videoUrl={previewItem?.youTubeEmbedLink}
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
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  loading?: boolean;
  numberOfItemsTall?: number;
  numberOfItemsWide?: number;
  index: number;
  setIndex(a?: any): void;
  setFeaturedPreviewItem(a?: any): void;
}

const styles = (theme: Theme) => createStyles({
  root: {
    position: 'relative',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    // height: '100%',
  },
  carouselContainerPP: {
    left: 0,
    width: '100%',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    marginLeft: '-0.25rem',
  },
});

export default withStyles(styles)( BottomImageCarouselDesktop );


