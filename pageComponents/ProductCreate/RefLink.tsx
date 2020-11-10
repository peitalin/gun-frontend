import React from "react";


// for navigating to different sections of the page
const RefLink = ({ refId }) => {
  let refIdPrefixed = `product-create-nav-${refId}`
  return (
    <div id={refIdPrefixed} style={{
      position: 'absolute',
      top: '-6rem',
    }}/>
  )
}


export const refLinks = {
  title: "Title",
  model: "Model",
  description: "Description",
  images: "Images",
  price: "Price"
}

export const yPositions = {
  // minus 32px for leeway when scrolling
  title: 490, // 522
  model: 1130, // 1162
  description: 1542, // 1574
  images: 2103, // 2135
  price: 2445, // 2477
}

export const viewingWhichSection = (y: number) => {
  if (y < yPositions.model) {
    return refLinks.title
  }
  if (y > yPositions.model && y <= yPositions.description) {
    return refLinks.model
  }
  if (y > yPositions.description && y <= yPositions.images) {
    return refLinks.description
  }
  if (y > yPositions.images && y <= yPositions.price) {
    return refLinks.images
  } else {
    return refLinks.price
  }
}

export default RefLink;