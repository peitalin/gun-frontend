import { Breakpoints, ScreenSizes } from "layout/AppTheme";


// Example sizes in <image/> tags
// sizes={`
//   (max-width: 416px) 200px,
//   (max-width: 480px) 400px,
//   (max-width: 720px) 600px,
//   (max-width: 900px) 1200px,
//   (min-width: 901px) 1200px,
// `}
// https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

export const imgSizesForScreenSizes = {
  xs: {
    onePerRow: 200,
    twoPerRow: 200,
    threePerRow: 100,
    fourPerRow: 100,
    fivePerRow: 100,
  },
  sm: {
    onePerRow: 200,
    twoPerRow: 200,
    threePerRow: 100,
    fourPerRow: 100,
    fivePerRow: 100,
  },
  md: {
    onePerRow: 400,
    twoPerRow: 400,
    threePerRow: 200,
    fourPerRow: 200,
    fivePerRow: 200,
  },
  lg: {
    onePerRow: 600,
    twoPerRow: 400,
    threePerRow: 200,
    fourPerRow: 200,
    fivePerRow: 200,
  },
  xl: {
    onePerRow: 600,
    twoPerRow: 400,
    threePerRow: 200,
    fourPerRow: 200,
    fivePerRow: 200,
  },
};


export const getImgSrcSetSizes = (
  cardsPerRow: number,
  screenSize: ScreenSizes,
): Breakpoints => {

  let defaultImageSizes = {
    xs: imgSizesForScreenSizes["md"].fourPerRow,
    sm: imgSizesForScreenSizes["md"].fourPerRow,
    md: imgSizesForScreenSizes["md"].fourPerRow,
    lg: imgSizesForScreenSizes["md"].fourPerRow,
    xl: imgSizesForScreenSizes["md"].fourPerRow,
  }

  if (!screenSize) {
    return defaultImageSizes
  }

  switch (cardsPerRow) {
    case 5: {
      return {
        xs: imgSizesForScreenSizes[screenSize].fivePerRow,
        sm: imgSizesForScreenSizes[screenSize].fivePerRow,
        md: imgSizesForScreenSizes[screenSize].fivePerRow,
        lg: imgSizesForScreenSizes[screenSize].fivePerRow,
        xl: imgSizesForScreenSizes[screenSize].fivePerRow,
      }
    }
    case 4: {
      return {
        xs: imgSizesForScreenSizes[screenSize].fourPerRow,
        sm: imgSizesForScreenSizes[screenSize].fourPerRow,
        md: imgSizesForScreenSizes[screenSize].fourPerRow,
        lg: imgSizesForScreenSizes[screenSize].fourPerRow,
        xl: imgSizesForScreenSizes[screenSize].fourPerRow,
      }
    }
    case 3: {
      return {
        xs: imgSizesForScreenSizes[screenSize].threePerRow,
        sm: imgSizesForScreenSizes[screenSize].threePerRow,
        md: imgSizesForScreenSizes[screenSize].threePerRow,
        lg: imgSizesForScreenSizes[screenSize].threePerRow,
        xl: imgSizesForScreenSizes[screenSize].threePerRow,
      }
    }
    case 2: {
      return {
        xs: imgSizesForScreenSizes[screenSize].twoPerRow,
        sm: imgSizesForScreenSizes[screenSize].twoPerRow,
        md: imgSizesForScreenSizes[screenSize].twoPerRow,
        lg: imgSizesForScreenSizes[screenSize].twoPerRow,
        xl: imgSizesForScreenSizes[screenSize].twoPerRow,
      }
    }
    case 1: {
      return {
        xs: imgSizesForScreenSizes[screenSize].onePerRow,
        sm: imgSizesForScreenSizes[screenSize].onePerRow,
        md: imgSizesForScreenSizes[screenSize].onePerRow,
        lg: imgSizesForScreenSizes[screenSize].onePerRow,
        xl: imgSizesForScreenSizes[screenSize].onePerRow,
      }
    }
    default: {
      return defaultImageSizes
    }
  }
}