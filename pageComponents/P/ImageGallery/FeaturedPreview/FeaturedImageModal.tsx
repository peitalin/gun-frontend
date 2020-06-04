import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { styles } from "./styles";
import { Colors } from "layout/AppTheme";
// Typings
import { ProductPreviewItem, Product } from "typings/gqlTypes";
// Image Modal
import Dialog from "@material-ui/core/Dialog";
//// Components
import AspectRatioConstraint from "components/AspectRatioConstraint";
// Featured Preview
import PreviewImageFeatured from "./PreviewImageFeatured";
import FeaturedVideo from "./FeaturedVideo";
// carousel thumbnails
import ThumbnailImage from "./ThumbnailImage";
// modal components
import ImageInModal from "./InModal/ImageInModal";
import VideoInModal from "./InModal/VideoInModal";
import SwipeableModalPreviews from "./InModal/SwipeableModalPreviews";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { lgUpMediaQuery } from "../../common";

import SwipeableViews from 'react-swipeable-views';
import { bindKeyboard } from 'react-swipeable-views-utils';
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);




const FeaturedImageModal = (props: ReactProps) => {

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"))
  const lgUp = useMediaQuery(lgUpMediaQuery);

  const {
    classes,
    previewItem,
    openedModals,
    openModal,
    closeModal,
    isMobile = false,
  } = props;

  const imageId = option(previewItem).image.original.id()
  const imageUrl = option(previewItem).image.original.url()


  const previewItems = option(props).product.featuredVariant.previewItems([])
    .filter(p =>
      option(p).image.original.id() !== undefined ||
      option(p).youTubeEmbedLink() !== undefined
    )
  const numPreviews = previewItems.length

  return (
    <AspectRatioConstraint>
      <div className={clsx(
        classes.featuredImageRoot,
        xsDown ? classes.featuredImageRootXSDown : null
      )}>
        {
          isMobile
          ? <ThumbnailImage
              previewItem={previewItem}
              onClick={() => openModal(imageId)}
              showLoadingBar={false}
            />
          : <BindKeyboardSwipeableViews
              enableMouseEvents={false}
              index={props.index}
              onChangeIndex={(indexNew, indexLatest) => {
                if (!isMobile && props.setIndex) {
                  props.setIndex(indexNew)
                }
              }}
              containerStyle={{ height: '100%' }}
              style={{ height: '100%' }}
            >
              {
                previewItems.map(( previewItem, i ) => {
                  if (!!previewItem.youTubeEmbedLink) {
                    return (
                      <FeaturedVideo key={i} previewItem={previewItem} />
                    )
                  } else {
                    return (
                      <PreviewImageFeatured
                        key={i}
                        previewItem={previewItem}
                        onClick={() => {
                          openModal(imageId)
                        }}
                        showLoadingBar={false}
                      />
                    )
                  }
                })
              }
            </BindKeyboardSwipeableViews>
        }


        <Dialog
          open={option(openedModals)([]).includes(imageId)}
          onClose={() => closeModal(imageId)}
          // full height
          fullScreen={false}
          fullWidth={false}
          maxWidth={"xl"}
          BackdropProps={{
            classes: { root: classes.modalBackdrop }
          }}
          PaperProps={{
            classes: {
              root: mdUp
                ? classes.modalPaperScrollPaper
                : classes.modalPaperScrollPaperSm
            }
          }}
          scroll="body"
        >
          <div className={classes.modalContainer}>
            <div className={clsx(classes.paper, classes.paperLoaded)}>
            {
              isMobile
              ? <div className={classes.imageInModalContainer}>
                  <img // click this image to close modal
                    className={classes.imageInModal}
                    src={imageUrl}
                    onClick={() => closeModal(imageId)}
                  />
                </div>
              : <SwipeableModalPreviews
                  previewItem={previewItem}
                  closeModal={closeModal}
                  isMobile={false}
                  product={props.product}
                  index={props.index}
                  setIndex={props.setIndex}
                />
            }
            </div>
          </div>
        </Dialog>

      </div>
    </AspectRatioConstraint>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  previewItem?: ProductPreviewItem;
  openedModals?: string[];
  openModal?(id: string): void;
  closeModal?(id: string): void;
  onClick?(a: any): void;
  isMobile?: boolean;
  product?: Product;
  index?: number;
  setIndex?(a?: any): void;
}

export default withStyles(styles)( FeaturedImageModal );

