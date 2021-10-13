import React from "react";
import clsx from "clsx";

import { withStyles, WithStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Colors, BoxShadows, BorderRadius } from "layout/AppTheme";
// Material UI
import CardMedia from "@material-ui/core/CardMedia";
// Typings
import { ProductPreviewItem } from "typings/gqlTypes";
import { genSrcSet, genImgBreakpoints } from "utils/images";
import { getYouTubeVimeoImagePreview } from "utils/links";
import {
  styles,
} from "../styles";
import Image from "next/image";




const YouTubePreview = (props: ReactProps) => {

  const {
    classes,
    fit = false,
  } = props;

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  const [loaded, setLoaded] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if ((ref.current?.firstChild?.firstChild as HTMLImageElement | undefined)?.complete) {
      setLoaded(true)
    }
  }, [])


  let youTubeVimeoPreview = React.useMemo(
    () => getYouTubeVimeoImagePreview(props.featuredPreviewItem?.youTubeEmbedLink),
    [props.featuredPreviewItem]
  );

  return (
    <Image
      className={clsx(
        loaded ? "fadeIn" : "hidden",
        fit ? classes.cardMediaFit : classes.cardMedia,
      )}
      alt={props.title}
      layout={"fill"}
      objectFit={"cover"}
      onClick={props.onClick}
      onLoad={() => setLoaded(true)}
      src={youTubeVimeoPreview}
      // srcSet={genSrcSet(featuredPreview?.image)}
      title={
        youTubeVimeoPreview ? props.title : "Video thumbnail unavailable"
      }
    />
  )
}




interface ReactProps extends WithStyles<typeof styles> {
  featuredPreviewItem: ProductPreviewItem
  title?: string
  fit?: boolean; // object-fit the image
  onClick?(a: any): void;
}


export default withStyles(styles)( YouTubePreview );
