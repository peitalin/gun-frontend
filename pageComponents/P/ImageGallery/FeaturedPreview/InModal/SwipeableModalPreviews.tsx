import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
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
import ThumbnailImage from "../ThumbnailImage";
import ImageInModal from "./ImageInModal";
import VideoInModal from "./VideoInModal";
import FeaturedVideo from "../FeaturedVideo";

import SwipeableViews from 'react-swipeable-views';
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

  const imageId = option(previewItem).image.original.id()


  const previewItems = option(props).product.featuredVariant.previewItems([])
    .filter(p =>
      option(p).image.original.id() !== undefined ||
      option(p).youTubeEmbedLink() !== undefined
    )
  const numPreviews = previewItems.length

  return (
    <>
      <BindKeyboardSwipeableViews
        enableMouseEvents={true}
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
              return (
                <ImageInModal
                  key={i}
                  previewItem={previewItem}
                  onClick={() => closeModal(imageId)}
                  showLoadingBar={false}
                />
              )
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

