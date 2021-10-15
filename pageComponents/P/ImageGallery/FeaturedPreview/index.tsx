import React from "react";
import clsx from "clsx";
// Typings
import { Product_Preview_Items, Product } from "typings/gqlTypes";
// Components
import FeaturedImagePlaceholder from "./FeaturedImagePlaceholder";
import FeaturedImageModal from "./FeaturedImageModal";
//// Components
import AspectRatioConstraint from "components/AspectRatioConstraint";



const FeaturedPreview: React.FC<ReactProps> = (props) => {

  const {
    constrainAspectRatio = true,
  } = props

  const [openedModals, setOpenedModals] = React.useState([]);

  const openModal = (id) => {
    setOpenedModals(openedModals => [...openedModals, id])
  }

  const closeModal = (id) => {
    setOpenedModals(openedModals => openedModals.filter(x => x !== id))
  }

  React.useEffect(() => {
    if (props.index >= (props.previewItems?.length)) {
      // reset index, when we remove a previewItem
      props.setIndex(0)
    }
  }, [props.previewItems])


  if (props.loading || !props.featuredPreviewItem?.id) {
    return <FeaturedImagePlaceholder
              previewsMissing={!props.featuredPreviewItem?.id}
              previewsMissingMessage={props.previewsMissingMessage}
           />
  } else {
    if (constrainAspectRatio) {
      return (
        <AspectRatioConstraint>
          <FeaturedImageModal
            featuredPreviewItem={props.featuredPreviewItem}
            previewItems={props.previewItems}
            openedModals={openedModals || []}
            openModal={openModal}
            closeModal={closeModal}
            index={props.index}
            setIndex={props.setIndex}
            isPromoted={props.isPromoted}
            disableModalPopup={props.disableModalPopup}
            previewImageClassName={props.previewImageClassName}
            style={props.style}
            swipeableStyle={props.swipeableStyle}
            animateTransitions={props.animateTransitions}
            previewsMissingMessage={props.previewsMissingMessage}
          />
        </AspectRatioConstraint>
      )
    } else {
      return (
        <FeaturedImageModal
          featuredPreviewItem={props.featuredPreviewItem}
          previewItems={props.previewItems}
          openedModals={openedModals || []}
          openModal={openModal}
          closeModal={closeModal}
          index={props.index}
          setIndex={props.setIndex}
          isPromoted={props.isPromoted}
          disableModalPopup={props.disableModalPopup}
          previewImageClassName={props.previewImageClassName}
          style={props.style}
          swipeableStyle={props.swipeableStyle}
          animateTransitions={props.animateTransitions}
          previewsMissingMessage={props.previewsMissingMessage}
        />
      )
    }
  }
}

interface ReactProps {
  loading: boolean;
  featuredPreviewItem: Product_Preview_Items;
  previewItems: Product_Preview_Items[];
  index: number;
  setIndex(a: any): void;
  isPromoted: boolean;
  setPreviewLoaded?(b: boolean) : void;
  disableModalPopup?: boolean;
  style?: any;
  swipeableStyle?: any;
  constrainAspectRatio?: boolean;
  previewImageClassName?: any;
  animateTransitions?: boolean;
  previewsMissingMessage?: React.ReactNode
}



export default FeaturedPreview

