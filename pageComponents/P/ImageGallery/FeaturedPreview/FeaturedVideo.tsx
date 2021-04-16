import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { styles } from "./styles";
import { Colors } from "layout/AppTheme";
// Typings
import { Product_Preview_Items } from "typings/gqlTypes";
import { generateYouTubeVimeoEmbedLink, extractYoutubeVimeoId } from "utils/links";
// Components
import AspectRatioConstraint from "components/AspectRatioConstraint";
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import YouTube from 'react-youtube';




const FeaturedVideo = (props: ReactProps) => {

  const [videoLoaded, setVideoLoaded] = React.useState(false)

  const {
    classes,
    previewItem,
  } = props;

  let videoId = extractYoutubeVimeoId(previewItem?.youTubeEmbedLink)

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <AspectRatioConstraint>
      <div className={classes.featuredImageRoot}>
        <div className={classes.card}>
          <YouTube
            videoId={videoId}
            className={classes.cardMedia}
            containerClassName={classes.cardActionArea}
            // opts={obj}
            // onReady={() => console.log("youtube player ready")}
            // onPlay={func}                     // defaults -> noop
            // onPause={func}                    // defaults -> noop
            // onEnd={func}                      // defaults -> noop
            // onError={func}                    // defaults -> noop
            // onStateChange={func}              // defaults -> noop
            // onPlaybackRateChange={func}       // defaults -> noop
            // onPlaybackQualityChange={func}    // defaults -> noop
          />
        </div>
      </div>
    </AspectRatioConstraint>
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  previewItem?: Product_Preview_Items;
  openedModals?: string[];
  openModal?(id: string): void;
  closeModal?(id: string): void;
  onClick?(): void;
}


export default withStyles(styles)( FeaturedVideo );

