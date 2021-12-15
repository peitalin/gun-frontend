import React from "react";
import clsx from "clsx";
import { Theme } from "@mui/material/styles";
import { WithStyles } from '@mui/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import { styles } from "./styles";
import { Colors, isThemeDark } from "layout/AppTheme";
// Typings
import { Product_Preview_Items, Product } from "typings/gqlTypes";
// Image Modal
import Dialog from "@mui/material/Dialog";
// Featured Preview
import PreviewImageFeatured from "./PreviewImageFeatured";
// modal components
import FeaturedImagePlaceholder from "./FeaturedImagePlaceholder";
import SwipeableModalPreviews from "./InModal/SwipeableModalPreviews";
// media query
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";
import { GrandReduxState } from "reduxStore/grand-reducer";

import SwipeableViews from "components/Swiper/SwipeableViews";
import { bindKeyboard } from 'react-swipeable-views-utils';
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);




const FeaturedImageModal = (props: ReactProps) => {

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"))

  const {
    classes,
    featuredPreviewItem,
    openedModals,
    openModal,
    closeModal,
    disableModalPopup = false,
    animateTransitions = true,
  } = props;

  const imageId = featuredPreviewItem?.image?.original?.id

  const isDarkMode = isThemeDark(theme)

  const previewItems = (props.previewItems?.length > 0)
    ? props?.previewItems?.filter(p =>
        p?.image?.original?.id !== undefined ||
        p?.youTubeEmbedLink !== undefined
      )
    : [props.featuredPreviewItem]

  return (
    <div className={clsx(
        classes.featuredImageRoot,
        props.isPromoted && classes.featuredImageRootPromoted,
        xsDown ? classes.featuredImageRootXSDown : null
      )}
      style={props.style}
    >
      {
        disableModalPopup
        ? <PreviewImageFeatured
            className={props.previewImageClassName}
            previewItem={featuredPreviewItem}
            // onClick={() => openModal(imageId)}
            showLoadingBar={false}
            previewsMissingMessage={props.previewsMissingMessage}
          />
        : <BindKeyboardSwipeableViews
            enableMouseEvents={false}
            index={props.index}
            animateTransitions={animateTransitions}
            onChangeIndex={(indexNew, indexLatest) => {
              if (!disableModalPopup && props.setIndex) {
                props.setIndex(indexNew)
              }
            }}
            slideStyle={{
              background: isDarkMode
                ? Colors.uniswapDarkNavy
                : Colors.slateGreyDark,
              ...props.swipeableStyle,
            }}
            containerStyle={{ height: '100%', width: '100%' }}
            style={{ height: '100%', width: '100%' }}
          >
            {
              previewItems.map(( previewItem, i ) => {
                // only load image for current index on carousel
                if (props.index === i) {
                  return (
                    <PreviewImageFeatured
                      className={clsx(props.previewImageClassName, "fadeIn")}
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
                    <FeaturedImagePlaceholder
                      key={i}
                      transitioning={true}
                      previewsMissingMessage={props.previewsMissingMessage}
                    />
                  )
                }
              })
            }
          </BindKeyboardSwipeableViews>
      }


      {
        !disableModalPopup &&
        <Dialog
          open={openedModals?.includes(imageId)}
          onClose={(event: object, reason: string) => {
            if (
              reason === "backdropClick" ||
              reason === "escapeKeyDown"
            ) {
              closeModal(imageId)
              // reset index when clicking out of image gallery
              props.setIndex(0)
            }
          }}
          // full height
          fullScreen={false}
          fullWidth={false}
          scroll="body"
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
        >
          <div className={classes.modalContainer}>
            <div className={clsx(classes.paper, classes.paperLoaded)}>
              <SwipeableModalPreviews
                previewItems={previewItems}
                closeModal={() => {
                  props.setIndex(0)
                  closeModal(imageId)
                }}
                isMobile={false}
                index={props.index}
                setIndex={props.setIndex}
              />
            </div>
          </div>
        </Dialog>
      }

    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  featuredPreviewItem?: Product_Preview_Items
  previewItems: Product_Preview_Items[]
  openedModals?: string[];
  openModal?(id: string): void;
  closeModal?(id: string): void;
  onClick?(a: any): void;
  disableModalPopup?: boolean;
  index?: number;
  setIndex?(a?: any): void;
  isPromoted?: boolean;
  style?: any;
  swipeableStyle?: any;
  previewImageClassName?: any;
  animateTransitions?: boolean;
  previewsMissingMessage?: React.ReactNode
}

export default withStyles(styles)( FeaturedImageModal );

