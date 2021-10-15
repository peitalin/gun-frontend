import React from "react";
import ProductRowMobile from "./NewsItemRowMobile";
import DescriptionLoading from "components/NewsItemCardResponsive/DescriptionLoading";


const NewsItemRowMobileLoading = (props: ReactProps) => {

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


export default NewsItemRowMobileLoading
