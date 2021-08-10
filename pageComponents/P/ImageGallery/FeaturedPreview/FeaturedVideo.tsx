import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors, BorderRadius } from "layout/AppTheme";
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

  const {
    classes,
    previewItem,
  } = props;

  let videoId = extractYoutubeVimeoId(previewItem?.youTubeEmbedLink)

  const theme = useTheme();

  return (
    <AspectRatioConstraint>
      <div className={classes.featuredVideoRoot}>
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

export const styles = (theme: Theme) => createStyles({
  featuredVideoRoot: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    borderRadius: BorderRadius,
    backgroundColor: theme.palette.type === 'dark'
      ? Colors.black
      : Colors.lightestGrey,
  },
  /// Featured Video
  card: {
    borderRadius: '0px',
    width: "100%",
    height: '100%',
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
  },
  cardMedia: {
    objectFit: "cover",
    width: '100%',
    height: '100%',
    border: 'none',
  },
  cardActionArea: {
    width: '100%',
    height: '100%',
    display: "flex",
    flexDirection: "row",
  },
})


export default withStyles(styles)( FeaturedVideo );

