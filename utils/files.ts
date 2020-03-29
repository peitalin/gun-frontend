// import { ID, Image } from "typings/gqlTypes";
type ID = any;
type Image = any;


// https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
export const genSrcSet = (image: Image) => {
  return image.variants.map(v => {
    return `${v.url} ${v.widthInPixels}w`
  }).join(",")
}
