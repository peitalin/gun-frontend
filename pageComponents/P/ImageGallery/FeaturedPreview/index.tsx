import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme, fade } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
// Typings
import { Product_Preview_Items, Product } from "typings/gqlTypes";
// Components
import FeaturedImagePlaceholder from "./FeaturedImagePlaceholder";
import FeaturedImageModal from "./FeaturedImageModal";



const FeaturedPreview: React.FC<ReactProps> = (props) => {

  const {
    classes,
  } = props;

  const [openedModals, setOpenedModals] = React.useState([]);

  const openModal = (id) => {
    setOpenedModals(openedModals => [...openedModals, id])
  }

  const closeModal = (id) => {
    setOpenedModals(openedModals => openedModals.filter(x => x !== id))
  }

  if (props.loading) {
    return <FeaturedImagePlaceholder/>
  } else {
    return (
      <FeaturedImageModal
        previewItem={props.featuredPreviewItem}
        openedModals={openedModals || []}
        openModal={openModal}
        closeModal={closeModal}
        product={props.product}
        index={props.index}
        setIndex={props.setIndex}
        isPromoted={props.isPromoted}
        disableModalPopup={props.disableModalPopup}
      />
    )
  }
}

interface ReactProps extends WithStyles<typeof styles> {
  loading: boolean;
  featuredPreviewItem: Product_Preview_Items;
  product: Product;
  index: number;
  setIndex(a?: any): void;
  isPromoted: boolean;
  disableModalPopup?: boolean;
}


const styles = (theme: Theme) => createStyles({
  card: {
    borderRadius: BorderRadius,
    width: "100%",
    height: '100%',
    backgroundColor: Colors.lightestGrey,
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
  },
  cardActionAreaWide: {
    height: '100%',
    display: "flex",
    flexDirection: "row",
  },
  cardActionAreaTall: {
    height: '100%',
    display: "flex",
    flexDirection: "row",
    // backgroundColor: backgroundColor,
  },
  cardMediaTall: {
    // width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cardMediaWide: {
    width: "100%",
    height: "100%",
    // objectFit: "scale-down",
    objectFit: "cover",
  },
  cardMediaWide80: {
    width: "80px",
    height: '50px',
    objectFit: "cover",
  },
  cardImg: {
  },
});


export default withStyles(styles)( FeaturedPreview );

