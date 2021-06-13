import React from "react";
import clsx from "clsx";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Material UI
import CardMedia from "@material-ui/core/CardMedia";
// Typings
import { Product } from "typings/gqlTypes";
import { genSrcSet, genImgBreakpoints } from "utils/images";
import { getYouTubeVimeoImagePreview } from "utils/links";
// Responsiveness
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// Carousel
import PreviewImageEmpty from "./PreviewImageEmpty";
import AspectGridItemLink from "../AspectGridItemLink";
import {
  styles,
} from "../styles";
// img responsive sizing
import {
  imgSizesForScreenSizes,
  getImgSrcSetSizes
} from "../imageResponsiveSizes";
import Image from "next/image";




const MainPreviewImage = (props: ReactProps) => {

  const {
    classes,
    product,
    fit = false,
    cardsPerRow = 1,
  } = props;

  const previewItems = product?.featuredVariant?.previewItems ?? []
  const title = product?.currentSnapshot?.title

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  // const imgSizesSrcSet = React.useMemo(
  //   () => getImgSrcSetSizes(cardsPerRow, props.screenSize),
  //   [ cardsPerRow, props.screenSize]
  // )

  let firstPreview = previewItems?.[0]

  let youTubeVimeoPreview = React.useMemo(
    () => getYouTubeVimeoImagePreview(firstPreview?.youTubeEmbedLink),
    [firstPreview]
  );


  if (!firstPreview) {
    return (
      <AspectGridItemLink product={product}>
        <PreviewImageEmpty
          previewImageEmptyMessage={props.previewImageEmptyMessage}
          onClick={props.onClick}
        />
      </AspectGridItemLink>
    )
  } else {
    return(
      <AspectGridItemLink product={product}>
        {
          firstPreview?.image?.original?.url
          ? <Image
              className={clsx(
                fit ? classes.cardMediaFit : classes.cardMedia,
              )}
              alt={title}
              layout={"fill"}
              objectFit={"cover"}
              onClick={props.onClick}
              src={firstPreview?.image?.original?.url}
              // srcSet={genSrcSet(firstPreview?.image)}
              // sizes={genImgBreakpoints(imgSizesSrcSet)}
            />
          // ? <CardMedia
          //     title={title}
          //     component="img"
          //     className={clsx(
          //       fit ? classes.cardMediaFit : classes.cardMedia,
          //       // (previewLoaded > 0) ? "fadeIn" : 'hidden',
          //     )}
          //     onClick={props.onClick}
          //     src={firstPreview?.image?.original?.url}
          //     srcSet={genSrcSet(firstPreview?.image)}
          //     sizes={genImgBreakpoints(imgSizesSrcSet)}
          //   />
          : youTubeVimeoPreview
            ? <Image
                className={clsx(
                  fit ? classes.cardMediaFit : classes.cardMedia,
                )}
                alt={title}
                width={500}
                height={500}
                onClick={props.onClick}
                src={youTubeVimeoPreview}
                // srcSet={genSrcSet(firstPreview?.image)}
                title={
                  youTubeVimeoPreview ? title : "Video thumbnail unavailable"
                }
              />
            // ? <CardMedia
            //     component="img"
            //     className={clsx(
            //       fit ? classes.cardMediaFit : classes.cardMedia,
            //     )}
            //     onClick={props.onClick}
            //     src={youTubeVimeoPreview}
            //     title={
            //       youTubeVimeoPreview ? title : "Video thumbnail unavailable"
            //     }
            //   />
            : <PreviewImageEmpty/>
        }
      </AspectGridItemLink>
    )
  }
}




interface ReactProps extends WithStyles<typeof styles> {
  product: Product;
  screenSize: "xs" | "sm" | "md" | "lg" | "xl";
  fit?: boolean; // object-fit the image
  cardsPerRow: number;
  previewImageEmptyMessage?: React.ReactNode;
  onClick?(a: any): void;
}


export default withStyles(styles)( MainPreviewImage );
