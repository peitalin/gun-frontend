import React from "react";
import clsx from "clsx";
import { oc as option } from "ts-optchain";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { Colors } from "layout/AppTheme";
// Typings
import { Product_Preview_Items } from "typings/gqlTypes";
// Material UI
// media query
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import YouTube from 'react-youtube';






const FeaturedVideoMobile = (props: ReactProps) => {

  const [videoLoaded, setVideoLoaded] = React.useState(false)

  const {
    classes,
    previewItem,
  } = props;

  // let videoUrl = generateYouTubeVimeoEmbedLink(
  //   option(previewItem).youTubeEmbedLink("")
  // );

  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <div className={classes.featuredImageContainer}>
      <div className={classes.card}>
        <YouTube
          videoId={option(previewItem).youTubeEmbedLink("").split("?v=")[1]}
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
  )
}

interface ReactProps extends WithStyles<typeof styles> {
  previewItem?: Product_Preview_Items;
  openedModals?: string[];
  openModal?(id: string): void;
  closeModal?(id: string): void;
}

const styles = (theme: Theme) => createStyles({
  featuredImageContainer: {
    overflow: 'hidden',
    height: '100%',
    width: '100%',
    background: Colors.lightestGrey,
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    borderRadius: "2px 2px 2px 2px",
  },
  featuredImageContainerXSDown: {
    position: 'absolute',
    height: '100%',
    top: 0,
    left:0,
  },
  card: {
    borderRadius: "1px",
    width: "100%",
    height: '100%',
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: "200ms",
    }),
  },
  cardMedia: {
    // objectFit: "cover",
    width: '100%',
    height: '100%',
    border: 'none',
    // transform: 'translateX(3rem)',
    // 3rem offset for mobile. Makes desktop-mobile width
    // look off but necessary for mobile
    // for some reason there is a 3rem shift on mobile for youtube videos
  },
  cardActionArea: {
    height: '100%',
    background: "#f8f8f8",
    display: "flex",
    flexDirection: "row",
  },
  cardMediaTall: {
    width: '100%',
    height: '100%',
    // objectFit: "cover",
    // width: "unset",
  },
  cardMediaWide: {
    width: '100%',
    height: '100%',
    // objectFit: "cover",
  },
});


export default withStyles(styles)( FeaturedVideoMobile );

