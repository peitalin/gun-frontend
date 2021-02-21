import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { styles } from "./styles";
import { Colors } from "layout/AppTheme";
// Typings
import { Product_Preview_Items, Product } from "typings/gqlTypes";
// Image Modal
import Dialog from "@material-ui/core/Dialog";
//// Components
import AspectRatioConstraint from "components/AspectRatioConstraint";
// Featured Preview
import PreviewImageFeatured from "./PreviewImageFeatured";
import FeaturedVideo from "./FeaturedVideo";
// modal components
import ImageInModal from "./InModal/ImageInModal";
import VideoInModal from "./InModal/VideoInModal";
import FeaturedImagePlaceholder from "./FeaturedImagePlaceholder";
import SwipeableModalPreviews from "./InModal/SwipeableModalPreviews";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { lgUpMediaQuery } from "../../common";

// import SwipeableViews from 'react-swipeable-views';
import SwipeableViews from "components/Swiper/SwipeableViews";
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
          ? <PreviewImageFeatured
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
              slideStyle={{
                background: Colors.black,
              }}
              containerStyle={{
                height: '100%',
                width: '100%',
                // background: Colors.black,
              }}
              style={{
                height: '100%',
                width: '100%',
                // backgroundColor: Colors.black,
              }}
            >
              {
                previewItems.map(( previewItem, i ) => {
                  if (!!previewItem.youTubeEmbedLink) {
                    return (
                      <FeaturedVideo key={i} previewItem={previewItem} />
                    )
                  } else {
                    // only load image for current index on carousel
                    if (props.index === i) {
                      return (
                        <PreviewImageFeatured
                          className={"fadeIn"}
                          key={i}
                          previewItem={previewItem}
                          onClick={() => {
                            openModal(imageId)
                          }}
                          showLoadingBar={false}
                        />
                      )
                    } else {
                      // otherwise render an empty placeholder
                      // transitioning: shows a black background for fadeIn
                      return (
                        <FeaturedImagePlaceholder key={i} transitioning={true}/>
                      )
                    }
                  }
                })
              }
            </BindKeyboardSwipeableViews>
        }


        {
          !isMobile &&
          <Dialog
            open={option(openedModals)([]).includes(imageId)}
            onClose={(event: object, reason: string) => {
              if (
                reason === "backdropClick" ||
                reason === "escapeKeyDown"
              ) {
                closeModal(imageId)
              }
            }}
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
                <SwipeableModalPreviews
                  previewItem={previewItem}
                  closeModal={closeModal}
                  isMobile={false}
                  product={props.product}
                  index={props.index}
                  setIndex={props.setIndex}
                />
              </div>
            </div>
          </Dialog>
        }

      </div>
    </AspectRatioConstraint>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  previewItem?: Product_Preview_Items;
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

