import {
  Image_Parents,
  ID,
  Products,
  Product_Preview_Items,
  Product_Variants,
} from "typings/gqlTypes";
import { Breakpoints } from "layout/AppTheme";

export const concatChunksToUInt8Array = (chunks, receivedLength): Uint8Array => {
  // See: https://javascript.info/fetch-progress
  let chunksAll = new Uint8Array(receivedLength); // (4.1)
  let position = 0;
  // interate and set each chunk in the correct position
  for (let chunk of chunks) {
    chunksAll.set(chunk, position);
    position += chunk.length;
  }
  return chunksAll
}


// https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
export const genSrcSet = (image: Image_Parents) => {
  if (!image?.variants) {
    return null
  }
  return image?.variants?.map(v => {
    return `${v.url} ${v.widthInPixels}w`
  }).join(",")
}

export const genImgBreakpoints = ({ xs, sm, md, lg, xl }: Breakpoints) => {
  return `
  (max-width: 416px) ${xs}px,
  (max-width: 480px) ${sm}px,
  (max-width: 720px) ${md}px,
  (max-width: 900px) ${lg}px,
  (min-width: 901px) ${xl}px,
  `
}


export const getFeaturedPreviewFromProduct = (
  product: Products & { featuredVariant?: Product_Variants}
): Product_Preview_Items => {
  return product?.featuredVariant?.[0].previewItems?.[0]
}