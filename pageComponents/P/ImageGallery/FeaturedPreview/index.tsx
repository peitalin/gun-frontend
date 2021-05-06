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
    // backgroundColor: backgroundColor,
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23${patternColor}' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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

