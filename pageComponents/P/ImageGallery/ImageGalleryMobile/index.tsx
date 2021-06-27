import React from "react";
import { useState, useEffect } from "react";
import clsx from "clsx";
// Styles
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import {
  Product,
} from "typings/gqlTypes";
// Components
import FeaturedImageModal from "../FeaturedPreview/FeaturedImageModal";
import FeaturedImagePlaceholder from "../FeaturedPreview/FeaturedImagePlaceholder";
import FeaturedVideoMobile from "../FeaturedPreview/FeaturedVideoMobile";
import FeaturedPreviewButtonsMobile from "./FeaturedPreviewButtonsMobile";
// Carousel
import AirCarousel from "components/AirCarousel";
import AirItemWide from "components/AirCarousel/AirItemWide";
import {
  SelectedVariantProps
} from "pageComponents/P/ProductId";

import SwipeableViews from "components/Swiper/SwipeableViews";
import { bindKeyboard } from 'react-swipeable-views-utils';
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

import PositionIndicator from "components/AirCarousel/PositionIndicator";
import AirButtonLeft from "components/AirCarousel/AirButtonLeft";
import AirButtonRight from "components/AirCarousel/AirButtonRight";



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

  const previewItems = (product?.featuredVariant?.previewItems ?? [])
    .filter(p => p?.image?.original?.id !== undefined)

  return (
    <div className={classes.root}>

      <FeaturedPreviewButtonsMobile
        product={product}
        showButtons={previewItems.length > 0}
        // selectedOption={props.selectedOption}
      />

      <div className={classes.carouselRelative}>
        <div className={classes.widenCarousel}>
          {
            (previewItems.length > 0) &&
            <PositionIndicator
              numberOfItems={previewItems.length}
              selectedDot={props.index}
            />
          }

          <AirButtonLeft
            className={"fadeInFast"}
            onClick={() => {
              // if index === 0, jump to last previewItem
              // otherwise move back 1 spot (s-1)
              props.setIndex(s =>
                (s === 0) ? (previewItems.length - 1) : s - 1
              )
            }}
            showButton={true}
            style={{
              left: '-6px',
            }}
          />
          <AirButtonRight
            className={"fadeInFast"}
            onClick={() => {
              // if index is at the end of previewItems, jump to start
              // otherwise move forward 1 spot (s+1)
              props.setIndex(s =>
                (s === previewItems.length - 1) ? 0 : s + 1
              )
            }}
            showButton={true}
            style={{
              right: '-5px',
            }}
          />

          <BindKeyboardSwipeableViews
            // enableMouseEvents={!previewItems?.[index]?.imageAfterId}
            index={props.index}
            onChangeIndex={(indexNew, indexLatest) => {
              if (typeof props.setIndex === 'function') {
                props.setIndex(indexNew)
              }
            }}
            containerStyle={{ height: '100%' }}
            style={{ height: '100%' }}
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
                  <div style={{ height: '100%' }}> </div>
                </AirItemWide>
              : previewItems.map((pitem, i) => {
                  // only load 1 image at a time
                  if (i === index) {
                    return (
                      <AirItemWide key={i}
                        classes={{ airItemList: "fadeIn" }}
                        showNumItems={1}
                        title={pitem?.image?.description}
                        disableDither={true}
                        removePaddingBottom={true}
                        removeMarginBottom={true}
                        borderGutter={"0.25rem"}
                      >
                        {
                          props.loading
                          ? <FeaturedImagePlaceholder/>
                          : pitem?.image?.original?.id
                            ? <FeaturedImageModal
                                previewItem={pitem}
                                openedModals={openedModals || []}
                                openModal={openModal}
                                closeModal={closeModal}
                                product={product}
                                index={index}
                                setIndex={setIndex}
                                disableModalPopup={true}
                              />
                            : pitem?.youTubeEmbedLink
                              ? <FeaturedVideoMobile previewItem={pitem} />
                              : <FeaturedImagePlaceholder/>
                        }
                      </AirItemWide>
                    )
                  } else {
                    return <div key={i}></div>
                  }
                })
            }
          </BindKeyboardSwipeableViews>
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
  watchListOffset?: any;
  index: number;
  setIndex(a?: any): void;
  selectedOption?: SelectedVariantProps;
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
    background: Colors.black,
  },
  widenCarousel: {
    positon: "relative",
    // make image wider, and shift left to remove whitespace
    transform: 'translateX(-1.5%)',
    width: '104%',
  },
  airButtonContainer: {
    position: "relative",
  },
});


export default withStyles(styles)( ImageGalleryMobile );


