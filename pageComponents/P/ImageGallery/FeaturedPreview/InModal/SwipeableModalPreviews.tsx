import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { styles } from "../styles";
import { Colors } from "layout/AppTheme";
// Typings
import { Product_Preview_Items, Product } from "typings/gqlTypes";
// Image Modal
import Dialog from "@material-ui/core/Dialog";
// Material UI
import AspectRatioConstraint from "components/AspectRatioConstraint";
import PreviewImageFeatured from "../PreviewImageFeatured";
import ImageInModal from "./ImageInModal";
import VideoInModal from "./VideoInModal";
import FeaturedVideo from "../FeaturedVideo";

// import SwipeableViews from 'react-swipeable-views';
import SwipeableViews from "components/Swiper/SwipeableViews";
import { bindKeyboard } from 'react-swipeable-views-utils';
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);
//
import AirButtonLeft from "components/AirCarousel/AirButtonLeft";
import AirButtonRight from "components/AirCarousel/AirButtonRight";
import Portal from "@material-ui/core/Portal";



const SwipeableModalPreviews = (props: ReactProps) => {

  const {
    classes,
    previewItem,
    closeModal,
    isMobile = false,
  } = props;

  const previewItems = (props?.product?.featuredVariant?.previewItems ?? [])
    .filter(p =>
      p?.image?.original?.id !== undefined ||
      p?.youTubeEmbedLink !== undefined
    )
  const numPreviews = previewItems.length

  return (
    <>
      <BindKeyboardSwipeableViews
        enableMouseEvents={false} //disable drag
        index={props.index}
        onChangeIndex={(indexNew, indexLatest) => {
          if (!isMobile && props.setIndex) {
              props.setIndex(indexNew)
          }
        }}
      >
        {
          previewItems.map(( previewItem, i ) => {
            if (!!previewItem.youTubeEmbedLink) {
              return (
                <div key={i} className={classes.videoInModalContainer}>
                  <VideoInModal key={i}
                    previewItem={previewItem}
                  />
                </div>
              )
            } else {
              // only load image for current index on carousel
              if (props.index === i) {
                return (
                  <ImageInModal
                    key={i}
                    previewItem={previewItem}
                    showLoadingBar={false}
                  />
                )
              } else {
                // otherwise render an empty placeholder
                return (
                  <ImageInModal
                    key={i}
                    previewItem={undefined}
                    showLoadingBar={false}
                  />
                )
              }
            }
          })
        }
      </BindKeyboardSwipeableViews>
      <ModalButtons
        index={props.index}
        setIndex={props.setIndex}
        numPreviews={numPreviews}
      />
    </>
  )
}

const ModalButtons = ({ index, setIndex, numPreviews }) => {
  return (
    <Portal>
      <AirButtonLeft
        onClick={() => {
          if (index > 0) {
            setIndex(s => s - 1)
          } else {
            setIndex(numPreviews - 1)
          }
        }}
        style={{
          left: '2rem',
          top: '49vh',
          position: 'fixed',
        }}
        showButton={true}
      />
      <AirButtonRight
        onClick={() => {
          if (index < (numPreviews - 1)) {
            setIndex(s => s + 1)
          } else {
            setIndex(0)
          }
        }}
        style={{
          right: '2rem',
          top: '49vh',
          position: 'fixed',
        }}
        showButton={true}
      />
    </Portal>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  previewItem?: Product_Preview_Items;
  closeModal?(id: string): void;
  isMobile?: boolean;
  product?: Product;
  index?: number;
  setIndex?(a?: any): void;
}

export default withStyles(styles)( SwipeableModalPreviews );

