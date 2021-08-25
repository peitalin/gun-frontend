import React from "react";
import clsx from "clsx";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Material UI
import CardMedia from "@material-ui/core/CardMedia";
// Typings
import { NewsItem } from "typings/gqlTypes";
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
    newsItem,
    fit = false,
    cardsPerRow = 1,
  } = props;

  const previewItems = newsItem?.product?.featuredVariant?.previewItems
    ?? newsItem?.externalProduct?.currentExternalProductSnapshot?.previewItems
    ?? []

  const title = newsItem?.product?.currentSnapshot?.title
    ?? newsItem?.externalProduct?.currentExternalProductSnapshot?.title

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  // const imgSizesSrcSet = React.useMemo(
  //   () => getImgSrcSetSizes(cardsPerRow, props.screenSize),
  //   [ cardsPerRow, props.screenSize]
  // )

  const [loaded, setLoaded] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if ((ref.current?.firstChild?.firstChild as HTMLImageElement | undefined)?.complete) {
      setLoaded(true)
    }
  }, [])


  let firstPreview = previewItems?.[0]

  let youTubeVimeoPreview = React.useMemo(
    () => getYouTubeVimeoImagePreview(firstPreview?.youTubeEmbedLink),
    [firstPreview]
  );


  if (!firstPreview) {
    return (
      <AspectGridItemLink
        newsItem={newsItem}
        promotedSlotId={props.promotedSlotId}
        disable={props.disableLink}
      >
        <PreviewImageEmpty
          previewImageEmptyMessage={props.previewImageEmptyMessage}
          onClick={props.onClick}
        />
      </AspectGridItemLink>
    )
  } else {
    return(
      <AspectGridItemLink
        newsItem={newsItem}
        promotedSlotId={props.promotedSlotId}
        disable={props.disableLink}
      >
        {/* {
          firstPreview?.image?.original?.url
          ? <div className={classes.height100} ref={ref}>
              <CardMedia
                title={title}
                component="img"
                className={clsx(
                  loaded ? "fadeIn" : "hide",
                  fit ? classes.cardMediaFit : classes.cardMedia,
                  // (previewLoaded > 0) ? "fadeIn" : 'hidden',
                )}
                onClick={props.onClick}
                onLoad={() => setLoaded(true)}
                src={firstPreview?.image?.original?.url}
                srcSet={genSrcSet(firstPreview?.image)}
                sizes={genImgBreakpoints(imgSizesSrcSet)}
              />
            </div>
          : youTubeVimeoPreview
            ? <div className={classes.height100} ref={ref}>
                <CardMedia
                  component="img"
                  className={clsx(
                    loaded ? "fadeIn" : "hide",
                    fit ? classes.cardMediaFit : classes.cardMedia,
                  )}
                  onClick={props.onClick}
                  onLoad={() => setLoaded(true)}
                  src={youTubeVimeoPreview}
                  title={
                    youTubeVimeoPreview ? title : "Video thumbnail unavailable"
                  }
                />
              </div>
            : <PreviewImageEmpty/>
        } */}

        {
          firstPreview?.image?.original?.url
          ? <div className={classes.height100} ref={ref}>
              <Image
                className={clsx(
                  loaded ? "fadeIn" : "hidden",
                  fit ? classes.cardMediaFit : classes.cardMedia,
                )}
                alt={title}
                layout={"fill"}
                objectFit={"cover"}
                onClick={props.onClick}
                onLoad={() => setLoaded(true)}
                src={firstPreview?.image?.original?.url}
                // srcSet={genSrcSet(firstPreview?.image)}
                // sizes={genImgBreakpoints(imgSizesSrcSet)}
              />
            </div>
          : youTubeVimeoPreview
            ? <div className={classes.height100} ref={ref}>
                <Image
                  className={clsx(
                    loaded ? "fadeIn" : "hidden",
                    fit ? classes.cardMediaFit : classes.cardMedia,
                  )}
                  alt={title}
                  layout={"fill"}
                  objectFit={"cover"}
                  onClick={props.onClick}
                  onLoad={() => setLoaded(true)}
                  src={youTubeVimeoPreview}
                  // srcSet={genSrcSet(firstPreview?.image)}
                  title={
                    youTubeVimeoPreview ? title : "Video thumbnail unavailable"
                  }
                />
              </div>
            : <PreviewImageEmpty/>
        }
      </AspectGridItemLink>
    )
  }
}




interface ReactProps extends WithStyles<typeof styles> {
  newsItem: NewsItem;
  screenSize: "xs" | "sm" | "md" | "lg" | "xl";
  fit?: boolean; // object-fit the image
  cardsPerRow: number;
  previewImageEmptyMessage?: React.ReactNode;
  onClick?(a: any): void;
  promotedSlotId?: string
  disableLink?: boolean;
}


export default withStyles(styles)( MainPreviewImage );
