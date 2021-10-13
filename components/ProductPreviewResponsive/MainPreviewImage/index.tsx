import React from "react";
import clsx from "clsx";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Material UI
import CardMedia from "@material-ui/core/CardMedia";
// Typings
import { ProductPreview } from "typings/gqlTypes";
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
    productPreview,
    fit = false,
    cardsPerRow = 1,
  } = props;

  const featuredPreview = productPreview?.featuredPreview
  const title = productPreview?.title

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



    return(
      <AspectGridItemLink
        productPreview={productPreview}
        promotedSlotId={props.promotedSlotId}
        disable={props.disableLink}
      >

        {
          featuredPreview?.image?.original?.url
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
                src={featuredPreview?.image?.original?.url}
                // srcSet={genSrcSet(firstPreview?.image)}
                // sizes={genImgBreakpoints(imgSizesSrcSet)}
              />
            </div>
          : <PreviewImageEmpty/>
        }
      </AspectGridItemLink>
    )
}




interface ReactProps extends WithStyles<typeof styles> {
  productPreview: ProductPreview;
  screenSize: "xs" | "sm" | "md" | "lg" | "xl";
  fit?: boolean; // object-fit the image
  cardsPerRow: number;
  previewImageEmptyMessage?: React.ReactNode;
  onClick?(a: any): void;
  promotedSlotId?: string
  disableLink?: boolean;
}


export default withStyles(styles)( MainPreviewImage );
