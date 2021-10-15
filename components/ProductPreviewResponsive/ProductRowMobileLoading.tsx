import React from "react";
import ProductRowMobile from "./ProductRowMobile";
import DescriptionLoading from "components/NewsItemCardResponsive/DescriptionLoading";


const ProductRowMobileLoading = (props: ReactProps) => {

  const cardWidthStyle = {
    width: `calc(${100}vw - ${1+1}rem)`,
    maxWidth: 415
    // getCardMaxWidth(cardsPerRow)
  };

  return (
    <DescriptionLoading
      isMobile
      style={cardWidthStyle}
      height={'100%'}
    />
  )
}

interface ReactProps {
}


export default ProductRowMobileLoading
