import React from "react";
import clsx from "clsx";
import { withStyles, createStyles, WithStyles, Theme } from "@material-ui/core/styles";
import { fontFam, Colors, BorderRadius } from "layout/AppTheme";
// Material UI
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
// Icons
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import YouTubeIcon from "components/Icons/YouTube";
// helpers
import { genSrcSet, genImgBreakpoints } from "utils/images";
import { getYouTubeVimeoImagePreview } from "utils/links";


// VIMEO
// <iframe src="https://player.vimeo.com/video/76979871?embedparameter=value" width="640" height="360" frameborder="0" allowfullscreen></iframe>

// https://vimeo.com/ondemand/thedawnwall/288596286
// https://player.vimeo.com/video/288596286

const ThumbnailVideo: React.FC<ReactProps> = (props) => {


  const { classes, onClick } = props;
  let {
    videoUrl = "5JxgDJvqGmM",
    autoplay = false,
    rel = false,
    modest = 1,
    asThumbnail = true,
  } = props;


  let videoSrc = "";

  // Youtube
  if (videoUrl.includes('youtube.com/watch?v=')) {
    videoSrc = "https://www.youtube.com/embed/" +
      videoUrl.split('v=')[1]
      + "?autoplay=" + autoplay
      + "&rel=" + rel
      + "&modestbranding=" + modest
      + "&color=white"
  }
  if (videoUrl.includes('youtu.be')) {
    videoSrc = "https://www.youtube.com/embed/" +
      videoUrl.split('/').pop()
      + "?autoplay=" + autoplay
      + "&rel=" + rel
      + "&modestbranding=" + modest
      + "&color=white"
  }

  // Vimeo
  if (videoUrl.includes('vimeo.com')) {
    videoSrc = `https://player.vimeo.com/video/${videoUrl.split('/').pop()}`;
  }

  return (
    <Card className={classes.cardOuter}>
      <CardActionArea
        onClick={onClick}
        classes={{ root: classes.cardActionArea }}
      >
        <CardMedia
          component="img"
          classes={{ media: classes.cardMediaVideo }}
          src={getYouTubeVimeoImagePreview(videoUrl)}
          // image={videoSrc}
        />
      </CardActionArea>
    </Card>
  )
}


interface ReactProps extends WithStyles<typeof styles> {
  onClick?(a: any): void;
  videoUrl: string;
  autoplay?: boolean;
  rel?: boolean;
  modest?: boolean;
  asThumbnail?: boolean;
  title?: string;
}


export const styles = (theme: Theme) => createStyles({
  card: {
    width: "100%",
    boxShadow: 'none',
  },
  cardActionArea: {
    display: "flex",
    flexDirection: "row",
    height: '100%',
    // backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23dddddd' fill-opacity='0.3' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  },
  cardOuter: {
    borderRadius: BorderRadius,
    height: "100%",
  },
  cardMediaVideo: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    border: "none",
  },
  cardMedia: {
    objectFit: "cover",
    height: 100,
    width: 160,
  },
})


export default withStyles(styles)( ThumbnailVideo );