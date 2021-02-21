import React from "react";
import { oc as option } from "ts-optchain";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import {
  Product,
  ProductPreviewItem,
} from "typings/gqlTypes";
// carousel
import ThumbnailImage from "./ThumbnailImage";
import ThumbnailVideo from "./ThumbnailVideo";
import AirCarousel from "components/AirCarousel";
import AirItemWide from "components/AirCarousel/AirItemWide";
// Analytics
import { useAnalytics, analyticsEvent } from "utils/analytics";



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

  const handleImageClick = (previewItem: ProductPreviewItem) => {
    props.setFeaturedPreviewItem(previewItem)
  }

  const previewItems = option(product)
    .featuredVariant
    .previewItems([])
    .filter(p =>
      option(p).image.original.id() !== undefined ||
      option(p).youTubeEmbedLink() !== undefined
    );

  return (
    <div className={classes.carouselContainerPP}>
      <AirCarousel
        id={`air-cara-${option(product).id()}`}
        // product.id to re-render carousel position when product changes
        disableButtons={previewItems.length <= 9}
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
                        carouselSize={true}
                        onClick={() => {
                          handleImageClick(previewItem)
                          setIndex(i)
                          analyticsEvent("Product.Preview.Pressed", {
                            previewIndex: i
                          })
                        }}
                      />
                    : <ThumbnailVideo
                        videoUrl={option(previewItem).youTubeEmbedLink()}
                        onClick={() => {
                          handleImageClick(previewItem)
                          setIndex(i)
                          analyticsEvent("Product.Preview.Pressed", {
                            previewIndex: i
                          })
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
  },
});

export default withStyles(styles)( BottomImageCarouselDesktop );


