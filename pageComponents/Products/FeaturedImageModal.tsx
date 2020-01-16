import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
// Typings
import { ProductPreviewItem } from "typings/gqlTypes";
// Image Modal
import Modal from '@material-ui/core/Modal';
// Material UI
import PreviewImageFeatured from "./PreviewImageFeatured";
import PreviewImage from "./PreviewImage";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { lgUpMediaQuery } from "./common";




const FeaturedImageModal = (props: ReactProps) => {

  // const [imgModalLoaded, setImgModalLoaded] = React.useState(0);
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
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


  return (
    <div className={clsx(
      classes.featuredImageContainer,
      xsDown ? classes.featuredImageContainerXSDown : null
    )}>
      {
        (isMobile || !lgUp)
        ? <PreviewImage
            previewItem={previewItem}
            onClick={() => openModal(imageId)}
            tabletSize={true} // constrain 16:10 dimension
          />
        : <PreviewImageFeatured
            previewItem={previewItem}
            onClick={() => openModal(imageId)}
          />
      }
      <Modal
        open={option(openedModals)([]).includes(imageId)}
        onClose={() => closeModal(imageId)}
      >
        <div className={classes.modalContainer}>
          <div className={clsx(
            classes.paper,
            classes.paperLoaded,
            // imgModalLoaded ? classes.paperLoaded : null,
          )}>
            <img // click this image to close modal
              className={clsx(
                classes.imageInModal,
              )}
              src={imageUrl}
              // onLoad={() => setImgModalLoaded(s => s + 1)}
              onClick={() => closeModal(imageId)}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  previewItem?: ProductPreviewItem;
  openedModals?: string[];
  openModal?(id: string): void;
  closeModal?(id: string): void;
  onClick?(a: any): void;
  isMobile?: boolean;
}

const styles = (theme: Theme) => createStyles({
  featuredImageContainer: {
    overflow: 'hidden',
    width: '100%',
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    marginBottom: "0.5rem",
    borderRadius: "2px 2px 2px 2px",
  },
  featuredImageContainerXSDown: {
    position: 'absolute',
    height: '100%',
    // top: 0,
  },
  imageInModal: {
    maxHeight: "90vh",
    maxWidth: "90vw",
  },
  modalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none',
    borderRadius: '3px',
  },
  paperLoaded: {
    padding: theme.spacing(4),
  },
});


export default withStyles(styles)( FeaturedImageModal );

