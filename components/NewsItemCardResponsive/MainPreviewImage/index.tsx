import React from "react";
import clsx from "clsx";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Material UI
import CardMedia from "@material-ui/core/CardMedia";
// Typings
import {
  Product_Preview_Items,
} from "typings/gqlTypes";
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
    cardsPerRow,
    fit = false,
  } = props;

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  const imgSizesSrcSet = React.useMemo(
    () => getImgSrcSetSizes(cardsPerRow, props.screenSize),
    [ cardsPerRow, props.screenSize]
  )

  const [loaded, setLoaded] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if ((ref.current?.firstChild?.firstChild as HTMLImageElement | undefined)?.complete) {
      setLoaded(true)
    }
  }, [])




  return(
    <AspectGridItemLink
      productId={props.productId}
      promotedSlotId={props.promotedSlotId}
      disable={props.disableLink}
    >
      {
        props.featuredPreviewItem?.image?.original?.url
        ? <div className={classes.height100} ref={ref}>

            {/* Either use next.js Image or Card component.
            <Image/> uses webp but <Card/> seems faster */}


            {/* <Image
              className={clsx(
                loaded ? "fadeIn" : "hidden",
                fit ? classes.cardMediaFit : classes.cardMedia,
              )}
              alt={props.title}
              layout={"fill"}
              objectFit={"cover"}
              onClick={props.onClick}
              onLoad={() => setLoaded(true)}
              src={props.featuredPreview?.image?.original?.url}
            /> */}
            <CardMedia
              title={props.title}
              component="img"
              className={clsx(
                loaded ? "fadeIn" : "hide",
                fit ? classes.cardMediaFit : classes.cardMedia,
                // (previewLoaded > 0) ? "fadeIn" : 'hidden',
              )}
              onClick={props.onClick}
              onLoad={() => setLoaded(true)}
              src={props.featuredPreviewItem?.image?.original?.url}
              srcSet={genSrcSet(props.featuredPreviewItem?.image)}
              sizes={genImgBreakpoints(imgSizesSrcSet)}
            />

          </div>
        : <PreviewImageEmpty
            previewImageEmptyMessage={props.previewImageEmptyMessage}
            onClick={props.onClick}
          />
      }
    </AspectGridItemLink>
  )
}




interface ReactProps extends WithStyles<typeof styles> {
  featuredPreviewItem: Product_Preview_Items
  productId?: string
  promotedSlotId?: string
  screenSize: "xs" | "sm" | "md" | "lg" | "xl";
  cardsPerRow: number
  fit?: boolean; // object-fit the image
  title?: string;
  previewImageEmptyMessage?: React.ReactNode;
  onClick?(a: any): void;
  disableLink?: boolean;
}


export default withStyles(styles)( MainPreviewImage );
